import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.get("/", (_, res) => {
  res.send("Hello World!");
});
app.get("/ip", async (_, res) => {
  const resp = await fetch("https://api.ipify.org?format=json");
  const json = await resp.json();
  res.json(json);
});
app.get("/users", async (_, res) => {
  console.log("get_users");
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true
    }
  });
  res.json(allUsers);
});
const vitePrismaApp = app;
export {
  vitePrismaApp
};
