# Node.JS Telegram Keyboard Wrapper

#### A support for telegram keyboards creation, both inline and reply.

This is a support wrapper created to simplify the creation of keyboards inside telegram bot written in Node.JS which used wrapper doesn't have already a support for managing keyboards in such dynamic way.

Tests for all methods are included.

```sh
npm test
```

Moreover, a [test folder](/test/bot) subfolder, which contains a test bot which uses yagop's [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) to show how the library works, is available.

To use it, you have just to pass a bot token as a command line argument to node, like follows.

```sh
	cd node-telegram-keyboard-wrapper
	node test/bot 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
```

Then just type `/replyKeyboard` (and answer or click to hide) `/inlineKeyboard` (and click to trigger) in your Telegram client to see the wrapper in action.

If you have any issue, suggestion of what else, feel free to open a topic in issues. 😉