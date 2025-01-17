import express from "express";
import HttpServer from "./HttpServer";
import cors from "cors";

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  register(method: string, url: string, callback: Function): void {
    this.app[method](url, async function (req: any, res: any) {
      try {
        const output = await callback(req.params, req.body);
        res.json(output);
      } catch (e: any) {
        res.status(422).json({
          message: e.message,
        });
      }
    });
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
