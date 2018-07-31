"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
exports.DetailPlan = new Schema({
    planId: String,
    username: String,
    day: Number,
    destName: String,
    latitude: {
        type: Number,
        default: null,
    },
    longitude: {
        type: Number,
        default: null,
    },
    placeId: {
        type: String,
        default: null,
    },
    todoList: [String],
    googleMapEnabled: Boolean,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
exports.default = mongoose_1.default.model('DetailPlan', exports.DetailPlan);
