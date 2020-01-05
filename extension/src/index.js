const ArgumentType = require('scratch-vm/src/extension-support/argument-type')
const BlockType = require('scratch-vm/src/extension-support/block-type')
const StageLayering = require('scratch-vm/src/engine/stage-layering')
const Cast = require('scratch-vm/src/util/cast')

const config = require('./config.js')

class CanvasBlocks {
  constructor(runtime) {
    this.runtime = runtime

    this.runtime.on('targetWasCreated', () => {
      this._createLayer()
    })
  }

  _createLayer() {
    if (!this.runtime.renderer) {
      return
    }

    if (!this._penSkinId) {
      this._penSkinId = this.runtime.renderer.createPenSkin()
      this._penDrawableId = this.runtime.renderer.createDrawable(
        StageLayering.PEN_LAYER
      )
      this.runtime.renderer.updateDrawableProperties(this._penDrawableId, {
        skinId: this._penSkinId
      })
    }

    if (!this.skin) {
      this.skin = this.runtime.renderer._allSkins[this._penSkinId]
    }

    if (!this.context) {
      this.context = this.skin._canvas.getContext('2d')
      this.context.font = '24px serif'
      this.context.fillStyle = 'rgb(0,0,0)'
    }
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
    return { [config.id]: () => CanvasBlocks }
  }

  getInfo() {
    return {
      id: config.id,
      name: config.name,
      menuIconURI: config.menuIcon,
      blockIconURI: config.blockIcon,
      color1: config.colors && config.colors[0],
      color2: config.colors && config.colors[1],
      color3: config.colors && config.colors[2],
      blocks: [
        {
          opcode: 'drawText',
          blockType: BlockType.COMMAND,
          text: 'draw [MESSAGE] at x: [X] y: [Y]',
          arguments: {
            MESSAGE: {
              type: ArgumentType.STRING,
              defaultValue: 'Hello, World!'
            },
            X: {
              type: ArgumentType.STRING,
              defaultValue: '0'
            },
            Y: {
              type: ArgumentType.STRING,
              defaultValue: '0'
            }
          }
        },
        {
          opcode: 'clear',
          blockType: BlockType.COMMAND,
          text: 'clear'
        }
      ]
    }
  }

  drawText(args) {
    const message = Cast.toString(args.MESSAGE)
    const x = Cast.toNumber(args.X)
    const y = Cast.toNumber(args.Y)

    this.context.fillText(message, x + 240, y + 180)

    this.skin._canvasDirty = true
    this.skin._silhouetteDirty = true
    this.runtime.requestRedraw()
  }

  clear() {
    this.runtime.renderer.penClear(this._penSkinId)

    this.runtime.requestRedraw()
  }
}

module.exports = CanvasBlocks
