# Node.JS Telegram Keyboard Wrapper



#### A support for telegram keyboards creation, both inline and reply.

This is a support wrapper created to simplify the creation of keyboards inside telegram bot written in Node.JS which used wrapper doesn't have already a support for managing keyboards in such dynamic way.

Tests for all methods are included.

```sh
npm install --only=dev
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


## API Reference

##### Inline Keyboards
All the methods are chainable.

##### Constructor
```javascript
new InlineKeyboard(oneKey);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| oneKey | Fastest way to have one-button keyboard. | [InlineKeyboardButton](https://core.telegram.org/bots/api#inlinekeyboardbutton) | _true_ | n/a |

#### Rows

##### .addRow()
Adds a new row with specified elements.

```javascript
(new InlineKeyboard()).addRow(...keys);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| keys | One Object per button | [InlineKeyboardButton](https://core.telegram.org/bots/api#inlinekeyboardbutton) | _false_ | n/a |

Returns the object itself for chaining;

##### .removeRow()
Removed an entire row of keys.

Please note that both `rowIndex < 0` and `rowIndex > rowQuantity`, will make the counter restart from their opposite bounds.

```javascript
(new InlineKeyboard()).removeRow(rowIndex);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| rowIndex | The row to be removed. | Integer | _false_ | n/a |

Returns the object itself for chaining;


##### .emptyRow()
Empty an entire row of keys but without removing the row.

Please note that both `rowIndex < 0` and `rowIndex > rowQuantity`, will make the counter restart from their opposite bounds.

```javascript
(new InlineKeyboard()).emptyRow(rowIndex);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| rowIndex | The row to be emptied. | Integer | _false_ | n/a |

Returns the object itself for chaining with `lastRow` property to keep trace of which was the emptied row.


##### .popRow()
Pops the last row of the keyboard.

```javascript
(new InlineKeyboard()).popRow(rowIndex);
```

Returns the object itself for chaining;

##### .rowLength()
Empty an entire row of keys but without removing the row.
Please note that both `rowIndex < 0` and `rowIndex > rowQuantity`, will make the counter restart from their opposite bounds.

```javascript
(new InlineKeyboard()).rowLength(rowIndex, ignoreLastRow = true);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| rowIndex | The row to be emptied. | Integer | _false_ | n/a |
| ignoreLastRow | Ignore last edited row | Boolean | _true_ | true

Returns the amount of buttons in a row.

#### Buttons


##### .push()
Adds `element` to the specified row.

Please note that both `rowIndex < 0` and `rowIndex > rowQuantity`, will make the counter restart from their opposite bounds.

```javascript
(new InlineKeyboard()).push(rowIndex, element, ignoreLastRow = true);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| rowIndex | The index of the row in which push. | Integer | _false_ | n/a
| element | The element to push | [InlineKeyboardButton](https://core.telegram.org/bots/api#inlinekeyboardbutton) | _false_ | n/a |
| ignoreLastRow | Ignore last edited row | Boolean | _true_ | true

Returns the object itself for chaining;

##### .pop()
Pops out the last element of a row.
Please note that both `rowIndex < 0` and `rowIndex > rowQuantity`, will make the counter restart from their opposite bounds.

```javascript
(new InlineKeyboard()).pop(rowIndex);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| rowIndex | The row from which pop the last element. | Integer | _false_ | n/a |

Returns the object itself for chaining;

##### Reply Keyboards

##### Constructor
```javascript
new ReplyKeyboard(...keys);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| keys | Multiple strings or objects for each button | [KeyboardButton](https://core.telegram.org/bots/api#keyboardbutton) | _false_ | n/a |


##### .addRow()
Adds a new row with specified elements.

```javascript
(new ReplyKeyboard()).addRow(...keys);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| keys | One Object per button | [InlineKeyboardButton](https://core.telegram.org/bots/api#inlinekeyboardbutton) | _false_ | n/a |

Returns the object itself (chaining) with `length` property for keyboard rows length.

##### .open()
Returns a keyboard structure to open a ReplyKeyboard.

```javascript
(new ReplyKeyboard()).open(options = { selective: false, one_time_keyboard: false, resize_keyboard: false });
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| options | Options of the button | Object | _true_ | `{ selective: false, one_time_keyboard: false, resize_keyboard: false }`

See for more: [Reply Keyboard Markup](https://core.telegram.org/bots/api#replykeyboardmarkup)

##### .close()
Returns a keyboard structure to close a ReplyKeyboard.

```javascript
(new ReplyKeyboard()).close(options = { selective: false });
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| options | Options of the button | Object | _true_ | `{ selective: false }`

See for more: [Reply Keyboard Remove](https://core.telegram.org/bots/api#replykeyboardremove)

##### Getter: getKeys
Returns an array containing the keys which compose the keyboard.



#### Inherited methods and properties

##### .export()
Returns a keyboard structure based on the type.

```javascript
.export(options = {}, override = "");
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| options  | Options to be added to `reply_markup` object | Object | _true_ | { }
| override | An override content to be sent in the structure | \<Any\> | _true_ | ""


##### .extract()
Returns the content of `reply_markup`.

```javascript
.extract(from);
```

| Parameters | Description | Type | Optional | Default value |
| ---------- | ----------- | ---- | -------- | ------------- |
| from | The structure obtained from .export() | Object | _false_ | n/a

Throws error if in `from` there's not the property `reply_markup`.

##### Getter: length
Returns the length of the keyboard (rows)
