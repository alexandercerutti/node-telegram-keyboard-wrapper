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
 * @params {!Integer} index - the index to be validated
 * @returns {Integer} - validated row index
 */

function validateRow(index) {
	if (index < 0 || index > this.keyboard.length-1) {
		return Math.abs(index % this.keyboard.length);
	}
	return index;
}

/**
 * Validates the propeties in an object 
 * To be called inside an object, via .call
 *
 * @function validateProperties
 * @params {!propertyList[]} - list of properties to be validated
 * @returns {Array} - validated options
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
		this.keyboard = [];
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

	export(override) {
		return {
			reply_markup: Object.assign({
				[this.type]: override || this.keyboard,
			})
		};
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
			console.error("'reply_markup' not found as property of Object 'from'.");
		}

		return ("reply_markup" in from) ? from["reply_markup"][this.type] : {};
	}
}

/**
 * Basic class for every inline keyboard
 *
 * @class InlineKeyboard
 * @classdesc main class containing inline keyboards creation
 * @params {Object} oneElement - one Telegram Inline Keyboard button to insert in the first line
 * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
 */

class InlineKeyboard extends ReplyMarkup {

	constructor(oneElement) {
		super();
		if (oneElement && typeof oneElement === "object" && "text" in oneElement) {
			this.keyboard.push([oneElement]);
		}

		this.type = "inline_keyboard";
	}


	/**
	 * Adds a new row to the keyboard. Accepts all the keys to be pushed in that row.
	 *
	 * @member addRow
	 * @param {...Object} keys - Telegram's Inline Keyboard buttons
	 * @see https://core.telegram.org/bots/api#inlinekeyboardbutton
	 * @returns {Object} - new object with InlineKeyboard as prototype to allow methods concatenation and get this row length
	 */

	addRow(...keys) {
		this.keyboard.push([]);
		keys.forEach((key, index) => {
			if ("text" in key) {
				this.keyboard[this.keyboard.length-1].push(key);
			}
		});
		return Object.create(this, {
			length: {
				configurable: false,
				get: function() { return this.keyboard.length }
			}
		});
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

		this.keyboard.splice(index, 1);
		return Object.create(this, {
			length: {
				configurable: false,
				get: function() { return this.keyboard.length }
			}
		});
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

		this.keyboard[index] = [];
		return Object.create(this, {
			lastRow: {
				configurable: false,
				value: index,
			},
			length: {
				configurable: false,
				get: function() { return this.keyboard.length }
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
		this.keyboard.pop();
		return Object.create(this, {
			length: {
				configurable: false,
				get: function() { return this.keyboard.length }
			}
		});
	}

	/**
	 * Retrieves a row length
	 *
	 * @member rowLength
	 * @param {number} rowIndex - index of the target row (starts from the end of keyboard if lower than 0)
	 * @returns {number} - target row's length
	 */

	rowLength(rowIndex, ignoreLastRow = true) {
		let index = (!ignoreLastRow && this.lastRow) ? this.lastRow : validateRow.call(this, rowIndex);

		return this.keyboard[index].length;
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
		let index = (!ignoreLastRow && this.lastRow) ? this.lastRow : validateRow.call(this, rowIndex);

		if (Array.isArray(element)) {
			throw TypeError("Misusage: cannot add an array of elements to the keyboard.")
		}

		this.keyboard[index].push(element);
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
		let index = validateRow.call(this, rowIndex)

		this.keyboard[index].pop();
		return this;
	}

	get length() {
		return this.keyboard.length;
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
		this.keys = [];
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
		this.keyboard.push([]);
		keys.forEach((key) => {
			this.keyboard[this.keyboard.length-1].push(key);
			this.keys.push(key);
		});

		return Object.create(this, {
			length: {
				configurable: false,
				get: function() { return this.keyboard.length }
			}
		});
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
		this.type = "keyboard";

		const validatedOptions = validateProperties.call(options, ["selective", "one_time_keyboard", "resize_keyboard"]);

		return Object.assign(this.export(), validatedOptions);
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
		this.type = "remove_keyboard";

		const validatedOptions = validateProperties.call(options, ["selective"]);

		return Object.assign(this.export(true), options);
	}

	get getKeys() {
		return this.keys;
	}
}

module.exports = {
	InlineKeyboard,
	ReplyKeyboard
};
