# Wander Korea 🧭

A simple travel web app for discovering new regions of Korea, built on the Korea Tourism Organization's open data (TourAPI via data.go.kr).

공공데이터(한국관광공사 TourAPI) + AI로 만든 간단한 지역 여행 앱입니다.

## Features
- **Interest-based picks** – hiking, fishing, cycling, food, healing, sea & islands, history, festivals, activities
- **Discover new regions** – mark your usual regions; “Surprise me” suggests somewhere else
- **Near me** – places within 20 km of your location
- **English / 한국어** – uses EngService2 and KorService2
- **My trip** – save places and get a day route ordered by shortest distance
- **AI plan (optional)** – with your own Claude API key, get a written day plan

## How it works
- Live site: https://wander-korea.vercel.app — visitors need no key.
- `api/tour.js` is a Vercel serverless proxy that adds the data.go.kr service key from the
  environment variable **`TOUR_API_KEY`** (set in Vercel → Project → Settings → Environment Variables).
- Both *KorService2* (국문 관광정보) and *EngService2* (영문 관광정보) must be approved on data.go.kr.
- Opening `wander-korea.html` directly as a local file falls back to asking for your own key (stored only in that browser).

Never commit keys to this repository.
