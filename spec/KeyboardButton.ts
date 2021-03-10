import { KeyboardButton } from "../lib"

describe("KeyboardButton", () => {
	it("Should throw error when a non-object is passed as options", () => {
		// @ts-expect-error
		expect(() => new KeyboardButton("My Text", "Open to errors"))
			.toThrow(new TypeError("Cannot accept a non-object as 'options' value"));
	});

	it("Should return a valid object when no options are provided", () => {
		const button = new KeyboardButton("My first button");

		expect(button.getJSON()).toEqual({
			text: "My first button",
		});
	});

	it("Should return a valid object with only text when falsy options or empty object are provided", () => {
		const button1 = new KeyboardButton("My first button", {});
		const button2 = new KeyboardButton("My second button", null);
		const button3 = new KeyboardButton("My third button", undefined);

		expect(button1.getJSON()).toEqual({
			text: "My first button",
		});

		expect(button2.getJSON()).toEqual({
			text: "My second button",
		});

		expect(button3.getJSON()).toEqual({
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

		expect(button.getJSON()).toEqual({
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

	it("Should be cloned correctly", () => {
		const button1 = new KeyboardButton("My Button");
		const button2 = new KeyboardButton("My Button 2 With Payload", { request_contact: true, request_location: false });

		const clone1 = button1.clone();
		const clone2 = button2.clone();

		expect(clone1).not.toBe(button1);
		expect(clone1.text).toBe(button1.text);

		expect(clone2).not.toBe(button2);
		expect(clone2.text).toBe(button2.text);
		expect(clone2.options).toEqual(button2.options);
		expect(clone2.options).not.toBe(button2.options);
	});
});
