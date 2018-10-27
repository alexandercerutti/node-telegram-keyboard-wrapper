"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const TelegramBot = require("node-telegram-bot-api");
if (process.argv.length < 3) {
    throw new Error("To test this bot, please pass a bot-token to the application.");
}
const token = process.argv[2];
const bot = new TelegramBot(token, { polling: true });
let isRKOpen = false;
const rk = new __1.ReplyKeyboard();
const ik = new __1.InlineKeyboard();
rk
    .addRow("1:1 button", "1:2 button")
    .addRow("2:1 button", "2:2 button");
ik
    .addRow({ text: "1:1 button", callback_data: "Works!" }, { text: "1:2 button", callback_data: "Works!" })
    .addRow({ text: "2:1 button", callback_data: "Works!" }, { text: "2:2 button", callback_data: "Works!" });
function hasBotCommands(entities) {
    if (!entities || !(entities instanceof Array)) {
        return false;
    }
    return entities.some(e => e.type === "bot_command");
}
bot.onText(/\/replyKeyboard/i, (msg) => {
    bot.sendMessage(msg.from.id, "This is a message with a reply keyboard. Click on one of the buttons to close it.", rk.open({ resize_keyboard: true }))
        .then(function () {
        isRKOpen = !isRKOpen;
    });
});
bot.onText(/\/forceReply/i, (msg) => {
    bot.sendMessage(msg.from.id, "Hey, this is a forced-reply. Reply me.", (new __1.ForceReply()).build());
});
bot.onText(/\/inlineKeyboard/i, (msg) => {
    bot.sendMessage(msg.from.id, "This is a message with an inline keyboard.", ik.build());
});
bot.on("message", (msg) => {
    if (!hasBotCommands(msg.entities)) {
        if (isRKOpen) {
            bot.sendMessage(msg.from.id, "Good! I'm closing the replyKeyboard.", rk.close());
            isRKOpen = !isRKOpen;
        }
        if (!!msg.reply_to_message) {
            bot.sendMessage(msg.from.id, "Good! ForceReply works!");
        }
    }
});
bot.on("callback_query", (query) => {
    bot.answerCallbackQuery(query.id, { text: "Action received!" })
        .then(function () {
        bot.sendMessage(query.from.id, "Hey there! You clicked on an inline button! ;) So, as you saw, the support library works!");
    });
});
bot.on("polling_error", (err) => console.log(err));
