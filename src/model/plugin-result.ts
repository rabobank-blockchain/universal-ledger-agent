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

import { classToPlain, Expose } from 'class-transformer'

/**
 * An array of PluginResults will be
 * returned by the ULA after handling
 * all messages
 */
export class PluginResult {
  private readonly _pluginName: string
  private readonly _statusCode: string

  constructor (pluginName: string, statusCode: any) {
    this._pluginName = pluginName
    this._statusCode = statusCode
  }

  /**
   * The plugin exited with
   * this status code
   * @return any
   */
  @Expose()
  public get statusCode (): any {
    return this._statusCode
  }

  /**
   * The name of the plugin
   * (Plugin.name property)
   * @return string
   */
  @Expose()
  public get pluginName (): string {
    return this._pluginName
  }

  /**
   * Converts a this object to a json object
   * @return object
   */
  public toJSON (): object {
    return classToPlain(this, { excludePrefixes: ['_'] })
  }
}
