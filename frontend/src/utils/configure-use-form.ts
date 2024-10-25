export const configureUseForm = (setValue: any, obj: any): any => {
  Object.entries(obj).forEach(([key, value]) => {
    setValue(key, value);
  });
};
