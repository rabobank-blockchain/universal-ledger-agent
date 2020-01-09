/**
 * An array of PluginResults will be
 * returned by the ULA after handling
 * all messages
 */
export declare class PluginResult {
    private readonly _pluginName;
    private readonly _statusCode;
    constructor(pluginName: string, statusCode: any);
    /**
     * The plugin exited with
     * this status code
     * @return any
     */
    get statusCode(): any;
    /**
     * The name of the plugin
     * (Plugin.name property)
     * @return string
     */
    get pluginName(): string;
    /**
     * Converts a this object to a json object
     * @return object
     */
    toJSON(): object;
}
