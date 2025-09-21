import serverless from "serverless-http";
import { createServer } from "./index";

const app = createServer();

// For Vercel deployment, export the serverless function
export default serverless(app);

// For local development, you can still run the server
if (import.meta.main) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Fusion Starter server running on port ${port}`);
    console.log(`📱 Frontend: http://localhost:${port}`);
    console.log(`🔧 API: http://localhost:${port}/api`);
  });
}
