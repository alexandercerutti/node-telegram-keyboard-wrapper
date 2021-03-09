import InlineKeyboardButton from "./InlineKeyboardButton";
import KeyboardButton from "./KeyboardButton";

type RowTypes = InlineKeyboardButton | KeyboardButton;

export default class Row<R extends RowTypes> extends Array<R> {
	getJSON() {
		return this.map
			.call(this, (element: RowTypes) => element.getJSON());
	}
}
