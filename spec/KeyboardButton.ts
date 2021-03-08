import { KeyboardButton } from "../lib"

describe("KeyboardButton", () => {
	it("Should throw error when a non-object is passed as options", () => {
		// @ts-expect-error
		expect(() => new KeyboardButton("My Text", "Open to errors"))
			.toThrow(new TypeError("Cannot accept a non-object as 'options' value"));
	});

	it("Should return a valid object when no options are provided", () => {
		const button = new KeyboardButton("My first button");

		expect(button.toJSON()).toEqual({
			text: "My first button",
		});
	});

	it("Should return a valid object with only text when falsy options or empty object are provided", () => {
		const button1 = new KeyboardButton("My first button", {});
		const button2 = new KeyboardButton("My second button", null);
		const button3 = new KeyboardButton("My third button", undefined);

		expect(button1.toJSON()).toEqual({
			text: "My first button",
		});

		expect(button2.toJSON()).toEqual({
			text: "My second button",
		});

		expect(button3.toJSON()).toEqual({
			text: "My third button",
		});
	});

	it("Should return text with options when options are passed", () => {
		const button = new KeyboardButton("My second button", {
			request_contact: true,
			request_location: false,
			request_poll: {
				type: "quiz"
			}
		});

		expect(button.toJSON()).toEqual({
			text: "My second button",
			request_contact: true,
			request_location: false,
			request_poll: {
				type: "quiz"
			}
		});
	});

	it("[STRICT-MODE] Should throw when props get edited", () => {
		const button = new KeyboardButton("My first button");

		expect(() => {
			'use strict';

			// @ts-expect-error
			button.text = "Another text";
		}).toThrow();
	});
});
