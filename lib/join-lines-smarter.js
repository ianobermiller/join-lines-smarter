const {CompositeDisposable, Range} = require('atom');
const joinLines = require('./join-lines');

module.exports = {
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    return this.subscriptions.add(
      atom.commands.add(
        'atom-workspace',
        'join-lines-smarter:join-lines',
        event => this.joinLines(event)
      )
    );
  },

  deactivate() {
    return this.subscriptions.dispose();
  },

  joinLines(event) {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) {
      return;
    }

    // Do all of this within a single undo transaction
    editor.buffer.transact(() => {
      editor.getCursorBufferPositions().forEach((_, index) => {
        // Since each join will potentially remove a line, the cursor
        // positions will change, and we need to refetch them every iteration.
        const bufferPosition = editor.getCursorBufferPositions()[index];
        if (bufferPosition.row === editor.buffer.getLastRow()) {
          return;
        }

        const firstLine = editor.lineTextForBufferRow(bufferPosition.row);
        const secondLine = editor.lineTextForBufferRow(bufferPosition.row + 1);

        const newLines = joinLines(firstLine, secondLine);

        const selection = new Range(
          [bufferPosition.row, 0],
          [bufferPosition.row + 1, secondLine.length]
        );
        editor.setTextInBufferRange(selection, newLines);
      });
    });
  }
};
