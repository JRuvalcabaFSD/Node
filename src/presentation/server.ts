import { join } from 'path';
import { Server } from 'http';
import express, { Application, Request, Response, Router } from 'express';
import fileUpload from 'express-fileupload';

interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class AppServer {
  public readonly app: Application = express();
  private serverListener?: Server;
  private readonly port: number;
  private readonly routes: Router;
  private readonly publicPath: string;

  constructor(options: Options) {
    const { port, routes, publicPath = 'public' } = options;
    this.port = port;
    this.routes = routes;
    this.publicPath = publicPath;
  }

  async start(): Promise<void> {
    //*Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

    //*Public folder
    this.app.use(express.static(this.publicPath));

    //*Routes
    this.app.use(this.routes);

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    this.app.get(/^\/(?!api).*/, (req: Request, res: Response) => {
      const indexPath = join(__dirname, '../../../${ this.publicPath }/index.html');
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running in port ${this.port}`);
    });
  }

  public close(): void {
    this.serverListener?.close();
  }
}
