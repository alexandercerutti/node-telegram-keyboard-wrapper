import { Row } from "../lib"

describe("Row", () => {
	it("Should be cloned correctly", () => {
		const row = new Row();
		const clone1 = row.clone();

		expect(row).not.toBe(clone1);
	});

	/** Real cloning already happens in buttons. They already have tests */
});
