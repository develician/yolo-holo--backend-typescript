"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var account_1 = __importDefault(require("../../models/account"));
var crypto_1 = __importDefault(require("crypto"));
var joi_1 = __importDefault(require("joi"));
var token_1 = require("../../lib/token");
var hash = function (password) {
    var SECRET_KEY = process.env.SECRET_KEY;
    if (SECRET_KEY === undefined) {
        return '';
    }
    return crypto_1.default
        .createHmac('sha256', SECRET_KEY)
        .update(password)
        .digest('hex');
};
var validatePassword = function (password, userpassword) {
    var hashed = hash(password);
    return hashed === userpassword;
};
var register = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var schema, result, _a, username, email, password, existing, e_1, account, payload, token, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                schema = joi_1.default.object().keys({
                    username: joi_1.default.string()
                        .alphanum()
                        .min(4)
                        .max(15)
                        .required(),
                    email: joi_1.default.string()
                        .email()
                        .required(),
                    password: joi_1.default.string()
                        .required()
                        .min(6),
                });
                result = joi_1.default.validate(ctx.request.body, schema);
                if (result.error) {
                    console.log(result.error.details[0].message);
                    ctx.status = 400; // Bad request
                    ctx.body = {
                        message: result.error.details[0].message,
                    };
                    return [2 /*return*/];
                }
                _a = ctx.request.body, username = _a.username, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, account_1.default.findOne({
                        $or: [{ 'profile.username': username }, { email: email }],
                    }).exec()];
            case 2:
                existing = _b.sent();
                if (existing) {
                    ctx.status = 409;
                    ctx.body = {
                        key: existing.email === email ? 'email' : 'username',
                    };
                    return [2 /*return*/];
                }
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                ctx.throw(e_1, 500);
                return [3 /*break*/, 4];
            case 4:
                _b.trys.push([4, 7, , 8]);
                return [4 /*yield*/, new account_1.default({
                        profile: {
                            username: username,
                        },
                        email: email,
                        password: hash(password),
                    })];
            case 5:
                account = _b.sent();
                account.save();
                payload = {
                    _id: account._id,
                    profile: account.profile,
                };
                return [4 /*yield*/, token_1.generateToken(payload)];
            case 6:
                token = _b.sent();
                ctx.status = 200;
                ctx.cookies.set('access_token', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                });
                ctx.body = account.profile;
                return [3 /*break*/, 8];
            case 7:
                e_2 = _b.sent();
                ctx.throw(e_2, 500);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
var login = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var schema, result, _a, email, password, account, tokenPayload, token, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('accessed');
                schema = joi_1.default.object().keys({
                    email: joi_1.default.string().required(),
                    password: joi_1.default.string().required(),
                });
                result = joi_1.default.validate(ctx.request.body, schema);
                if (result.error) {
                    ctx.status = 400;
                    return [2 /*return*/];
                }
                _a = ctx.request.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, account_1.default.findOne({
                        $or: [{ 'profile.username': email }, { email: email }],
                    }).exec()];
            case 2:
                account = _b.sent();
                if (!account || !validatePassword(password, account.password)) {
                    console.log('403');
                    ctx.status = 403;
                    return [2 /*return*/];
                }
                tokenPayload = {
                    _id: account._id,
                    profile: account.profile,
                };
                return [4 /*yield*/, token_1.generateToken(tokenPayload)];
            case 3:
                token = _b.sent();
                ctx.cookies.set('access_token', token, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    httpOnly: true,
                });
                ctx.body = account.profile;
                return [3 /*break*/, 5];
            case 4:
                e_3 = _b.sent();
                ctx.throw(e_3, 500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var logout = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.cookies.set('access_token', null, {
            maxAge: 0,
            httpOnly: true,
        });
        ctx.body = {
            success: true,
        };
        ctx.status = 204;
        return [2 /*return*/];
    });
}); };
var getProfile = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var username, account, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = ctx.params.username;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, account_1.default.findOne({
                        'profile.username': username,
                    }).exec()];
            case 2:
                account = _a.sent();
                if (!account) {
                    ctx.status = 404;
                    return [2 /*return*/];
                }
                ctx.body = account.profile;
                ctx.status = 200;
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                ctx.throw(e_4, 500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var changePassword = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var _a, username, password, account, updatedAccount, e_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.request.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, account_1.default.findOne({
                        'profile.username': username,
                    }).exec()];
            case 2:
                account = _b.sent();
                if (!account) {
                    ctx.status = 404;
                    return [2 /*return*/];
                }
                return [4 /*yield*/, account_1.default.findByIdAndUpdate(account._id, {
                        password: hash(password),
                    }, { new: true }).exec()];
            case 3:
                updatedAccount = _b.sent();
                if (!updatedAccount) {
                    ctx.status = 404;
                    return [2 /*return*/];
                }
                ctx.body = updatedAccount.profile;
                ctx.status = 200;
                return [3 /*break*/, 5];
            case 4:
                e_5 = _b.sent();
                ctx.throw(e_5, 500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var facebookAuth = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var _a, fbToken, pictureUrl, fbEmail, fbId, fbName, socialKey, existing, account, e_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('accessed to facebook auth');
                _a = ctx.request.body, fbToken = _a.fbToken, pictureUrl = _a.pictureUrl, fbEmail = _a.fbEmail, fbId = _a.fbId, fbName = _a.fbName, socialKey = _a.socialKey;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, account_1.default.findOne({
                        'profile.username': socialKey,
                    }).exec()];
            case 2:
                existing = _b.sent();
                if (existing) {
                    ctx.body = existing;
                    ctx.status = 200;
                    console.log('already existing');
                    return [2 /*return*/];
                }
                account = new account_1.default({
                    profile: {
                        username: socialKey,
                        thumbnail: pictureUrl,
                    },
                    email: fbEmail,
                    social: {
                        facebook: {
                            id: fbId,
                            accessToken: fbToken,
                            displayName: fbName,
                        },
                    },
                    password: 'facebook user',
                });
                account.save();
                ctx.body = account;
                ctx.status = 201;
                console.log('first register');
                return [3 /*break*/, 4];
            case 3:
                e_6 = _b.sent();
                console.log(e_6);
                ctx.throw(e_6, 500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    register: register,
    login: login,
    logout: logout,
    getProfile: getProfile,
    changePassword: changePassword,
    facebookAuth: facebookAuth,
};
