import express from "express"
import cors from "cors"
// import nodemon from 'nodemon'

const app = express()
app.use(cors())
// app.use(nodemon)
export {app}