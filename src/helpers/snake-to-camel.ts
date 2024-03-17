import { ISnakeToCamel } from '@interfaces/helpers';

export function snake2camel<T extends object>(data: T) {
  return Object.entries(data).reduce((acc, [key, value]) => {
    const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    return { ...acc, [camelCaseKey]: value };
  }, {} as ISnakeToCamel<T>);
}
