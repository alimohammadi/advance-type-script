// Primitive Types
type Primitives = number | string | boolean | symbol | undefined | null;

// Literal Types
type Literals = 30 | "Hi" | true | 1000;

const ten: 10 = 10;
// const hundred: 100 = 20

// type six = 3 + 3
const six = 3 + 3;

type TrafficLight = "green" | "orange" | "red";

// Data Structure

type DataStructure =
  | { key1: boolean; key2: number } // objects
  | { [key1: string]: number } // records
  | [number, string] //tuples
  | number[]; //arrays

// ==================== Unions and Intersections ====================

// Union:
// type Union = X | Y

// Intersection:
// type Intersection  = X & Y


// Subtyping
// 2:number
// 2:2
// 2:1|2|3