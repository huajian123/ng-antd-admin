// 辅助函数，用于提取特定字段
//extractField(roleIds, 'roleId') [{roleId:1},{roleId:2}]=>[1,2]
export const extractField = <T, K extends keyof T>(
  array: T[],
  field: K,
): T[K][] => {
  return array.map((item) => item[field]);
};
