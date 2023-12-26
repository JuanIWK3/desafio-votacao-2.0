import express from "express";
import cors from "cors";
import { GetPautas } from "./application/usecase/GetPautas";
import { PautaRepositoryDatabase } from "./infra/repository/PautaRepositoryDatabase";
import { PrismaClient } from "@prisma/client";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { MainController } from "./infra/controller/MainController";
import GetUsers from "./application/usecase/GetUsers";
import { UserRepositoryDatabase } from "./infra/repository/UserRepositoryDatabase";
import { Signup } from "./application/usecase/Signup";
import { CreatePauta } from "./application/usecase/CreatePauta";
import { Signin } from "./application/usecase/Signin";

const httpServer = new ExpressAdapter();
const db = new PrismaClient();

const userRepo = new UserRepositoryDatabase(db);
const getUsers = new GetUsers(userRepo);
const signup = new Signup(userRepo);
const signin = new Signin(userRepo);

const pautaRepo = new PautaRepositoryDatabase(db);
const getPautas = new GetPautas(pautaRepo);
const createPauta = new CreatePauta(pautaRepo);

new MainController(
  httpServer,
  signup,
  signin,
  getUsers,
  createPauta,
  getPautas
);

httpServer.listen(4000);
