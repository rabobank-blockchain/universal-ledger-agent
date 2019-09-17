"use strict";
/*
 * Copyright 2019 Coöperatieve Rabobank U.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The ULA Message type is used to
 * send messages (events) to ULA plugins.
 * The object is entirely dynamic, but it
 * does require a 'type' field, so the
 * plugins can recognize (or ignore) the
 * event.
 */
class Message {
    constructor(obj) {
        if (!obj.type) {
            throw new ReferenceError('Type field is missing');
        }
        this._obj = obj;
    }
    /**
     * The dynamic properties of the message
     * @return any
     */
    get properties() {
        return this._obj;
    }
    /**
     * Converts a this object to a json string
     * @return object
     */
    toJSON() {
        return this._obj;
    }
}
exports.Message = Message;
//# sourceMappingURL=message.js.map