"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
exports.authRoutes = (0, express_1.Router)();
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.authRoutes.get("/", authMiddleware_1.checkUser, authMiddleware_1.requireAuth, authController_1.doc);
exports.authRoutes.post("/register", authController_1.register);
exports.authRoutes.post("/login", authController_1.login);
exports.authRoutes.get("/logout", authController_1.logout);
//# sourceMappingURL=authRoutes.js.map