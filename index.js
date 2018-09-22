/**
 * Telegram keyboard wrapper
 * A wrapper to manage in an easy way Telegram Reply and Inline Keyboards.
 *
 * Created by Alexander P. Cerutti, 2018
 */

/**
 * Returns a valid index if it is out-of-bounds
 * To be called inside the class, via .call
 *
 * @function validateRow
 * @params {!number} index - the index to be validated
 * @returns {number} - validated row index
 */

function validateRow(index) {
	if (index === null || index === undefined || typeof index !== "number") {
		throw new Error("Cannot evaluate a row without valid index.");
	}

	if (index < 0 || index > this._keyboard.length-1) {
		return Math.abs(index % this._keyboard.length);
	}

	return index;
}

/**
 * Checks if options in propertyList are available in passed context
 * and are booleans. Sets them to false otherwise.
 *
 * @function validateProperties
 * @params {String[]} [propertyList=[]] - list of properties to be validated
 * @returns {Object} - validated options
 */

function validateProperties(propertyList = []) {
	let validated = JSON.parse(JSON.stringify(this));
	propertyList.forEach(p => {
		if (p in this && typeof this[p] !== "boolean") {
			validated[p] = false;
		}
	});

	return validated;
}

class ReplyMarkup {
	constructor() {
		this._keyboard = [];
		this._lastRow = -1;
		this._type = "";
	}

	/**
	 * Returns a reply_markup object
	 *
	 * @function export
	 * @memberof ReplyMarkup
	 * @params {Any} override - a value to be replaced to the keyboard content
	 * @returns {Object} - reply_markup
	 * @see https://core.telegram.org/bots/api#sendmessage
	 */

	export(options = {}, override = "") {
		let exportedStructure = {
			reply_markup: {
				[this._type]: override || this._keyboard,
			}
		}

		if (typeof options === "object" && !(options instanceof Array) && Object.keys(options).length > 0) {
			exportedStructure["reply_markup"] = Object.assign(exportedStructure.reply_markup, options);
		}

		return exportedStructure;
	}

	/**
	 * Returns an object containing the property with the content or the content itself,
	 * depending on its argument.
	 *
	 * @function extract
	 * @memberof ReplyMarkup
	 * @params {!string} level - the deep of extraction of the values
	 * @returns {<Object|Object[][]>} - Object containing the keyboard content or the keyboard content itself
	 * @see https://core.telegram.org/bots/api#inlinekeyboardmarkup
	 */

	extract(from) {
		if (!from["reply_markup"]) {
			throw new Error("'reply_markup' not found as property");
		}

		return from["reply_markup"][this._type];
	}

	get length() {
		return this._keyboard.length;
	}
}

/**
 * Basic class for every inline keyboard
 *
 * @class InlineKeyboard
 * @classdesc main class containing inline keyboards creation
 * @params {Object} oneKey - one Telegram Inline Keyboard button to insert in the first line
 * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
 */

class InlineKeyboard extends ReplyMarkup {

	constructor(oneKey) {
		super();
		if (oneKey && typeof oneKey === "object" && "text" in oneKey) {
			this.addRow(oneKey);
		}

		this._type = "inline_keyboard";
	}

	/**
	 * Adds a new row to the keyboard. Accepts all the keys to be pushed in that row.
	 *
	 * @member addRow
	 * @param {Object[]} keys - Telegram's Inline Keyboard buttons
	 * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
	 * @returns {Object} - new object with InlineKeyboard as prototype to allow methods concatenation and get this row length
	 */

	addRow(...keys) {
		this._keyboard.push([]);
		keys.forEach((key, index) => {
			if ("text" in key) {
				this._keyboard[this._keyboard.length-1].push(key);
			}
		});

		return this;
	}

	/**
	 * Removes a row from the keyboard
	 *
	 * @member removeRow
	 * @param {number} rowIndex - index of the row to be removed (starts from opposite if out-of-bounds)
	 * @returns {Object} - new object with InlineKeyboard as prototype to allow methods concatenation and the length of this row
	 */

	removeRow(rowIndex) {
		let index = validateRow.call(this, rowIndex);

		this._keyboard.splice(index, 1);
		return this;
	}

	/**
	 * Removes row content
	 *
	 * @member emptyRow
	 * @param {number} rowIndex - index of the row to be emptied (starts from opposite if out-of-bounds)
	 * @returns {Object} - InlineKeyboard
	 */

	emptyRow(rowIndex) {
		let index = validateRow.call(this, rowIndex);

		this._keyboard[index] = [];

		return Object.create(this, {
			lastRow: {
				configurable: false,
				value: index,
			}
		});
	}

	/**
	 * Pops out the last row
	 *
	 * @member popRow
	 * @returns {Object} - new object with InlineKeyboard as prototype to allow methods concatenation and the length of this row
	 */

	popRow() {
		this._keyboard.pop();
		return this;
	}

	/**
	 * Retrieves a row length
	 *
	 * @member rowLength
	 * @param {number} rowIndex - index of the target row (starts from the end of keyboard if lower than 0)
	 * @params {boolean} ignoreLastRow - selected last row on false, excludes it otherwise
	 * @returns {number} - target row's length
	 */

	rowLength(rowIndex, ignoreLastRow = true) {
		let index = (ignoreLastRow || this._lastRow < 0)
			? validateRow.call(this, rowIndex)
			: this._lastRow;

		return this._keyboard[index].length;
	}

	/**
	 * Pushes a new button to a specific row.
	 *
	 * @member push
	 * @param {number} rowIndex - row into which the button will be added; starts from opposite if out-of-bounds
	 * @param {Object} element - element to be added
	 * @returns {Object} - InlineKeyboard
	 */

	push(rowIndex, element, ignoreLastRow = true) {
		let index = (ignoreLastRow || this.lastRow < 0)
			? validateRow.call(this, rowIndex)
			: this.lastRow;

		if (Array.isArray(element)) {
			throw TypeError("Misusage: cannot add an array of elements to the specified row.")
		}

		this._keyboard[index].push(element);
		return this;
	}

	/**
	 * Removes last element of a row
	 *
	 * @member pop
	 * @param {number} rowIndex - index of the target row (starts from opposite if out-of-bounds)
	 * @returns {Object} - InlineKeyboard
	 */

	pop(rowIndex) {
		let index = validateRow.call(this, rowIndex);
		this._keyboard[index].pop();

		return this;
	}
}

/**
 * Basic class for every Reply Keyboard
 *
 * @class Keyboard
 * @classdesc main class containing reply keyboards creation
 */

class ReplyKeyboard extends ReplyMarkup {

	constructor(...keys) {
		super();
		this._keys = [];

		if (keys && keys.length) {
			this.addRow(keys);
		}
	}

	/**
	 * Adds values in parameters as new keys of the keyboard
	 *
	 * @member addRow
	 * @param {...Object} keys - Telegram Keys texts
	 * @returns {Object} - The class (for concatenation)
	 */

	addRow(...keys) {
		this._keyboard.push([]);

		keys.forEach((key) => {
			this._keyboard[this._keyboard.length-1].push(key);
			this._keys.push(key);
		});

		return this;
	}

	/**
	 * Creates a new reply keyboard
	 *
	 * @member open
	 * @param {Object} options
	 * @param {Bool} options.selective
	 * @returns {Object} - reply markup object
	 * @see https://core.telegram.org/bots/api#replykeyboardmarkup
	 */

	open(options = { selective: false, one_time_keyboard: false, resize_keyboard: false }) {
		this._type = "keyboard";

		let boolKeys = ["selective", "one_time_keyboard", "resize_keyboard"];

		// Checking if passed properties exists and are booleans or sets them to false.
		const validatedOptions = validateProperties.call(options, boolKeys);

		return this.export(validatedOptions);
	}

	/**
	 * Closes the opened reply keyboard
	 *
	 * @member close
	 * @param {Object} options
	 * @param {Bool} options.selective
	 * @returns {Object} - reply markup object
	 * @see https://core.telegram.org/bots/api#replykeyboardremove
	 */

	close(options = { selective : false }) {
		this._type = "remove_keyboard";

		// Checking if passed properties exists and are booleans or sets them to false.
		const validatedOptions = validateProperties.call(options, ["selective"]);

		return this.export(validatedOptions, true);
	}

	get getKeys() {
		return this._keys;
	}
}

/**
 * Basic class for every Force Reply
 *
 * @class Keyboard
 * @classdesc main class containing reply keyboards creation
 */

class ForceReply extends ReplyMarkup {
	constructor() {
		super();
		this._type = "force_reply";
	}

	/**
	 * Exports the structure for forceReply
	 *
	 * @member export
	 * @param {Object} options
	 * @param {Bool} options.selective
	 * @returns {Object} - reply_markup object
	 * @see https://core.telegram.org/bots/api#forcereply
	 */

	export(options = { selective: false }) {
		// Checking if passed properties exists and are booleans or sets them to false.
		const validatedOptions = validateProperties.call(options, ["selective"]);

		return super.export(validatedOptions, true);
	}
}

module.exports = {
	InlineKeyboard,
	ReplyKeyboard,
	ForceReply,
};
