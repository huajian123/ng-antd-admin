// 通用错误处理
export const throwAthError = (errorMsg: string): never => {
  throw new Error(errorMsg);
};

export const throwModalRefError = (): never => {
  return throwAthError('可能你的modal组件中没有引入override modalRef = inject(NzModalRef);');
};
export const throwModalGetCurrentFnError = (): never => {
  return throwAthError('可能你的modal组件中没有引入getCurrentValue方法，你需要复写实现');
};
