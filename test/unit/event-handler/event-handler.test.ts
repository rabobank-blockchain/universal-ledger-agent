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

import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
import { describe, it } from 'mocha'
import { EventHandler, UlaMessage, UlaResponse, PluginResult } from '../../../src'
import { ErrorTypeToThrow, TestPlugin } from '../../mocks/test-plugin'

const assert = chai.assert

before(() => {
  chai.use(sinonChai)
})

const ulaMessage = {
  type: 'test',
  dude: 'is it working?'
}

describe('EventHandler', () => {
  it('should verify JSON.stringify functionality in UlaMessage', () => {
    // Act
    const messageObject = new UlaMessage(ulaMessage)
    // Assert
    assert.equal(JSON.stringify(ulaMessage), JSON.stringify(messageObject))
  })

  it('should broadcast a known message', async () => {
    // Arrange
    const testPlugin = new TestPlugin()
    const eventHandler = new EventHandler([testPlugin])
    // Act
    await eventHandler.processMsg(ulaMessage, (response: UlaResponse) => {
      // Assert
      assert.equal(response.statusCode, 200)
      assert.equal(response.body.dude, 'It is working!')
    })
  })

  it('should use callback for any exception and still continue', async () => {
    // Arrange
    let ulaResponses: UlaResponse[] = []
    const testPlugin1 = new TestPlugin()
    testPlugin1.shouldThrow = ErrorTypeToThrow.UlaError
    const testPlugin2 = new TestPlugin()
    testPlugin2.shouldThrow = ErrorTypeToThrow.UlaError
    const eventHandler = new EventHandler([testPlugin1, testPlugin2])

    // Act
    const outcome = await eventHandler.processMsg(ulaMessage, (response: UlaResponse) => {
      ulaResponses.push(response)
    })

    assert.equal(ulaResponses.length, 2)
    assert.equal(ulaResponses[0].statusCode, TestPlugin.ulaErrorToThrow.statusCode)
    assert.deepEqual(ulaResponses[0].body, {})
    const thrownError = ulaResponses[0].error as Error
    assert.deepEqual(thrownError.message, TestPlugin.ulaErrorToThrow.message)
    assert.deepEqual(outcome, [
      new PluginResult(testPlugin1.name, TestPlugin.ulaErrorToThrow.statusCode),
      new PluginResult(testPlugin2.name, TestPlugin.ulaErrorToThrow.statusCode)
    ])
  })

  it('should set statuscode to "error" if the thrown Error is not UlaError', async () => {
    // Arrange
    let ulaResponses: UlaResponse[] = []
    const testPlugin = new TestPlugin()
    testPlugin.shouldThrow = ErrorTypeToThrow.RangeError
    const eventHandler = new EventHandler([testPlugin])

    // Act
    const outcome = await eventHandler.processMsg(ulaMessage, (response: UlaResponse) => {
      ulaResponses.push(response)
    })

    assert.equal(ulaResponses[0].statusCode, 'error')
    assert.deepEqual(ulaResponses[0].body, {})
    const thrownError = ulaResponses[0].error as Error
    assert.deepEqual(thrownError.message, TestPlugin.rangeErrorToThrow.message)
    assert.deepEqual(outcome, [
      new PluginResult(testPlugin.name, 'error')
    ])
  })

  it('should broadcast an unknown message', async () => {
    // Arrange
    const testPlugin = new TestPlugin()
    const message = {
      type: 'unknown-message-type'
    }
    const eventHandler = new EventHandler([testPlugin])
    // Act
    await eventHandler.processMsg(message, () => {
      // Assert
      assert.fail()
    })
  })
})
