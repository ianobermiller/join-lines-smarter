const joinLines = require('../lib/join-lines');

function joinLinesTest(lines) {
  return joinLines(...lines.trim().split('\n'));
}

test('double quotes with dot delimiter', () => {
  expect(
    joinLinesTest(`
      "Lorem ipsum ".
      "dolor sit amet"
    `)
  ).toBe(`"Lorem ipsum dolor sit amet"`);
});

test('single quotes with plus delimiter', () => {
  expect(
    joinLinesTest(`
      'Lorem ipsum ' +
      'dolor sit amet'
    `)
  ).toBe(`'Lorem ipsum dolor sit amet'`);
});

test('single quotes with plus delimiter', () => {
  expect(
    joinLinesTest(`
      'Lorem ipsum ' +
      'dolor sit amet'
    `)
  ).toBe(`'Lorem ipsum dolor sit amet'`);
});

test('single quotes with no delimiter', () => {
  expect(
    joinLinesTest(`
      'Lorem ipsum '
      'dolor sit amet'
    `)
  ).toBe(`'Lorem ipsum dolor sit amet'`);
});

test('c-style line comments', () => {
  expect(
    joinLinesTest(`
      // Lorem ipsum
      // dolor sit amet
    `)
  ).toBe(`// Lorem ipsum dolor sit amet`);
});

test('scripting-style line comments', () => {
  expect(
    joinLinesTest(`
      # Lorem ipsum
      # dolor sit amet
    `)
  ).toBe(`# Lorem ipsum dolor sit amet`);
});

test('sql-style line comments', () => {
  expect(
    joinLinesTest(`
      ; Lorem ipsum
      ; dolor sit amet
    `)
  ).toBe(`; Lorem ipsum dolor sit amet`);
});

test('bullets or docblock', () => {
  expect(
    joinLinesTest(`
      * Lorem ipsum
      * dolor sit amet
    `)
  ).toBe(`* Lorem ipsum dolor sit amet`);
});

test('no space if opening paren', () => {
  expect(
    joinLinesTest(`
      foo(
        bar
    `)
  ).toBe(`foo(bar`);
});

test('no space if opening square bracket', () => {
  expect(
    joinLinesTest(`
      [
        bar
    `)
  ).toBe(`[bar`);
});

test('no space if opening curly brace', () => {
  expect(
    joinLinesTest(`
      {
        bar
    `)
  ).toBe(`{bar`);
});

test('no space if opening angle bracket', () => {
  expect(
    joinLinesTest(`
      foo<
        bar
    `)
  ).toBe(`foo<bar`);
});

test('yes space if opening angle bracket as operator', () => {
  expect(
    joinLinesTest(`
      foo <
        bar
    `)
  ).toBe(`foo < bar`);
});

test('no space if closing paren', () => {
  expect(
    joinLinesTest(`
        foo
      )
    `)
  ).toBe(`foo)`);
});

test('no space if closing square bracket', () => {
  expect(
    joinLinesTest(`
        foo
      ]
    `)
  ).toBe(`foo]`);
});

test('no space if closing curly brace', () => {
  expect(
    joinLinesTest(`
        foo
      }
    `)
  ).toBe(`foo}`);
});

test('no space if closing angle bracket', () => {
  expect(
    joinLinesTest(`
        foo
      >
    `)
  ).toBe(`foo>`);
});

test('no space or comma if closing paren', () => {
  expect(
    joinLinesTest(`
        foo,
      )
    `)
  ).toBe(`foo)`);
});

test('no space or comma if closing square bracket', () => {
  expect(
    joinLinesTest(`
        foo,
      ]
    `)
  ).toBe(`foo]`);
});

test('no space or comma if closing curly brace', () => {
  expect(
    joinLinesTest(`
        foo,
      }
    `)
  ).toBe(`foo}`);
});

test('no space or comma if closing angle bracket', () => {
  expect(
    joinLinesTest(`
        foo,
      >
    `)
  ).toBe(`foo>`);
});
