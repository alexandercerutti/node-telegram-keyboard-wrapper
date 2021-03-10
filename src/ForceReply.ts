export default class ForceReply {
	static getMarkup(selective: boolean = false) {
		return {
			force_reply: true,
			selective
		};
	}
}
