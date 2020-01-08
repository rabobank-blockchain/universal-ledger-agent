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

export interface HttpService {
  /**
   * Perform a JSON GET-request and wait
   * for response
   * @param {string} url
   * @return the json object response
   */
  getRequest (url: string): Promise<any>

  /**
   * Perform a POST-request
   * @param {string} url
   * @param {object} postBody
   * @return Object json object
   */
  postRequest (url: string, postBody: object): Promise<object>
}
