import { VisualKeyboard } from "./reply_markup";
import { InlineKeyboardButton } from "node-telegram-bot-api";

export class InlineKeyboard extends VisualKeyboard {
	constructor(oneKey?: InlineKeyboardButton) {
		super("inline_keyboard");

		if (oneKey) {
			this.addRow(oneKey);
		}
	}
}
