export declare class EventHandler {
    private plugins;
    private enabledPlugins;
    constructor(plugins: any[]);
    /**
     * Broadcasts a message (jsonObject) to all enabled plugins
     *
     * @param jsonObject
     * @param callback
     */
    processMsg(jsonObject: any, callback: any): Promise<void[]>;
}
