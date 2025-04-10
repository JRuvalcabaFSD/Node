import express, { Request, Response } from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/github.controller';
import { GithubSha256Middleware } from './presentation/middlewares/github_sha256.middeware';

(() => {
  main();
})();

function main() {
  const app = express();
  const { webHookHandler } = new GithubController();

  app.use(express.json());
  app.use(GithubSha256Middleware.verifyGithubSignature);

  app.post('/api/github', webHookHandler);

  app.listen(envs.PORT, () => {
    console.log(`App running on port ${envs.PORT}`);
  });
}
