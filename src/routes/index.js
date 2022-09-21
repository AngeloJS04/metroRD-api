import { Router } from 'express'
import { stationsTrains, lineTrains, scheduleTrains, stationsCableway, opretNews } from '../controllers/stations.controllers.js'

const router = Router()

router.get('/station-trains', stationsTrains)
router.get('/line-trains', lineTrains)
router.get('/schedule-trains', scheduleTrains)
router.get('/station-cableway', stationsCableway)
router.get('/opret-news', opretNews)

export default router