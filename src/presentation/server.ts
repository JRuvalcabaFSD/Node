import express, { Application, Request, Response, Router } from 'express';
import { join } from 'path';

interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  private readonly app: Application = express();
  private readonly port: number;
  private readonly publicPath?: string;
  private readonly routes: Router;
  private serverListener?: any;

  constructor(options: Options) {
    const { port, routes, publicPath = 'public' } = options;
    this.port = port;
    this.routes = routes;
    this.publicPath = publicPath;
  }

  async start() {
    //Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //Public folder
    this.app.use(express.static(this.publicPath!));

    //Routes
    this.app.use(this.routes);

    //SPA
    this.app.get(/^\/(?!api).*/, (req: Request, res: Response) => {
      const indexPath = join(
        __dirname,
        `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running in port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
