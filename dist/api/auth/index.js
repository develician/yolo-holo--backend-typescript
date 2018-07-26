"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var authCtrl_1 = __importDefault(require("./authCtrl"));
var auth = new koa_router_1.default();
auth.post('/register', authCtrl_1.default.register);
auth.post('/login', authCtrl_1.default.login);
auth.post('/logout', authCtrl_1.default.logout);
auth.get('/profile/:username', authCtrl_1.default.getProfile);
auth.patch('/', authCtrl_1.default.changePassword);
auth.post('/facebook', authCtrl_1.default.facebookAuth);
exports.default = auth;
