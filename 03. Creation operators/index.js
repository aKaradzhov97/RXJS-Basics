import { from, interval, of, range, timer } from "rxjs";

const observer = {
  next: (value) => console.log("Next:", value),
  error: (error) => console.log("Error:", error),
  complete: () => console.log("Complete!"),
};

export function ofOperator() {
  // Creates an observable of particular value and then we can subscribe to the observable and obtain the value.
  const source$ = of(1, 2, 3, 4, 5);

  source$.subscribe(observer);
}

export function rangeOperator() {
  // Creates an observable of particular range.
  // The following will result in: `Next: 1, Next: 2, Next: 3, Next: 4, Next: 5, Complete!`
  const source$ = range(1, 5);

  source$.subscribe(observer);
}

export function fromOperator() {
  // Creates an observable of particular value, which can be nearly anything.
  // Note when passing a string: "Hello" will result in `H, e, l, l, o` - it will split the string into arr of characters.
  const source$ = from([1, 2, 3, 4, 5]);

  source$.subscribe(observer);
}

export function intervalOperator() {
  // Creates an observable which on subscribe emits value provided interval in MS.
  const source$ = interval(1000); // Duration in ms.

  source$.subscribe(observer);
}

// What if we need the first value immediately, followed by a value every three seconds after?
export function timerOperator() {
  // Note: providing only the first arg here will result in emitting the first value only.
  const source$ = timer(0, 3000); // Duration in ms.

  source$.subscribe(observer);
}
