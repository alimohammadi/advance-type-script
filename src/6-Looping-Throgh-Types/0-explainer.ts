// do that
// while (condition is true){
//   do this repetitive thing
// }

// // Using JS as functional language
// const doRepetitiveTask = (some, input)=>{
//   condition === true
//     ? doRepetitiveTask(again, withOtherProps) // <- recursion
//     : something
// }

// type DoRepetitiveTask<some, input> = condition extends true
//   ? DoRepetitiveTask<Again, WithOtherPropsInput> // <- recursion
//   : Something;

// Columns contain list of values
type Column = {
  name: string;
  values: unknown[];
};

// A table is a non empty list of columns
type Table = [Column, ...Column[]];

// `UserTable` is subtype of `Table`
type UserTable = [
  { name: "firstName"; values: string[] },
  { name: "age"; values: number[] },
  { name: "isAdmin"; values: boolean[] }
];

const users: UserTable = [
  { name: "firstName", values: ["Jack", "DoDo", "Peter"] },
  { name: "age", values: [25, 45, 32] },
  { name: "isAdmin", values: [true, false, false] },
];

type GetColumn<List, Name> = List extends [infer First, ...infer Rest]
  ? First extends { name: Name; values: infer Values }
    ? Values
    : GetColumn<Rest, Name>
  : undefined;

type Result1 = GetColumn<UserTable, "firstName">; // string[]
type Result2 = GetColumn<UserTable, "isAdmin">; // boolean[]

declare function getColumn<T extends Table, N extends string>(
  table: T,
  columnName: N
): GetColumn<T, N>;

const firstNames = getColumn(users, "firstName");
// We would like `firstNames` to be inferred as a `string[]`

const isAdmins = getColumn(users, "isAdmin");
// and `isAdmins` to be inferred as a `boolean[]`

// type SomeLoop<List /* ... other params */> =
//   // 1. Split the list:
//   List extends [infer First, ...infer Rest]
//     ? // 2. Compute something using the first element.
//       //    Maybe recurse on the `Rest`:
//       SomeLoop<Rest /* ... modified params */>
//     : // 3. Return a default type if the list is empty:
//       SomeDefault;

// return [1, 2, 3, 4]
//   .map((x) => x * x) // [1, 4, 9, 16]
//   .filter((x) => x > 5) // [9, 16]
//   .reduce((sum, x) => sum + x, 0); // 25

// ================= Map type =================
type Names = ToNames<[{ id: 1; name: "Alice" }, { id: 2; name: "Jack" }]>;
// => ["Alice", "Jack"]

type ToNames<List> = List extends [infer First, ...infer Rest]
  ? [GetName<First>, ...ToNames<Rest>]
  : [];

type GetName<User> = User extends { name: infer Name }
  ? Name
  : "Unknown  name!";

// ================= Filter type =================
type Numbers = OnlyNumbers<[1, 2, "😱", 3, "IceCube"]>;
// => [1, 2, 3]

type OnlyNumbers<List> = List extends [infer First, ...infer Rest]
  ? First extends number
    ? [First, ...OnlyNumbers<Rest>]
    : OnlyNumbers<Rest>
  : [];

// ================= Reduce type =================
type User6 = FromEntries<[["name", "Jack"], ["age", 22]]>;
// => { name: "Jack"; age: 22 }

type FromEntries<Entries, Acc = {}> = Entries extends [
  infer Entry,
  ...infer Rest
]
  ? FromEntries<
      Rest,
      Entry extends [infer Key, infer Value]
        ? Acc & { [K in Key as string]: Value }
        : Acc
    >
  : Acc;

// type SomeReduce<Tuple, Acc = /* ... 📦 initial value */> =
// Tuple extends [infer First, ...infer Rest]
// ? SomeReduce<Rest, /* ... logic */>
// : Acc;

// // FromEntries is Tail-Recursive
// type FromEntries<Tuple, Acc = {}> = ...
//   ? FromEntries<...> // <- Because we just return the recursive
//   //                       result, without modifying it.
//   : ...;
