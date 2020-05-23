# join-lines-smarter

A smarter, language-agnostic Join Lines command. https://atom.io/packages/join-lines-smarter

- Merge string literals - single or double quote, `+`, `.`, or nothing as concat operator
- Merges line and docblock comments (supports `//`, `#`, `*`, and `;`)
- Removes trailing commas and omits spaces when merging onto a line with an opening or closing brace (`[]`, `{}`, `()`, or `<>`)

![Animated screenshot of Join Lines Smarter]( https://github.com/ianobermiller/join-lines-smarter/raw/master/join-lines-smarter.gif)

TIP: use with [split-string-on-enter](https://atom.io/packages/split-string-on-enter) and [dockblockr](https://atom.io/packages/docblockr) to get the reverse; adding concatenation operators and leading comments when entering a new line.

Also available as a VS Code extension: https://marketplace.visualstudio.com/items?itemName=ianobermiller.join-lines-context-aware
