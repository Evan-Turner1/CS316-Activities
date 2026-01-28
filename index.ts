import { routeHello, routeAPINames, routeWeather } from "./routes.js";
import express, { Request, Response } from "express";

const server = express();
const port = 3000;

server.get("/hello", function (_req: Request, res: Response): void {
  const response = routeHello();
  res.send(response);
});

server.get(
  "/api/names",
  async function (_req: Request, res: Response): Promise<void> {
    let response: string;
    try {
      response = await routeAPINames();
      res.send(response);
    } catch (err) {
      console.log(err);
    }
  }
);

/*
The original function's Request type was generic, so I changed it to specifically
route the parameter types.
*/
server.get(
  "/api/weather/:zipcode",
  (req: Request<{ zipcode: string }>, res: Response): void => {
    const response = routeWeather({ zipcode: req.params.zipcode });
    res.send(response);
  }
);



server.listen(port, function (): void {
  console.log("Listening on " + port);
});
