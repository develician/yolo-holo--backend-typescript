"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
exports.Account = new Schema({
    profile: {
        username: String,
        thumbnail: {
            type: String,
            default: '/static/images/default_thumbnail.png',
        },
    },
    email: {
        type: String,
    },
    social: {
        facebook: {
            id: String,
            accessToken: String,
            displayName: String,
        },
    },
    password: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
exports.default = mongoose_1.default.model('Account', exports.Account);
