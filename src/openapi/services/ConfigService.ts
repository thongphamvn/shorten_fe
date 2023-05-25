/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EditShortDto } from '../models/EditShortDto';
import type { ShortenResponse } from '../models/ShortenResponse';
import type { ShortenUrlDto } from '../models/ShortenUrlDto';
import type { StatsPeriod } from '../models/StatsPeriod';
import type { StatsResponse } from '../models/StatsResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConfigService {

    /**
     * @param requestBody
     * @returns ShortenResponse
     * @throws ApiError
     */
    public static shortenControllerCreate(
        requestBody: ShortenUrlDto,
    ): CancelablePromise<ShortenResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/shorten',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns ShortenResponse
     * @throws ApiError
     */
    public static shortenControllerFindAll(): CancelablePromise<Array<ShortenResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/shorten',
        });
    }

    /**
     * @param shortUrl
     * @returns ShortenResponse
     * @throws ApiError
     */
    public static shortenControllerFindOne(
        shortUrl: string,
    ): CancelablePromise<ShortenResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/shorten/{shortUrl}',
            path: {
                'shortUrl': shortUrl,
            },
        });
    }

    /**
     * @param shortUrl
     * @param requestBody
     * @returns ShortenResponse
     * @throws ApiError
     */
    public static shortenControllerUpdate(
        shortUrl: string,
        requestBody: EditShortDto,
    ): CancelablePromise<ShortenResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/shorten/{shortUrl}',
            path: {
                'shortUrl': shortUrl,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param shortUrl
     * @returns void
     * @throws ApiError
     */
    public static shortenControllerDelete(
        shortUrl: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/shorten/{shortUrl}',
            path: {
                'shortUrl': shortUrl,
            },
        });
    }

    /**
     * @param shortUrl
     * @param period
     * @returns StatsResponse
     * @throws ApiError
     */
    public static shortenControllerGetStatistics(
        shortUrl: string,
        period: StatsPeriod,
    ): CancelablePromise<Array<StatsResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/shorten/{shortUrl}/stats',
            path: {
                'shortUrl': shortUrl,
            },
            query: {
                'period': period,
            },
        });
    }

}
