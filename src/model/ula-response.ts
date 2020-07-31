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

export interface IUlaResponse {
  statusCode: any
  body: any
  error?: Error
}

/**
 * UlaResponse object is sent back to the caller
 * and acts like an HTTP response. It contains
 * a statuscode and a dynamic body.
 */
export class UlaResponse {
  private readonly _statusCode: any
  private readonly _body: any
  private readonly _error?: Error

  constructor (ulaResponse: IUlaResponse) {
    this._statusCode = ulaResponse.statusCode
    this._body = ulaResponse.body
    this._error = ulaResponse.error
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
   * The dynamic body
   * @return any
   */
  @Expose()
  public get body (): any {
    return this._body
  }

  /**
   * (Optional) error
   * @return Error|undefined
   */
  @Expose()
  public get error (): Error | undefined {
    return this._error
  }

  /**
   * Converts a this object to a json object
   * NOTE: Some properties of the Error might
   *       be lost after serializing.
   * @return object
   */
  public toJSON (): object {
    const plainObject = classToPlain(this, { excludePrefixes: ['_'] }) as any
    plainObject.error = this._error ? {
      message: this._error.message,
      stack: this._error.stack
    } : undefined
    return plainObject as object
  }
}
