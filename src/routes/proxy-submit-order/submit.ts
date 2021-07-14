import { env } from '../../kit/env';
import axios from 'axios';
import express from 'express';
import * as classTransformer from 'class-transformer';

export class ReqBodyParams {
    totalAmount?: {
        amount: string;
        currency: string;
    };

    consumer?: {
        amount: string;
        currency: string;
    };
}

type ReqBody = {
    body: ReqBodyParams;
};
export type ProxyDependencies = {};

export function orderSubmit(dependencies: ProxyDependencies) {
    console.log(dependencies);
    return async (req: ReqBody, response: express.Response) => {
        try {
            const secretKey = env.getEnvValue('SECRET_KEY');
            const body = classTransformer.plainToClass(
                ReqBodyParams,
                req?.body
            );
            const result = await axios.post(
                'https://staging.api.scalapay.com/v2/orders',
                body,
                {
                    headers: {
                        Authorization: `Bearer ${secretKey}`,
                        Accept: 'application/json',
                    },
                }
            );
            response.status(200).send(result.data);
        } catch (error) {
            console.log('Error', error?.response?.data?.error);
            response.status(400).send({
                Error: error?.response?.data?.error,
            });
        }
    };
}
