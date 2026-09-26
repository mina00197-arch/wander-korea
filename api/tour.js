// Vercel serverless proxy for Korea Tourism Organization TourAPI (data.go.kr).
// The service key lives only in the Vercel environment variable TOUR_API_KEY.
const ALLOWED_OPS = new Set([
  'areaBasedList2', 'searchKeyword2', 'locationBasedList2',
  'searchFestival2', 'detailCommon2'
]);
const ALLOWED_PARAMS = new Set([
  'numOfRows', 'pageNo', 'arrange', 'contentTypeId', 'lDongRegnCd', 'lDongSignguCd',
  'keyword', 'mapX', 'mapY', 'radius', 'eventStartDate', 'eventEndDate', 'contentId'
]);

module.exports = async (req, res) => {
  const q = req.query || {};
  const svc = q.svc === 'ko' ? 'KorService2' : 'EngService2';
  const op = String(q.op || '');
  if (!ALLOWED_OPS.has(op)) return res.status(400).json({ error: 'BAD_OP' });

  const raw = (process.env.TOUR_API_KEY || '');
  const key = raw.trim().replace(/^["']|["']$/g, '').trim();
  if (!key) return res.status(500).json({ error: 'NO_KEY' });
  // Some keys work only in Encoding form, some only in Decoding form: try both.
  const looksEncoded = /%[0-9A-Fa-f]{2}/.test(key);
  let decoded = key; try { decoded = looksEncoded ? decodeURIComponent(key) : key; } catch (e) {}
  const candidates = [...new Set([encodeURIComponent(decoded), key, decoded])];

  const params = new URLSearchParams({ MobileOS: 'ETC', MobileApp: 'WanderKorea', _type: 'json', numOfRows: '20', pageNo: '1' });
  for (const [k, v] of Object.entries(q)) {
    if (ALLOWED_PARAMS.has(k) && v !== '' && v != null) params.set(k, String(v).slice(0, 100));
  }
  try {
    let r, text;
    for (const keyParam of candidates) {
      const url = `https://apis.data.go.kr/B551011/${svc}/${op}?serviceKey=${keyParam}&${params}`;
      r = await fetch(url, { signal: AbortSignal.timeout(15000) });
      text = await r.text();
      if (!/SERVICE_KEY_IS_NOT_REGISTERED|SERVICE KEY IS NOT REGISTERED/i.test(text)) break;
    }
    res.setHeader('Content-Type', text.trim().startsWith('{') ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8');
    // cache successful answers at the edge for 1 hour to save API quota
    if (r.ok && text.includes('"0000"')) res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(r.ok ? 200 : 502).send(text);
  } catch (e) {
    return res.status(502).json({ error: 'UPSTREAM', message: String(e && e.message || e) });
  }
};
