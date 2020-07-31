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
exports.UlaResponse = void 0
const class_transformer_1 = require("class-transformer");
/**
 * UlaResponse object is sent back to the caller
 * and acts like an HTTP response. It contains
 * a statuscode and a dynamic body.
 */
class UlaResponse {
    constructor(ulaResponse) {
        this._statusCode = ulaResponse.statusCode;
        this._body = ulaResponse.body;
        this._error = ulaResponse.error;
    }
    /**
     * Status code
     * @return any
     */
    get statusCode() {
        return this._statusCode;
    }
    /**
     * The dynamic body
     * @return any
     */
    get body() {
        return this._body;
    }
    /**
     * (Optional) error
     * @return Error|undefined
     */
    get error() {
        return this._error;
    }
    /**
     * Converts a this object to a json object
     * NOTE: Some properties of the Error might
     *       be lost after serializing.
     * @return object
     */
    toJSON() {
        const plainObject = class_transformer_1.classToPlain(this, { excludePrefixes: ['_'] });
        plainObject.error = this._error ? {
            message: this._error.message,
            stack: this._error.stack
        } : undefined;
        return plainObject;
    }
}
__decorate([
    class_transformer_1.Expose()
], UlaResponse.prototype, "statusCode", null);
__decorate([
    class_transformer_1.Expose()
], UlaResponse.prototype, "body", null);
__decorate([
    class_transformer_1.Expose()
], UlaResponse.prototype, "error", null);
exports.UlaResponse = UlaResponse;
//# sourceMappingURL=ula-response.js.map
