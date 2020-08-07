import { fromEvent, interval, of } from "rxjs";
import {
  mergeMap,
  takeUntil,
  switchMap,
  concatMap,
  take,
  exhaustMap,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

export function mergeMapOperator() {
  // WARNING - may create multiple inner subscriptions!
  // Open the browser & console.
  // Click on the page and hold..
  // You should see counter in the console. 0, 1, 2..
  // Once you release the button the counter will stop.
  const mouseup$ = fromEvent(document, "mouseup");
  const mousedown$ = fromEvent(document, "mousedown");
  const interval$ = interval(1000);

  mousedown$
    .pipe(mergeMap(() => interval$.pipe(takeUntil(mouseup$))))
    .subscribe(console.log);
}

export function switchMapOperator() {
  // (Useful for typeahead components)
  // It maintains only one inner subscription.
  // Switches to a new observable on new emissions from source, canceling any previously active inner observables.
  // Safest default for flattening - hard to create leaks like mergeMap.
  // It is useful for HTTP requests that can be cancelled (GET).
  // Great for reset, pause & resume functionality.
  const fakeInput$ = of("1");

  fakeInput$
    .pipe(
      switchMap((searchTerm) => {
        return ajax.getJSON(
          `https://jsonplaceholder.typicode.com/todos/${searchTerm}`
        );
      })
    )
    .subscribe(console.log);
}

export function concatMapOperator() {
  // This operator executes inner observables one by one, while keeping the order.
  // Imagine having a queue of subscriptions. When the first one completes, the second one will start emitting values.
  // Use it when order of execution is important and inner observables have finite lifespans.
  const click$ = fromEvent(document, "click");
  const interval$ = interval(1000);

  click$.pipe(concatMap(() => interval$.pipe(take(3)))).subscribe(console.log);
  // Open the browser and click twice on the document.
  // In the console you should see this output: 0, 1, 2, 0, 1, 2
}

export function exhaustMapOperator() {
  // (Useful to avoid sending multiple HTTPS requests, if the user clicks multiple times on submit button)
  // Maintains only one active subscription.
  // Ignores next subscriptions, while there is currently active one.
  // Once the active subscription completes, exhaustMap will accept the next observable and emit the values.
  const click$ = fromEvent(document, "click");
  const interval$ = interval(1000);

  click$.pipe(exhaustMap(() => interval$.pipe(take(3)))).subscribe(console.log);
  // Open the browser and click quickly twice on the document.
  // In the console you should see this output: 0, 1, 2
  // Now click one more time after and you will see this: 0, 1, 2
}
