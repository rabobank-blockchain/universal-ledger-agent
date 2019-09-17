export interface IUlaResponse {
    statusCode: number;
    body: object;
}
/**
 * UlaResponse object is sent back to the caller
 * and acts like an HTTP response. It contains
 * a statuscode and a dynamic body.
 */
export declare class UlaResponse {
    private readonly _statusCode;
    private readonly _body;
    constructor(ulaResponse: IUlaResponse);
    /**
     * (HTTP) Status code
     * @return any
     */
    readonly statusCode: number;
    /**
     * The dynamic body
     * @return any
     */
    readonly body: any;
    /**
     * Converts a this object to a json string
     * @return object
     */
    toJSON(): object;
}
