"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var detailPlan_ctrl_1 = __importDefault(require("./detailPlan.ctrl"));
var detailPlan = new koa_router_1.default();
detailPlan.get('/:planId/:day', detailPlan_ctrl_1.default.read);
detailPlan.post('/', detailPlan_ctrl_1.default.create);
detailPlan.delete('/:id', detailPlan_ctrl_1.default.checkObjectId, detailPlan_ctrl_1.default.remove);
detailPlan.patch('/:id', detailPlan_ctrl_1.default.checkObjectId, detailPlan_ctrl_1.default.update);
detailPlan.get('/todo/list/:id', detailPlan_ctrl_1.default.checkObjectId, detailPlan_ctrl_1.default.listTodo);
detailPlan.get('/todo/:id/:index', detailPlan_ctrl_1.default.checkObjectId, detailPlan_ctrl_1.default.readTodo);
detailPlan.patch('/todo/:id', detailPlan_ctrl_1.default.checkObjectId, detailPlan_ctrl_1.default.addTodo);
detailPlan.patch('/todo/edit/:id/:index', detailPlan_ctrl_1.default.checkObjectId, detailPlan_ctrl_1.default.editTodo);
detailPlan.delete('/todo/:id/:index', detailPlan_ctrl_1.default.checkObjectId, detailPlan_ctrl_1.default.removeTodo);
exports.default = detailPlan;
