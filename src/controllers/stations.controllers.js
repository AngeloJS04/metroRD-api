
import axios from 'axios';
import * as cheerio from 'cheerio'

export const stationsTrains = async (req, res) => {
    try {
        const { data: StationList } = await axios.get('https://www.metrosantodomingo.com/estaciones-metro-santo-domingo.html')

        const $ = cheerio.load(StationList)
        const selectorStationOne = '#content-homepage > div > div > div.col-md-9.backgroundwhite > div > div.col-md-12.padding0.margin-bottom15 > div:nth-child(1) > table > tbody > tr > td > a'
        const selectorStationTwo = '#content-homepage > div > div > div.col-md-9.backgroundwhite > div > div.col-md-12.padding0.margin-bottom15 > div:nth-child(2) > table > tbody > tr > td > a'

        res.json({
            stationOne: $(selectorStationOne).text().trim().split("Estación").filter(n => n).map(x => `Estación${x}`),
            stationTwo: $(selectorStationTwo).text().trim().split("Estación").filter(n => n).map(x => `Estación${x}`)
        })

    } catch (error) {
        res.json({ error })
    }

}

export const lineTrains = async (req, res) => {
    let { line } = req.query
    try {
        const { data } = await axios.get(`https://www.metrosantodomingo.com/linea${line}-metro-santo-domingo.html`)

        const $ = cheerio.load(data)
        const Line = '#content-homepage > div > div > div.col-md-9.backgroundwhite > div > div.col-md-12.margin-top10.margin-bottom10'

        res.json({ Line: $(Line).text().split('\n')[2].trim() })

    } catch (error) { console.log(error) };
}

export const scheduleTrains = async (req, res) => {
    try {

        const { data: stations } = await axios(`https://www.metrosantodomingo.com/mapa-metro-santo-domingo.html`)
        const $ = cheerio.load(stations)

        const stationSeleted = '#content-homepage > div > div > div.col-md-3.discover-left > table.boxschedule-table > tbody > tr > td'

        const days = $(stationSeleted).text().split(/6|PM/).filter((x, i) => (i + 1) % 2 !== 0 && x) ?? 'Date not found'
        const hours = $(stationSeleted).text().split(/6|PM/).filter((x, i) => (i + 1) % 2 === 0).map(x => `6${x}PM`)

        res.json({ days, hours })

    } catch (error) {
        console.log(error);
    }
}

export const stationsCableway = async (req, res) => {
    try {

        const { data } = await axios(`https://www.telefericosantodomingo.com/estaciones-teleferico-santo-domingo`)
        const $ = cheerio.load(data)

        const d = [
            'body > main > div:nth-child(2) > div:nth-child(1) > div.col-md-8 > h2',
            'body > main > div:nth-child(2) > div:nth-child(3) > div.col-md-8 > h2',
            'body > main > div:nth-child(2) > div:nth-child(4) > div.col-md-8 > h2',
            'body > main > div:nth-child(2) > div:nth-child(6) > div.col-md-8 > h2'
        ]

        const CableWay = d.map(x => $(x).text())

        res.json({ CableWay })

    } catch (error) {
        console.log(error);
    }


}

export const opretNews = async (req, res) => {
    try {
        const { data } = await axios(`https://www.opret.gob.do/Noticias/NoticiaTodas`)
        const $ = cheerio.load(data)

        const newsTitle = '#noticia > div > div.col-lg-8.col-md-8.col-sm-8';

        let newArray = $(newsTitle).text().trim().split('\n').filter(x => x).map(x => x.replace(/^[ ]+/g, "")).filter(x => x)

        let count = 0;

        const newsList = []

        for (let i = 0; i < newArray.length; i++) {

            if (i + 1 === newArray.length) break;
            if (i > 6) break;

            let ob = {
                title: newArray[count],
                date: newArray[count + 1],
                description: newArray[count + 2]
            }
            count += 3;

            newsList.push(ob)

        }

        res.json({ newsList })

    } catch (error) { console.log(error) };
}