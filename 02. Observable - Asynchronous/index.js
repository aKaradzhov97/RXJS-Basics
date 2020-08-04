import { Observable } from "rxjs";

export function observableAsyncData() {
  const observer = {
    next: (value) => console.log("Next:", value),
    error: (error) => console.log("Error:", error),
    complete: () => console.log("Complete!"),
  };

  const observable = new Observable((subscriber) => {
    let count = 1;

    const id = setInterval(() => {
      subscriber.next(count);
      count++;
    }, 1000);

    return () => {
      console.log("Finishing up work!");
      clearInterval(id);
    };
  });

  // Obtaining values.
  const subscription = observable.subscribe(observer);
  const subscriptionTwo = observable.subscribe(observer);

  setTimeout(() => {
    // For each subscription we should unsubscribe manually, because they won't stop running!
    subscription.unsubscribe();

    // Comment the following line and note the result in the console - the second subscription keeps running!
    subscriptionTwo.unsubscribe();
  }, 3500);
}
