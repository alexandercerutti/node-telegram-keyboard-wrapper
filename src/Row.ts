import type InlineKeyboardButton from "./InlineKeyboardButton";
import type KeyboardButton from "./KeyboardButton";

type RowButtonsTypes = InlineKeyboardButton | KeyboardButton;

/**
 * To allow InlineKeyboardButton to have a type relation between
 * `exclusiveKey` and `exclusiveValue`, we needed to equip it with
 * a Generic. However, this creates a problem with Row that clashes
 * with Typescript limits.
 *
 * `R` can be any subtype of `InlineKeyboardButton | KeyboardButton`,
 * so like `InlineKeyboardButton<"pay">`.
 *
 * If Row is **NOT** equipped with a generic "R" on instance creation
 * (like `new Row<InlineKeyboardButton>()`), and the first button is
 * e.g. of type `InlineKeyboardButton<"pay">`, Row will automatically
 * assume to be a `Row<InlineKeyboardButton<"pay">>`, requiring so
 * all the buttons (objects) in it to be of the same type, and
 * disallowing other buttons of the same "supertype"
 * (InlineKeyboardButton), like `InlineKeyboardButton<"callback_data">`.
 *
 * Typescript seems doesn't provide a way to say that a Generic should
 * be of a supertype
 * (like, `InlineKeyboardButton` instead of `InlineKeyboardButton<"pay">`)
 */

export default class Row<R extends RowButtonsTypes> extends Array<R> {
	public clone(): Row<R> {
		const mappedButtons = this.map((element) => element.clone()) as R[];
		return new Row<R>(...mappedButtons);
	}

	public getJSON() {
		return this.map((element) => element.getJSON());
	}
}
