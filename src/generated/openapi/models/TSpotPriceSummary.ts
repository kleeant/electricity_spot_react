/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TSpotPrice } from './TSpotPrice';
import type { TSpotPriceSummaryMeta } from './TSpotPriceSummaryMeta';
export type TSpotPriceSummary = {
    from: string;
    to: string;
    meta: TSpotPriceSummaryMeta;
    prices: Array<TSpotPrice>;
};

