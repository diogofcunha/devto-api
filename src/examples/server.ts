/**
 * This is an example NodeJS server that uses the api.
 * To be used as playground in local development.
 */

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

import {createArticle, updateArticle} from '..';

const app = new Koa();
const router = new Router();

router.post('articles/', async (ctx) => {
  const payload = ctx.request.body;
  const apiKey = ctx.request.headers['api-key'];

  ctx.body = await createArticle(payload, apiKey);
});

router.put('articles/:articleId', async (ctx) => {
  const payload = ctx.request.body;
  const apiKey = ctx.request.headers['api-key'];
  const {articleId} = ctx.params;

  ctx.body = await updateArticle(payload, apiKey, articleId);
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

// tslint:disable-next-line: no-console
console.log('Listening on port 3000');
