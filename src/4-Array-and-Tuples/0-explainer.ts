type Empty = [];
type One = [1];
type Two = [1, "2"];
type Three = [1, "2", 1];

type SomeTuple = ["Jack", 26];

type Name = SomeTuple[0];
type Age2 = SomeTuple[1];

type User3 = { name: string; age: number; isAdmin: true };

type NameOrAge2 = User3["name" | "age"];

type NameOrAge3 = SomeTuple[0 | 1];
type Values = SomeTuple[number];

type TupleKeys = keyof SomeTuple;

// type Tuple1 = [4, 5];
// type Tuple2 = [1, 2, 3, ...Tuple1];

type Tuple1 = [1, 2, 3];
type Tuple2 = [4, 5];
type Tuple3 = [...Tuple1, ...Tuple2];

type OutTuple = [string, number?];

const tuple1: OutTuple = ["Jack", 23];
const tuple2: OutTuple = ["Jack"];

type Tags = string[];
type Users = Array<User>; // Same as `User[]`
type Bites = (0 | 1)[];

type SomeArray = boolean[];
type Content = SomeArray[number];

// number[] that starts with 0
type PhoneNumber = [0, ...number[]];

// string[] that ends with a '!'
type Exclamation = [...string[], "!"];

// non empty list of strings
type NonEmpty = [string, ...string[]];

// starts and end with zero
type Padded = [0, ...number[], 0];
