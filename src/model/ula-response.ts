/*
 * Copyright 2019 Coöperatieve Rabobank U.A.
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
  statusCode: number
  body: object
}

/**
 * UlaResponse object is sent back to the caller
 * and acts like an HTTP response. It contains
 * a statuscode and a dynamic body.
 */
export class UlaResponse {
  private readonly _statusCode: number
  private readonly _body: any

  constructor (ulaResponse: IUlaResponse) {
    this._statusCode = ulaResponse.statusCode
    this._body = ulaResponse.body
  }

  /**
   * (HTTP) Status code
   * @return any
   */
  @Expose()
  public get statusCode (): number {
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
   * Converts a this object to a json string
   * @return object
   */
  public toJSON (): object {
    return classToPlain(this, { excludePrefixes: ['_'] })
  }
}
