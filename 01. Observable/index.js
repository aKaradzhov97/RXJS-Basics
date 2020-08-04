import { Observable } from "rxjs";

export function observable() {
  const observer = {
    next: (value) => console.log("Next:", value),
    error: (error) => console.log("Error:", error),
    complete: () => console.log("Complete!"),
  };

  const observable = new Observable((subscriber) => {
    // Emits, pushes the value to its subscriber.
    subscriber.next("Hello RXJS!");
    subscriber.next("Woah, one more value!");

    // After completing, no value can be pushed anymore!
    subscriber.complete();
  });

  // Obtaining value.
  observable.subscribe(observer);
}
