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
import { UlaError, UlaResponse } from '../../../src'

const testData = {
  statusCode: 'some-status-code',
  body: {
    canBeAnything: 'anything'
  },
  error: new UlaError('some-status-code', 'Something went wrong!')
}

describe('UlaResponse getters', function () {
  const sut = new UlaResponse(testData)

  it('should return an unchanged statusCode', () => {
    assert.strictEqual(sut.statusCode, testData.statusCode)
  })

  it('should return an unchanged body', () => {
    assert.strictEqual(sut.body, testData.body)
  })

  it('should return an unchanged error', () => {
    assert.deepStrictEqual(sut.error, testData.error)
  })

  it('should flatten an object (with error) using JSON.stringify()', () => {
    const sutError = sut.error as Error
    assert.strictEqual(JSON.stringify(sut), `{"statusCode":"some-status-code","body":{"canBeAnything":"anything"},"error":{"message":"Something went wrong!","stack":${JSON.stringify(sutError.stack)}}}`)
  })

  it('should flatten an object (without error) using JSON.stringify()', () => {
    const sutWithoutError = new UlaResponse({ statusCode: testData.statusCode, body: testData.body })
    assert.strictEqual(JSON.stringify(sutWithoutError), `{"statusCode":"some-status-code","body":{"canBeAnything":"anything"}}`)
  })
})
