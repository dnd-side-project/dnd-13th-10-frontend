type CodeObject = { [key: string]: string };
type LabelObject = { [key: string]: string };

export const createOptionsArray = (codes: CodeObject, labels: LabelObject) => {
  return Object.values(codes).map(code => ({
    id: code,
    label: labels[code],
  }));
};

export const createToggleOptions = (codes: CodeObject, labels: LabelObject) => {
  return Object.values(codes).map(code => ({
    id: code,
    text: labels[code],
  }));
};
