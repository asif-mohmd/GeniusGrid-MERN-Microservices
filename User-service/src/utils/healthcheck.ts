import express, { Request, Response } from "express";


const router = express.Router();

// Health check functions
const checkDatabaseConnection = async (): Promise<boolean> => {
  // Add your database connection check logic here
  return true; // Simplified for this example
};



// Health check endpoint
router.get('/', async (_req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    checks: {
      database: await checkDatabaseConnection(),
    }
  };

  const allHealthy = Object.values(healthcheck.checks).every(status => status);
  if (allHealthy) {
    res.status(200).send(healthcheck);
  } else {
    res.status(503).send(healthcheck);
  }
});

export default router;
