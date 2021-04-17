export const replaceArrayValueByIndex = (array, index, ...items) => [...array.slice(0, index), ...items, ...array.slice(index + 1)];

export const insertArrayValueAfterIndex = (array, index, ...items) => [...array.slice(0, index + 1), ...items, ...array.slice(index + 1)];
