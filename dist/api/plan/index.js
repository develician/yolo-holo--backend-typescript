"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var planCtrl_1 = __importDefault(require("./planCtrl"));
var plan = new koa_router_1.default();
plan.post('/', planCtrl_1.default.create);
plan.get('/:username', planCtrl_1.default.list);
plan.get('/detail/:id', planCtrl_1.default.checkObjectId, planCtrl_1.default.read);
plan.patch('/:id', planCtrl_1.default.checkObjectId, planCtrl_1.default.update);
plan.delete('/:id', planCtrl_1.default.checkObjectId, planCtrl_1.default.remove);
exports.default = plan;
