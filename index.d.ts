import { ForceReply as ntbaForceReply, InlineKeyboardButton, KeyboardButton, ReplyKeyboardMarkup, InlineKeyboardMarkup, ReplyKeyboardRemove, SendMessageOptions, SendBasicOptions } from "node-telegram-bot-api";

declare module "node-telegram-keyboard-wrapper" {
	export type KeyboardType = "inline_keyboard" | "keyboard" | "remove_keyboard" | "force_reply";

	interface ReplyOpts extends SendMessageOptions {
		reply_markup: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ntbaForceReply
	}

	interface RMSelective {
		selective?: boolean
	}

	interface RKOpenOptions extends RMSelective {
		one_time_keyboard?: boolean,
		resize_keyboard?: boolean
	}

	class ReplyKeyboard extends VisualKeyboard {
		constructor(oneKey?: KeyboardButton);

		/**
		 * Returns a structure to open a keyboard
		 * @param options - Options included in ReplyKeyboardMarkup
		 * @see https://core.telegram.org/bots/api#replykeyboardmarkup
		 */

		open(options?: RKOpenOptions): SendMessageOptions;

		/**
		 * Returns a structure to close the keyboard
		 * @param options - Options included in ReplyKeyboardRemove
		 * @see https://core.telegram.org/bots/api#replykeyboardremove
		 */

		close(options?: RMSelective): SendMessageOptions
	}

	class InlineKeyboard extends VisualKeyboard {
		constructor(oneKey?: InlineKeyboardButton);
	}

	class ForceReply extends ReplyMarkup {
		constructor(options?: RMSelective);

		build(): SendMessageOptions;
	}

	class VisualKeyboard extends ReplyMarkup {
		constructor(type?: KeyboardType);

		/**
		 * Pushes a set of elements to content pool
		 * @param rowsElements - InlineKeyboardButton elements to be pushed
		 */

		addRow(...rowsElements: InlineKeyboardButton[] | KeyboardButton[] | string[]): this;

		/**
		 * Returns the amount of keyboard rows
		 */

		length(): number;

		/**
		 * Returns specific row length
		 * @param index - row index. If higher than pool length,
		 * it will start from 0; if lower than 0, it will start from pool length - index.
		 */

		rowLength(index: number, ignoreLastRow?: boolean): number;

		/**
		 * Sets the keyboard type for this visual. Created for ReplyKeyboards
		 * @param type - Must be one of `inline_keyboard`, `keyboard`, `remove_keyboard` or `force_reply`.
		 */

		setKeyboardType(type: KeyboardType): void;

		/**
		 * Pushes an element into specific row in the pool
		 * @param index - row index. If higher than pool length,
		 * it will start from 0; if lower than 0, it will start from pool length - index.
		 * @param elements - array of elements
		 * @returns Length of the current row
		 */

		push(index: number, ...elements: (InlineKeyboardButton | KeyboardButton)[]): number;

		/**
		 * Pulls out the last element of a specific row
		 * @param index - row index. If higher than pool length,
		 * it will start from 0; if lower than 0, it will start from pool length - index.
		 * @returns The popped out element
		 */

		pop(index: number): InlineKeyboardButton | KeyboardButton | string;

		/**
		 * Pulls out the last row of the pool.
		 * @returns {(InlineKeyboardButton | KeyboardButton)[]} The popped out row
		 */

		popRow(): (InlineKeyboardButton | KeyboardButton | string)[];

		/**
		 * Cleans up the whole row content.
		 * @param index - row index. If higher than pool length,
		 * it will start from 0; if lower than 0, it will start from pool length - index.
		 * @returns {number} the emptied row index (since it might have changed)
		 */

		emptyRow(index: number): number;

		/**
		 * Removed the whole row from the pool.
		 * @param index - row index. If higher than pool length,
		 * it will start from 0; if lower than 0, it will start from pool length - index.
		 * @returns this
		 */

		removeRow(index: number): ThisType<VisualKeyboard>;

		/**
		 * Resets the whole keyboard.
		 */

		reset(): void;
	}

	class ReplyMarkup {
		protected _type: KeyboardType;
		protected _content: (InlineKeyboardButton | KeyboardButton | string)[][];
		protected _override?: any;

		constructor(keyboardType?: KeyboardType);

		/**
		 * Extracts reply_markup object from build.
		 * Useful in case of editMessageReplyMarkup usage in
		 * node-telegram-bot-api
		 */

		extract(): InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;

		/**
		 * Returns the structure containing reply_markup and the generated keyboard
		 */

		build(): SendMessageOptions;
	}
}
