# プロジェクトについて


このプロジェクトpdfなどの本のデータを管理するのWEBアプリです。

使用する言語はTS/React・Goを使用します。


# ディレクトリ構成

1.config

docker用の設定があります。

2.save

dockerがデータを保存するディレクトリです

書籍の本体のデータ（PDFなど）とMYSQLのデータ（カテゴリー情報）をこのディレクトリに配置し保存します。

3.Go

Goのソースコードが保存されます

※修正案としてGoをビルドしたものを渡して立ち上げる方法もあります
は「GOOS=linux GOARCH=amd64 go build hello.go」などのようにして

# その他

docker-compose.yamlのenvironmentにmysqlの設定があります
docker-compose.yamlのplatformでプラットフォームを指定してください







