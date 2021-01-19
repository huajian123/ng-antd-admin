import { copy } from './copy';

describe('abc: utils', () => {
  describe('#copy', () => {
    it('should be copy a string', (done: () => void) => {
      copy('test')
        .then(() => {
          expect(true).toBe(true);
          done();
        })
        .catch(() => {
          expect(false).toBe(true);
          done();
        });
    });
    it('[[boundary]]', (done: () => void) => {
      spyOn(document, 'createElement').and.returnValue({ parentNode: null } as any);
      copy('test')
        .then(() => {
          expect(false).toBe(true);
          done();
        })
        .catch(() => {
          expect(true).toBe(true);
          done();
        });
    });
  });
});
