import InlineKeyboardButton from "./InlineKeyboardButton";
import KeyboardButton from "./KeyboardButton";

type RowTypes = InlineKeyboardButton | KeyboardButton;

export default class Row<R extends RowTypes> extends Array<R> {
	toJSON() {
		return this.map
			.call(this, (element: RowTypes) => element.toJSON());
	}
}
