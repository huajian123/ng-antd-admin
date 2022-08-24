function camelCase(value: string): string {
  return value.replace(/-\w/g, (_r, i) => value.charAt(i + 1).toUpperCase());
}

function upperCamelCase(value: string): string {
  const camelCased = camelCase(value);
  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
}

const fnKebabCase = function kebabCase(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([0-9])([a-zA-Z]+)$/g, '-$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export { fnKebabCase };
