import { InlineKeyboard, InlineKeyboardButton, Row } from "../lib"

describe("InlineKeyboard", () => {
	let keyboard: InlineKeyboard;

	beforeEach(() => {
		keyboard = new InlineKeyboard();
	});

	it("Should throw error when exporting is attempted without rows", () => {
		expect(() => keyboard.getMarkup()).toThrow(new Error("No rows added to keyboard."));
	});

	it("Should return an array of rows with elements inside", () => {
		const row1 = new Row<InlineKeyboardButton>();

		row1.push(
			new InlineKeyboardButton("My first button", "url", "https://localhost:8080/"),
			new InlineKeyboardButton("My second button", "callback_data", "whatever_id_you_want")
		);

		const row2 = new Row<InlineKeyboardButton>();

		row2.push(
			new InlineKeyboardButton("My third button", "url", "https://localhost:8080/"),
			new InlineKeyboardButton("My fourth button", "callback_data", "whatever_id_you_want")
		);

		keyboard.push(row1, row2);

		expect(keyboard.getMarkup()).toEqual({
			inline_keyboard: [
				[
					{
						text: "My first button",
						url: "https://localhost:8080/"
					}, {
						text: "My second button",
						callback_data: "whatever_id_you_want",
					}
				],
				[
					{
						text: "My third button",
						url: "https://localhost:8080/"
					}, {
						text: "My fourth button",
						callback_data: "whatever_id_you_want",
					}
				]
			]
		});
	});
});
