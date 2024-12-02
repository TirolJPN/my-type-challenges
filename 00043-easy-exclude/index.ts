/*
  43 - Exclude
  -------
  by Zheeeng (@zheeeng) #初級 #built-in #union

  ### 質問

  組み込みの型ユーティリティ`Exclude <T, U>`を使用せず、`U`に割り当て可能な型を`T`から除外する型を実装します。

  例えば：

  ```ts
  type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
  ```

  > GitHubで確認する：https://tsch.js.org/43/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyExclude<T, U> = T extends U ? never : T

/* _____________ テストケース _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types の理解が必須。
// MyExclude<T, U> は、条件付き型 (conditional type) を利用して T 型のうち U に含まれるものを除外する型。
// TypeScript の条件付き型は 分配法則 (distributive conditional types) を持つため、T がユニオン型の場合、それぞれの要素に対して個別に条件が適用される。この仕組みにより、T の各要素が U に含まれるかどうかを判定して型を分岐できます。

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]

/* _____________ 次のステップ _____________ */
/*
  > 解答を共有する：https://tsch.js.org/43/answer/ja
  > 解答を見る：https://tsch.js.org/43/solutions
  > その他の課題：https://tsch.js.org/ja
*/
