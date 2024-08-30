# ♪ てんてんどんどん てんどんどん ♪

## これは何だよ？

Twitterに定期ツイートして、その内容をDynamoDBに保存するAWS LambdaをAPI Gateway経由で公開する構成をServerless Frameworkで作るやつ

## セットアップ

### Bun をインストール

```bash
brew install oven-sh/bun/bun
```

### 依存関係インストール等

```bash
bun run setup
```

### 環境変数

Twitter APIに登録して、.env.localの TW_ プレフィックスのついた対応する環境変数に設定する

- [Use Cases, Tutorials, & Documentation | Twitter Developer Platform](https://developer.x.com/en)
- [Twitter API v2(X API Free)の使い方・移行(2024年)【GAS】 #JavaScript - Qiita](https://qiita.com/neru-dev/items/857cc27fd69411496388)

アクセス制限のため、適当な文字列でAPIキーを作成して、.env.localの API_KEY に設定する

何かあった時に自分のGmailに通知を飛ばすため、アプリパスワードを取得して、.env.localの MY_GMAIL に自分のGmailアドレス、 MY_GMAIL_PASSWORD にアプリパスワードを設定する
- [アプリ パスワードでログインする - Gmail ヘルプ](https://support.google.com/mail/answer/185833?hl=ja)

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

## デプロイ

AWSのアカウントを用意してここらへんのを見てアクセスキーとシークレットキーを取得しておく

- [AWS 認証情報 - サーバーレスフレームワーク - AWS 認証情報](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#recommended-using-local-credentials)
- [IAM ユーザーのアクセスキーの管理 - AWS Identity and Access Management](https://docs.aws.amazon.com/ja_jp/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
- [AWSのアクセスキーを取得する方法 #IAMユーザー - Qiita](https://qiita.com/yamasakk/items/3060d22faeed8e05ebe4)

```bash
bun run deploy
```
