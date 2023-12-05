import { uuid, sanitize } from './util'; // Replace with the actual path to your utility file

describe('uuid function', () => {
  test('returns a string with the correct format', () => {
    const uuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
    const result = uuid();
    expect(result).toMatch(uuidRegex);
  });
});

describe('sanitize function', () => {
  test('replaces special characters with HTML entities', () => {
    const inputString = '<script>alert("Hello!");</script>';
    const expectedOutput = '&lt;script&gt;alert(&quot;Hello!&quot;);&lt;&#x2F;script&gt;';
    const result = sanitize(inputString);
    expect(result).toBe(expectedOutput);
  });

  test('does not modify a string without special characters', () => {
    const inputString = 'Hello, World!';
    const result = sanitize(inputString);
    expect(result).toBe(inputString);
  });
});
