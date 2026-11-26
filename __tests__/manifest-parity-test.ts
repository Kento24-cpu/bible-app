import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const read = (file: string) => JSON.parse(readFileSync(join(__dirname, '..', file), 'utf8'));

const app = read('app.json').expo;
const pkg = read('package.json');

describe('app.json and package.json agree', () => {
  test('version', () => {
    expect(app.version).toBe(pkg.version);
  });

  test('slug matches the package name', () => {
    expect(app.slug).toBe(pkg.name);
  });
});
