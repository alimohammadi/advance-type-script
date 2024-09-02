// A extends B -> Is A assignable to B
type TrueOrFalse = A extends B ? true : false;

// type T = true? true : false -> This is wrong

type T = 2 extends number ? true : false;

type IsMiddleAged<N> = N extends 42 ? true : false;

type Ok = IsMiddleAged<42>;
type NotOk = IsMiddleAged<40>;

type If<A extends boolean, B, C> = A extends true ? B : C;

type a = If<true, number, string>;
type b = If<false, number, string>;

const buildUser = <S extends string>(name: S) => ({ name });
const userExample = buildUser("Ali");

const inferAsTuple = <T extends [unknown, ...unknown[]]>(tuple: T) => tuple;
const t1 = inferAsTuple([1, 2]);
const t2 = inferAsTuple(["b", 3, false]);

// Nested conditions
type GetColor<I> = I extends 0
  ? "black"
  : I extends 1
  ? "blue"
  : I extends 2
  ? "red"
  : "white";

type GetColor2<I extends 1 | 2 | 3> = {
  0: "black";
  1: "blue";
  2: "red";
  3: "white";
}[I];

type white = GetColor<2>;

//
type IsUser<T> = T extends { name: string; age: number } ? true : false;

type iu1 = IsUser<{ name: "Jack" }>;
type iu2 = IsUser<{ name: "Jack"; age: 22 }>;

type Plan = "basic" | "pro" | "premium";
type Role1 = "viewer" | "editor" | "admin";

type CanEdit<P extends Plan, R extends Role1> = [P, R] extends [
  "pro" | "premium",
  "editor" | "admin"
]
  ? true
  : false;

type Pr1 = CanEdit<"basic", "editor">;
type Pr2 = CanEdit<"pro", "admin">;

// Infer keyword
type GetRole<User> = User extends { name: string; role: infer Role } //infer get all variables inside role part
  ? Role
  : never;

type GP1 = GetRole<{ name: "Jack"; role: "Admin" }>;
type GP2 = GetRole<{ name: "Jack" }>;

type Head<Tuple> = Tuple extends [infer First, ...any] ? First : never;
type h1 = Head<["a1", "a2", "a3"]>;
type h2 = Head<[]>;

type Tail<Tuple> = Tuple extends [any, ...infer Rest] ? Rest : never;
type t1 = Tail<["a1", "a2", "a3"]>;
type t2 = Tail<["a1"]>;
type t3 = Tail<[]>;

type FirstAndLast<Tuple> = Tuple extends [infer First, ...any[], infer Last]
  ? [First, Last]
  : [];

type fal1 = FirstAndLast<["a1"]>;
type fal2 = FirstAndLast<["a1", "a2", "a3"]>;
type fal3 = FirstAndLast<["a1", "a2", "a3", "a4"]>;

// Infer with function types
type IsEqual = (a: number, b: number) => boolean;

type Parameters2<F> = F extends (...params: infer P) => any ? P : never;
type fn = (name: string, id: number) => boolean;
type P1 = Parameters2<fn>;

type ReturnType2<F> = F extends (...params: any) => infer Return
  ? Return
  : never;
type R1 = ReturnType2<fn>;

// Infer with costum generic
type SetValue<S> = S extends Set<infer V> ? V : never;
type SV1 = SetValue<Set<number>>;

type MyGeneric<A, B> = { content: A; children: B[] };
type ExtractParams<S> = S extends MyGeneric<infer A, infer B> ? [A, B] : never;

type EP1 = ExtractParams<MyGeneric<number, string>>;

// Variable assignment
type Fn<I> = SuperExpensiveComputation<I> extends infer Result
  ? [Result]
  : never;
