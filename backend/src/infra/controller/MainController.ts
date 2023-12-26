import { CreatePauta } from "../../application/usecase/CreatePauta";
import { GetPautas } from "../../application/usecase/GetPautas";
import GetUsers from "../../application/usecase/GetUsers";
import { Signin } from "../../application/usecase/Signin";
import { Signup } from "../../application/usecase/Signup";
import HttpServer from "../http/HttpServer";

export class MainController {
  constructor(
    readonly httpServer: HttpServer,
    signup: Signup,
    signin: Signin,
    getUsers: GetUsers,
    createPauta: CreatePauta,
    getPautas: GetPautas
  ) {
    httpServer.register("post", "/signup", async (params: any, body: any) => {
      return await signup.execute(body);
    });

    httpServer.register("get", "/users", async (params: any, body: any) => {
      return await getUsers.execute(body);
    });

    httpServer.register(
      "post",
      "/pautas/create",
      async (params: any, body: any) => {
        return await createPauta.execute(body);
      }
    );

    httpServer.register("get", "/pautas", async (params: any, body: any) => {
      return await getPautas.execute();
    });

    httpServer.register("post", "/signin", async (params: any, body: any) => {
      return await signin.execute(body);
    });
  }
}
