# Scratch3.0 Extension Template

This aims for a comprehensive template to develop a Scratch 3.0 extension easily.

* [scratch-gui](https://github.com/LLK/scratch-gui) and [scratch-vm](https://github.com/LLK/scratch-vm) have been integrated with ```git subtree``` and everything is built with [Rush](https://rushjs.io/)
* Live reloading is supported
* Testing (TBD)
* Built files can be deployed to GitHub Pages

## Background

Developing your own extension for Scratch 3.0 is a little tricky since your extension requires [scratch-gui](https://github.com/LLK/scratch-gui) and [scratch-vm](https://github.com/LLK/scratch-vm) to be executed and integration with them is not easy.
You can clone scratch-gui and scratch-vm individually and integrate your extension into them by using ```yarn link```.
But ```yarn link``` configures linkages between packages globally which means that you can have each package at only a particular directory.
If you would like to move a package to another directory or use a package at different directory, then you need to execute ```yarn unlink``` first to remove a global linkage which could be forgotten and not easy to manage everything.

So, this is developed for a out-of-the-box template which already integrate scratch-gui and scratch-vm with ```git subtree``` and can manage them with [Rush](https://rushjs.io/).
Rush is a quite useful monorepo manager but can be used for sub trees as packages.
It manages linkages between packages locally unlike ```yarn link``` and builds all packages in the right order according to dependencies like your extension, scratch-vm and scratch-gui.

Also, thanks to Rush running task for all packages simultaneously, live reloading works for all packages by running just a single Rush task.
When you change and save the source code of your extension, your extension and scratch-gui will be automatically built and browser will automatically reload scratch-gui with the latest extension.


## Prerequisites

* [Node.js](https://nodejs.org/) v10.13+ or v12
* [Rush](https://rushjs.io/) v5.17+

## Quick Start

Get this source code and install dependencies.

```
git clone https://github.com/eqot/scratch3-extension-template
cd scratch3-extension-template
rush update
```

Start a development server and watch update.

```
rush start
```

Build files.

```
rush build
```

Deploy built files to GitHub Pages.

```
rush deploy
```
