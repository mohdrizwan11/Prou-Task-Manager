import dotenv from "dotenv";
dotenv.config();       // <-- REQUIRED HERE FIRST!

import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   🚀 Backend Server Started           ║
║   Port: ${PORT}                       
║   Environment: ${process.env.NODE_ENV || 'development'}
╚═══════════════════════════════════════╝
  `);
});
