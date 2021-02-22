import nats, { Stan } from 'node-nats-streaming';

// note that we are NOT exporting the class
class NatsWrapper {
  private _client?: Stan; // _...? means allowed to be undefined
  // note that no constructor or set here -- so must make sure that connect
  // has been called first

  get client() {
    // this ensures that client is defined
    // and since this is a getter it looks
    // like a property, not a function
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });


    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    })
  }
}

// the module system makes this a singleton, plus
// automatically initializes this
export const natsWrapper = new NatsWrapper();
