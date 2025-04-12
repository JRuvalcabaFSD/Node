import express, { Application, Request, Response, Router } from 'express';
import { join } from 'path';

interface Options {
  port: number;
  publicPath?: string;
}

export class Server {
  public readonly app: Application = express();
  private readonly port: number;
  private readonly publicPath?: string;
  private serverListener?: any;

  constructor(options: Options) {
    const { port, publicPath = 'public' } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.configure();
  }

  private configure() {
    //Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //Public folder
    this.app.use(express.static(this.publicPath!));

    //SPA
    this.app.get(/^\/(?!api).*/, (req: Request, res: Response) => {
      const indexPath = join(
        __dirname,
        `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });
  }

  public setRoutes(router: Router) {
    this.app.use(router);
  }

  async start() {
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running in port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
