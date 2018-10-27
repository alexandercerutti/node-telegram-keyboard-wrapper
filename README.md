# Node telegram keyboard wrapper

#### A support for telegram keyboards management, both inline and reply, and forceReply

This libray aims to provide a set of methods and classes to handle keyboards and force replies in node.js-written Telegram bots.

Built upon [yagop's node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) but can virtually work with any node.js telegram bot api wrapper.

___

### Installation

From NPM:

```sh
npm install -s node-telegram-keyboard-wrapper
```

Downloading from Github, won't give the compiled version, so you'll have to do it by yourself.

```sh
npm build
```

Tests for methods used by ReplyKeyboard and InlineKeyboard are included.

```sh
# Installing dev dependencies
npm install -D
npm test
```

In examples folder, an example bot is available. It requires a bot token to be passed as argument.

```sh
npm run example -- 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
```

Then just type `/replyKeyboard` (and answer or click to hide), `/inlineKeyboard` (and click to trigger) or `/forceReply` in your Telegram client to see the wrapper in action.

If you have any issue, suggestion of what else, feel free to open a topic in issues. 😉

<br>
<hr>


## API Reference
<br>

- [Visual Keyboards](#visual_keyboard)
	- [.addRow()](#method_addrow)
	- [.removeRow()](#method_removerow)
	- [.emptyRow()](#method_emptyrow)
	- [.popRow()](#method_poprow)
	- [.rowLength()](#method_rowlength)
	- [.push()](#method_push)
	- [.pop()](#method_pop)
	- [.reset()](#method_reset)
	- [.Getter .length()](#getter_length)
- [Inline Keyboard](#inline_keyboard)
- [Reply Keyboards](#reply_keyboard)
	- [.open()](#method_open)
	- [.close()](#method_close)

- [Force Reply](#force_reply)
	- [.build()](#method_fbuild)

- [Reply Markup - Inherited Methods](#reply_markup)
	- [.build()](#method_build)
	- [.extract()](#method_extract)

<hr>

## Classes architecture:

This library is divided in the following class architecture:

![](https://i.imgur.com/2ZtRzJd.png)

<a name="visual_keyboard"></a>
## Visual Keyboard

<hr>

This class get extended by **both** InlineKeyboards and
ReplyKeyboards and extend ReplyMarkup class. Therefore, the methods inserted in here are valid for both.

<br>
<hr>

### Rows methods
<hr>

<a name="method_addrow"></a>

### .addRow()
Adds a new row with specified elements.

```javascript
(new InlineKeyboard()).addRow(...keys) : this
(new ReplyKeyboard()).addRow(...keys) : this
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| keys | One Object per button | [InlineKeyboardButton](https://core.telegram.org/bots/api#inlinekeyboardbutton) | false | - |

Returns the object itself for chaining;

<br>
<br>
<hr>

<a name="method_removerow"></a>

### .removeRow()

```javascript
(new InlineKeyboard()).removeRow(index) : this
(new ReplyKeyboard()).removeRow(index) : this
```

**Returns**:

The object itself for chaining;

**Description**:

Removed a specific row.

Both row indexes `index < 0` and `index > rowQuantity`, will make the counter restart from their opposite bound.

**Arguments**:

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| index | The row to be removed. | Integer | false | - |

<br>
<br>
<hr>

<a name="method_emptyrow"></a>

### .emptyRow()

```javascript
(new InlineKeyboard()).emptyRow(index) : Number
(new ReplyKeyboard()).emptyRow(index) : Number
```

**Returns**:

The index of the emptied row.

**Description**:

Empty an entire row of keys but without removing the row.

Please note that both `index < 0` and `index > rowQuantity`, will make the counter restart from their opposite bounds.

**Arguments**:

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| index | The row to be emptied. | Integer | false | - |

<br>
<br>
<hr>

<a name="method_poprow"></a>

### .popRow()

```javascript
(new InlineKeyboard()).popRow(index) : (InlineKeyboardButton | KeyboardButton | string)[]
(new ReplyKeyboard()).popRow(index) : (InlineKeyboardButton | KeyboardButton | string)[]
```

**Returns**:

Returns the popped out row (array of the above element).

**Description**:

Pops out the last row of the keyboard.

<br>
<hr>

<a name="method_rowlength"></a>

### .rowLength()

```javascript
(new InlineKeyboard()).rowLength(index) : Number
(new ReplyKeyboard()).rowLength(index) : Number
```

**Returns**:

The length of a specific row.

**Description**:

Both row indexes `index < 0` and `index > rowQuantity`, will make the counter restart from their opposite bounds.

**Arguments**:

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| index | The row to be emptied. | Integer | false | - |

Returns the amount of buttons in a row.

<br>
<br>
<hr>

### Buttons operations
<hr>
<br>

<a name="method_push"></a>

### .push()

```javascript
(new InlineKeyboard()).push(index, ...elements) : Number;
(new ReplyKeyboard()).push(index, ...elements) : Number;
```

**Returns:**

The new length of the current row.

**Description:**

Adds `elements` to the specified row.

Both row indexes `index < 0` and `index > rowQuantity`, will make the counter restart from their opposite bounds.

**Arguments**:

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| index | The index of the row in which push. | Integer | false | -
| ... elements | The elements to be pushed | Array<[InlineKeyboardButton](https://core.telegram.org/bots/api#inlinekeyboardbutton)> | false | - |


<br>
<hr>

<a name="method_pop"></a>

### .pop()

```javascript
(new InlineKeyboard()).pop(index) : InlineKeyboardButton | KeyboardButton | string
(new ReplyKeyboard()).pop(index) : InlineKeyboardButton | KeyboardButton | string
```

**Returns**:

The popped out element.

**Description**:

Pops out the last element of a row.
Both row indexes `index < 0` and `index > rowQuantity`, will make the counter restart from their opposite bounds.

**Arguments**:

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | :--------: | :-------------: |
| index | The row from which pop the last element. | Integer | false | - |

<br>
<hr>

<a name="method_reset"></a>

### .reset()

```javascript
(new InlineKeyboard()).reset()
(new ReplyKeyboard()).reset()
```

**Description**:

Wipes out the whole content.
Probabily the most useless method.
I mean: if you want to create a new keyboard, you don't wipe out your old, but create a brand new one.

<br>
<hr>

<a name="getter_length"></a>

### Getter .length

```javascript
(new InlineKeyboard()).length : Number
(new ReplyKeyboard()).length : Number
```

**Returns**:

The amount rows in the keyboard.


<br>
<hr>

<a name="inline_keyboard"></a>

## Inline Keyboards
<hr>


Inline keyboards do not extend Visual Keyboard class with any new method.
<br>

### Constructor
```javascript
new InlineKeyboard(oneKey?);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| oneKey | Fastest way to have one-button keyboard. | [InlineKeyboardButton](https://core.telegram.org/bots/api#inlinekeyboardbutton) | true | - |

<br>
<br>

<br>
<hr>

<a name="reply_keyboard"></a>

## Reply Keyboards
<hr>
<br>


```javascript
// keep this always as valid
let replyKeyboard = new ReplyKeyboard();
```

### Constructor
```javascript
new ReplyKeyboard(oneKey?);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| oneKey | Useful for one-button only keyboards. | [KeyboardButton](https://core.telegram.org/bots/api#keyboardbutton) \| String | true | - |

<br>
<hr>

<a name="method_open"></a>

### .open()

```javascript
replyKeyboard.open(options?);
```

**Returns**:

Keyboard structure to open a ReplyKeyboard.

**Arguments**:

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| options | Options of the button | Object | true | `{}`
| options.selective | If true, valid only for specific users (e.g. Mentioned), Users which replied the bot of original sender | Boolean | true | `false`
| options.one_time_keyboard | Hides the keyboard after the first usage. | Boolean | true | `false`
| options.resize_keyboard | Tells telegram client to use smaller buttons | Boolean | true | `false`

**See more**: [Reply Keyboard Markup](https://core.telegram.org/bots/api#replykeyboardmarkup)

<br>
<hr>

<a name="method_close"></a>

### .close()

```javascript
replyKeyboard.close(options?);
```

**Returns**:

Keyboard structure to close a ReplyKeyboard.

**Arguments**:

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| options | Options of the button | Object | true | `{}`
| options.selective | If true, valid only for specific users (e.g. Mentioned), Users which replied the bot of original sender | Boolean | true | `false`

**See**: [Reply Keyboard Remove](https://core.telegram.org/bots/api#replykeyboardremove)

<br>
<br>

<br>
<hr>

<a name="force_reply"></a>

## Force Reply
<hr>
<br>


```javascript
// keep this always as valid
let forceReply = new ForceReply();
```

### Constructor
```javascript
new ForceReply();
```

<br>
<hr>

<a name="method_fbuild"></a>

### _@override_ .build()

```javascript
forceReply.export(options?);
```

**Returns**:

Returns a keyboard structure for force reply.

**Arguments**:

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| options | Options of the button | Object | true | `{}`
| options.selective | If true, valid only for specific users (e.g. Mentioned), Users which replied the bot of original sender | Boolean | true | `false`

**See**: [ForceReply](https://core.telegram.org/bots/api#forcereply)

<br>
<br>

<hr>

<a name="reply_markup"></a>

### Inherited methods and properties
<hr>

These methods are inherited from ReplyMarkup class, which gets inherited by both Visual Keyboards and ForceReply.

<br>
<hr>

<a name="method_build"></a>

### .build()
Returns a keyboard structure based on the type.

```javascript
(new InlineKeyboard()).build();
(new ReplyKeyboard()).build();
(new ForceReply()).build();
```

**Returns**:

A built structure conforming to Telegram keyboards.

<br>
<hr>

<a name="method_extract"></a>

### .extract()

```javascript
(new InlineKeyboard()).extract();
(new ReplyKeyboard()).extract();
(new ForceReply()).extract();
```

**Returns**:

Returns the content of `reply_markup`.
