/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VisitLinkService {

    /**
     * @param shortUrl
     * @returns any
     * @throws ApiError
     */
    public static visitControllerFindOneAndRedirect(
        shortUrl: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/{shortUrl}',
            path: {
                'shortUrl': shortUrl,
            },
        });
    }

}
