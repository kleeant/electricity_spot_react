/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pagination } from '../models/Pagination';
import type { TSpotPriceSummary } from '../models/TSpotPriceSummary';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SpotPriceService {
    /**
     * get a test
     * @param dateFrom
     * @param dateTo
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getSpotPrices(
        dateFrom: string,
        dateTo: string,
    ): CancelablePromise<{
        data?: TSpotPriceSummary;
        _paging?: Pagination;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/spot_price',
            query: {
                'date_from': dateFrom,
                'date_to': dateTo,
            },
            errors: {
                400: `Request failed with invalid request content`,
                404: `API endpoint not found`,
                500: `unexpected internal error occured`,
            },
        });
    }
}
