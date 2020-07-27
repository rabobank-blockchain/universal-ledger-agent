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
exports.EventHandler = void 0
const _1 = require(".");
const plugin_result_1 = require("./model/plugin-result");
class EventHandler {
    // private disabledPlugins: Plugin[] = []
    constructor(plugins) {
        this.plugins = plugins;
        this.enabledPlugins = [];
        for (const plugin of plugins) {
            plugin.initialize(this);
            this.enabledPlugins.push(plugin);
        }
    }
    /**
     * Broadcasts a message (jsonObject) to all enabled plugins
     *
     * @param jsonObject
     * @param callback
     */
    processMsg(jsonObject, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            // Broadcast the event
            for (const plugin of this.enabledPlugins) {
                promises.push(new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    let statusCode = 'unknown';
                    try {
                        statusCode = yield plugin.handleEvent(new _1.UlaMessage(jsonObject), callback);
                    }
                    catch (err) {
                        statusCode = err instanceof _1.UlaError ? err.statusCode : 'error'; // Unknown error
                        callback(new _1.UlaResponse({ statusCode, body: {}, error: err }));
                    }
                    finally {
                        resolve(new plugin_result_1.PluginResult(plugin.name, statusCode));
                    }
                })));
            }
            return Promise.all(promises);
        });
    }
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=event-handler.js.map
