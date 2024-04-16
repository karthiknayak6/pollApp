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
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "Please enter first name!"],
    },
    last_name: {
        type: String,
        required: [true, "Please enter first name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email id!"],
        unique: true,
        lowercase: true,
        validate: [isEmail_1.default, "Please enter a valid email!"],
    },
    username: {
        type: String,
        required: [true, "Please enter your username"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password!"],
        minLength: [6, "Minimum password length is 6!"],
    },
    polls: [
        {
            type: Schema.Types.ObjectId,
            ref: "Poll",
        },
    ],
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt();
        this.password = yield bcrypt_1.default.hash(this.password, salt);
        next();
    });
});
userSchema.statics.login = function (username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ username: username });
        if (user) {
            const auth = yield bcrypt_1.default.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw Error("Incorrect password");
        }
        throw Error("Incorrect email");
    });
};
exports.User = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=User.js.map