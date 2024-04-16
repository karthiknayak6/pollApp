"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = exports.checkUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ExpressError_1 = require("../utils/ExpressError");
const checkUser = (req, res, next) => {
    console.log("user checked!!");
    next();
};
exports.checkUser = checkUser;
const requireAuth = (req, res, next) => {
    const secret = process.env.JWT_SECRET;
    console.log("SECRET: ", secret);
    const token = req.cookies.jwt;
    try {
        if (secret) {
            const decodedToken = jsonwebtoken_1.default.verify(token, secret);
            req.user = decodedToken;
        }
        else {
            console.log("secret is not provided from env!");
        }
        next();
    }
    catch (err) {
        if (err instanceof Error)
            throw new ExpressError_1.ExpressError(err.message, 400);
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=authMiddleware.js.map