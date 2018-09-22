const { ReplyKeyboard } = require("..");
const assert = require("assert");
/*
 * Tests for Reply Keyboards
 */

describe("Reply Keyboards tests", function() {
	// Some dummy data
	let firstLoad = ["This is a field.", "This is another field"];
	let secondLoad = ["Meh"];
	let thirdLoad = ["Third load button"];

	describe(".addRow(...keys)", function() {
		let keyboard;

		beforeEach("init keyboard", function() {
			keyboard = new ReplyKeyboard();
		});

		it("Should add elements to a row and return the right number of rows via .extract() method", function() {
			keyboard
				.addRow(...firstLoad)
				.addRow(...secondLoad);

			assert.equal(keyboard.extract(keyboard.export()).length, 2);
		});

		it("Should have a length property after .addRow(), which returns the amount of rows", function() {
			assert.equal(keyboard.addRow(...thirdLoad).length, 1);
		});
	});

	describe(".open()", function() {
		let keyboard = new ReplyKeyboard();
			keyboard
				.addRow(...firstLoad)
				.addRow(...secondLoad)

		it("Should return the data structure for telegram", function() {
			assert.deepEqual(keyboard.open(), {
				reply_markup: {
					keyboard: [ firstLoad, secondLoad ],
					selective: false,
					one_time_keyboard: false,
					resize_keyboard: false,
				}
			});
		});
	});

	describe(".close()", function() {
		let keyboard = new ReplyKeyboard();
			keyboard
				.addRow(...firstLoad)
				.addRow(...secondLoad)

		it("Should return the telegram data structure", function() {
			assert.deepEqual(keyboard.close(), {
				reply_markup: {
					selective: false,
					remove_keyboard: true,
				}
			});
		});
	});
});
