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
exports.Attestor = void 0
const attestation_1 = require("./attestation");
const transaction_1 = require("./transaction");
const class_transformer_1 = require("class-transformer");
/**
 * All data sources and ULA plugins
 * must eventually transform their
 * attestors / issuers  back to this
 * model.
 */
class Attestor {
    constructor(attestor) {
        if (!attestor.name || !attestor.icon || !attestor.pubKey || !attestor.datetime) {
            throw new ReferenceError('One or more fields are empty');
        }
        this._name = attestor.name;
        this._icon = attestor.icon;
        this._pubKey = attestor.pubKey;
        this._datetime = new Date(attestor.datetime);
        this._transactions = attestor.transactions ? attestor.transactions.map(x => new transaction_1.Transaction(x)) : undefined;
        this._receivedAttestations = attestor.receivedAttestations ? attestor.receivedAttestations.map(x => new attestation_1.Attestation(x)) : undefined;
        this._issuedAttestations = attestor.issuedAttestations ? attestor.issuedAttestations.map(x => new attestation_1.Attestation(x)) : undefined;
    }
    /**
     * The (company) name of the attestor
     * @return string
     */
    get name() {
        return this._name;
    }
    /**
     * The icon respresentation of this attestor
     * @return string
     */
    get icon() {
        return this._icon;
    }
    /**
     * The public key for this attestor
     * @return string
     */
    get pubKey() {
        return this._pubKey;
    }
    /**
     * The date/time when this attestor
     * was added to the (local) storage
     * @return Date
     */
    get datetime() {
        return new Date(this._datetime);
    }
    /**
     * Transactions made by this attestor
     * @return {Transaction[]|undefined}
     */
    get transactions() {
        return this._transactions;
    }
    /**
     * Sets the transactions received by this attestor
     * @param {Transaction[]|undefined} transactions
     */
    set transactions(transactions) {
        this._transactions = transactions;
    }
    /**
     * The attestations received by this attestor
     * @return {Attestation[]|undefined}
     */
    get receivedAttestations() {
        return this._receivedAttestations;
    }
    /**
     * Sets the attestations received by this attestor
     * @param {Attestation[]|undefined} attestations
     */
    set receivedAttestations(attestations) {
        this._receivedAttestations = attestations;
    }
    /**
     * The attestations issued by this attestation
     * @return {Attestation[]|undefined}
     */
    get issuedAttestations() {
        return this._issuedAttestations;
    }
    /**
     * Sets the attestations issued by this attestor
     * @param {Attestation[]|undefined} attestations
     */
    set issuedAttestations(attestations) {
        this._issuedAttestations = attestations;
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
], Attestor.prototype, "name", null);
__decorate([
    class_transformer_1.Expose()
], Attestor.prototype, "icon", null);
__decorate([
    class_transformer_1.Expose()
], Attestor.prototype, "pubKey", null);
__decorate([
    class_transformer_1.Expose()
], Attestor.prototype, "datetime", null);
__decorate([
    class_transformer_1.Expose()
], Attestor.prototype, "transactions", null);
__decorate([
    class_transformer_1.Expose()
], Attestor.prototype, "receivedAttestations", null);
__decorate([
    class_transformer_1.Expose()
], Attestor.prototype, "issuedAttestations", null);
exports.Attestor = Attestor;
//# sourceMappingURL=attestor.js.map
