export declare enum GenericStatusCode {
    /**
     * In case your plugin ignored
     * the incoming message.
     */
    Ignored = "ignored",
    /**
     * Generic, unknown error
     * Please use a more specific
     * error code in your plugin!
     */
    Error = "error",
    /**
     * Use this code once your plugin
     * successfully finished its work.
     */
    Success = "success"
}
