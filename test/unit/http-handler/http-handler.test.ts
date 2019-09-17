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
import { describe, it } from 'mocha'

import { EventHandler, HttpHandler, Message } from '../../../src'
import { TestPlugin } from '../../mocks/test-plugin'

describe('Test HttpHandler functionality', () => {
  it('httpHandler object exists', () => {
    // Arrange
    const testPlugin = new TestPlugin()
    const eventHandler = new EventHandler([testPlugin])

    // Act
    const httpHandler = new HttpHandler(eventHandler)

    // Assert
    assert.exists(httpHandler)
  })

  it('Broadcast known message in json format', async () => {
    // Arrange
    const testPlugin = new TestPlugin()
    const eventHandler = new EventHandler([testPlugin])
    const httpHandler = new HttpHandler(eventHandler)
    const message = {
      type: 'did:test:AS1503982FDRERZDB;spec/test/1.0/this',
      dude: 'is it working?'
    }
    // Act
    await httpHandler.handleRequest(message, (response: any) => {
      // Assert
      assert.equal(response.statusCode, 200)
      assert.equal(response.body.dude, 'It is working!')
    })
  })

  it('Broadcast known message in jsonString format', async () => {
    // Arrange
    const testPlugin = new TestPlugin()
    const eventHandler = new EventHandler([testPlugin])
    const httpHandler = new HttpHandler(eventHandler)
    const message = {
      type: 'did:test:AS1503982FDRERZDB;spec/test/1.0/this',
      dude: 'is it working?'
    }
    const messageObject = new Message(message)

    // Act
    await httpHandler.handleRequest(JSON.stringify(messageObject), (response: any) => {
      // Assert
      assert.equal(response.statusCode, 200)
      assert.equal(response.body.dude, 'It is working!')
    })
  })

  it('Broadcast unknown message', async () => {
    // Arrange
    const testPlugin = new TestPlugin()
    const eventHandler = new EventHandler([testPlugin])
    const httpHandler = new HttpHandler(eventHandler)
    const message = {
      type: 'did:test:AS1503982FDRERZDB;spec/test/2.0/this',
      dude: 'is it working?'
    }
    // Act
    await httpHandler.handleRequest(message, () => {
      // Assert
      assert.fail()
    })
  })
})
