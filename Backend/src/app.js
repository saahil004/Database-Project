import express from "express";
import cors from "cors";

import menuRouter from "./routes/menu.route.js";
import authRouter from "./routes/auth.route.js";
import categoryRouter from "./routes/category.route.js";
import customerRouter from "./routes/customer.route.js";
import orderRouter from "./routes/order.route.js";
import adminRouter from "./routes/admin.route.js";
import chatRouter from "./routes/chat.route.js";  // New chat route

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/chat", chatRouter);  // Chatbot route

// image upload route (if needed)

export { app };

