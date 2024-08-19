type SomeObject = { key1: boolean; key2: number };

type SomeRecord = { [key: string]: number };

type User = {
  name: string;
  age: number;
  isAdmin: boolean;
};

const gabriel: User = {
  name: "Gabriel",
  isAdmin: true,
  age: 28,
};

// How to choose type of type :)
type Age = User["age"];
type Role = User["isAdmin"];
// type name = User.name <- This is not working

type NameOrAge = ["name" | "age"]; // Same with bellow but cleaner
// type NameOrAge = User["name"] | User["age"];

const justKindUser = {
  name: "John",
  username: "....", // <- extra propertie
  age: 43,
  isAdmin: false,
};

const john: User = justKindUser;

type key = keyof User;

// type UserValues = User[keyof User];

type ValueOf<Obj> = Obj[keyof Obj];
type UserValues = ValueOf<User>;

// =============

// type A = { a: string };
// type KeyOfA = keyof A; // -> a

// type B = { b: number };
// type KeyOfB = keyof B; // -> b

// type C = A & B;
// type KeyOfC = keyof C; // -> 'a' | 'b'

type A = { a: string; c: boolean };
type KeyOfA = keyof A; // -> 'a' | 'c'

type B = { b: number; c: boolean };
type KeyOfB = keyof B; // -> 'b' | 'c'

type C = A | B;
type KeyOfC = keyof C; // -> 'c'

// The general rule is:
// keyof(A & B) = (keyof A) | (keyof B)
// keyof(A | B) = (keyof A) & (keyof B)

type WithName = { name: string; id: string };
type WithAge = { age: number; id: string };

type User2 = WithName & WithName;

type ID = User2["id"]; //=> string and number <=> never

// type RecordOfBools = Record<string, boolean>;
type RecordOfBools = Record<"valid" | "focused" | "editted", boolean>;

type Props = { value: string; focused: boolean; editted: boolean };

type PartialProps = Partial<Props>; // Make all props optional
type RequiredProps = Required<Props>; // Make all props required
type ValueProps = Pick<Props, "editted">; // Pick specific prop
// type ValueProps2 = Omit<Props, "value">
type ValueProps2 = Omit<Props, "value" | "focused">; // show all of them except 'value' and 'focused'
