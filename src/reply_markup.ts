import * as deprecate from "deprecate";
import { InlineKeyboardButton, KeyboardButton, SendMessageOptions, InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove, ForceReply } from "node-telegram-bot-api";
import { KeyboardType, ReplyOpts } from "./model";

export class ReplyMarkup {
	protected _type: KeyboardType;
	protected _content: (InlineKeyboardButton | KeyboardButton | string)[][] = [];
	protected _override?: any = null;

	constructor(keyboardType?: KeyboardType) {
		this._type = keyboardType;
	}

	/**
	 * [DEPRECATED - use `build()`] Export the structure with reply_markup
	 * @param options
	 * @param override
	 */

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

	/**
	 * Extracts reply_markup object from build.
	 * Useful in case of editMessageReplyMarkup usage in
	 * node-telegram-bot-api
	 */

	extract(): InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply {
		if (arguments.length == 1) {
			deprecate("'from' argument in extract is deprecated and will not affect execution");
		}

		return this.build().reply_markup;
	}

	/**
	 * Returns the structure containing reply_markup and the generated keyboard
	 */

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
	 * Returns the amount of keyboard rows
	 */

	get length(): number {
		return this._content.length;
	}

	/**
	 * Returns specific row length
	 * @param index - row index. If higher than pool length,
	 * it will start from 0; if lower than 0, it will start from pool length - index.
	 */

	rowLength(index: number, ignoreLastRow: boolean = false): number {
		if (ignoreLastRow) {
			deprecate("ignoreLastRow usage in rowLength is deprecated and won't affect execution.");
		}

		let position = outOfBoundsInverter(index, this._content.length);
		return this._content[position].length;
	}

	/**
	 * Sets the keyboard type for this visual. Created for ReplyKeyboards
	 * @param type - Must be one of `inline_keyboard`, `keyboard`, `remove_keyboard` or `force_reply`.
	 */

	setKeyboardType(type: KeyboardType): void {
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
		deprecate("Push method does not return `this` anymore. Unexpected behaviour may happen.");

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
		this._content.splice(position, 1);
		return this;
	}

	/**
	 * Resets the whole keyboard.
	 */

	reset(): void {
		this._content = [];
	}
}

/**
 * Checks and correct a value based on a bound value.
 * @param value - value to be checked
 * @param bound - limit value (e.g. array length)
 * @returns {number} corrected value
 * @example (value: -4, bound: 0) => 0
 * @example (value: 9, bound: 0) => 0
 * @example (value: 5, bound: 4) => 1
 * @example (value: 4, bound: 4) => 0
 */

function outOfBoundsInverter(value: number, bound: number): number {
	if (bound <= 0 && (value < 0 || value > bound)) {
		return 0;
	}

	if (value < 0) {
		let abs = Math.abs(value);
		if (abs <= bound) {
			return bound - abs;
		}

		if (abs >= bound) {
			return abs % bound;
		}
	}

	if (value >= bound) {
		// e.g. (value: 11, bound: 10) => 1
		// e.g. (value: 6, bound 3) => 0
		return value % bound;
	}

	return value;
}
