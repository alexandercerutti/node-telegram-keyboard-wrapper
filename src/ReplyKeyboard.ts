import KeyboardButton from "./KeyboardButton";
import Row from "./Row";

interface ReplyKeyboardMarkupOptions {
	keyboard: Array<Array<KeyboardButton>>;
	resize_keyboard?: boolean;
	one_time_keyboard?: boolean;
	selective?: boolean;
}

export default class ReplyKeyboard extends Array<Row<KeyboardButton>> {
	/**
	 * Composes Markup for ReplyKeyboardMarkup
	 * @see https://core.telegram.org/bots/api#replykeyboardmarkup
	 *
	 * @param options
	 */

	public getMarkup(
		options: Omit<ReplyKeyboardMarkupOptions, "keyboard"> = {},
	): ReplyKeyboardMarkupOptions {
		if (!this.length) {
			throw new Error("No rows added to keyboard.");
		}

		const keyboard = this.map((row) => row.getJSON() as KeyboardButton[]);

		return {
			...options,
			keyboard,
		};
	}

	/**
	 * Composes Markup for ReplyKeyboardRemove
	 * @see https://core.telegram.org/bots/api#replykeyboardremove
	 *
	 * @param selective
	 */

	public remove(selective: boolean = false) {
		return {
			remove_keyboard: true,
			selective,
		};
	}

	/**
	 * Clones recursively the whole keyboard and returns
	 * a new image of the keyboard.
	 */

	public clone() {
		return new ReplyKeyboard(...this.map((row) => row.clone()));
	}
}
