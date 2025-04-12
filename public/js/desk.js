
const lblPending = document.querySelector("#lbl-pending")
const lblDesk = document.querySelector("h1")
const alert = document.querySelector(".alert")
const btnDraw = document.querySelector("#btn-draw")
const btnDone = document.querySelector("#btn-done")
const currentTicketLbl = document.querySelector("small")

const urlParams = new URLSearchParams(window.location.search)
const desk = urlParams.get("escritorio")
let workingTicker = null


async function getTicket(){
  await finishTicket()
  const {status,ticket,message} = await fetch(`api/ticket/draw/${desk}`).then(resp=>resp.json())
  
  if (status==="error") {
    currentTicketLbl.innerHTML = message
    return
  }

  workingTicker = ticket
  currentTicketLbl.innerHTML = ticket.number
}

async function finishTicket() {
  if (!workingTicker) return
  const {status,message} = await fetch(`api/ticket/done/${workingTicker.id}`,{method:"PUT"}).then(resp=>resp.json())

  if (status==="ok") {
    workingTicker=null
    currentTicketLbl.innerHTML = "Nadie"
  }
  
  
}

async function loadInitialCount() {
  console.log("load");
  
  const pending = await fetch("/api/ticket/pending").then(resp=>resp.json())
  toggleAlert(pending.length)
  
}

function connectToWebSockets() {

  const socket = new WebSocket( 'ws://localhost:3000/ws' );

  socket.onmessage = ( event ) => {
    const {type,payload} = JSON.parse(event.data)
    if(type==="on-ticket-count-changed") toggleAlert(payload)
  };

  socket.onclose = ( event ) => {
    console.log( 'Connection closed' );
    setTimeout( () => {
      console.log( 'retrying to connect' );
      connectToWebSockets();
    }, 1500 );

  };

  socket.onopen = ( event ) => {
    console.log( 'Connected' );
    loadInitialCount()
  };

}

function toggleAlert(currentCunt=0) {
  if (currentCunt === 0) {
    alert.classList.remove("d-none")
  } else {
    alert.classList.add("d-none")
  }
  lblPending.innerHTML=currentCunt
  lblPending.style.display= currentCunt < 1 ? "none" : "block"
}

btnDraw.addEventListener("click",getTicket)
btnDone.addEventListener("click",finishTicket)

lblDesk.innerHTML=desk
connectToWebSockets();
loadInitialCount()