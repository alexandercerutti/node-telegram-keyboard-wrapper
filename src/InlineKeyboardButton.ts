interface InlineKeyboardSupportedProperties {
	url: string;
	login_url: {
		url: string;
		forward_text?: string;
		bot_username?: string;
		request_write_access?: string;
	};
	callback_data: string;
	switch_inline_query: string;
	switch_inline_query_current_chat: string;
	callback_game: {};
	pay: boolean;
	web_app: {
		url: string;
	};
}

export default class InlineKeyboardButton<P extends keyof InlineKeyboardSupportedProperties = any> {
	constructor(
		public readonly text: string,
		public readonly exclusiveKey: P,
		public readonly exclusiveValue: InlineKeyboardSupportedProperties[P],
	) {
		if (!exclusiveKey || !exclusiveValue) {
			throw new Error(
				"Missing exclusiveKey or exclusiveValue. Creating an InlineKeyboardButton requires one of the mandatory values among optional values. For more refer to: https://core.telegram.org/bots/api#inlinekeyboardbutton",
			);
		}

		Object.freeze(this);
	}

	public clone() {
		const exclusiveValue =
			typeof this.exclusiveValue === "object"
				? Object.assign({}, this.exclusiveValue)
				: this.exclusiveValue;

		return new InlineKeyboardButton(this.text, this.exclusiveKey, exclusiveValue);
	}

	public getJSON() {
		return {
			text: this.text,
			[this.exclusiveKey]: this.exclusiveValue,
		};
	}
}
