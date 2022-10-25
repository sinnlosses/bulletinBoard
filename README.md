# 起動方法

```
docker-compose up -d
```

# DB初期化(初回起動後のみ実行が必要)
初回起動時後、DBにはデータが入っていません。
サンプルデータを登録するには起動後、以下のコマンドを実行してください。

```
docker-compose run backend sh docker-db-init.sh
```

サンプルとして、管理者のメールアドレスとパスワードを以下に掲載します。
email: test@example.com
password: password

# サンプル画面

# bulletinBoard<img width="1440" alt="スクリーンショット 2022-10-20 1 02 59" src="https://user-images.githubusercontent.com/23355453/196744525-a44da829-f7e1-4e72-a284-4da21c58e05e.png">
