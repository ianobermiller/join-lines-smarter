'use strict';

const joinMarker = 'ihndeebvdbccfiehktkununjgklnedefjfgjllkdkdrrvbtuibkguhtvrtbbrrni';
const stringConcatRegex = new RegExp(
  '(\' ?(\\\+|\\\.)?' + joinMarker + '\')|(" ?(\\\+|\\\.)?' + joinMarker + '")'
);

function joinLines(firstLine, secondLine) {
  let newLines = firstLine.trimRight() + joinMarker + secondLine.trimLeft();
  newLines = newLines.replace(stringConcatRegex, '');

  if (firstLine.trim().startsWith('//')) {
    newLines = newLines.replace(joinMarker + '// ', ' ');
  }

  if (firstLine.trim().startsWith('* ')) {
    newLines = newLines.replace(joinMarker + '* ', ' ');
  }

  if (firstLine.trim().startsWith('# ')) {
    newLines = newLines.replace(joinMarker + '# ', ' ');
  }

  if (firstLine.trim().startsWith('; ')) {
    newLines = newLines.replace(joinMarker + '; ', ' ');
  }

  // Eliminate trailing comma and space when joining a line with a comma
  // with a line with a closing bracket
  if (
    firstLine.trim().endsWith(',') &&
    startsWithClosingBracket(secondLine)
  ) {
    newLines = newLines.replace(',' + joinMarker, '');
  }

  const shouldSpace = !endsWithOpeningBracket(firstLine) &&
    !startsWithClosingBracket(secondLine);
  newLines = newLines.replace(joinMarker, shouldSpace ? ' ' : '');
  return newLines;
}

function endsWithOpeningBracket(s) {
  s = s.trim();
  const v = s[s.length - 1];
  if (v === '{' || v === '[' || v === '(') {
    return true;
  }

  // Preserve the space if it looks like `<` is an operator (with a space on
  // the left-hand side)
  if (v === '<' && s[s.length - 2] !== ' ') {
    return true;
  }

  return false;
}

function startsWithClosingBracket(s) {
  const v = s.trim()[0]
  return v === '}' || v === ']' || v === ')' || v === '>';
}

module.exports = joinLines;
