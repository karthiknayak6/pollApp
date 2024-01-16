// Create a new file, e.g., custom.d.ts

import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust the type of user as needed
    }
  }
}
