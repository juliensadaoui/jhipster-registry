import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { filter, share } from 'rxjs/operators';
import { EventWithContent } from './event-with-content.model';

/**
 * An utility class to manage RX events
 */
@Injectable({
  providedIn: 'root',
})
export class EventManager {
  observable: Observable<EventWithContent<any> | string>;
  observer?: Observer<EventWithContent<any> | string>;

  constructor() {
    this.observable = new Observable((observer: Observer<EventWithContent<any> | string>) => {
      this.observer = observer;
    }).pipe(share());
  }

  /**
   * Method to broadcast the event to observer
   */
  broadcast(event: EventWithContent<any> | string): void {
    if (this.observer) {
      this.observer.next(event);
    }
  }

  /**
   * Method to subscribe to an event with callback
   * @param eventNames  Single event name or array of event names to what subscribe
   * @param callback    Callback to run when the event occurs
   */
  subscribe(eventNames: string | string[], callback: (event: any) => void): Subscription {
    if (typeof eventNames === 'string') {
      eventNames = [eventNames];
    }
    const subscriber: Subscription = this.observable
      .pipe(
        filter((event: EventWithContent<any> | string) => {
          for (const eventName of eventNames) {
            if ((typeof event === 'string' && event === eventName) || (typeof event !== 'string' && event.name === eventName)) {
              return true;
            }
          }
          return false;
        })
      )
      .subscribe(callback);
    return subscriber;
  }

  /**
   * Method to unsubscribe the subscription
   */
  destroy(subscriber: Subscription): void {
    subscriber.unsubscribe();
  }
}
