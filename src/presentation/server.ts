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
    //* Public folder

    this.app.use(express.static(this.public_path));

    this.app.get(/(.*)/, (req, res) => {
      const indexPath = join(__dirname + `../../../${this.public_path}/index.html`);
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${3000}`);
    });
  }
}
