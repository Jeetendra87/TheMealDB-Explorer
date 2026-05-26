import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

app.listen(env.port, () => {
  console.log(`TheMealDB Explorer API listening on http://localhost:${env.port}`);
});
