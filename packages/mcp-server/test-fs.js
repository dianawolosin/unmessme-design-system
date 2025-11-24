
import * as fsStar from 'fs-extra';
import fsDefault from 'fs-extra';
import { readFile } from 'fs-extra';

console.log('Star export keys:', Object.keys(fsStar));
console.log('Default export keys:', Object.keys(fsDefault || {}));
console.log('Named export readFile:', typeof readFile);

