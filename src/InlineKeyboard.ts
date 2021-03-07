import { InlineKeyboardButton } from ".";
import Row from "./Row";

export default class InlineKeyboard<T extends InlineKeyboardButton> extends Array<Row<T>> {
	get() {
		if (!this.length) {
			throw new Error("No rows added to keyboard.");
		}

		return {
			keyboard: Array.prototype.map.call(this, (row: Row<T>) => row.toJSON())
		};
	}
}
