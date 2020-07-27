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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", {value: true})
exports.Transaction = void 0
const attestation_1 = require("./attestation");
const class_transformer_1 = require("class-transformer");
const uuid_1 = require("uuid");
/**
 * A Transaction is a way of recording data
 * transfers. The holder can either receive
 * or send data from/to other parties.
 * It is possible to send and receive data
 * in one transaction. In that case, attest
 * and verifyRequest are both filled.
 */
class Transaction {
    constructor(transaction) {
        if (!transaction.attestorPubKey || transaction.datetime === '') {
            throw new ReferenceError('One or more fields are empty');
        }
        this._uuid = transaction.uuid || uuid_1.v4();
        this._attestorPubKey = transaction.attestorPubKey;
        this._datetime = new Date(transaction.datetime);
        this._attest = transaction.attest.map(x => new attestation_1.Attestation(x));
        this._revoke = transaction.revoke.map(x => new attestation_1.Attestation(x));
        this._verifyRequest = transaction.verifyRequest.map(x => new attestation_1.Attestation(x));
        this._state = transaction.state;
        this._error = transaction.error;
    }
    /**
     * The uuid of the transaction
     * @return string
     */
    get uuid() {
        return this._uuid;
    }
    /**
     * The public key or DID from the attestor
     * @return string
     */
    get attestorPubKey() {
        return this._attestorPubKey;
    }
    /**
     * When the transaction took place
     * @return Date
     */
    get datetime() {
        return this._datetime;
    }
    /**
     * The list of claims/credentialsubjects
     * that have been attested during this transaction
     * @return {Attestation[]}
     */
    get attest() {
        return this._attest;
    }
    /**
     * The list of claims/credentialsubjects that
     * have been revoked during this transaction
     * @return {Attestation[]}
     */
    get revoke() {
        return this._revoke;
    }
    /**
     * The list of claims/credentialsubjects that
     * have been verified during this transaction
     * @return {Attestation[]}
     */
    get verifyRequest() {
        return this._verifyRequest;
    }
    /**
     * Optional - the current state of this transaction
     * Can be 'success', 'error' or 'pending'
     * @return {string|undefined}
     */
    get state() {
        return this._state;
    }
    /**
     * Optional - the error message
     * @return {string|undefined}
     */
    get error() {
        return this._error;
    }
    /**
     * Converts a this object to a json object
     * @return object
     */
    toJSON() {
        return class_transformer_1.classToPlain(this, { excludePrefixes: ['_'] });
    }
}
__decorate([
    class_transformer_1.Expose()
], Transaction.prototype, "uuid", null);
__decorate([
    class_transformer_1.Expose()
], Transaction.prototype, "attestorPubKey", null);
__decorate([
    class_transformer_1.Expose()
], Transaction.prototype, "datetime", null);
__decorate([
    class_transformer_1.Expose()
], Transaction.prototype, "attest", null);
__decorate([
    class_transformer_1.Expose()
], Transaction.prototype, "revoke", null);
__decorate([
    class_transformer_1.Expose()
], Transaction.prototype, "verifyRequest", null);
__decorate([
    class_transformer_1.Expose()
], Transaction.prototype, "state", null);
__decorate([
    class_transformer_1.Expose()
], Transaction.prototype, "error", null);
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map
