import nats, { Stan } from 'node-nats-streaming';

// we create a wrapper class that will ensure that nats can run properly before the app has been initialized
class NatsWrapper {
  // '?' means we are telling ts that the varibale may be undefined for a while
  private _client?: Stan;

  // we will receive some connection settings
  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    // return a promise
    return new Promise<void>((resolve, reject) => {
      this._client!.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this._client!.on('error', (err) => {
        reject(err);
      });
    });
  }
}

// We export an instance of the class
export const natsWrapper = new NatsWrapper();
