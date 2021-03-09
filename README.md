# Node telegram keyboard wrapper

This libray aims to provide a set of classes to improve the creation of keyboards and setup for force-reply in Telegram bots.

Built upon [yagop's node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api), it can work with any Node.js Bot Api wrapper, as it exports Telegram Bot APIs-compliant JSON structures.

> ⚠ v3.0.0 of this library is a major rewrite that is not retro-compatible. Now it never exports an object with `reply_markup` but just its content, which varies from keyboard to keyboard. ⚠

---

## Architecture

The philosophy behind this library, since v3, is to make it easier, through a series of state-less classes, to create the JSON structures to represent Rows, Buttons and the whole keyboards.

To achieve this, both ReplyKeyboard and InlineKeyboard classes and Row class extend the native Array interface.

Therefore you can do every operation you want just like you were acting on Arrays.

---

### Looking for previous version?

I hope you don't, but if you really need it, [here it is](https://github.com/alexandercerutti/node-telegram-keyboard-wrapper/tree/v2.0.1).

---

### Install

```sh
$ npm install --save node-telegram-keyboard-wrapper
```

---

### Example

In examples folder, an example bot is available. It requires a bot token to be passed as argument.

```sh
$ npm run example -- 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
```

Then just type `/replyKeyboard` (and answer or click to hide), `/inlineKeyboard` (and click to trigger) or `/forceReply` in your Telegram client to see the wrapper in action.

---

## API Reference

<br>

- [ForceReply](#forcereply)
  - [`static` .getMarkup](#user-content-static-getmarkup)
- [Row](#user-content-row-extends-arrayprototype)
- [InlineKeyboard](#user-content-inlinekeyboard-extends-arrayprototype)
  - [.getMarkup](#user-content-getmarkup)
- [InlineKeyboardButton](#user-content-inlinekeyboardbutton)
- [ReplyKeyboard](#user-content-replykeyboard-extends-arrayprototype)
  - [.getMarkup](#user-content-getmarkup-1)
  - [.remove](#user-content-remove)

### ForceReply

#### `static` `.getMarkup`

```typescript
ForceReply.getMarkup(selective: boolean = false): Object;

ForceReply.getMarkup();
ForceReply.getMarkup(true);
```

Use this method to export the structure to be sent to `reply_markup`.

**Arguments**:

| Argument  |  Type   | Required | Default Value |
| --------- | :-----: | :------: | :-----------: |
| selective | boolean |  false   |    `false`    |

---

### Row (extends `Array.prototype`)

```typescript
new Row<R extends InlineKeyboardButton | KeyboardButton>(...values: R[]): Row;
```

Use this class to define a row to which button can be appended to.

Push this class into an InlineKeyboard or a ReplyKeyboard to let them create the structure.

This class extends native arrays and, therefore, allows every operation you can perform on Arrays to be performed on this.

**Arguments**:

Inherited from Array's constructor.

---

### InlineKeyboard (extends `Array.prototype`)

```typescript
new InlineKeyboard(...values: Row<InlineKeyboardButton>[]): InlineKeyboard;
```

Use this class to create a container for InlineKeyboards.

This class extends the native Array interface, therefore every operation you can perform on Arrays is allowed to be performed on this.

**Arguments**:

Inherited from Array's constructor.

---

#### `.getMarkup`

```typescript
InlineKeyboard.prototype.getMarkup(): Object;

const keyboard = new InlineKeyboard();
keyboard.getMarkup();
```

Use this method method to export the structure to be sent to `reply_markup`.

**Throws if no rows got pushed in the object**.

**Arguments**:

none.

---

### InlineKeyboardButton

```typescript
new InlineKeyboardButton<S extends string>(text: string, exclusiveKey: S, exclusiveValue: T[S]): InlineKeyboardButton;
```

Use this method to create a button to be pushed in a Row.
As per the Telegram Bot API Documentation, each InlineKeyboardButton **must have only one of the optional properties**.

**Arguments**:

| Argument       |       Type       | Required | Default Value | Description                                                |
| -------------- | :--------------: | :------: | :-----------: | ---------------------------------------------------------- |
| text           |      string      |   true   |       -       | The visual string to be shown on the button.               |
| exclusiveKey   | S extends string |   true   |       -       | The required key for this button.                          |
| exclusiveValue |       T[S]       |   true   |       -       | the value for `exclusiveKey` (it differs from key to key). |

For the valid values of `exclusiveKey` and `exclusiveValue` refer to [InlineKeyboardButton](https://core.telegram.org/bots/api#inlinekeyboardbutton);

**Example**:

```typescript
const row = new Row<InlineKeyboardButton>();

row.push(
	new InlineKeyboardButton("My text", "url", "https://localhost:8080/"),
	new InlineKeyboardButton(
		"My text 2",
		"callback_data",
		"any data between 1 and 64 bytes"
	)
);
```

---

### ReplyKeyboard (extends `Array.prototype`)

```typescript
new ReplyKeyboard(...values: Row<KeyboardButton>[]): ReplyKeyboard;
```

Use this class to create a new keyboard that is going to showup under the text area in your Telegram client.

This class extends the native Array interface, therefore every operation you can perform on Arrays is allowed to be performed on this.

**Arguments**:

Inherited from Array's constructor.

---

#### `.getMarkup`

```typescript
ReplyKeyboard.prototype.getMarkup(): Object;

const keyboard = new ReplyKeyboard();
keyboard.getMarkup();
```

Use this method method to export the structure to be sent to `reply_markup` for opening the keyboard.

**Throws if no rows got pushed in the object**.

**Arguments**:

| Argument                  |  Type   | Required | Default Value |
| ------------------------- | :-----: | :------: | :-----------: |
| options                   | Object  |  false   |     `{}`      |
| options.resize_keyboard   | boolean |  false   |  `undefined`  |
| options.one_time_keyboard | boolean |  false   |  `undefined`  |
| options.selective         | boolean |  false   |  `undefined`  |

<br />
<br />

This list might get outdated. The arguments are used as they are passed.
Refer to [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) for, eventually, the complete list.

<br />

---

#### `.remove`

```typescript
ReplyKeyboard.prototype.remove(): Object;

const keyboard = new ReplyKeyboard();
keyboard.remove();
```

Use this method method to export the structure to be sent to `reply_markup` for closing definitely the keyboard.

**Throws if no rows got pushed in the object**.

**Arguments**:

| Argument  |  Type   | Required | Default Value |
| --------- | :-----: | :------: | :-----------: |
| selective | boolean |  false   |    `false`    |

<br />

---

### Testing

Tests are build upon Jasmine Unit suite.
Run these commands to test changes after have cloned the repository:

```sh
$ npm install

$ npm run build # to build from Typescript
$ npm run build:spec # to build tests
$ npm test # to both build tests and run them
```

---

Any contribution, is welcome. Made with ❤️ in Italy.
