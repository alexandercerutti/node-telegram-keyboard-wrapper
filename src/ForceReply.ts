export default class ForceReply {
	public static getMarkup(selective: boolean = false) {
		return {
			force_reply: true,
			selective,
		};
	}
}
