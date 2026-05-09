import connectDB from "./src/db/db.js";

const testMenuItems = async () => {
  const db = await connectDB();
  const [items] = await db.query('SELECT * FROM menuitems');
  console.log('Menuitems table contents:', JSON.stringify(items, null, 2));
  const [count] = await db.query('SELECT COUNT(*) as count FROM menuitems');
  console.log('Menuitems count:', count[0].count);
  await db.end();
};

testMenuItems().catch(console.error);
