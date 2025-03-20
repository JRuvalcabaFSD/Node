const { getAge } =require("./getAge.plugin")
const { getUuid } = require("./uuid.plugin")
const httpClientPlugin = require("./http-client.plugin")
const {buildLogger} = require("./logger.plugin")

module.exports={getAge,getUuid,httpClientPlugin,buildLogger}