const label = document.querySelector("#lbl-new-ticket")
const button = document.querySelector("button")


const getLastTicket = async ()=>{
  const lastTicket = await fetch("http://localhost:3000/api/ticket/last").then(resp=>resp.json())
  label.innerHTML = lastTicket
}

const createTicket = async ()=>{
  const {number} = await fetch("http://localhost:3000/api/ticket",{
    method:"POST",
    mode:"cors"
  }).then(resp=>resp.json())
  
  label.innerHTML = number
}

button.addEventListener("click",createTicket)
getLastTicket()