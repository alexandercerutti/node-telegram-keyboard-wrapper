# Node.JS Telegram Keyboard Wrapper

#### A support for telegram keyboards creation, both inline and reply.

This is a support wrapper created to simplify the creation of keyboards inside telegram bot written in Node.JS which used wrapper doesn't have already a support for managing keyboards in such dynamic way.

```sh
npm install node-telegram-keyboard-wrapper --save
```

Tests for all methods are included.

```sh
npm install --only=dev
npm test
```

In examples folder, an example bot is available. It is based on yagop's [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api). It requires a bot token to be passed as argument.

Execute it by running

```sh
npm run example -- 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
```

Then just type `/replyKeyboard` (and answer or click to hide), `/inlineKeyboard` (and click to trigger) or `/forceReply` in your Telegram client to see the wrapper in action.

If you have any issue, suggestion of what else, feel free to open a topic in issues. 😉

___

## API Reference

### Inline Keyboards

```javascript
// keep this always as valid
let inlineKeyboard = new InlineKeyboard();
```

##### Constructor
```javascript
new InlineKeyboard(oneKey);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| oneKey | Fastest way to have one-button keyboard. | [InlineKeyboardButton](https://core.telegram.org/bots/api#inlinekeyboardbutton) | true | - |

#### Rows

##### .addRow()
Adds a new row with specified elements.

```javascript
inlineKeyboard.addRow(...keys);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| keys | One Object per button | [InlineKeyboardButton](https://core.telegram.org/bots/api#inlinekeyboardbutton) | false | - |

Returns the object itself for chaining;

##### .removeRow()
Removed an entire row of keys.

Please note that both `rowIndex < 0` and `rowIndex > rowQuantity`, will make the counter restart from their opposite bounds.

```javascript
inlineKeyboard.removeRow(rowIndex);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| rowIndex | The row to be removed. | Integer | false | - |

Returns the object itself for chaining;


##### .emptyRow()
Empty an entire row of keys but without removing the row.

Please note that both `rowIndex < 0` and `rowIndex > rowQuantity`, will make the counter restart from their opposite bounds.

```javascript
inlineKeyboard.emptyRow(rowIndex);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| rowIndex | The row to be emptied. | Integer | false | - |

Returns the object itself for chaining with `lastRow` property to keep trace of which was the emptied row.


##### .popRow()
Pops the last row of the keyboard.

```javascript
inlineKeyboard.popRow(rowIndex);
```

Returns the object itself for chaining;

##### .rowLength()
Empty an entire row of keys but without removing the row.
Please note that both `rowIndex < 0` and `rowIndex > rowQuantity`, will make the counter restart from their opposite bounds.

```javascript
inlineKeyboard.rowLength(rowIndex, ignoreLastRow = true);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| rowIndex | The row to be emptied. | Integer | false | - |
| ignoreLastRow | Ignore last edited row | Boolean | true | true

Returns the amount of buttons in a row.

#### Buttons

##### .push()
Adds `element` to the specified row.

Please note that both `rowIndex < 0` and `rowIndex > rowQuantity`, will make the counter restart from their opposite bounds.

```javascript
inlineKeyboard.push(rowIndex, element, ignoreLastRow = true);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| rowIndex | The index of the row in which push. | Integer | false | -
| element | The element to push | [InlineKeyboardButton](https://core.telegram.org/bots/api#inlinekeyboardbutton) | false | - |
| ignoreLastRow | Ignore last edited row | Boolean | true | true

Returns the object itself for chaining;

##### .pop()
Pops out the last element of a row.
Please note that both `rowIndex < 0` and `rowIndex > rowQuantity`, will make the counter restart from their opposite bounds.

```javascript
inlineKeyboard.pop(rowIndex);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| rowIndex | The row from which pop the last element. | Integer | false | - |

Returns the object itself for chaining;

___
<br>

### Reply Keyboards

```javascript
// keep this always as valid
let replyKeyboard = new ReplyKeyboard();
```

#### Constructor
```javascript
new ReplyKeyboard(...keys);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| keys | Multiple strings or objects for each button | [KeyboardButton](https://core.telegram.org/bots/api#keyboardbutton) | false | - |


##### .addRow()
Adds a new row with specified elements.

```javascript
replyKeyboard.addRow(...keys);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| keys | One Object per button | [InlineKeyboardButton](https://core.telegram.org/bots/api#inlinekeyboardbutton) | false | - |

Returns the object itself (chaining) with `length` property for keyboard rows length.

##### .open()
Returns a keyboard structure to open a ReplyKeyboard.

```javascript
replyKeyboard.open(options = { selective: false, one_time_keyboard: false, resize_keyboard: false });
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| options | Options of the button | Object | true | `{ selective: false, one_time_keyboard: false, resize_keyboard: false }`

See for more: [Reply Keyboard Markup](https://core.telegram.org/bots/api#replykeyboardmarkup)

##### .close()
Returns a keyboard structure to close a ReplyKeyboard.

```javascript
replyKeyboard.close(options = { selective: false });
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| options | Options of the button | Object | true | `{ selective: false }`

See for more: [Reply Keyboard Remove](https://core.telegram.org/bots/api#replykeyboardremove)

##### Getter: getKeys
Returns an array containing the keys which compose the keyboard.


##### Force Reply

### Inline Keyboards

```javascript
// keep this always as valid
let forceReply = new ForceReply();
```

##### Constructor
```javascript
new ForceReply();
```

##### _@override_ .export()
Returns a keyboard structure for force reply.

```javascript
forceReply.export(options = { selective: false });
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| options | Options of the button | Object | true | `{ selective: false }`

See for more: [ForceReply](https://core.telegram.org/bots/api#forcereply)

___
<br>

### Inherited methods and properties

#### .export()
Returns a keyboard structure based on the type.

```javascript
.export(options = {}, override = "");
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:|:-------------:|
| options  | Options to be added to `reply_markup` object | Object | true | { }
| override | An override content to be sent in the structure | \<Any\> | true | ""


#### .extract()
Returns the content of `reply_markup`.

```javascript
.extract(from);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- |:--------:| :-------------:|
| from | The structure obtained from .export() | Object | false | -

Throws error if in `from` there's not the property `reply_markup`.

#### Getter: length
Returns the length of the keyboard (rows)
