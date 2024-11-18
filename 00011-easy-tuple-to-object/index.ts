/*
  11 - Tuple to Object
  -------
  by sinoon (@sinoon) #初級 #object-keys

  ### 質問

  タプルを受け取り、その各値のkey/valueを持つオブジェクトの型に変換する型を実装します。

  例えば：

  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```

  > GitHubで確認する：https://tsch.js.org/11/ja
*/

/* _____________ ここにコードを記入 _____________ */

type TupleToObject<T extends readonly (symbol | number | string)[]> = {
    [Key in T[number]]: Key
  }