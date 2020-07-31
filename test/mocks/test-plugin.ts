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

import { EventHandler, UlaMessage, Plugin, UlaCallback, UlaError, UlaResponse } from '../../src'

export enum ErrorTypeToThrow {
  None = 0,
  UlaError = 1,
  RangeError = 2
}

export class TestPlugin implements Plugin {
  private _eventHandler: EventHandler | undefined
  private _shouldThrow: ErrorTypeToThrow = ErrorTypeToThrow.None

  get name () {
    return 'TestPlugin'
  }

  static get ulaErrorToThrow (): UlaError {
    return new UlaError('error-code', 'Something went wrong')
  }

  static get rangeErrorToThrow (): RangeError {
    return new RangeError('Something was out of bounds')
  }

  set shouldThrow (value: ErrorTypeToThrow) {
    this._shouldThrow = value
  }

  initialize (eventHandler: EventHandler) {
    this._eventHandler = eventHandler
  }

  async handleEvent (message: UlaMessage, callback: UlaCallback): Promise<string> {
    if (message.properties.type !== 'test') {
      return 'ignored' // This message is not intended for us
    }

    if (this._shouldThrow === ErrorTypeToThrow.UlaError) {
      throw TestPlugin.ulaErrorToThrow
    }

    if (this._shouldThrow === ErrorTypeToThrow.RangeError) {
      throw TestPlugin.rangeErrorToThrow
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
