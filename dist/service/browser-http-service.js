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

"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {value: true})
exports.BrowserHttpService = void 0
class BrowserHttpService {
    /**
     * Perform a JSON GET-request and wait
     * for response
     * @param {string} url
     * @return Object the json object response
     */
    getRequest(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch(url, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (!result.ok) {
                throw new Error(result.statusText);
            }
            return result.json();
        });
    }
    /**
     * Perform a POST-request and get the json contents back
     * @param {string} url
     * @param {string} postBody
     * @return Object json object
     */
    postRequest(url, postBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postBody)
            });
            const data = yield result.json();
            if (data.hasOwnProperty('error')) {
                throw new Error(data.error);
            }
            if (!result.ok) {
                throw new Error(result.statusText);
            }
            return data;
        });
    }
}
exports.BrowserHttpService = BrowserHttpService;
//# sourceMappingURL=browser-http-service.js.map
