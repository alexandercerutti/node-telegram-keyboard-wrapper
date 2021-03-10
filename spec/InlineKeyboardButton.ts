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

		expect(button.getJSON()).toEqual({
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

	it("Should be cloned correctly", () => {
		const button1 = new InlineKeyboardButton("My Button", "url", "https://localhost:8080");
		const button2 = new InlineKeyboardButton("My Button 2 With Login Payload", "login_url", { url: "https://localhost:8081", bot_username: "@bot_father", forward_text: "No" });

		const clone1 = button1.clone();
		const clone2 = button2.clone();

		expect(clone1).not.toBe(button1);
		expect(clone1.text).toBe(button1.text);
		expect(clone1.exclusiveKey).toBe(button1.exclusiveKey);
		expect(clone1.exclusiveValue).toBe(clone1.exclusiveValue);

		expect(clone2).not.toBe(button2);
		expect(clone2.text).toBe(button2.text);
		expect(clone2.exclusiveKey).toBe(button2.exclusiveKey);
		expect(clone2.exclusiveValue).not.toBe(button2.exclusiveValue);
		expect(clone2.exclusiveValue).toEqual(clone2.exclusiveValue);
	});
});
