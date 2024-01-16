"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = exports.doc = void 0;
const ExpressError_1 = require("../utils/ExpressError");
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const doc = (req, res) => {
    console.log("Hey doc");
    res.send("Check console");
};
exports.doc = doc;
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    const secret = process.env.JWT_SECRET;
    if (secret) {
        return jsonwebtoken_1.default.sign({ id }, secret, { expiresIn: maxAge });
    }
    else {
        console.log("secret is not provided from env");
    }
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, username, password } = req.body;
        const user = new User_1.User({ first_name, last_name, email, username, password });
        yield user.save();
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json(user);
    }
    catch (err) {
        if (err instanceof Error)
            throw new ExpressError_1.ExpressError(err.message, 400);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield User_1.User.login(username, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        if (err instanceof Error)
            throw new ExpressError_1.ExpressError(err.message, 400);
    }
});
exports.login = login;
const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.json("Logged out!");
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map