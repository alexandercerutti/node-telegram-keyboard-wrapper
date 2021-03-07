interface KeyboardButtonPollType {
	type: "quiz" | "regular";
}

interface KeyboardButtonOptions {
	request_contact?: boolean;
	request_location?: boolean;
	request_poll?: KeyboardButtonPollType;
}

export default class KeyboardButton<T extends KeyboardButtonOptions = KeyboardButtonOptions> {
	public readonly text: string;
	public readonly options: T;

	constructor(text: string, options: T = {} as T) {
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
