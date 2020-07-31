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
import { v4 as uuid } from 'uuid'

export interface IAttestation {
  uuid?: string
  attestorPubKey: string // This is the issuer
  forPubKey?: string // This is the receiver of the attestation
  context: string[]
  type: string[]
  expires?: Date | string
  datetime: Date | string
  statements: any
}

/**
 * All data sources and ULA plugins
 * must eventually transform their
 * attestations / credentials back
 * to this model.
 */
export class Attestation {
  private readonly _uuid: string
  private readonly _attestorPubKey: string
  private readonly _forPubKey?: string
  private readonly _context: string[]
  private readonly _type: string[]
  private readonly _expires?: Date
  private readonly _datetime: Date
  private readonly _statements: any

  constructor (attestation: IAttestation) {
    if (!attestation.attestorPubKey || !attestation.context || attestation.context.length === 0
      || attestation.type.length === 0 || !attestation.statements || attestation.statements.length === 0) {
      throw new ReferenceError('One or more fields are empty')
    }

    this._uuid = attestation.uuid || uuid()
    this._attestorPubKey = attestation.attestorPubKey
    this._forPubKey = attestation.forPubKey
    this._context = attestation.context
    this._type = attestation.type
    this._expires = attestation.expires ? new Date(attestation.expires) : undefined
    this._datetime = new Date(attestation.datetime)
    this._statements = attestation.statements
  }

  /**
   * The uuid of this attestation
   * @return string
   */
  @Expose()
  get uuid (): string {
    return this._uuid
  }

  /**
   * The attestor/issuer public key
   * (Can also be a DID)
   * @return string
   */
  @Expose()
  get attestorPubKey (): string {
    return this._attestorPubKey
  }

  /**
   * The forPubKey (the subject/holder)
   * @return {string|undefined}
   */
  @Expose()
  get forPubKey (): string | undefined {
    return this._forPubKey
  }

  /**
   * Gives context to the contents of
   * this attestation. Usually this is
   * a collection of schema.org url's.
   * @return {string[]}
   */
  @Expose()
  get context (): string[] {
    return this._context
  }

  /**
   * Room for various types/properties
   * @return {string[]}
   */
  @Expose()
  get type (): string[] {
    return this._type
  }

  /**
   * The expiry time of this attestation
   * @return {Date|undefined}
   */
  @Expose()
  get expires (): Date | undefined {
    return this._expires
  }

  /**
   * The datetime when this attestation
   * was issued.
   * @return Date
   */
  @Expose()
  get datetime (): Date {
    return new Date(this._datetime)
  }

  /**
   * The statements of this attestation.
   * This is a key-value pair array, just
   * like a set of claims or CredentialSubjects.
   * @return any
   */
  @Expose()
  get statements (): any {
    return this._statements
  }

  /**
   * Converts this object to a json object
   * @return object
   */
  public toJSON (): object {
    return classToPlain(this, { excludePrefixes: ['_'] })
  }

}
