export const getObjectProperty = (object: { [key: string]: any }, value: string | undefined, fallback?: any) => {
  if (!value && !fallback) {
    throw new Error('No value or fallback provided');
  }

  if (!value || !object[value]) {
    return fallback;
  }

  return object[value];
};
