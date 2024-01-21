// Create a new file, e.g., custom.d.ts

import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust the type of user as needed
    }
  }
}
//  { id: '65a5965369125797113877fe', iat: 1705417883, exp: 1705677083 }
