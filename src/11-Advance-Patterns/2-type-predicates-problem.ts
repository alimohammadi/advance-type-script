export const numbers = [1, undefined, 25, 55, undefined];

const onlyNumbers = numbers.filter((val): val is number => Boolean(val));
// number[]
