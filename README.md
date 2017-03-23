# join-lines-smarter

A smarter, language-agnostic Join Lines command.

- Merge string literals - single or double quote, `+`, `.`, or nothing as concat operator
- Merges line and docblock comments (supports `//`, `#`, `*`, and `;`)
- Removes trailing commas and omits spaces when merging onto a line with an opening or closing brace (`[]`, `{}`, `()`, or `<>`)

![Animated screenshot of Join Lines Smarter]( https://github.com/ianobermiller/join-lines-smarter/raw/master/join-lines-smarter.gif)
