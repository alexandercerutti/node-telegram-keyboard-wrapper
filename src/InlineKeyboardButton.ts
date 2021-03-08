interface LoginUrl {
	url: string;
	forward_text?: string;
	bot_username?: string;
	request_write_access?: string;
}

interface InlineKeyboardSupportedProperties {
	"url": string,
	"login_url": LoginUrl,
	"callback_data": string;
	"switch_inline_query": string;
	"switch_inline_query_current_chat": string;
	"callback_game": {};
	"pay": boolean;
}

export default class InlineKeyboardButton<P extends keyof InlineKeyboardSupportedProperties = keyof InlineKeyboardSupportedProperties> {
	public readonly text: string;
	public readonly exclusiveKey: keyof InlineKeyboardSupportedProperties;
	public readonly exclusiveValue: InlineKeyboardSupportedProperties[P];

	constructor(text: string, exclusiveKey: P, exclusiveValue: InlineKeyboardSupportedProperties[P]) {
		this.text = text;
		this.exclusiveKey = exclusiveKey;
		this.exclusiveValue = exclusiveValue;

		if (!exclusiveKey || !exclusiveValue) {
			throw new Error("Missing exclusiveKey or exclusiveValue. Creating an InlineKeyboardButton requires one of the mandatory values among optional values. For more refer to: https://core.telegram.org/bots/api#inlinekeyboardbutton");
		}

		Object.freeze(this);
	}

	toJSON() {
		return {
			text: this.text,
			[this.exclusiveKey]: this.exclusiveValue
		};
	}
}
