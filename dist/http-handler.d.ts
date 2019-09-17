import { EventHandler } from '.';
export declare class HttpHandler {
    private eventHandler;
    constructor(eventHandler: EventHandler);
    handleRequest(request: any, callback: any): Promise<void>;
}
