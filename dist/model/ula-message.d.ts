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

/**
 * The UlaMessage type is used to
 * send messages (events) to ULA plugins.
 * The object is entirely dynamic, but it
 * does require a 'type' field, so the
 * plugins can recognize (or ignore) the
 * event.
 */
export declare class UlaMessage {
  private readonly _obj

  constructor (obj: any);

  /**
   * The dynamic properties of the message
   * @return any
   */
  get properties (): any;

  /**
   * Converts a this object to a json object
   * @return object
   */
  toJSON (): object;
}

/**
 * @deprecated Please use UlaMessage
 * @see UlaMessage
 */
export declare class Message extends UlaMessage {
}
