# 概要

canvasを使って手軽にバナーを作成できるアプリ、`バナナ`です。

作成したデータは保存され、いつでも呼び出す事ができます。

## デモ

https://test-banana-5f549.firebaseapp.com/

## 想定環境

[マーケター] バナーの文言を調整しながら効果測定を行いたい

[デザイナー] 文言修正のためだけにタスク化したくない。

このような状況を解消するために、マーケターだけで完結するようにこのツールを作成しました。

## 想定運用

デザイナーがバナーの制裁を整えテンプレートを作り、マーケターが文言などの調整、画像の作成、効果測定運用です。

# 使い方

```
npm install
npm start
```

*firebaseの設定がされていない場合動きません。*

*必ず設定をしてください*

`environments/environment.ts`

```
export const environment = {
    production: false,
    hmr: false,
    firebase: {
        apiKey: "xxxxxxxxxxxxxxxxxxxxxxxx",
        authDomain: "xxxxxxxxxxxx.firebaseapp.com",
        databaseURL: "https://xxxxxxxxxxxx.firebaseio.com",
        projectId: "xxxxxxxxxxxx",
        storageBucket: "xxxxxxxxxxxx.appspot.com",
        messagingSenderId: "12345678910"
    }
};

```



# その他


## 使用したテンプレート

Fuse2

Material Design Admin Template with Angular 5+ and Angular Material 2

http://angular-material.fusetheme.com/