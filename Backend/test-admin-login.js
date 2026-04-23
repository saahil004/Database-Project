import connectDB from "./src/db/db.js";
import { asyncHandler } from "./src/utils/asynchandler.js";

const testAdminLogin = async () => {
  const db = await connectDB();
  const [admins] = await db.query('SELECT * FROM admins');
  console.log('Admins table contents:', JSON.stringify(admins, null, 2));
  
  const [test] = await db.query("SELECT * FROM admins WHERE username = 'admin' AND password = 'admin'");
  console.log('Test admin/admin exists:', test.length > 0);
  
  await db.end();
};

testAdminLogin().catch(console.error);
