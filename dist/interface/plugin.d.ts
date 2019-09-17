/**
 * Every plugin must implement this interface
 */
import { EventHandler } from '../event-handler';
import { Message } from '..';
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
     * in the Message.
     * @param message
     * @param callback
     * @returns string - the statuscode
     */
    handleEvent(message: Message, callback: any): Promise<string>;
}
