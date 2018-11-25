import { VisualKeyboard } from "./reply_markup";
import { RKOpenOptions, RMSelective } from "./model";
import { KeyboardButton, SendMessageOptions } from "node-telegram-bot-api";

export class ReplyKeyboard extends VisualKeyboard {
	constructor(oneKey?: KeyboardButton) {
		// not passing type to super because it depends from the method (open or close)
		super();

		if (oneKey) {
			this.addRow(oneKey);
		}
	}

	/**
	 * Returns a structure to open a keyboard
	 * @param options - Options included in ReplyKeyboardMarkup
	 * @see https://core.telegram.org/bots/api#replykeyboardmarkup
	 */

	open(options: RKOpenOptions = {}): SendMessageOptions {
		this.setKeyboardType("keyboard");

		return Object.assign(this.build(), options);
	}

	/**
	 * Returns a structure to close the keyboard
	 * @param options - Options included in ReplyKeyboardRemove
	 * @see https://core.telegram.org/bots/api#replykeyboardremove
	 */

	close(options: RMSelective = {}): SendMessageOptions {
		this.setKeyboardType("remove_keyboard");
		this._override = true;

		return Object.assign(this.build(), options);
	}
}
