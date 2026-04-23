import { asyncHandler } from "../utils/asynchandler.js";
import connectDB from '../db/db.js';
import ApiResponse from "../utils/apiresponse.js";
import { ApiError } from "../utils/apierror.js";

// Dynamic menu-based responses
const chatBot = asyncHandler(async (req, res) => {
  const db = await connectDB();
  const { message, conversation = [] } = req.body;

  const lowerMsg = message.toLowerCase();
  let reply = "Thanks for reaching out! Check /menu for latest items or /myorders for orders. How can I assist? 😊";

  // Query DB for real menu data
  if (lowerMsg.includes('menu') || lowerMsg.includes('pizza') || lowerMsg.includes('burger') || lowerMsg.includes('food')) {
    const [menuRows] = await db.execute(`
      SELECT name, price FROM menuitems 
      LIMIT 6
    `);
    const items = menuRows.map(item => `${item.name} $${item.price}`).join(', ');
    reply = `Latest menu: ${items}. Browse /menu for all! What interests you? 🍕`;
  } 

  if (lowerMsg.includes('order')) {
    reply = "Recent orders: Login /customerlogin → /myorders. Add from /menu to cart. Quick checkout!";
  }

  if (lowerMsg.includes('complain') || lowerMsg.includes('problem') || lowerMsg.includes('issue')) {
    reply = "Sorry for trouble! Refunds in 24h. Email support@foodhub.com with order ID or call 123456. We'll resolve ASAP! 🙏";
  }

  if (lowerMsg.includes('delivery')) {
    reply = "Delivery 30-45min, free >$20. Live tracking on /myorders after login.";
  }

  // Log for leads
  console.log('Chat lead:', { message, reply, timestamp: new Date().toISOString() });

  await db.end();

  res.status(200).json(new ApiResponse(200, 'Chat response', {
    reply,
    classification: lowerMsg.includes('order') ? 'HOT' : lowerMsg.includes('complain') ? 'COLD' : 'WARM'
  }));
});

export { chatBot };


