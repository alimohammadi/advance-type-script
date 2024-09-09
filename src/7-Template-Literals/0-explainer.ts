const firstName = "Ali";
const lastName = "Mohammadi";

const fullName = `${firstName} ${lastName}`; // <- Template Literal

type firstName = "Ali";
type lastName = "Mohammadi";

type fullName = `${firstName} ${lastName}`; // <- Template Literal

// const p = smartQuerySelector("p:First-child");
// //    ^? `HTMLParagraphElement | null` instead of `HTMLElement | null`

// declare const obj: { some: { nested?: { property: number }[] } };
// const n = get(obj, "some.nested[0].property");
// //    ^? `number | undefined` instead of `unknown` 🎉

type Hi = `Hello, ${"World"}!`;

// type Index = 20;

// type Accessor = `users[${Index}].isAdmin`;
// // => "users[20].isAdmin"

// type EqualsTrue = `${Accessor} === ${true}`;
// // => "users[20].isAdmin === true"

type Obj = { "0": 100 };
type Index = 0;

type Get<Obj, Key extends keyof Obj> = Obj[Key];

type A2 = Get<Obj, Index>; // ❌ `0` isn't assignable to `keyof Obj`
type B2 = Get<Obj, `${Index}`>; // ✅ this works!

// ===================== Primitive Types =====================
type FirstName = "Jack";

type Jack = `${FirstName} ${string}`;

const name1: Jack = "Jack Who?"; // ✅
const name2: Jack = "Jack Jackson"; // ✅
const name3: Jack = "Jack "; // ✅ because "" is a string.
const name4: Jack = "How you doin baby?"; // ❌
const name5: Jack = "Hello you"; // ❌

type Size = "sm" | "md" | "lg";

type Classname = `size-${Size}`;

ping("localhost:3000");
ping("localhost:8080");
ping("localhost:amillion");

type StringifiableTypes = string | boolean | number | bigint | null | undefined;

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

type ButtonStyle = `${Variant}-${Size}`;

type X = "left" | "right";
type Y = "top" | "bottom";

function getArrow(x: X, y: Y) {
  const diagonal = `${x}-${y}` as const;
  /*                              👆                         
     `as const` tells TypeScript to infer this 
      type as `${X}-${Y}` instead of `string`.   
                                                */
  switch (diagonal) {
    case "left-top":
      return "↖";
    case "left-bottom":
      return "↙";
    case "right-top":
      return "↗";
    // case "right-bottom": return "↘";

    default:
      return exhaustive(diagonal);
    /*                         ~~~~~~~~
       ❌ The "right-bottom" case isn't handled!  
                                                 */
  }
}

function exhaustive(arg: never): never {
  throw new Error("non exhaustive.");
}

type text1 = Uppercase<"dodododo">;
type text2 = Lowercase<"DDDOOODDFFF">;
type text3 = Capitalize<"dddd0000aaa">;
type text4 = Uncapitalize<"Goodbye my friend">;

type GetLastWord<Str> = Str extends `${string} ${infer Rest}`
  ? GetLastWord<Rest>
  : Str;

type GetNameTuple<Name> = Name extends `${infer FirstName} ${infer Rest}`
  ? [FirstName, GetLastWord<Rest>]
  : never;

type TestName = GetNameTuple<"Jack Jackson">;
type TestName2 = GetNameTuple<"Jack mid-name Jackson">;

type SplitDomain<Name> =
  Name extends `${infer Sub}.${infer Domain}.${infer Extension}`
    ? [Sub, Domain, Extension]
    : never;

type Domain1 = SplitDomain<"www.google.com">;

type Punctuation = "." | "!" | "?" | ",";

type TitleToSnake<Str extends string> = Lowercase<
  RemovePunctuation<SpacesToUnderscores<Str>>
>;

type TTS = TitleToSnake<"Hello, my beloved typescript student!">;

type SpacesToUnderscores<Str> = Str extends `${infer First} ${infer Rest}`
  ? `${First}_${SpacesToUnderscores<Rest>}`
  : Str;

type STU = SpacesToUnderscores<"this is a text">;

type RemovePunctuation<
  Str,
  Output extends string = ""
> = Str extends `${infer First}${infer Rest}`
  ? First extends Punctuation
    ? RemovePunctuation<Rest, Output>
    : RemovePunctuation<Rest, `${Output}${First}`>
  : Output;
type RP = RemovePunctuation<"Hello, world!">; // "Hello world"
