"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require("dotenv").config();
const discord_js_1 = __importStar(require("discord.js"));
exports.client = new discord_js_1.Client({
    intents: [discord_js_1.IntentsBitField.Flags.Guilds, discord_js_1.IntentsBitField.Flags.DirectMessages, discord_js_1.IntentsBitField.Flags.GuildVoiceStates],
});
let onCall = new discord_js_1.default.Collection;
exports.client.once("ready", () => {
    console.log("Bot online");
});
exports.client.on(discord_js_1.default.Events.VoiceStateUpdate, (update) => __awaiter(void 0, void 0, void 0, function* () {
    let vc = yield exports.client.channels.fetch("1029265216153858053");
    let people = [yield exports.client.users.fetch("700443591423819889"), yield exports.client.users.fetch("808864687704899605")];
    if (onCall.size < vc.members.size) {
        onCall = vc.members;
        people.forEach((person) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            (yield person.createDM()).send(((_a = vc.members.last()) === null || _a === void 0 ? void 0 : _a.nickname) + " has joined the vc");
        }));
        return;
    }
    onCall = vc.members;
    if (onCall.size === 0) {
        people.forEach((person) => __awaiter(void 0, void 0, void 0, function* () {
            (yield person.createDM()).send("Everyone has left the call");
        }));
    }
}));
exports.client.login(process.env.TOKEN);
