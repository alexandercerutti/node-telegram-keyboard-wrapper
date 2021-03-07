const enum SupportedOptionsKeys {
	URL = "url",
	PAY = "pay",
	LOGIN_URL = "login_url",
	CALLBACK_DATA = "callback_data",
	CALLBACK_GAME = "callback_game",
	SWITCH_INLINE_QUERY = "switch_inline_query",
	SWITCH_INLINE_QUERY_CURRENT_CHAT = "switch_inline_query_current_chat",
}

interface LoginUrl {
	url: string;
	forward_text?: string;
	bot_username?: string;
	request_write_access?: string;
}

interface SupportedOptions {
	[SupportedOptionsKeys.URL]: string,
	[SupportedOptionsKeys.LOGIN_URL]: LoginUrl,
	[SupportedOptionsKeys.CALLBACK_DATA]: string;
	[SupportedOptionsKeys.SWITCH_INLINE_QUERY]: string;
	[SupportedOptionsKeys.SWITCH_INLINE_QUERY_CURRENT_CHAT]: string;
	[SupportedOptionsKeys.CALLBACK_GAME]: {};
	[SupportedOptionsKeys.PAY]: boolean;
}

export default class InlineKeyboardButton<T extends SupportedOptionsKeys = any> {
	public readonly text: string;
	public readonly exclusiveKey: T;
	public readonly exclusiveValue: SupportedOptions[T];

	constructor(text: string, exclusiveKey: T, exclusiveValue: SupportedOptions[T]) {
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
