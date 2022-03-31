'use strict'
const data = require('../data/a4Line')
const lineNotify = require('line-notify-nodejs')('cIRccWXWsoEbHOVqjd0ss3mNnlphVPx273kSJMlF79g')

const getEvent = async (req, res, next) => {
  try {
    let result = await data.getEvent()
    result = await JSON.stringify(result)
      .replace(/[[]/g, '')
      .replace(/[\]]/g, '')
      .replace(/[_VALUE]/g, '')
    result = JSON.parse(result)
    for (let id in result) {
      if (result[id] == true) {
        lineNotify
          .notify({
            message: '\n\n' + '⚡ ' + id,
          })
          .then(() => {
            console.log('a4-1自動水洗警報發送')
          })
      }
    }
  } catch (error) {
  }
}

setInterval(() => {
  getEvent()
},60000)

module.exports = {
  getEvent,
}
