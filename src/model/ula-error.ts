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

import { Expose } from 'class-transformer'

/**
 * The UlaError has an extra field
 * 'statusCode' and inherits the Error type.
 */
export class UlaError extends Error {
  private readonly _statusCode: string

  constructor (statusCode: string, message: string) {
    super(message)
    this._statusCode = statusCode
    Object.setPrototypeOf(this, UlaError.prototype)
  }

  /**
   * Status code
   * @return any
   */
  @Expose()
  public get statusCode (): any {
    return this._statusCode
  }

  /**
   * Converts a this object to a json object
   * @return object
   */
  public toJSON (): object {
    return {
      statusCode: this.statusCode,
      message: this.message,
      stack: this.stack
    }
  }
}
