import { ReplyMarkup } from "./reply_markup";
import { RMSelective } from "./model";

export class ForceReply extends ReplyMarkup {
	_options: RMSelective;

	constructor(options: RMSelective = {}) {
		super("force_reply");
		this._override = true;
		this._options = options;
	}

	build() {
		return Object.assign(super.build(), this._options);
	}
}
