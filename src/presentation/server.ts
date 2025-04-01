import express from 'express';
import { join } from 'path';

interface Options {
  port: number;
  public_path: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly public_path: string;

  constructor({ port, public_path }: Options) {
    this.port = port;
    this.public_path = public_path;
  }
  async start() {
    //* Middlewares

    //* Routes
    this.app.get('/api/todos', (req, res) => {
      res.json([
        { id: 1, text: 'Buy milk', createdAt: new Date() },
        { id: 2, text: 'Buy bread', createdAt: null },
        { id: 3, text: 'Buy butter', createdAt: new Date() },
      ]);
    });

    //* Public folder
    this.app.use(express.static(this.public_path));

    //* SPA
    this.app.get(/(.*)/, (req, res) => {
      const indexPath = join(__dirname + `../../../${this.public_path}/index.html`);
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${3000}`);
    });
  }
}
