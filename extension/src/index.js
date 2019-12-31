const ArgumentType = require('scratch-vm/src/extension-support/argument-type')
const BlockType = require('scratch-vm/src/extension-support/block-type')
const Cast = require('scratch-vm/src/util/cast')

const config = require('./config.js')

class DummyBlocks {
  constructor(runtime) {
    this.runtime = runtime
  }

  static get gui() {
    return {
      name: config.name,
      extensionId: config.id,
      collaborator: config.author,
      iconURL: config.image,
      insetIconURL: config.imageSmall,
      description: config.description,
      featured: true,
      disabled: false,
      internetConnectionRequired: false,
      bluetoothRequired: false,
      helpLink: config.url
    }
  }

  static get vm() {
    return { [config.id]: () => DummyBlocks }
  }

  getInfo() {
    return {
      id: config.id,
      name: config.name,
      blockIconURI: config.blockIcon,
      color1: config.colors && config.colors[0],
      color2: config.colors && config.colors[1],
      color3: config.colors && config.colors[2],
      blocks: [
        {
          opcode: 'say',
          blockType: BlockType.REPORTER,
          text: 'say [MESSAGE]',
          arguments: {
            MESSAGE: {
              type: ArgumentType.STRING,
              defaultValue: 'Hello, World!'
            }
          }
        }
      ]
    }
  }

  say(args) {
    const message = Cast.toString(args.MESSAGE)
    console.log(message)

    return message
  }
}

module.exports = DummyBlocks
