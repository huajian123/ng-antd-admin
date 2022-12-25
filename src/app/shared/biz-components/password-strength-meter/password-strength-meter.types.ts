import { InjectionToken } from '@angular/core';
import { OptionsType } from '@zxcvbn-ts/core/dist/types';

export type PSMOptions = OptionsType;
export const PSM_CONFIG = new InjectionToken<PSMOptions>('PSM_CONFIG');
