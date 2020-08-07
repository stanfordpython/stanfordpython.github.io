# React Markdown file
> A react component for retrieving and rendering markdown files.

## Installing
Install via npm/yarn:

```bash
npm install --save react-md-file
```

## Usage
Then simply require and pass a file name.  If you wish the nest the resulting markup (move h1s to h2s), set the nested property to true.

```js
import ReactMd from 'react-md-file';

<ReactMd markdown="# hello world" />
<ReactMd fileName="README.md" />
<ReactMd fileName="README.md" nested />
```
