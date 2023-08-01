"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const axios_1 = __importDefault(require("axios"));
const API_BASE_URL = 'http://votre_adresse_api/';
exports.TransactionService = {
    depot: (transaction) => __awaiter(void 0, void 0, void 0, function* () {
        return axios_1.default.post(`${API_BASE_URL}depot`, transaction);
    }),
    retrait: (transaction) => __awaiter(void 0, void 0, void 0, function* () {
        return axios_1.default.post(`${API_BASE_URL}retrait`, transaction);
    }),
    transfert: (transaction) => __awaiter(void 0, void 0, void 0, function* () {
        return axios_1.default.post(`${API_BASE_URL}transfert`, transaction);
    }),
};
