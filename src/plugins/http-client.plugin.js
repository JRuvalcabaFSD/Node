const httpClientPlugin = {
  get: async (url) => {
    const resp = await fetch(url)
    return await resp.json()
  },
  port:(url,body)=>{},
  put:(url,body)=>{},
  delete:(url)=>{},
}

module.exports = httpClientPlugin