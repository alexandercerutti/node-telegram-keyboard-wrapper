interface KeyboardButtonPollType {
	type: "quiz" | "regular";
}

interface KeyboardButtonOptions {
	request_contact?: boolean;
	request_location?: boolean;
	request_poll?: KeyboardButtonPollType;
}

export default class KeyboardButton {
	public readonly text: string;
	public readonly options: KeyboardButtonOptions;

	constructor(text: string, options: KeyboardButtonOptions = {}) {
		this.text = text;
		this.options = options;

		Object.freeze(this);
	}

	toJSON() {
		return {
			text: this.text,
			...this.options
		};
	}
}
