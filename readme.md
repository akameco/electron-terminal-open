# electron-terminal-open [![Build Status](https://travis-ci.org/akameco/electron-terminal-open.svg?branch=master)](https://travis-ci.org/akameco/electron-terminal-open)

> Open App from Command Line Interface for Electron.


## Install

```
$ npm install --save electron-terminal-open
```


## Usage

require electron.

```js
'use strict';
const {BrowserWindow, app} = require('electron');
const parseArgs = require('minimist');
const electronTerminalOpen = require('electron-terminal-open');

let mainWindow;

function createMainWindow() {
	const win = new BrowserWindow({
		title: 'sample-app',
		width: 400,
		height: 500
	});

	if (process.env.NODE_ENV === 'development') {
		win.openDevTools();
	}

	win.loadURL(`https://kangax.github.io/compat-table/es6/`);
	win.on('closed', () => {
		mainWindow = null;
	});

	return win;
}

const args = parseArgs(process.argv.slice(1));

if (args.h || args.help) {
	console.log(`help sample`);
	process.exit(0); // eslint-disable-line
}

if (args.v || args.version) {
	console.log(app.getName(), app.getVersion());
	process.exit(0); // eslint-disable-line
}

app.on('ready', () => {
	electronTerminalOpen(app).then(() => {
		mainWindow = createMainWindow();
	}).catch(err => {
		console.log(err);
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});


```

See example.

### Support
Add executed-from prop to process.args.

```sh
$ pwd
/a/b/c
$ sample-app .
```

```js
args['executed-from'] // => /a/b/c
```


## API

### electronTerminalOpen(app, [options])

#### app

Type: `object`

electron.app

#### options

##### bundleId

Type: `string`<br>
Default: `com.electron.${app.getName()}`

app-bundle-id

## License

MIT © [akameco](https://akameco.github.io)
