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
import { UlaResponse } from '../../../src'

const testData = {
  statusCode: 'some-status-code',
  body: {
    canBeAnything: 'anything'
  },
  error: new Error('Something went wrong!')
}

describe('UlaResponse constructor', function () {

  it('should not throw on valid inputs', () => {
    const createSut = () => {
      return new UlaResponse(testData)
    }

    createSut()
    assert.doesNotThrow(createSut)
  })

  it('should convert a JSON object to a UlaResponse class', () => {
    const sut1 = new UlaResponse(testData)
    const jsonObj = JSON.parse(JSON.stringify(sut1))
    const sut2 = new UlaResponse(jsonObj)
    assert.strictEqual(sut1.statusCode, sut2.statusCode)
    assert.deepEqual(sut1.body, sut2.body)
    // @ts-ignore
    assert.equal(sut1.error.message, sut2.error.message)
    // @ts-ignore
    assert.equal(sut1.error.stack, sut2.error.stack)
  })

})
