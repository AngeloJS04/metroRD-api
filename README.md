# metroRD-api 🚇
-----
### Overview

<p>This API provides information about the metro of the Dominican Republic like which lines exist, the schedule, the stations on the cableway, and news about the <strong>OPRET</strong> organization.</p>

<p>It is important to remember this isn't metro official API then whatever error using this data, we are not responsible for.</p>

<p>This project is the exact example of web scraping, for educational purposes, this data comes from:</p>

- [metro DR website](https://www.metrosantodomingo.com/)
- [cableway DR website](https://www.telefericosantodomingo.com/)

### Endpoints

| path                  | description                                          | demo |
| --------------------- | ---------------------------------------------------  | ---- |
| `/`                   | get all stations of metro.                           | [Try it here!](https://api-metro.onrender.com/)    |
| `/line-trains`        | get all stations of metro by specific line-trains.   | [Try it here!](https://api-metro.onrender.com/line-trains)    |
| `/schedule-trains`    | get metro schedule                                   | [Try it here!](https://api-metro.onrender.com/schedule-trains)     |
| `/station-cableway`   | get all stations of cableway                         | [Try it here!](https://api-metro.onrender.com/station-cableway)   |
| `/opret-news`          | get top headlines about OPRET (for now 6 is limit)  | [Try it here!](https://api-metro.onrender.com/opret-news)    |
