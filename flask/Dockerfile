# ベースイメージを指定 (Python 3.9-slim)
FROM python:3.9-slim-buster
# 作業ディレクトリを設定
WORKDIR /flask
# 環境変数を設定 (例: FLASK_APP)
ENV FLASK_APP=app.py
# requirements.txtから依存パッケージをインストール
COPY requirements.txt requirements.txt
# RUN apt update
# RUN apt install poppler-utils PyPDF2
RUN pip install -r requirements.txt
# コマンドを実行 (Flaskアプリを起動)
CMD ["flask","run", "--host=0.0.0.0", "-p", "7200", "--debugger", "--reload"]


# flask run --host=0.0.0.0 -p 7200 --debugger --reload
# ポートを公開
# EXPOSE 5000
# アプリケーションのコードをコピー
# COPY . .