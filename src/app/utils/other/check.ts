import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { warn } from '../logger/logger';

export function isEmpty(element: HTMLElement): boolean {
  const nodes = element.childNodes;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes.item(i);
    if (node.nodeType === 1 && (node as HTMLElement).outerHTML.toString().trim().length !== 0) {
      return false;
    } else if (node.nodeType === 3 && node.textContent!.toString().trim().length !== 0) {
      return false;
    }
  }
  return true;
}

function propDecoratorFactory<T, D>(
  name: string,
  fallback: (v: T, defaultValue: D) => D,
  defaultValue: NzSafeAny,
): (target: NzSafeAny, propName: string) => void {
  function propDecorator(target: NzSafeAny, propName: string, originalDescriptor?: TypedPropertyDescriptor<NzSafeAny>): NzSafeAny {
    const privatePropName = `$$__${propName}`;

    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true,
    });

    return {
      get(): string {
        return originalDescriptor && originalDescriptor.get ? originalDescriptor.get.bind(this)() : this[privatePropName];
      },
      set(value: T): void {
        if (originalDescriptor && originalDescriptor.set) {
          originalDescriptor.set.bind(this)(fallback(value, defaultValue));
        }
        this[privatePropName] = fallback(value, defaultValue);
      },
    };
  }

  return propDecorator;
}

export function toBoolean(value: any, allowUndefined: boolean | null = false): boolean | undefined {
  return allowUndefined && typeof value === 'undefined' ? undefined : value != null && `${value}` !== 'false';
}

/**
 * Input decorator that handle a prop to do get/set automatically with toBoolean
 *
 * ```ts
 * @Input() InputBoolean() visible: boolean = false;
 * @Input() @InputBoolean(null) visible: boolean = false;
 * ```
 */
export function InputBoolean(defaultValue: boolean | null = false): NzSafeAny {
  return propDecoratorFactory('InputNumber', toBoolean, defaultValue);
}

export function toNumber(value: any): number;
export function toNumber<D>(value: any, fallback: D): number | D;
export function toNumber(value: any, fallbackValue: number = 0): number {
  return !isNaN(parseFloat(value as any)) && !isNaN(Number(value)) ? Number(value) : fallbackValue;
}

/**
 * Input decorator that handle a prop to do get/set automatically with toNumber
 *
 * ```ts
 * @Input() @InputNumber() visible: number = 1;
 * @Input() @InputNumber(null) visible: number = 2;
 * ```
 */
export function InputNumber(defaultValue: number | null = 0): NzSafeAny {
  return propDecoratorFactory('InputNumber', toNumber, defaultValue);
}

export type BooleanInput = boolean | string | undefined | null;
export type NumberInput = number | string | undefined | null;
