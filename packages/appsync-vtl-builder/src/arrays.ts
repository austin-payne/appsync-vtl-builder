export const mergeItems = <T>(array1: T[], array2: T[]) =>
    removeDuplicates([...array1, ...array2]);

export const missingItems = <T>(items: T[], from: T[]) =>
    items.filter((value) => !from.includes(value));

export const removeDuplicates = <T>(array: T[]) => [...new Set([...array])];
