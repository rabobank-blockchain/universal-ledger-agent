export interface HttpService {
    /**
     * Perform a JSON GET-request and wait
     * for response
     * @param {string} url
     * @return the json object response
     */
    getRequest(url: string): Promise<any>;
    /**
     * Perform a POST-request
     * @param {string} url
     * @param {object} postBody
     * @return Object json object
     */
    postRequest(url: string, postBody: object): Promise<object>;
}
