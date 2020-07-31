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
exports.UlaError = void 0
const class_transformer_1 = require("class-transformer");
/**
 * The UlaError has an extra field
 * 'statusCode' and inherits the Error type.
 */
class UlaError extends Error {
    constructor(statusCode, message) {
        super(message);
        this._statusCode = statusCode;
        Object.setPrototypeOf(this, UlaError.prototype);
    }
    /**
     * Status code
     * @return any
     */
    get statusCode() {
        return this._statusCode;
    }
    /**
     * Converts a this object to a json object
     * @return object
     */
    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            stack: this.stack
        };
    }
}
__decorate([
    class_transformer_1.Expose()
], UlaError.prototype, "statusCode", null);
exports.UlaError = UlaError;
//# sourceMappingURL=ula-error.js.map
