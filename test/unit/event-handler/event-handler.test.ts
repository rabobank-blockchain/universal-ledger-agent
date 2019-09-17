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
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { describe, it } from 'mocha'
import { EventHandler, Message } from '../../../src'
import { TestPlugin } from '../../mocks/test-plugin'

const assert = chai.assert

before(() => {
  chai.use(sinonChai)
})

describe('EventHandler', () => {
  it('should verify JSON.stringify functionality in Message', () => {
    // Arrange
    const message = {
      type: 'did:test:AS1503982FDRERZDB;spec/test/1.0/this',
      dude: 'is it working?'
    }
    // Act
    const messageObject = new Message(message)
    // Assert
    assert.equal(JSON.stringify(message), JSON.stringify(messageObject))
  })

  it('should broadcast a known message', async () => {
    // Arrange
    const testPlugin = new TestPlugin()
    const eventHandler = new EventHandler([testPlugin])
    const message = {
      type: 'did:test:AS1503982FDRERZDB;spec/test/1.0/this',
      dude: 'is it working?'
    }
    // Act
    await eventHandler.processMsg(message, (response: any) => {
      // Assert
      assert.equal(response.statusCode, 200)
      assert.equal(response.body.dude, 'It is working!')
    })
  })

  it('should rethrow all exceptions', (done) => {
    // Arrange
    const testPlugin = new TestPlugin()
    testPlugin.shouldThrow = true
    const eventHandler = new EventHandler([testPlugin])
    const message = {
      type: 'did:test:AS1503982FDRERZDB;spec/test/1.0/this',
      dude: 'is it working?'
    }

    // Act
    eventHandler.processMsg(message, undefined).catch(((reason: Error) => {
      reason.message.should.be.equal('Something went wrong')
      done()
    }))
  })

  it('should broadcast an unknown message', async () => {
    // Arrange
    const testPlugin = new TestPlugin()
    const eventHandler = new EventHandler([testPlugin])
    const message = {
      type: 'did:test:AS1503982FDRERZDB;spec/test/2.0/this',
      dude: 'is it working?'
    }
    // Act
    await eventHandler.processMsg(message, () => {
      // Assert
      assert.fail()
    })
  })
})
