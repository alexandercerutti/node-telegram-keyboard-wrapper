import { ForceReply } from "../lib";

describe("ForceReply", () => {
	it("should return a valid object... always?", () => {
		expect(ForceReply.getMarkup()).toEqual({
			force_reply: true,
			selective: false
		});

		expect(ForceReply.getMarkup(true)).toEqual({
			force_reply: true,
			selective: true
		});
	});
});
