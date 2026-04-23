import mysql from "mysql2/promise"

const connectDB = async () => {
    try {

        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "sirfaisal",
            database: "dbsproj"
        })

        console.log(`MySQL connected! Host: ${connection.config.host}`)

        return connection

    } catch (error) {

        console.log("Database connection failed:", error)
        process.exit(1)

    }
}

export default connectDB