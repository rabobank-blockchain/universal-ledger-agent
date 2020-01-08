/**
 * Every plugin must implement this interface
 */
import { EventHandler } from '../event-handler';
import { UlaMessage, UlaCallback } from '..';
export interface Plugin {
    /**
     * This method is called when the EventHandler is being constructed.
     * @param eventHandler can be used to pass new messages back to other
     * plugins.
     */
    initialize(eventHandler: EventHandler): void;
    /**
     * This property is the name of the plugin. Other plugins can call this
     * plugin using this name,
     */
    name: string;
    /**
     * This method is called when the EventHandler received a message.
     * The message is broadcasted, so the plugin must match the 'type' field
     * in the UlaMessage.
     * @param message - the received message from the ULA
     * @param callback - your callback function to listen for results
     * @returns string - the statuscode
     */
    handleEvent(message: UlaMessage, callback: UlaCallback): Promise<string>;
}
