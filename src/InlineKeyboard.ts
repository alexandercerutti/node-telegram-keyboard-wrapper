import InlineKeyboardButton from "./InlineKeyboardButton";
import Row from "./Row";

export default class InlineKeyboard extends Array<Row<InlineKeyboardButton>> {
	/**
	 * Composes Markup for InlineKeyboardMarkup
	 * @see https://core.telegram.org/bots/api#inlinekeyboardmarkup
	 */

	getMarkup() {
		if (!this.length) {
			throw new Error("No rows added to keyboard.");
		}

		return {
			inline_keyboard: this.map((row) => row.getJSON())
		};
	}

	/**
	 * Clones recursively the whole keyboard and returns
	 * a new image of the keyboard.
	 */

	clone() {
		return new InlineKeyboard(
			...this.map(row => row.clone())
		);
	}
}
