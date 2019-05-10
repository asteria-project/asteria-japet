# Asteria Japet

[![JEC version](https://img.shields.io/badge/ASTERIA-1.0-%239966FF.svg)](https://github.com/asteria-project)
[![npm version](https://badge.fury.io/js/asteria-japet.svg)](https://www.npmjs.com/package/asteria-japet)
[![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/mit-license.php)

The Japet framework is the implementation of the query language defined by the Astria specification.

## Requirements

Asteria Japet needs the following system parameters in order to work correctly:

- npm 3+
- TypeScript 3+

## Installation

Set up the Asteria Japet module with:

```bash
$ npm install asteria-japet --save
```

## Using Components

All Asteria Japet components have to be imported with the ES6 syntax:

```javascript
import { AsqlParser, AsqlToken } from 'asteria-japet';

const parser: AsqlParser = new AsqlParser();
const tokens: Array<AsqlToken> = parser.parse(query);
```

For a complete list of available components, please refer to the [API Reference](#api-reference) documentation.

## Running Tests

To execute all unit tests, use:

```bash
$ grunt test
```

## API Reference

The API Reference documentation is not included into the JEC Commons node module. To build the API reference documentation, use:

```bash
$ grunt doc
```

Documentation will be generated in the `docs/api-reference` repository.

The documentation generator is [TypeDoc](http://typedoc.org/)

## License
This Asteria Japet Project is licensed under MIT. Full license text is available in [LICENSE](LICENSE).

```
MIT License

Copyright (c) 2019 Pascal ECHEMANN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


[asteria-logo-url]: https://raw.githubusercontent.com/asteria-project/asteria/master/assets/logos/asteria-logo-264.png
