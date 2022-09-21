import express from "express";
import router from './src/routes/index.js'

const app = express()
app.use(router)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('server port'));