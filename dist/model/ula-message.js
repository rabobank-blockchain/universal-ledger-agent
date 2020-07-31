/*
 * Copyright 2020 Coöperatieve Rabobank U.A.
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

"use strict"
/*
 * Copyright 2020 Coöperatieve Rabobank U.A.
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
Object.defineProperty(exports, "__esModule", {value: true})
exports.Message = exports.UlaMessage = void 0

/**
 * The UlaMessage type is used to
 * send messages (events) to ULA plugins.
 * The object is entirely dynamic, but it
 * does require a 'type' field, so the
 * plugins can recognize (or ignore) the
 * event.
 */
class UlaMessage {
  constructor(obj) {
    if (!obj.type) {
      throw new ReferenceError('Type field is missing')
    }
    this._obj = obj
  }

  /**
   * The dynamic properties of the message
   * @return any
   */
  get properties() {
    return this._obj
  }

  /**
   * Converts a this object to a json object
   * @return object
   */
  toJSON() {
    return this._obj
  }
}

exports.UlaMessage = UlaMessage

/**
 * @deprecated Please use UlaMessage
 * @see UlaMessage
 */
class Message extends UlaMessage {
}

exports.Message = Message
//# sourceMappingURL=ula-message.js.map
