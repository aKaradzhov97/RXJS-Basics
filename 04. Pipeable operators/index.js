import { from, interval, of } from "rxjs";
import {
  map,
  mapTo,
  pluck,
  filter,
  reduce,
  scan,
  tap,
  takeWhile,
} from "rxjs/operators";

export function mapOperator() {
  // The source observable is not anyhow modified.
  const observable = of(1, 2, 3, 4, 5);

  // Will result in: `10, 20, 30, 40, 50`
  observable.pipe(map((value) => value * 10)).subscribe(console.log);
}

export function pluckOperator() {
  const data = {
    id: 1,
    name: "Peter",
  };

  of(data).pipe(pluck("name")).subscribe(console.log);

  // Will result in: `Peter`
}

export function mapToOperator() {
  const data = {
    id: 1,
    name: "Tosho",
  };

  of(data).pipe(mapTo("Some Value!")).subscribe(console.log);

  // Will result in: `Some Value!`
}

export function filterOperator() {
  const observable = of(1, 2, 3, 4, 5);

  // Will result in: `3, 4, 5`
  observable.pipe(filter((value) => value > 2)).subscribe(console.log);
}

export function reduceOperator() {
  const numbers = from([1, 2, 3, 4, 5]);

  // Will result in: `15`
  numbers
    .pipe(reduce((accumulator, currentValue) => accumulator + currentValue))
    .subscribe(console.log);
}

export function scanOperator() {
  const numbers = from([1, 2, 3, 4, 5]);

  // Will result in: `1, 3, 6, 10, 15`
  numbers
    .pipe(scan((accumulator, currentValue) => accumulator + currentValue))
    .subscribe(console.log);
}

export function countdownTimer() {
  const counter$ = interval(1000);

  counter$
    .pipe(
      mapTo(-1),
      scan((accumulator, current) => accumulator + current, 5),
      takeWhile((value) => value >= 0)
    )
    .subscribe((value) => {
      console.log(value);
      if (!value) {
        console.log("Time's up!");
      }
    });
  // Will result in: `4, 3, 2, 1, 0, Time's up!`
}

// This one is mainly used for debugging, should be careful and avoid manipulating data in it,
// since it produces side effects, which on the other hand may produce headaches!
export function tapOperator() {
  const numbers = of(1, 2, 3);

  // Will result in: `BEFORE: 1, AFTER: 10, BEFORE: 2, AFTER: 20, BEFORE: 3, AFTER: 30, DONE!`
  // Note: tap ignores ANY RETURN VALUES!!!
  numbers
    .pipe(
      tap((value) => console.log("BEFORE: ", value)),
      map((value) => value * 10),
      tap({
        next: (value) => console.log("AFTER: ", value),
        complete: () => console.log("DONE!"),
      })
    )
    .subscribe(console.log);
}
