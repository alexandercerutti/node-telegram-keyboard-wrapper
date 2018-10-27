import * as deprecate from "deprecate";
import { InlineKeyboardButton, KeyboardButton, SendMessageOptions } from "node-telegram-bot-api";
import { KeyboardType, ReplyOpts } from "./model";

export class ReplyMarkup {
	_type: KeyboardType;
	_content: (InlineKeyboardButton | KeyboardButton | string)[][] = [];
	_override?: any = null;

	constructor(keyboardType?: KeyboardType) {
		this._type = keyboardType;
	}

	export(options = {}, override = "") {
		deprecate("Using export() to get keyboard structure is deprecated. Please use build()");
		let exportedStructure = {
			reply_markup: {
				[this._type]: override || this._content,
			}
		}

		if (typeof options === "object" && !(options instanceof Array) && Object.keys(options).length > 0) {
			exportedStructure["reply_markup"] = Object.assign(exportedStructure.reply_markup, options);
		}

		return exportedStructure;
	}

	extract() {
		if (arguments.length == 1) {
			deprecate("'from' argument in extract is deprecated and will not affect execution");
		}

		return this.build().reply_markup;
	}

	build(): SendMessageOptions {
		return <ReplyOpts>{
			reply_markup: {
				[this._type]: this._override || this._content
			}
		};
	}
}

export class VisualKeyboard extends ReplyMarkup {
	constructor(type?: KeyboardType) {
		super(type);
	}

	/**
	 * Pushes a set of elements to content pool
	 * @param rowsElements - InlineKeyboardButton elements to be pushed
	 */

	addRow(...rowsElements: InlineKeyboardButton[] | KeyboardButton[] | string[]): this {
		this._content.push([...rowsElements]);

		return this;
	}

	/**
	 * Returns keyboard rows length
	 */

	get length(): number {
		return this._content.length;
	}

	/**
	 * Returns specific row length
	 * @param index - row index. If higher than pool length,
	 * it will start from 0; if lower than 0, it will start from pool length - index.
	 */

	rowLength(index: number): number {
		let position = outOfBoundsInverter(index, this._content.length);
		return this._content[position].length;
	}

	/**
	 * Sets the keyboard type for this visual. Created for ReplyKeyboards
	 * @param type - Must be one of `inline_keyboard`, `keyboard`, `remove_keyboard` or `force_reply`.
	 */

	setKeyboardType(type: KeyboardType) {
		this._type = type;
	}

	/**
	 * Pushes an element into specific row in the pool
	 * @param index - row index. If higher than pool length,
	 * it will start from 0; if lower than 0, it will start from pool length - index.
	 * @param elements - array of elements
	 * @returns Length of the current row
	 */

	push(index: number, ...elements: (InlineKeyboardButton | KeyboardButton)[]): number {
		let position = outOfBoundsInverter(index, this._content.length);
		this._content[position].push(...elements);

		return this._content[position].length;
	}

	/**
	 * Pulls out the last element of a specific row
	 * @param index - row index. If higher than pool length,
	 * it will start from 0; if lower than 0, it will start from pool length - index.
	 * @returns The popped out element
	 */

	pop(index: number): InlineKeyboardButton | KeyboardButton | string {
		let position = outOfBoundsInverter(index, this._content.length);
		return this._content[position].pop();
	}

	/**
	 * Pulls out the last row of the pool.
	 * @returns {(InlineKeyboardButton | KeyboardButton)[]} The popped out row
	 */

	popRow(): (InlineKeyboardButton | KeyboardButton | string)[] {
		return this._content.pop();
	}

	/**
	 * Cleans up the whole row content.
	 * @param index - row index. If higher than pool length,
	 * it will start from 0; if lower than 0, it will start from pool length - index.
	 * @returns {number} the emptied row index (since it might have changed)
	 */

	emptyRow(index: number): number {
		let position = outOfBoundsInverter(index, this._content.length);
		this._content[position] = [];
		return index;
	}

	/**
	 * Removed the whole row from the pool.
	 * @param index - row index. If higher than pool length,
	 * it will start from 0; if lower than 0, it will start from pool length - index.
	 * @returns this
	 */

	removeRow(index: number): ThisType<VisualKeyboard> {
		let position = outOfBoundsInverter(index, this._content.length);
		this._content.splice(position);
		return this;
	}

	/**
	 * Resets the whole keyboard.
	 */

	reset() {
		this._content = [];
	}
}

/**
 * Checks and correct a value based on a bound value.
 * @param value - value to be checked
 * @param bound - limit value (e.g. array length)
 * @returns {number} corrected value
 */

function outOfBoundsInverter(value: number, bound: number): number {
	if (value < 0) {
		// e.g. value is -1, bound is 10 => 9
		return bound + value;
	}

	if (value >= bound) {
		// e.g. value is 11, bound is 10 => 1
		return value - bound;
	}

	return value;
}
