import { HttpService } from '..';
export declare class BrowserHttpService implements HttpService {
    /**
     * Perform a JSON GET-request and wait
     * for response
     * @param {string} url
     * @return Object the json object response
     */
    getRequest(url: string): Promise<object>;
    /**
     * Perform a POST-request and get the json contents back
     * @param {string} url
     * @param {string} postBody
     * @return Object json object
     */
    postRequest(url: string, postBody: object): Promise<object>;
}
