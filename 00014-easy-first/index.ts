/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #初級 #array

  ### 質問

  配列`T`を受け取り、その最初のプロパティの型を返す`First<T>`を実装します。

  例えば：

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```

  > GitHubで確認する：https://tsch.js.org/14/ja
*/

/* _____________ ここにコードを記入 _____________ */
// type First<T> = T extends any[] ? T[0] : never; // これだと、Expect<Equal<First<[]>, never>> が通らない
// type First<T extends any[]> = T[0] extends undefined ? never : T[0] // これだと、Equal<First<[undefined]>, undefined>
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]; // T['length'] のプロパティが生えているの知らなかった

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/14/answer/ja
  > 解答を見る：https://tsch.js.org/14/solutions
  > その他の課題：https://tsch.js.org/ja
*/
