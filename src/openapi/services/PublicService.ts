/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PublicService {
    /**
     * api healthcheck
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getHealthCheck(): CancelablePromise<{
        data?: {
            uptime?: string;
            status?: string;
            version?: string;
            timestamp?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/healthcheck',
            errors: {
                404: `API endpoint not found`,
                500: `unexpected internal error occured`,
            },
        });
    }
}
