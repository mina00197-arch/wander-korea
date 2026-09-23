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

## How to use
1. Open `wander-korea.html` in a browser (phone or PC).
2. In **Settings**, paste your data.go.kr service key and tap **Save & test**.
   - Both *KorService2* (국문 관광정보) and *EngService2* (영문 관광정보) must be approved on data.go.kr.
   - New keys can take 1–2 hours to activate.

Keys are stored only in your browser (localStorage). Never commit keys to this repository.
