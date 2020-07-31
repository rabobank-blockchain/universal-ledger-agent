/**
 * The UlaMessage type is used to
 * send messages (events) to ULA plugins.
 * The object is entirely dynamic, but it
 * does require a 'type' field, so the
 * plugins can recognize (or ignore) the
 * event.
 */
export declare class UlaMessage {
    private readonly _obj;
    constructor(obj: any);
    /**
     * The dynamic properties of the message
     * @return any
     */
    get properties(): any;
    /**
     * Converts a this object to a json object
     * @return object
     */
    toJSON(): object;
}
/**
 * @deprecated Please use UlaMessage
 * @see UlaMessage
 */
export declare class Message extends UlaMessage {
}
