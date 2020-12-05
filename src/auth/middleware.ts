import expressJWT from "express-jwt";
import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import { getEnvValue } from "./env/env";

export function middlewareJWT(
	request: Request,
	response: Response,
	next: NextFunction
): any {
	try {
		//@ts-ignore
		const environment = getEnvValue('mode');
		console.log('environment', environment);
		const isDebugMode = environment === "debug" ? true : false;
		if (isDebugMode) {
			return next();
		}
		const publicKeyPath = getEnvValue("PUBLIC_KEY_LOCATION");
		const publicKey = fs.readFileSync(publicKeyPath, {
			encoding: "utf8",
		});
		return expressJWT({
			secret: publicKey,
			algorithms: ["RS256"],
		})(request, response, next);
	} catch (e) {
		return response.status(500).send({
			message: "Server Error",
			Error: e.message,
		});
	}
}
// export function errorHandler(
// 	err: Error,
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) {
// 	if (err.name === "UnAuthorizedError") {
// 		return res.status(401).send({ message: "Invalid Token" });
// 	}
// }
