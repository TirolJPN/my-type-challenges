トグルホールディングス株式会社でプロダクトエンジニアとして働いている原口です！

最近、TypeScript の型システムやユーティリティ型への理解を深めるために、[type-challenges](https://github.com/type-challenges/type-challenges) に毎日少しずつ取り組んでいます。  
今回は、その中でも初級レベル (easy) の問題をすべて解いてみました。ここでは解答の解説ではなく、「事前に知っておくとスムーズに解ける TypeScript の知識」を中心にまとめています。

# type-challenges とは
type-challenges は、TypeScript の型システムを駆使して様々な型を実装する練習問題集です。問題は easy（とはいえ慣れていないと難しいものも多い）から extreme まで幅広く、一般的なユーティリティ型 (Pick、Readonly、Exclude など) の再実装から、型推論や条件型を活用しなければ解けない複雑な問題まで、様々な問題が用意されています。

これらに取り組むことで、TypeScript の型に対する理解が深まります。

# 難しかったポイント

## [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types) について

[Exclude](https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.ja.md) の問題では、条件型（`T extends U ? X : Y`）を用いて要素ごとに型をフィルタリングする処理が必要です。

TypeScript の条件型は、ユニオン型に対して「分配」が行われるという仕様があります。  
以下は、任意の型を受け取って、その型を配列にして返す `ToArray` の例です。

```ts
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>;
```

`ToArray` は `string` と `number` に対してそれぞれ適用され、  
`ToArray<string> | ToArray<number>` となり、結果として `string[] | number[]` という型が得られます。

この性質を利用することで、`Exclude` 型などを実装できます。

## infer キーワードによる型推論

[Parameters](https://github.com/type-challenges/type-challenges/blob/main/questions/03312-easy-parameters/README.ja.md) や [Awaited](https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.ja.md) などの問題では、`infer` キーワードを用いた一部の型抽出のテクニックが必要となります。`infer` は条件型の中で使用でき、推論結果を変数のように扱うことが出来ます。

特に [Awaited](https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.ja.md) の問題では、再帰的に Promise をアンラップしていく必要があり、`infer` と条件型を組み合わせた再帰的な型定義を理解する良い練習になりました。

## 配列型への理解

[TupleToObject](https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.ja.md) や [Length of Tuple](https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.ja.md) のような配列を操作する問題では、TypeScript における配列型の特性を知っておくとスムーズに解けます。
たとえば `T['length']` で配列の長さが型レベルで取り出せる点や、スプレッド構文（`...T`）を使った配列同士の結合などがキーポイントになります。

## PromiseLike について

[Awaited](https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.ja.md) の解答例では、[PromiseLike](https://github.com/microsoft/TypeScript/blob/421f5c5458d09dad601604e6eff8765283aef14e/src/lib/es5.d.ts#L1512-L1520) という型が登場します。  
`PromiseLike` は `then` メソッドを持つ「thenable」なオブジェクトを表すためのインターフェースです。
これは完全な `Promise` 実装ではなく、`then` メソッドを介して `Promise` と似た挙動を実現する型になります。  
自分は全くなじみが無かったのですが、TypeScript の定義ファイルを参照することで理解を深めることができました。

# まとめ

easy レベルの type-challenges に取り組むことで、以下のような知識が得られました。

- Distributive Conditional Types：条件型がユニオン型に対して分配的に適用される特性
- infer キーワード：条件型内部で型推論・再帰的型展開を行うテクニック
- 配列型の特性：`T['length']` による長さ取得、スプレッド構文による型操作
- PromiseLike の理解：`Promise` のようなオブジェクト型への対応

これらを事前に押さえておくと、type-challenges に取り組む際のハードルを下げることができ、実際に問題に挑戦する際にはより本質的な部分にフォーカス出来ると思います。
また、これらの知識は実務でも役立つと思いますので、興味があればぜひ挑戦してみてください！