import { http } from 'msw';
import people from './dummy.json';

export const handlers = [
  http.get('/people', async (req, res, ctx) => {
    await sleep(200);

    return res(ctx.status(200), ctx.json(people));
  }),
  http.post('/people', async (req, res, ctx) => {
    await sleep(200);
    people.push({
      id: '345',
      name: 'son',
      country: 'asia',
      lang: 'php',
    });

    return res(ctx.status(201), ctx.json(people));
  }),
];

async function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
