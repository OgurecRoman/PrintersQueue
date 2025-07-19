import app from './app.js';
import config from './config/config.js';

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// import { createServer } from 'node:http'

// const server = createServer((req, res) => {
//   res.end('Hello World')
// })

// server.listen(3000, () => {
//   console.log('Server running at http://localhost:3000')
// })