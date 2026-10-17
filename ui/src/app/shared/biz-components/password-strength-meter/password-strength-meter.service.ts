import { inject, Service } from '@angular/core';

import { ZxcvbnFactory } from '@zxcvbn-ts/core';
import { adjacencyGraphs, dictionary as commonDictionary } from '@zxcvbn-ts/language-common';
import { dictionary as enDictionary, translations } from '@zxcvbn-ts/language-en';

import { PSM_CONFIG } from './password-strength-meter.types';

@Service()
export class PasswordStrengthMeterService {
  private customOptions = inject(PSM_CONFIG, { optional: true });
  private zxcvbn: ZxcvbnFactory;

  constructor() {
    // 配置默认选项
    const defaultOptions = {
      dictionary: {
        ...commonDictionary,
        ...enDictionary
      },
      graphs: adjacencyGraphs,
      translations: translations
    };

    // 合并自定义选项
    const options = this.customOptions ? { ...defaultOptions, ...this.customOptions } : defaultOptions;

    // 创建 zxcvbn 实例
    this.zxcvbn = new ZxcvbnFactory(options);
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
    const result = this.zxcvbn.check(password);
    return result.score;
  }

  /**
   * this will return the password strength score with feedback messages
   * return type { score: number; feedback: { suggestions: string[]; warning: string | null } }
   *
   * @param password - Password
   */
  scoreWithFeedback(password: string): {
    score: number;
    feedback: { suggestions: string[]; warning: string | null };
  } {
    const result = this.zxcvbn.check(password);
    return { score: result.score, feedback: result.feedback };
  }
}
