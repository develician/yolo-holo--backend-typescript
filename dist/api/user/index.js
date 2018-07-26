"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var userCtrl_1 = __importDefault(require("./userCtrl"));
var koaBody = require('koa-body');
var user = new koa_router_1.default();
// auth.post('/register', authCtrl.register);
user.get('/profile/:username', userCtrl_1.default.profile);
// must check user auth
user.post('/profile/:username', koaBody({ multipart: true }), userCtrl_1.default.changeProfileImage);
exports.default = user;
