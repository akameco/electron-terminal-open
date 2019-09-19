'use strict'
const path = require('path')
const fs = require('fs')
const pify = require('pify')
const ejs = require('ejs')
const commandInstaller = require('command-installer')
const fsP = pify(fs)

function getResourcesPath() {
  return process.resourcesPath
}

module.exports = async (app, opt) => {
  if (!app) {
    new Error('Expected a electron.app')
  }
  const name = app.getName()
  const from = path.resolve(__dirname, 'open.sh.ejs')
  const defaultOpt = { name, bundleId: `com.electron.${name}` }
  const output = await pify(ejs.renderFile)(from, { ...defaultOpt, ...opt })
  const outputPath = path.resolve(getResourcesPath(), `${name}.sh`)
  await fsP.writeFile(outputPath, output)
  await fsP.chmod(outputPath, '755')
  await commandInstaller(outputPath, name)
}
