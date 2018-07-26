"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var auth_1 = __importDefault(require("./auth"));
var user_1 = __importDefault(require("./user"));
var plan_1 = __importDefault(require("./plan"));
var detailPlan_1 = __importDefault(require("./detailPlan"));
var api = new koa_router_1.default();
api.use('/auth', auth_1.default.routes());
api.use('/user', user_1.default.routes());
api.use('/plan', plan_1.default.routes());
api.use('/detailPlan', detailPlan_1.default.routes());
exports.default = api;
