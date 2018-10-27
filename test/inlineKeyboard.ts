import { InlineKeyboard } from "..";
import * as assert from "assert";
import { describe, beforeEach } from "mocha";

/*
 * Tests for Inline Keyboards
 */

describe("Inline Keyboards tests", () => {
	// Some dummy data
	let firstLoad = [{
		text: "This is a field.",
		callback_data: "mydata",
	}, {
		text: "This is another field",
		callback_data: "mydata2",
	}];

	let secondLoad = [{
		text: "Meh",
		callback_data: "otherData",
	}];

	let thirdLoad = [{
		text: "Third load button",
		callback_data: "thirdDataload"
	}];

	describe("Creation test with one element", () => {
		it("Should contain just one element", () => {
			let keyboard = new InlineKeyboard({
				text: "This is an element for an InlineKeyboard"
			});

			assert.equal(keyboard.extract()["inline_keyboard"].length, 1);
		});
	});

	describe(".addRow(...keys)", () => {
		let keyboard;

		beforeEach("init keyboard", () => {
			keyboard = new InlineKeyboard();
		});

		it("Should add elements to a row and return the right number of rows via .extract() method", () => {
			keyboard
				.addRow(...firstLoad)
				.addRow(...secondLoad);

			assert.equal(keyboard.extract()["inline_keyboard"].length, 2);
		});

		it("Should have a length property inherited, which returns the amount of rows", () => {
			assert.equal(keyboard.addRow(...thirdLoad).length, 1);
		});
	});

	describe(".push(row, element)", () => {
		let keyboard;

		beforeEach("init keyboard", () => {
			keyboard = new InlineKeyboard();
			keyboard
				.addRow(...firstLoad)
				.addRow(...secondLoad)
				.addRow(...thirdLoad);
		});

		it("With non-out-of-bounds index", () => {
			keyboard.push(2, {
				text: "hello, this is a new button"
			});

			assert.equal(keyboard.extract()["inline_keyboard"][2].length, 2);
		});

		it("With a negative out-of-bounds index", () => {
			keyboard.push(-4, {
				text: "This was inserted via a negative out-of-bounds index"
			});

			assert.equal(keyboard.extract()["inline_keyboard"][0].length, 2);
		});

		it("With a positive out-of-bounds index", () => {
			keyboard.push(9, {
				text: "This was inserted via a positive out-of-bounds index"
			});

			assert.equal(keyboard.extract()["inline_keyboard"][0].length, 3);
		});
	});

	describe(".removeRow(rowIndex)", () => {

		let keyboard;

		beforeEach("init keyboard", () => {
			keyboard = new InlineKeyboard();
			keyboard
				.addRow(...firstLoad)
				.addRow(...secondLoad)
				.addRow(...thirdLoad);
		});

		it("With a non-out-of-bounds index", () => {
			keyboard.removeRow(1);

			assert.equal(keyboard.extract()["inline_keyboard"].length, 2);
		});

		it("With a negative out-of-bounds index", () => {
			keyboard.removeRow(-3);

			assert.equal(keyboard.extract()["inline_keyboard"].length, 2);
		});

		it("With a positive out-of-bounds index", () => {
			keyboard.removeRow(5);

			assert.equal(keyboard.extract()["inline_keyboard"].length, 2);
		});
	});

	describe(".emptyRow(rowIndex)", () => {

		let keyboard;

		beforeEach("init keyboard", () => {
			keyboard = new InlineKeyboard();
			keyboard
				.addRow(...firstLoad)
				.addRow(...secondLoad)
				.addRow(...thirdLoad);
		});

		it("With a non-out-of-bounds index", () => {
			keyboard.emptyRow(2);

			assert.equal(keyboard.extract()["inline_keyboard"][2].length, 0);
		});

		it("With a negative out-of-bounds index", () => {
			keyboard.emptyRow(-1);

			assert.equal(keyboard.extract()["inline_keyboard"][2].length, 0);
		});

		it("With a positive out-of-bounds index", () => {
			keyboard.emptyRow(6);

			assert.equal(keyboard.extract()["inline_keyboard"][0].length, 0);
		});
	});
});
