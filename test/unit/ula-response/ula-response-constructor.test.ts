/*
 * Copyright 2019 Coöperatieve Rabobank U.A.
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
  statusCode: 200,
  body: {
    canBeAnything: 'anything'
  } as object
}

describe('UlaResponse constructor', function () {

  it('should not throw on valid inputs', () => {
    let prep = Object.assign({}, testData)

    const createSut = () => {
      return new UlaResponse(prep)
    }

    createSut()
    assert.doesNotThrow(createSut)
  })

  it('should convert a JSON object to a Proof class', () => {
    const sut1 = new UlaResponse(testData)
    const jsonObj = JSON.parse(JSON.stringify(sut1))
    let sut2 = new UlaResponse(jsonObj)
    assert.deepEqual(sut1, sut2)
  })

})
