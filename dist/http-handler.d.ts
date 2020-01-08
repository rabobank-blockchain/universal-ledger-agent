import { EventHandler } from '.';
/**
 * @deprecated Please use the EventHandler
 * Incase your request is a string, parse it
 * before calling the EventHandler.
 * @see https://github.com/rabobank-blockchain/universal-ledger-agent/issues/11
 */
export declare class HttpHandler {
    private eventHandler;
    constructor(eventHandler: EventHandler);
    handleRequest(request: any, callback: any): Promise<void>;
}
