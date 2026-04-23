import { asyncHandler } from "../utils/asynchandler.js";
import { generateToken } from "../utils/jwt.utils.js";


export const authCustomer = asyncHandler(async (req, res) => {
    const db = req.app.locals.db
    const {username, password} = req.body
    const sql = `
    select * from customers
    where username = ? and password = ?;
    `

    const [cust] = await db.query(sql, [username, password])
    if (cust.length == 0) {
       return res.status(401).json({
        success: false,
        message: "Username or password invalid"
    });    
    }
    const token = generateToken({ customer_id: cust[0].customer_id, role: 'customer' });
    res.status(200).json({
        success: true,
        token,
        data: cust[0],
        message: "Logged in successfully"
    });
}
)

export const authAdmin = asyncHandler(async (req, res) => {
    const db = req.app.locals.db
    const {username, password} = req.body
    const sql = `
    select * from admins
    where username = ? and password = ?;
    `

    const [admin] = await db.query(sql, [username, password])
    if (admin.length == 0) {
       return res.status(401).json({
        success: false,
        message: "Username or password invalid"
    });    
    }
    const token = generateToken({ admin_id: admin[0].admin_id, role: 'admin' });
    res.status(200).json({
        success: true,
        token,
        data: admin[0],
        message: "Logged in successfully"
    });
}
)

export const authDeliveryGuy = asyncHandler(async (req, res) => {
    const db = req.app.locals.db
    const {username, password} = req.body
    const sql = `
    select * from deliveryguy
    where username = ? and password = ?;
    `

    const [dg] = await db.query(sql, [username, password])
    if (dg.length == 0) {
       return res.status(401).json({
        success: false,
        message: "Username or password invalid"
    });    
    }
    const token = generateToken({ deliveryguy_id: dg[0].deliveryguy_id, role: 'deliveryguy' });
    res.status(200).json({
        success: true,
        token,
        data: dg[0],
        message: "Logged in successfully"
    });
}
)

