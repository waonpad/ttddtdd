# ♪ てんてんどんどんてんどんどん ♪

## これは何？

Serverless Framework を使って、AWS LambdaからTwitterに定期ツイートしてその内容をDynamoDBに保存するやつ

## セットアップ

Bun をインストール

```bash
brew install oven-sh/bun/bun
```

プロジェクトのセットアップ

```bash
bun run setup
```

DyanamoDBの実行ファイルをインストール

```bash
bun run db:i
```

## 開発

DB起動

```bash
bun run db:start
```

Lambda開発サーバー起動

```bash
bun dev
```

DB管理画面起動

```bash
bun run db:admin
```
