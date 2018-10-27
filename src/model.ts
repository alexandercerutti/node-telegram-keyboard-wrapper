import { ReplyKeyboardRemove, ForceReply, SendMessageOptions, ReplyKeyboardMarkup, InlineKeyboardMarkup } from "node-telegram-bot-api";

export type KeyboardType = "inline_keyboard" | "keyboard" | "remove_keyboard" | "force_reply";

export interface ReplyOpts extends SendMessageOptions {
	reply_markup: ReplyKeyboardMarkup | InlineKeyboardMarkup | ForceReply | ReplyKeyboardRemove
}

export interface RMSelective {
	selective?: boolean
}

export interface RKOpenOptions extends RMSelective {
	one_time_keyboard?: boolean,
	resize_keyboard?: boolean
}
