'use strict';
const path = require('path');
const fs = require('fs');
const pify = require('pify');
const ejs = require('ejs');
const co = require('co');
const commandInstaller = require('command-installer');
const fsP = pify(fs);

function getResourcesPath() {
	return process.resourcesPath;
}

module.exports = (app, opt) => {
	return new Promise((resolve, reject) => {
		if (!app) {
			reject(new Error('Expected a electron.app'));
		}
		co(function * () {
			const name = app.getName();
			const from = path.resolve(__dirname, 'open.sh.ejs');
			const defaultOpt = {name, bundleId: `com.electron.${name}`};
			const output = yield pify(ejs.renderFile)(from, Object.assign({}, defaultOpt, opt));
			const outputPath = path.resolve(getResourcesPath(), `${name}.sh`);
			yield fsP.writeFile(outputPath, output);
			yield fsP.chmod(outputPath, '755');
			yield commandInstaller(outputPath, name);
			resolve();
		}).catch(err => {
			reject(err);
		});
	});
};
