#dockerHubから持ってくるImageの指定
FROM node:16.13.0-alpine3.12
#使用するnodeのバージョンの指定
ENV NODE_VERSION 14.18.1
#docker内に入った時の初期パスの指定
WORKDIR /front
#ローカル側のファイルをdocker内にコピーする
COPY ./front /front
#コンテナの使用ポート指定
EXPOSE 3000
#コンテナが勝手に終了してしまわないようにする設定
ENV CI=true
