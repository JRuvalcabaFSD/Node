import { Handler, HandlerContext, HandlerEvent, HandlerResponse } from "@netlify/functions";

const handler:Handler=async (event:HandlerEvent,context:HandlerContext)=>{
  console.log("Hola mundo desde hello Handler");
  return {
    statusCode:200,
    body:JSON.stringify({message:"Hola mundo"}),    
    headers:{
      "Content-Type":"application/json"
    }
  }
  
}

export {handler}