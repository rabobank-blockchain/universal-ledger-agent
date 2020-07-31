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

import { IAttestation, Attestation } from './attestation'
import { classToPlain, Expose } from 'class-transformer'
import { v4 as uuid } from 'uuid'

export interface ITransaction {
  uuid?: string
  attestorPubKey: string
  datetime: Date | string
  attest: IAttestation[]
  revoke: IAttestation[]
  verifyRequest: IAttestation[]
  state?: string // 'success', 'pending' or 'error' - if undefined, then it is 'success'
  error?: string // The error message if state is 'error'
}

/**
 * A Transaction is a way of recording data
 * transfers. The holder can either receive
 * or send data from/to other parties.
 * It is possible to send and receive data
 * in one transaction. In that case, attest
 * and verifyRequest are both filled.
 */
export class Transaction {
  private readonly _uuid: string
  private readonly _attestorPubKey: string
  private readonly _datetime: Date
  private readonly _attest: Attestation[]
  private readonly _revoke: Attestation[]
  private readonly _verifyRequest: Attestation[]
  private readonly _state?: string
  private readonly _error?: string

  constructor (transaction: ITransaction) {
    if (!transaction.attestorPubKey || transaction.datetime === '') {
      throw new ReferenceError('One or more fields are empty')
    }

    this._uuid = transaction.uuid || uuid()
    this._attestorPubKey = transaction.attestorPubKey
    this._datetime = new Date(transaction.datetime)
    this._attest = transaction.attest.map(x => new Attestation(x))
    this._revoke = transaction.revoke.map(x => new Attestation(x))
    this._verifyRequest = transaction.verifyRequest.map(x => new Attestation(x))
    this._state = transaction.state
    this._error = transaction.error
  }

  /**
   * The uuid of the transaction
   * @return string
   */
  @Expose()
  public get uuid (): string {
    return this._uuid
  }

  /**
   * The public key or DID from the attestor
   * @return string
   */
  @Expose()
  public get attestorPubKey (): string {
    return this._attestorPubKey
  }

  /**
   * When the transaction took place
   * @return Date
   */
  @Expose()
  public get datetime (): Date {
    return this._datetime
  }

  /**
   * The list of claims/credentialsubjects
   * that have been attested during this transaction
   * @return {Attestation[]}
   */
  @Expose()
  public get attest (): Attestation[] {
    return this._attest
  }

  /**
   * The list of claims/credentialsubjects that
   * have been revoked during this transaction
   * @return {Attestation[]}
   */
  @Expose()
  public get revoke (): Attestation[] {
    return this._revoke
  }

  /**
   * The list of claims/credentialsubjects that
   * have been verified during this transaction
   * @return {Attestation[]}
   */
  @Expose()
  public get verifyRequest (): Attestation[] {
    return this._verifyRequest
  }

  /**
   * Optional - the current state of this transaction
   * Can be 'success', 'error' or 'pending'
   * @return {string|undefined}
   */
  @Expose()
  public get state (): string | undefined {
    return this._state
  }

  /**
   * Optional - the error message
   * @return {string|undefined}
   */
  @Expose()
  public get error (): string | undefined {
    return this._error
  }

  /**
   * Converts a this object to a json object
   * @return object
   */
  public toJSON (): object {
    return classToPlain(this, { excludePrefixes: ['_'] })
  }

}
