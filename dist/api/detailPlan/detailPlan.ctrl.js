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
var detailPlan_1 = __importDefault(require("models/detailPlan"));
var ObjectId = require('mongoose').Types.ObjectId;
var checkObjectId = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = ctx.params.id;
        if (!ObjectId.isValid(id)) {
            ctx.status = 400;
            return [2 /*return*/];
        }
        return [2 /*return*/, next()];
    });
}); };
var read = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var _a, planId, day, detailPlan, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.params, planId = _a.planId, day = _a.day;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, detailPlan_1.default.find({
                        $and: [{ planId: planId }, { day: day }],
                    }).exec()];
            case 2:
                detailPlan = _b.sent();
                if (!detailPlan) {
                    ctx.status = 404;
                    return [2 /*return*/];
                }
                ctx.body = detailPlan;
                ctx.status = 200;
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                ctx.throw(e_1, 500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var create = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var detailPlan;
    return __generator(this, function (_a) {
        //   const {
        //     planId,
        //     username,
        //     day,
        //     destName,
        //     latitude,
        //     longitude,
        //     placeId,
        //     todoList,
        //   } = ctx.request.body;
        try {
            detailPlan = new detailPlan_1.default(ctx.request.body);
            detailPlan.save();
            ctx.body = detailPlan;
            ctx.status = 201;
        }
        catch (e) {
            ctx.throw(e, 500);
        }
        return [2 /*return*/];
    });
}); };
var remove = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var id, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = ctx.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, detailPlan_1.default.findByIdAndRemove(id).exec()];
            case 2:
                _a.sent();
                ctx.status = 204;
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                ctx.throw(e_2, 500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var update = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var id, _a, destName, latitude, longitude, placeId, todoList, detailPlan, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = ctx.params.id;
                _a = ctx.request.body, destName = _a.destName, latitude = _a.latitude, longitude = _a.longitude, placeId = _a.placeId, todoList = _a.todoList;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, detailPlan_1.default.findByIdAndUpdate(id, {
                        destName: destName,
                        latitude: latitude,
                        longitude: longitude,
                        placeId: placeId,
                        todoList: todoList,
                    }, { new: true }).exec()];
            case 2:
                detailPlan = _b.sent();
                ctx.body = detailPlan;
                ctx.status = 200;
                return [3 /*break*/, 4];
            case 3:
                e_3 = _b.sent();
                ctx.throw(e_3, 500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = { checkObjectId: checkObjectId, read: read, create: create, remove: remove, update: update };
