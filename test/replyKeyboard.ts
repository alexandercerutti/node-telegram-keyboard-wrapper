import { ReplyKeyboard } from "..";
import * as assert from "assert";
import { describe, beforeEach } from "mocha";

/*
 * Tests for Reply Keyboards
 */

describe("Reply Keyboards tests", () => {
	// Some dummy data
	let firstLoad = ["This is a field.", "This is another field"];
	let secondLoad = ["Meh"];
	let thirdLoad = ["Third load button"];

	describe(".addRow(...keys)", () => {
		let keyboard;

		beforeEach("init keyboard", () => {
			keyboard = new ReplyKeyboard();
		});

		it("Should add elements to a row and return the right number of rows via .extract() method", () => {
			keyboard
				.addRow(...firstLoad)
				.addRow(...secondLoad);

			assert.equal(keyboard.length, 2);
		});

		it("Should have a length property after .addRow(), which returns the amount of rows", () => {
			assert.equal(keyboard.addRow(...thirdLoad).length, 1);
		});
	});

	describe(".open()", () => {
		let keyboard = new ReplyKeyboard();
		keyboard
			.addRow(...firstLoad)
			.addRow(...secondLoad)

		it("Should return the data structure for telegram", () => {
			assert.deepStrictEqual(keyboard.open(), {
				reply_markup: {
					keyboard: [firstLoad, secondLoad]
				}
			});
		});
	});

	describe(".close()", () => {
		let keyboard = new ReplyKeyboard();
		keyboard
			.addRow(...firstLoad)
			.addRow(...secondLoad)

		it("Should return the telegram data structure", () => {
			assert.deepStrictEqual(keyboard.close(), {
				reply_markup: {
					remove_keyboard: true,
				}
			});
		});
	});
});
