import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const payload = JSON.stringify({
      type: 'custom-message',
      payload: data.toString().toUpperCase(),
    });

    // //* Todo - incluyente
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) client.send(payload);
    // });

    //* Todo - excluyente
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN)
        client.send(payload);
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('Server running in port 3000');
