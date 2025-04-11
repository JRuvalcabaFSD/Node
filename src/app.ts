import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');
  console.log(ws);

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('Hola desde el servidor');
  setInterval(() => {
    ws.send('Hola de nuevo');
  }, 2000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('Server running in port 3000');
