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

import { describe, it } from 'mocha'

// noinspection JSDeprecatedSymbols
import { EventHandler, HttpHandler } from '../../../src'
import { TestPlugin } from '../../mocks/test-plugin'
import * as sinon from 'sinon'
import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'

before(() => {
  chai.should()
  chai.use(sinonChai)
})

describe('HttpHandler', () => {
  const testPlugin = new TestPlugin()
  const eventHandler = new EventHandler([testPlugin])
  const ulaMessage = {
    type: 'test',
    dude: 'is it working?'
  }

  afterEach(() => {
    sinon.restore()
  })

  it('parses a string request before calling the EventHandler', async () => {
    // Arrange
    // noinspection JSDeprecatedSymbols
    const sut = new HttpHandler(eventHandler)
    const eventHandlerStub = sinon.stub(eventHandler, 'processMsg')
    // Act
    await sut.handleRequest(JSON.stringify(ulaMessage), () => {
      // Do nothing
    })
    eventHandlerStub.should.have.been.calledOnceWith(ulaMessage)
  })

  it('calls the EventHandler properly', async () => {
    // Arrange
    // noinspection JSDeprecatedSymbols
    const sut = new HttpHandler(eventHandler)
    const eventHandlerStub = sinon.stub(eventHandler, 'processMsg')
    // Act
    await sut.handleRequest(ulaMessage, () => {
      // Do nothing
    })
    eventHandlerStub.should.have.been.calledOnceWith(ulaMessage)
  })
})
