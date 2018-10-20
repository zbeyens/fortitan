/**
 * Connector that manager low level connection and protocol between server and client.
 * Developer can provide their own connector to switch the low level prototol, such as tcp or probuf.
 */

/**
 * Connector component. Receive client requests and attach session with socket.
 *
 * @param {Object} app  current application context
 * @param {Object} opts attach parameters
 *                      opts.connector {Object} provides low level network and protocol details implementation between server and clients.
 */