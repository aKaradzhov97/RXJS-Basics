import { from, fromEvent, interval, of } from "rxjs";
import {
  take,
  first,
  takeWhile,
  takeUntil,
  distinctUntilChanged,
  distinctUntilKeyChanged,
} from "rxjs/operators";

export function takeOperator() {
  const numbers$ = of(1, 2, 3, 4, 5);

  // Takes first three entities.
  // Will result in `1, 2, 3, DONE!`
  numbers$.pipe(take(3)).subscribe({
    next: console.log,
    complete: () => console.log("DONE!"),
  });
}

export function firstOperator() {
  const numbers$ = of(1, 2, 3, 4, 5);

  // Takes first entity.
  // Will result in `1, DONE!`
  numbers$.pipe(first()).subscribe({
    next: console.log,
    complete: () => console.log("DONE!"),
  });

  // Takes first entity, according to the condition in the predicate function.
  // Will result in `3, DONE!`
  numbers$.pipe(first((number) => number > 2)).subscribe({
    next: console.log,
    complete: () => console.log("DONE!"),
  });
}

export function takeWhileOperator() {
  const numbers$ = of(1, 2, 3, 4, 5);

  // Takes first three entities.
  // Note: we can supply one more boolean argument, which will cause the latest value to be emitted as well.
  // Will result in `1, 2, 3, DONE!`, when second arg is false, or not provided.
  // Will result in `1, 2, 3, 4, DONE!` when second arg is true.
  numbers$.pipe(takeWhile((value) => value <= 3, true)).subscribe({
    next: console.log,
    complete: () => console.log("DONE!"),
  });
}

export function takeUntilOperator() {
  const counter$ = interval(1000);
  const click$ = fromEvent(document, "click");

  // Will emit values until the supplied observable is complete.
  // Will start counting 1, 2, 3 in the console. Click anywhere on the page to stop the counter.
  counter$.pipe(takeUntil(click$)).subscribe({
    next: console.log,
    complete: () => console.log("You did it!"),
  });
}

export function distinctUntilChangedOperator() {
  const numbers$ = of(1, 1, 2, 2, 2, 2, 2, 3, 4, 5, 1);

  // Will remove all CONSECUTIVE duplicates - `1, 2, 3, 4, 5, 1`
  numbers$.pipe(distinctUntilChanged()).subscribe({
    next: console.log,
    complete: () => console.log("Done, Removed all CONSECUTIVE duplicates!"),
  });

  console.log(
    "==============================================================="
  );

  const users$ = from([
    {
      id: 1,
      name: "Peter",
    },
    {
      id: 2,
      name: "Peter",
    },
    {
      id: 3,
      name: "Brian",
    },
  ]);

  // Will remove the user with id: 2, because the name is duplicated.
  users$
    .pipe(
      distinctUntilChanged((previous, current) => {
        return previous.name === current.name;
      })
    )
    .subscribe({
      next: console.log,
      complete: () => console.log("Done, Removed all CONSECUTIVE duplicates!"),
    });
}

export function distinctUntilKeyChangedOperator() {
  const users$ = from([
    {
      id: 1,
      name: "Brian",
    },
    {
      id: 2,
      name: "Peter",
    },
    {
      id: 3,
      name: "Brian",
    },
  ]);

  // Will not remove any, because there are no consecutive duplicated names.
  users$.pipe(distinctUntilKeyChanged("name")).subscribe({
    next: console.log,
    complete: () => console.log("Done, nothing removed actually!"),
  });
}
