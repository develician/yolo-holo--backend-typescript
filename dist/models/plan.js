"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
exports.Plan = new Schema({
    username: String,
    title: String,
    departDate: Date,
    arriveDate: Date,
    numberOfDays: Number,
    selectedDateArray: [Date],
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
exports.default = mongoose_1.default.model('Plan', exports.Plan);
