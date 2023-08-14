import express from 'express';
import { PrismaClient } from '@prisma/client'

const app: express.Express = express()

const prisma = new PrismaClient()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// これは全通しのあかんやつ
app.use((_: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Headers", "*");
  next();
})

app.get('/', (_: express.Request, res: express.Response) => {
  res.send('Hello World!')
})

app.get('/ip', async (_, res) => {
  const resp = await fetch('https://api.ipify.org?format=json');
  const json = await resp.json();
  res.json(json);
});

app.get('/users', async (_: express.Request, res: express.Response) => {

  console.log("get_users");
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  res.json(allUsers)
})

// if (import.meta.env.VITE_PROD) {

//   app.listen(3000);
//   console.log('listening on http://localhost:3000/ ------------------- ');
// }

export const vitePrismaApp = app;