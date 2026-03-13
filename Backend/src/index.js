import connectDB from "./db/db.js"
import express from "express"
import cors from "cors"

const app = express()
app.use(cors())

const port = 3000

let db

app.get('/users', async (req, res) => {

    try {

        const [rows] = await db.query("SELECT * FROM users")

        res.json(rows)

    } catch (error) {

        console.log(error)
        res.status(500).send("Error fetching users")

    }

})

const start = async () => {

    db = await connectDB()

    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })

}

start()

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})