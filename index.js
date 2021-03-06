import { observable } from "./01. Observable";
import { observableAsyncData } from "./02. Observable - Asynchronous";
import {
  fromOperator,
  intervalOperator,
  ofOperator,
  rangeOperator,
  timerOperator,
} from "./03. Creation operators";
import {
  countdownTimer,
  filterOperator,
  mapOperator,
  mapToOperator,
  pluckOperator,
  reduceOperator,
  scanOperator,
  tapOperator,
} from "./04. Pipeable operators";
import {
  distinctUntilChangedOperator,
  distinctUntilKeyChangedOperator,
  firstOperator,
  takeOperator,
  takeUntilOperator,
  takeWhileOperator,
} from "./05. Filtering operators";

import {
  auditTimeOperator,
  debounceOperator,
  debounceTimeOperator,
  sampleTimeOperator,
  throttleTimeOperator,
} from "./06. Rate limiting operators";
import {
  concatMapOperator,
  exhaustMapOperator,
  mergeMapOperator,
  switchMapOperator,
} from "./07. Transformation operators";
import {
  combineLatestOperator,
  concatOperator,
  forkJoinOperator,
  startWithEndWithOperators,
} from "./08. Combination operators";

// Comment / uncomment a line and open the browser to see the result.

// 01. Observable
// observable();
//
// 02. Observable - Asynchronous data
// observableAsyncData();
//
// 03. Observable creation operators
// ofOperator();
// rangeOperator();
// fromOperator();
// intervalOperator();
// timerOperator();
//
// 04. Pipeable operators
// mapOperator();
// pluckOperator();
// mapToOperator();
// filterOperator();
// reduceOperator();
// scanOperator();
// countdownTimer();
// tapOperator();
//
// 05. Filtering operators
// takeOperator();
// firstOperator();
// takeWhileOperator();
// takeUntilOperator();
// distinctUntilChangedOperator();
// distinctUntilKeyChangedOperator();

// 06. Rate limiting operators
// debounceOperator();
// debounceTimeOperator();
// throttleTimeOperator();
// sampleTimeOperator();
// auditTimeOperator();

// 07. Transformation operators
// mergeMapOperator();
// switchMapOperator();
// concatMapOperator();
// exhaustMapOperator();

// 08. Combination operators
// startWithEndWithOperators();
// concatOperator();
// combineLatestOperator();
// forkJoinOperator();
