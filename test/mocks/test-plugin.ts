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

import { EventHandler, Message, Plugin, UlaResponse } from '../../src'

export class TestPlugin implements Plugin {
  private _eventHandler: EventHandler | undefined
  private _shouldThrow = false

  get name () {
    return 'TestPlugin'
  }

  set shouldThrow (value: boolean) {
    this._shouldThrow = value
  }

  initialize (eventHandler: EventHandler) {
    this._eventHandler = eventHandler
  }

  async handleEvent (message: Message, callback: any): Promise<string> {
    if (!message.properties.type.match(/did:test:[A-Za-z0-9]*;spec\/test\/1\.0\/this/g)) {
      return 'ignored' // This message is not intended for us
    }

    if (this._shouldThrow) {
      throw new Error('Something went wrong')
    }

    callback(new UlaResponse({
      statusCode: 200,
      body: {
        dude: 'It is working!'
      }
    }))

    return 'success'
  }
}
