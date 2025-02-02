# Conway's Game of Life

このプロジェクトは Conway's Game of Life を TypeScript で実装したものです。Hugo の記事上で動作します。

特記事項:
npm パッケージ等は含まれていないため、インストール手順を確認してください。

## 目次
 [インストール](#インストール)
 [ディレクトリ構造](#ディレクトリ構造)
 [レイアウト](#レイアウト)
 [コンテンツ](#コンテンツ)
 [ライセンス](#ライセンス)

## インストール
Hugo のルートディレクトリに移動して、新しい Node.js プロジェクトを作成するための初期設定を行います。
```bash
cd /path/to/your-directory
npm init -y
```
`react` と `react-dom` をインストールします。
```bash
npm install --save react react-dom
```
`styled-components` と `styled-components` の型定義をインストールします。
```bash
npm install styled-components
npm install @types/styled-components
```

## ディレクトリ構造
1. `/assets` ディレクトリ以下にスクリプトを配置します
2. `/content` ディレクトリ以下に npmパッケージを利用する記事を配置します
3. 各々のディレクトリの階層構造は同じにしておきます ( `/apps/article` )
```plaintext
/path/to/your-directory
├─assets
│  └─apps
│     └─article          # src 以下のファイルをコピー
│        ├─components
│        ├─state
│        ├─styles
│        ├─utils
│        ├─App.tsx
│        ├─index.ts
│        └─tsconfig.json
├─content
│  └─apps
│     └─article
│        └─article.md    # このプロジェクトを利用する記事
├─layouts
│  └─_default
│     └─single.html      # 変更するファイル
```

## レイアウト
`single.html` に下記のコードを追記します。
```html {name="single.html"}
<head>
    {{- with resources.Get (path.Join .Page.File.Dir "index.ts") -}}
        <!-- 
            現在のページのディレクトリ内にある 'index.ts' ファイルを取得します。
            もしファイルが存在すれば、次の処理に進みます。
        -->
        {{- with . | js.Build (dict "minify" true "target" "es6") | fingerprint -}}
            <!-- 
                取得した TypeScript ファイルをビルドします。
                オプションとして、minify ( 最小化 ) と target ( ターゲットESバージョンES6 ) を指定します。
                ビルド後にファイルにフィンガープリント ( キャッシュバスティングのためのハッシュ ) を付与します。
            -->
            <script src="{{ .Permalink | relURL }}" defer></script>
            <!-- 
                ビルドおよびフィンガープリントされたファイルの URL を取得し、
                <script> タグの src 属性に設定します。
                defer 属性を付与して、ページの解析が完了するまでスクリプトの実行を遅らせます。
            -->
        {{- end -}}
    {{- end -}}
</head>
```

## コンテンツ
npm パッケージを利用する記事に下記のコードを記述します。
```md
<div id="App1"></div>
```

## ライセンス
このプロジェクトは MIT ライセンスの下でライセンスされています。詳細は LICENSE ファイルをご覧ください。
