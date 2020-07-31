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

import * as chai from 'chai'
import * as sinon from 'sinon'
import * as chaiAsPromised from 'chai-as-promised'
import * as sinonChai from 'sinon-chai'
import * as fetchMock from 'fetch-mock'
import { BrowserHttpService } from '../../../src'

before(() => {
  chai.should()
  chai.use(chaiAsPromised)
  chai.use(sinonChai)
})

describe('http service', function () {
  const url = 'https://example.org'
  let sut = new BrowserHttpService()
  const jsonResponse = { test: 'succeeded' }

  afterEach(() => {
    fetchMock.restore()
    sinon.restore()
    sut = new BrowserHttpService()
  })

  describe('getRequest happy flow', function () {
    it('should call the url and return the response in json format', async () => {
      fetchMock.get(url, jsonResponse)
      const call = await sut.getRequest(url)

      fetchMock.called(url).should.equal(true)
      // @ts-ignore
      fetchMock.lastOptions().headers.should.deep.equal({ 'Content-Type': 'application/json' })
      return call.should.deep.equal(jsonResponse)
    })
  })

  describe('postRequest happy flow', function () {
    const postPayload = { entity: 'value', nestedObject: { obj: true, name: 'nest' } }
    it('should call the url and return the response in json format', async () => {
      fetchMock.post(url, jsonResponse)
      const call = await sut.postRequest(url, postPayload)

      fetchMock.called(url).should.equal(true)
      // @ts-ignore
      fetchMock.lastOptions().headers.should.deep.equal({ 'Content-Type': 'application/json' })
      return call.should.deep.equal(jsonResponse)
    })
  })
})
