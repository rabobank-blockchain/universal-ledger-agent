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

import { assert } from 'chai'
import { UlaError } from '../../../src'

const testData = {
  statusCode: 'error-code',
  message: 'Something went wrong!'
}

describe('UlaError constructor', function () {

  it('should not throw on valid inputs', () => {
    const createSut = () => {
      return new UlaError(testData.statusCode, testData.message)
    }

    createSut()
    assert.doesNotThrow(createSut)
  })

  it('should serialize and parse properly', () => {
    const sut1 = new UlaError(testData.statusCode, testData.message)
    const jsonObj = JSON.parse(JSON.stringify(sut1))
    assert.strictEqual(jsonObj.statusCode, testData.statusCode)
    assert.strictEqual(jsonObj.message, testData.message)
    assert.isNotEmpty(jsonObj.stack)
  })

})
