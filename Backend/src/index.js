import connectDB from "./db/db.js"
import { app } from "./app.js"
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000

let db

const start = async () => {

    db = await connectDB()

    // Make db available to all routes via app locals
    app.locals.db = db

    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })

}


start()

