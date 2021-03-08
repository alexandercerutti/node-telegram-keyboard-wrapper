import { InlineKeyboardButton } from "../lib"

describe("InlineKeyboardButton", () => {
	it("Should throw error when an exclusiveKey or an exclusiveValue are not passed", () => {
		const errorMessage = "Missing exclusiveKey or exclusiveValue. Creating an InlineKeyboardButton requires one of the mandatory values among optional values. For more refer to: https://core.telegram.org/bots/api#inlinekeyboardbutton";

		expect(() => new InlineKeyboardButton("My Text", undefined, "ablabla"))
			.toThrow(new TypeError(errorMessage));

		expect(() => new InlineKeyboardButton("My Text", "callback_data", null))
			.toThrow(new TypeError(errorMessage));
	});

	it("Should return a valid object when all arguments are correct ", () => {
		const button = new InlineKeyboardButton("My first button", "url", "https://localhost:8080/");

		expect(button.toJSON()).toEqual({
			text: "My first button",
			url: "https://localhost:8080/"
		});
	});

	it("[STRICT-MODE] Should throw when props get edited", () => {
		const button = new InlineKeyboardButton("My first button", "url", "https://localhost:8080/");

		expect(() => {
			'use strict';

			// @ts-expect-error
			button.text = "Another text";
		}).toThrow();
	});
});
