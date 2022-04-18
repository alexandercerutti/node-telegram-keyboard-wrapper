interface KeyboardButtonOptions {
	request_contact?: boolean;
	request_location?: boolean;
	request_poll?: {
		type: "quiz" | "regular";
	};
	web_app?: {
		url: string;
	};
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

	public clone() {
		return new KeyboardButton(this.text, Object.assign({}, this.options));
	}

	public getJSON() {
		return {
			text: this.text,
			...this.options,
		};
	}
}
