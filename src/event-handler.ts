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

import { UlaMessage, Plugin, UlaCallback, UlaError, UlaResponse } from '.'
import { PluginResult } from './model/plugin-result'

export class EventHandler {
  private enabledPlugins: Plugin[] = []
  // private disabledPlugins: Plugin[] = []

  constructor (private plugins: any[]) {
    for (const plugin of plugins) {
      plugin.initialize(this)
      this.enabledPlugins.push(plugin)
    }
  }

  /**
   * Broadcasts a message (jsonObject) to all enabled plugins
   *
   * @param jsonObject
   * @param callback
   */
  async processMsg (jsonObject: any, callback: UlaCallback) {
    const promises: Promise<PluginResult>[] = []
    // Broadcast the event
    for (const plugin of this.enabledPlugins) {
      promises.push(new Promise(async (resolve) => {
        let statusCode: string = 'unknown'
        try {
          statusCode = await plugin.handleEvent(new UlaMessage(jsonObject), callback)
        } catch (err) {
          statusCode = err instanceof UlaError ? err.statusCode : 'error' // Unknown error
          callback(new UlaResponse({ statusCode, body: {}, error: err }))
        } finally {
          resolve(new PluginResult(plugin.name, statusCode))
        }
      }))
    }

    return Promise.all(promises)
  }

  // /**
  //  * Initializes and enables a new plugin.
  //  * If the plugin already exists, it will be skipped.
  //  * @param plugin
  //  */
  // loadPlugin (plugin: Plugin) {
  //   if (this.enabledPlugins.indexOf(plugin) !== -1) {
  //     plugin.initialize(this)
  //     this.enabledPlugins.push(plugin)
  //   }
  //
  //   if (this.disabledPlugins.indexOf(plugin) !== -1) {
  //     this.disabledPlugins.slice(this.disabledPlugins.indexOf(plugin), 1)
  //   }
  // }
  //
  // /**
  //  * Enables a disabled (but loaded) plugin.
  //  * The plugin will receive new messages and data requests.
  //  * @param plugin
  //  */
  // enablePlugin (plugin: Plugin) {
  //   if (this.disabledPlugins.indexOf(plugin) !== -1) {
  //     this.disabledPlugins.slice(this.disabledPlugins.indexOf(plugin), 1)
  //     this.enabledPlugins.push(plugin)
  //   }
  // }
  //
  // /**
  //  * Disables a loaded plugin.
  //  * The plugin will not receive messages and data requests.
  //  * @param plugin
  //  */
  // disablePlugin (plugin: Plugin) {
  //   if (this.enabledPlugins.indexOf(plugin) !== -1) {
  //     this.enabledPlugins.slice(this.enabledPlugins.indexOf(plugin), 1)
  //     this.disabledPlugins.push(plugin)
  //   }
  // }
}
