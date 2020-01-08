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

import { HttpService } from '..'

export class BrowserHttpService implements HttpService {
  /**
   * Perform a JSON GET-request and wait
   * for response
   * @param {string} url
   * @return Object the json object response
   */
  public async getRequest (url: string): Promise<object> {
    const result = await fetch(url,
      {
        headers: { 'Content-Type': 'application/json' }
      })
    if (!result.ok) {
      throw new Error(result.statusText)
    }
    return result.json()
  }

  /**
   * Perform a POST-request and get the json contents back
   * @param {string} url
   * @param {string} postBody
   * @return Object json object
   */
  public async postRequest (url: string, postBody: object): Promise<object> {
    const result = await fetch(url,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody)
      })

    const data: any = await result.json()
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error)
    }
    if (!result.ok) {
      throw new Error(result.statusText)
    }
    return data
  }
}
