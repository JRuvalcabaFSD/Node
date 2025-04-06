import express, { Router } from 'express';
import compresion from 'compression';
import { join } from 'path';

interface Options {
  port: number;
  public_path: string;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly public_path: string;
  private readonly routes: Router;

  constructor({ port, public_path, routes }: Options) {
    this.port = port;
    this.public_path = public_path;
    this.routes = routes;
  }
  async start() {
    //* Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compresion());

    //* Public folder
    this.app.use(express.static(this.public_path));

    //* Routes
    this.app.use('/api', this.routes);

    //* SPA
    this.app.get(/(.*)/, (req, res) => {
      const indexPath = join(__dirname + `../../../${this.public_path}/index.html`);
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${3000}`);
    });
  }
  public close() {
    this.serverListener?.close();
  }
}
