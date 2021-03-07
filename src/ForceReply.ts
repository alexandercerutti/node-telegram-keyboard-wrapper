export default class ForceReply {
	getMarkup(selective: boolean = false) {
		return {
			force_reply: true,
			selective
		};
	}
}
