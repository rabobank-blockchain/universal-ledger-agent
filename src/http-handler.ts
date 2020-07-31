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

import { EventHandler } from '.'

/**
 * @deprecated Please use the EventHandler
 * Incase your request is a string, parse it
 * before calling the EventHandler.
 * @see https://github.com/rabobank-blockchain/universal-ledger-agent/issues/11
 */
export class HttpHandler {

  constructor (private eventHandler: EventHandler) {
  }

  async handleRequest (request: any, callback: any) {
    // Parse JSON string to JSON object
    if (typeof request === 'string') {
      request = JSON.parse(request)
    }

    await this.eventHandler.processMsg(request, callback)
  }
}
