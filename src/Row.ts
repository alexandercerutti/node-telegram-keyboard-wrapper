import InlineKeyboardButton from "./InlineKeyboardButton";
import KeyboardButton from "./KeyboardButton";

type RowTypes = InlineKeyboardButton | KeyboardButton;

export default class Row<R extends RowTypes> extends Array<R> {
	public clone() {
		const mappedButtons = this.map((element: R) => element.clone()) as R[];
		return new Row(...mappedButtons);
	}

	public getJSON() {
		return this.map((element: RowTypes) => element.getJSON());
	}
}
