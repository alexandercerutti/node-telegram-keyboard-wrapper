import InlineKeyboardButton from "./InlineKeyboardButton";
import Row from "./Row";

export default class InlineKeyboard<T extends InlineKeyboardButton> extends Array<Row<T>> {
	/**
	 * Composes Markup for InlineKeyboardMarkup
	 * @see https://core.telegram.org/bots/api#inlinekeyboardmarkup
	 */

	getMarkup() {
		if (!this.length) {
			throw new Error("No rows added to keyboard.");
		}

		return {
			keyboard: Array.prototype.map.call(this, (row: Row<T>) => row.toJSON())
		};
	}
}
