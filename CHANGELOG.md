## v3.0.1

- Added Typescript support to BotAPI v6.0 `web_app` field for `InlineKeyboardButton` and `KeyboardButton`;
- Improved example
- Other small improvements

---

## v3.0.0

Completely redesign the library's API. From now on, it won't export anymore an object with `reply_markup`. Instead, it will export just the content for `reply_markup`, which will vary from keyboard to keyboard.
