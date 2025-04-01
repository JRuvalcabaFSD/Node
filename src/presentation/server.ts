import express from 'express';
import { join } from 'path';

export class Server {
  private app = express();
  async start() {
    //* Middlewares
    //* Public folder

    this.app.use(express.static('public'));

    this.app.get(/(.*)/, (req, res) => {
      const indexPath = join(__dirname + '../../../public/index.html');
      res.sendFile(indexPath);
    });

    this.app.listen(3000, () => {
      console.log(`Server running on port ${3000}`);
    });
  }
}
