const { InlineKeyboard } = require("..");
const assert = require("assert");
/*
 * Tests for Inline Keyboards
 */

describe("Inline Keyboards tests", function() {
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

	it("Should not contain any element", function() {
		let keyboardFailedToAdd = new InlineKeyboard({
			noTextFields: "To let this work,",
			willMakethisFailing: "text must be a property of oneKey",
		});

		assert.equal(keyboardFailedToAdd.extract(keyboardFailedToAdd.export()).length, 0);
	});

	describe("Creation test with one element", function() {
		it("Should contain just one element", function() {
			let keyboard = new InlineKeyboard({
				text: "This is an element for an InlineKeyboard"
			});

			assert.equal(keyboard.extract(keyboard.export()).length, 1);
		});
	});

	describe(".addRow(...keys)", function() {
		let keyboard;

		beforeEach("init keyboard", function() {
			keyboard = new InlineKeyboard();
		});

		it("Should add elements to a row and return the right number of rows via .extract() method", function() {
			keyboard
				.addRow(...firstLoad)
				.addRow(...secondLoad);

			assert.equal(keyboard.extract(keyboard.export()).length, 2);
		});

		it("Should have a length property inherited, which returns the amount of rows", function() {
			assert.equal(keyboard.addRow(...thirdLoad).length, 1);
		});
	});

	describe(".push(row, element)", function() {

		let keyboard;

		beforeEach("init keyboard", function() {
			keyboard = new InlineKeyboard();
			keyboard
				.addRow(...firstLoad)
				.addRow(...secondLoad)
				.addRow(...thirdLoad);
		});

		it("With non-out-of-bounds index", function() {
			keyboard.push(2, {
				text: "hello, this is a new button"
			});

			assert.equal(keyboard.extract(keyboard.export())[2].length, 2);
		});

		it("With a negative out-of-bounds index", function() {
			keyboard.push(-4, {
				text: "This was inserted via a negative out-of-bounds index"
			});

			assert.equal(keyboard.extract(keyboard.export())[0].length, 2);
		});

		it("With a positive out-of-bounds index", function() {
			keyboard.push(9, {
				text: "This was inserted via a positive out-of-bounds index"
			});

			assert.equal(keyboard.extract(keyboard.export())[0].length, 3);
		});
	});

	describe(".removeRow(rowIndex)", function() {

		let keyboard;

		beforeEach("init keyboard", function() {
			keyboard = new InlineKeyboard();
			keyboard
				.addRow(...firstLoad)
				.addRow(...secondLoad)
				.addRow(...thirdLoad);
		});

		it("With a non-out-of-bounds index", function() {
			keyboard.removeRow(1);

			assert.equal(keyboard.extract(keyboard.export()).length, 2);
		});

		it("With a negative out-of-bounds index", function() {
			keyboard.removeRow(-3);

			assert.equal(keyboard.extract(keyboard.export()).length, 2);
		});

		it("With a positive out-of-bounds index", function() {
			keyboard.removeRow(5);

			assert.equal(keyboard.extract(keyboard.export()).length, 2);
		});
	});

	describe(".emptyRow(rowIndex)", function() {

		let keyboard;

		beforeEach("init keyboard", function() {
			keyboard = new InlineKeyboard();
			keyboard
				.addRow(...firstLoad)
				.addRow(...secondLoad)
				.addRow(...thirdLoad);
		});

		it("With a non-out-of-bounds index", function() {
			keyboard.emptyRow(2);

			assert.equal(keyboard.extract(keyboard.export())[2].length, 0);
		});

		it("With a negative out-of-bounds index", function() {
			keyboard.emptyRow(-1);

			assert.equal(keyboard.extract(keyboard.export())[1].length, 0);
		});

		it("With a positive out-of-bounds index", function() {
			keyboard.emptyRow(6);

			assert.equal(keyboard.extract(keyboard.export())[0].length, 0);
		});

		it("Chaining method and .push() and then returning the length of the row", function() {
			// if ignoreLastRow is false, any index can be passed to rowIndex
			var row0Len = keyboard
				.emptyRow(0)
				.push(-1, {
					text: "This button has been just pushed"
				}, false)
				.rowLength(-1, false);

			assert.equal(row0Len, 1);
		});
	});
});
