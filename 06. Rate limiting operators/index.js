import { fromEvent, interval } from "rxjs";
import {
  debounce,
  debounceTime,
  throttleTime,
  sampleTime,
  map,
  auditTime,
} from "rxjs/operators";

export function debounceOperator() {
  const click$ = fromEvent(document, "click");

  click$.pipe(debounce(() => interval(1000))).subscribe(console.log);
}

export function debounceTimeOperator() {
  // Basically this operator will emit value after provided time.
  // Useful in typeahead search component for example!
  const click$ = fromEvent(document, "click");

  click$.pipe(debounceTime(1000)).subscribe(console.log);
}

export function throttleTimeOperator() {
  // Useful to detect double-click.
  // What it does? It ignores values for a certain time that we provide.
  // Behaviour of the following:
  // Open the browser and double-click as fast as you can - only one value is emitted to the console!
  const click$ = fromEvent(document, "click");

  click$.pipe(throttleTime(3000)).subscribe(console.log);
}

export function sampleTimeOperator() {
  // Emits value after certain time, only if such is present.
  const click$ = fromEvent(document, "click");

  click$
    .pipe(
      sampleTime(3000),
      map(({ x, y }) => ({
        x,
        y,
      }))
    )
    .subscribe(console.log);
}

export function auditTimeOperator() {
  // Emits last emitted value after certain time and ignores all previous values.
  const click$ = fromEvent(document, "click");

  click$
    .pipe(
      auditTime(3000),
      map(({ x, y }) => ({
        x,
        y,
      }))
    )
    .subscribe(console.log);
}
