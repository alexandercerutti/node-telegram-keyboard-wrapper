import { ReplyKeyboard, KeyboardButton, Row } from "../lib"

describe("ReplyKeyboard", () => {
	let keyboard: ReplyKeyboard;

	beforeEach(() => {
		keyboard = new ReplyKeyboard();
	});

	it("Should throw error when exporting is attempted without rows", () => {
		expect(() => keyboard.getMarkup()).toThrow(new Error("No rows added to keyboard."));
	});

	it("Should return an array of rows with elements inside", () => {
		const row1 = new Row<KeyboardButton>();

		row1.push(
			new KeyboardButton("My first button"),
			new KeyboardButton("My second button"),
		);

		const row2 = new Row<KeyboardButton>();

		row2.push(
			new KeyboardButton("My third button", {
				request_contact: true,
				request_location: false
			}),
			new KeyboardButton("My fourth button", {
				request_poll: {
					type: "quiz"
				}
			})
		);

		keyboard.push(row1, row2);

		expect(keyboard.getMarkup()).toEqual({
			keyboard: [
				[
					{
						text: "My first button",
					}, {
						text: "My second button",
					}
				],
				[
					{
						text: "My third button",
						request_contact: true,
						request_location: false
					}, {
						text: "My fourth button",
						request_poll: {
							type: "quiz"
						}
					}
				]
			]
		});
	});
});
