import { warn } from './logger';

describe('util.logger', () => {
  beforeEach(() => {
    spyOn(console, 'warn');
  });
  it('should be once warn when same content', () => {
    warn('once');
    warn('once');
    expect(console.warn).toHaveBeenCalledTimes(1);
  });
});
