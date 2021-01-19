import { isDevMode } from '@angular/core';
import { environment } from 'ng-zorro-antd/core/environments';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

const record: Record<string, boolean> = {};

export const PREFIX = '[@DELON]:';

function notRecorded(...args: NzSafeAny[]): boolean {
  const asRecord = args.reduce((acc, c) => acc + c.toString(), '');

  if (record[asRecord]) {
    return false;
  } else {
    record[asRecord] = true;
    return true;
  }
}

function consoleCommonBehavior(consoleFunc: (...args: NzSafeAny) => void, ...args: NzSafeAny[]): void {
  if (environment.isTestMode || (isDevMode() && notRecorded(...args))) {
    consoleFunc(...args);
  }
}

// Warning should only be printed in dev mode and only once.
export const warn = (...args: NzSafeAny[]) => consoleCommonBehavior((...arg: NzSafeAny[]) => console.warn(PREFIX, ...arg), ...args);

export const deprecation11 = (comp: string, from: string, to?: string) => {
  warnDeprecation(`${comp} => '${from}' is going to be removed in 11.0.0${to ? `, Please use '${to}' instead` : ``}.`);
};

export const warnDeprecation = (...args: NzSafeAny[]) => {
  if (!environment.isTestMode) {
    const stack = new Error().stack;
    return consoleCommonBehavior((...arg: NzSafeAny[]) => console.warn(PREFIX, 'deprecated:', ...arg, stack), ...args);
  } else {
    return () => {};
  }
};

// Log should only be printed in dev mode.
export const log = (...args: NzSafeAny[]) => {
  if (isDevMode()) {
    console.log(PREFIX, ...args);
  }
};
