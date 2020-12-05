import { env } from '../../kit/env';
import axios from 'axios';
import express from 'express';

export type ProxyDependencies = {};

export function proxy(dependencies: ProxyDependencies) {
    console.log(dependencies);
    //@ts-ignore
    return async (req: ReqBody, response: express.Response) => {
        try {
            const secretKey = env.getEnvValue('SECRET_KEY');
            const configurations = await axios.get(
                'https://staging.api.scalapay.com/v2/configurations',
                {
                    headers: {
                        Authorization: `Bearer ${secretKey}`,
                        Accept: 'application/json',
                    },
                }
            );

            response.status(200).send(configurations.data);
        } catch (error) {
            response.status(400).send({
                error,
            });
        }
    };
}
