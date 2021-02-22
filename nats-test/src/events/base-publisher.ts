import {Stan} from 'node-nats-streaming';
import {Subjects} from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract readonly subject: T['subject'];
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T['data']): Promise<void> { // this means a Promise that resolves with void (or nothing!)
    // wrapping an async function this.client.publish
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        // when our callback is called, we either resolve() or reject()
        if (err) { // callback convention -- err is not null if publish failed
          // we return so that we don't go on and resolve...
          return reject(err);
        }
        console.log('Event published to subject', this.subject);
        resolve();
      });
    })
  }
}