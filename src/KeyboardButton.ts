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
		this.text = String(text);
		this.options = options;

		if (options && typeof options !== "object") {
			throw new TypeError("Cannot accept a non-object as 'options' value");
		}

		Object.freeze(this);
	}

	clone() {
		return new KeyboardButton(this.text, Object.assign({}, this.options));
	}

	getJSON() {
		return {
			text: this.text,
			...this.options
		};
	}
}
