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
exports.Attestation = void 0
const class_transformer_1 = require("class-transformer");
const uuid_1 = require("uuid");
/**
 * All data sources and ULA plugins
 * must eventually transform their
 * attestations / credentials back
 * to this model.
 */
class Attestation {
    constructor(attestation) {
        if (!attestation.attestorPubKey || !attestation.context || attestation.context.length === 0
            || attestation.type.length === 0 || !attestation.statements || attestation.statements.length === 0) {
            throw new ReferenceError('One or more fields are empty');
        }
        this._uuid = attestation.uuid || uuid_1.v4();
        this._attestorPubKey = attestation.attestorPubKey;
        this._forPubKey = attestation.forPubKey;
        this._context = attestation.context;
        this._type = attestation.type;
        this._expires = attestation.expires ? new Date(attestation.expires) : undefined;
        this._datetime = new Date(attestation.datetime);
        this._statements = attestation.statements;
    }
    /**
     * The uuid of this attestation
     * @return string
     */
    get uuid() {
        return this._uuid;
    }
    /**
     * The attestor/issuer public key
     * (Can also be a DID)
     * @return string
     */
    get attestorPubKey() {
        return this._attestorPubKey;
    }
    /**
     * The forPubKey (the subject/holder)
     * @return {string|undefined}
     */
    get forPubKey() {
        return this._forPubKey;
    }
    /**
     * Gives context to the contents of
     * this attestation. Usually this is
     * a collection of schema.org url's.
     * @return {string[]}
     */
    get context() {
        return this._context;
    }
    /**
     * Room for various types/properties
     * @return {string[]}
     */
    get type() {
        return this._type;
    }
    /**
     * The expiry time of this attestation
     * @return {Date|undefined}
     */
    get expires() {
        return this._expires;
    }
    /**
     * The datetime when this attestation
     * was issued.
     * @return Date
     */
    get datetime() {
        return new Date(this._datetime);
    }
    /**
     * The statements of this attestation.
     * This is a key-value pair array, just
     * like a set of claims or CredentialSubjects.
     * @return any
     */
    get statements() {
        return this._statements;
    }
    /**
     * Converts this object to a json object
     * @return object
     */
    toJSON() {
        return class_transformer_1.classToPlain(this, { excludePrefixes: ['_'] });
    }
}
__decorate([
    class_transformer_1.Expose()
], Attestation.prototype, "uuid", null);
__decorate([
    class_transformer_1.Expose()
], Attestation.prototype, "attestorPubKey", null);
__decorate([
    class_transformer_1.Expose()
], Attestation.prototype, "forPubKey", null);
__decorate([
    class_transformer_1.Expose()
], Attestation.prototype, "context", null);
__decorate([
    class_transformer_1.Expose()
], Attestation.prototype, "type", null);
__decorate([
    class_transformer_1.Expose()
], Attestation.prototype, "expires", null);
__decorate([
    class_transformer_1.Expose()
], Attestation.prototype, "datetime", null);
__decorate([
    class_transformer_1.Expose()
], Attestation.prototype, "statements", null);
exports.Attestation = Attestation;
//# sourceMappingURL=attestation.js.map
