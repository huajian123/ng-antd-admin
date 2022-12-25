import { Inject, Injectable, Optional } from '@angular/core';

import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import { PSMOptions, PSM_CONFIG } from './password-strength-meter.types';

import zxcvbnEnPackage from '@zxcvbn-ts/language-en';

export abstract class IPasswordStrengthMeterService {
  abstract score(password: string): number;

  abstract scoreWithFeedback(password: string): {
    score: number;
    feedback: { warning: string; suggestions: string[] };
  };
}

export const DEFAULT_CONFIG: PSMOptions = {
  translations: zxcvbnEnPackage.translations,
};

@Injectable()
export class PasswordStrengthMeterService extends IPasswordStrengthMeterService {
  constructor(
    @Optional()
    @Inject(PSM_CONFIG)
    options: PSMOptions
  ) {
    super();

    if (options) {
      zxcvbnOptions.setOptions(options);
    } else {
      zxcvbnOptions.setOptions(DEFAULT_CONFIG);
    }
  }

  /**
   *  this will return the password strength score in number
   *  0 - too guessable
   *  1 - very guessable
   *  2 - somewhat guessable
   *  3 - safely unguessable
   *  4 - very unguessable
   *
   *  @param password - Password
   */
  score(password: string): number {
    const result = zxcvbn(password);
    return result.score;
  }

  /**
   * this will return the password strength score with feedback messages
   * return type { score: number; feedback: { suggestions: string[]; warning: string } }
   *
   * @param password - Password
   */
  scoreWithFeedback(password: string): {
    score: number;
    feedback: { suggestions: string[]; warning: string };
  } {
    const result = zxcvbn(password);
    return { score: result.score, feedback: result.feedback };
  }
}
