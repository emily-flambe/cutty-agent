import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8789/agents/chat/test-session');

ws.on('open', () => {
  console.log('Connected! Type your messages:');
  
  // Send a test message
  ws.send(JSON.stringify({
    message: "What is Cutty?",
    context: {}
  }));
});

ws.on('message', (data) => {
  const parsed = JSON.parse(data);
  if (parsed.body && parsed.body.includes('0:"')) {
    const match = parsed.body.match(/0:"([^"]+)"/);
    if (match) process.stdout.write(match[1]);
  }
});

// Send more messages after 3 seconds
setTimeout(() => {
  ws.send(JSON.stringify({
    message: "Generate 5 rows of data",
    context: {}
  }));
}, 3000);

// Close after 10 seconds
setTimeout(() => {
  ws.close();
  process.exit(0);
}, 10000);