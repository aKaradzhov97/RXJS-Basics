import { of, concat, interval, fromEvent, combineLatest, forkJoin } from "rxjs";
import { delay, endWith, startWith, take } from "rxjs/operators";

export function startWithEndWithOperators() {
  const numbers$ = of(1, 2, 3);

  numbers$.pipe(startWith("a", "b"), endWith("b", "a")).subscribe(console.log);
  // Output to the console: a, b, 1, 2, 3, b, a
}

export function concatOperator() {
  // Useful for animations - it maintains the order of execution.
  const interval$ = interval(1000);

  concat(interval$.pipe(take(2)), interval$.pipe(take(3))).subscribe(
    console.log
  );
  // Output to the console: 0, 1, 0, 1, 2
}

export function combineLatestOperator() {
  // All supplied observables should emit at least one value.
  // Then combineLatest will return an Array with last emitted values of each stream.
  // If the input observables keep emitting values - combineLatest will keep emitting output as well.
  const keup$ = fromEvent(document, "keyup");
  const click$ = fromEvent(document, "click");

  combineLatest([keup$, click$]).subscribe(console.log);
  // Go to the browser and click on the page, then press any key and you should see output in the console.
}

export function forkJoinOperator() {
  // All supplied observables should emit at least one value.
  // Then combineLatest will return an Array with last emitted values of each stream.
  // It has similar behaviour to Promise.all
  const numbers$ = of(1, 2, 3);
  const letters$ = of("a", "b", "c");

  forkJoin({
    numbers: numbers$,
    letters: letters$.pipe(delay(3000)),
  }).subscribe(console.log);
  // Go to the browser and wait for 3 seconds.
  // You should see the following in the console: { letters: 'c', numbers: 3 }
}
