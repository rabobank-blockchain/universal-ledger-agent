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
import { ITransaction, Transaction } from './transaction'
import { classToPlain, Expose } from 'class-transformer'

export interface IAttestor {
  name: string
  icon: string
  pubKey: string
  datetime: Date | string
  transactions?: ITransaction[]
  receivedAttestations?: IAttestation[]
  issuedAttestations?: IAttestation[]
}

/**
 * All data sources and ULA plugins
 * must eventually transform their
 * attestors / issuers  back to this
 * model.
 */
export class Attestor {
  private readonly _name: string
  private readonly _icon: string
  private readonly _pubKey: string
  private readonly _datetime: Date | string
  private _transactions?: Transaction[]
  private _receivedAttestations?: Attestation[]
  private _issuedAttestations?: Attestation[]

  constructor (attestor: IAttestor) {
    if (!attestor.name || !attestor.icon || !attestor.pubKey || !attestor.datetime) {
      throw new ReferenceError('One or more fields are empty')
    }

    this._name = attestor.name
    this._icon = attestor.icon
    this._pubKey = attestor.pubKey
    this._datetime = new Date(attestor.datetime)
    this._transactions = attestor.transactions ? attestor.transactions.map(x => new Transaction(x)) : undefined
    this._receivedAttestations = attestor.receivedAttestations ? attestor.receivedAttestations.map(x => new Attestation(x)) : undefined
    this._issuedAttestations = attestor.issuedAttestations ? attestor.issuedAttestations.map(x => new Attestation(x)) : undefined
  }

  /**
   * The (company) name of the attestor
   * @return string
   */
  @Expose()
  get name (): string {
    return this._name
  }

  /**
   * The icon respresentation of this attestor
   * @return string
   */
  @Expose()
  get icon (): string {
    return this._icon
  }

  /**
   * The public key for this attestor
   * @return string
   */
  @Expose()
  get pubKey (): string {
    return this._pubKey
  }

  /**
   * The date/time when this attestor
   * was added to the (local) storage
   * @return Date
   */
  @Expose()
  get datetime (): Date {
    return new Date(this._datetime)
  }

  /**
   * Transactions made by this attestor
   * @return {Transaction[]|undefined}
   */
  @Expose()
  get transactions (): Transaction[] | undefined {
    return this._transactions
  }

  /**
   * Sets the transactions received by this attestor
   * @param {Transaction[]|undefined} transactions
   */
  set transactions (transactions: Transaction[] | undefined) {
    this._transactions = transactions
  }

  /**
   * The attestations received by this attestor
   * @return {Attestation[]|undefined}
   */
  @Expose()
  get receivedAttestations (): Attestation[] | undefined {
    return this._receivedAttestations
  }

  /**
   * Sets the attestations received by this attestor
   * @param {Attestation[]|undefined} attestations
   */
  set receivedAttestations (attestations: Attestation[] | undefined) {
    this._receivedAttestations = attestations
  }

  /**
   * The attestations issued by this attestation
   * @return {Attestation[]|undefined}
   */
  @Expose()
  get issuedAttestations (): Attestation[] | undefined {
    return this._issuedAttestations
  }

  /**
   * Sets the attestations issued by this attestor
   * @param {Attestation[]|undefined} attestations
   */
  set issuedAttestations (attestations: Attestation[] | undefined) {
    this._issuedAttestations = attestations
  }

  /**
   * Converts a this object to a json object
   * @return object
   */
  public toJSON (): object {
    return classToPlain(this, { excludePrefixes: ['_'] })
  }

}
