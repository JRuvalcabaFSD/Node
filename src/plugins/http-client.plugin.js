const axios = require("axios")

const httpClientPlugin = {
  get: async (url) => {
    const { data } = await axios.get(url)
    return data
    
  },
  port:(url,body)=>{},
  put:(url,body)=>{},
  delete:(url)=>{},
}

module.exports = httpClientPlugin