import {
	InlineKeyboard,
	ReplyKeyboard,
	ForceReply,
	Row,
	KeyboardButton,
	InlineKeyboardButton,
} from "node-telegram-keyboard-wrapper";
import * as TelegramBot from "node-telegram-bot-api";

if (process.argv.length < 3) {
	throw new Error("To test this bot, please pass a bot-token to the application.");
}

const token = process.argv[2];
const bot = new TelegramBot(token, { polling: true });

const BotState = {
	isReplyKeyboardOpen: false,
};

const replyKeyboard = new ReplyKeyboard();
const inlineKeyboard = new InlineKeyboard();

const firstReplyKeyboardRowToShowConstructor = new Row<KeyboardButton>(
	new KeyboardButton("1:1 Button"),
	new KeyboardButton("1:2 Button"),
);

const secondReplyKeyboardRowToShowRowAsArray = new Row<KeyboardButton>();

secondReplyKeyboardRowToShowRowAsArray.push(
	new KeyboardButton("2:1 Button"),
	new KeyboardButton("2:2 Button"),
);

replyKeyboard.push(firstReplyKeyboardRowToShowConstructor, secondReplyKeyboardRowToShowRowAsArray);

inlineKeyboard.push(
	/**
	 * Forcing generic type here due to InlineKeyboardButton generic.
	 * See Row's file for a better Typescript explanation
	 */

	new Row<InlineKeyboardButton>(
		new InlineKeyboardButton("1:2 Button", "url", "https://www.google.com"),
		new InlineKeyboardButton("1:1 Button", "callback_data", "Works 1!"),
		new InlineKeyboardButton("1:2 Button", "callback_data", "Works 2!"),
	),
	new Row<InlineKeyboardButton>(
		new InlineKeyboardButton("2:1 Button", "callback_data", "Works 3!"),
		new InlineKeyboardButton("2:2 Button", "callback_data", "Works 4!"),
	),
);

function hasBotCommands(entities: TelegramBot.MessageEntity[]) {
	if (!entities || !(entities instanceof Array)) {
		return false;
	}

	return entities.some((e) => e.type === "bot_command");
}

bot.onText(/\/replyKeyboard/i, async (msg) => {
	const messageOptions: TelegramBot.SendMessageOptions = {
		reply_markup: replyKeyboard.getMarkup(),
	};

	await bot.sendMessage(
		msg.from.id,
		"This is a message with a reply keyboard. Click on one of the buttons to close it.",
		messageOptions,
	);
	BotState.isReplyKeyboardOpen = true;
});

bot.onText(/\/forceReply/i, (msg) => {
	const options: TelegramBot.SendMessageOptions = {
		reply_markup: ForceReply.getMarkup(),
	};

	bot.sendMessage(
		msg.from.id,
		"Hey, this is a forced-reply. Reply me. C'mon. I dare you.",
		options,
	);
});

bot.onText(/\/inlineKeyboard/i, (msg) => {
	const options: TelegramBot.SendMessageOptions = {
		reply_markup: inlineKeyboard.getMarkup(),
	};

	bot.sendMessage(msg.from.id, "This is a message with an inline keyboard.", options);
});

bot.on("message", async (msg) => {
	if (!hasBotCommands(msg.entities)) {
		if (BotState.isReplyKeyboardOpen) {
			const options: TelegramBot.SendMessageOptions = {
				reply_markup: replyKeyboard.remove(),
			};

			await bot.sendMessage(
				msg.from.id,
				"Message Received. I'm closing the replyKeyboard.",
				options,
			);
			BotState.isReplyKeyboardOpen = false;
		} else if (!!msg.reply_to_message) {
			await bot.sendMessage(msg.from.id, "HOW DARE YOU! But force reply worked.");
		}
	}
});

bot.on("callback_query", async (query) => {
	await bot.answerCallbackQuery(query.id, { text: "Action received!" });
	await bot.sendMessage(
		query.from.id,
		"Hey there! You clicked on an inline button! ;) So, as you saw, the support library works!",
	);
});

bot.on("polling_error", (err) => console.log(err));
