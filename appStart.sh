#!/bin/bash
#アプリ起動

echo "start sh"
cd `dirname $0`
CURRENT=$(cd $(dirname $0);pwd)

# book_management_app_web

# web_react_book_management
# mysql_db_book_management
# web_go_book_management

docker-compose up -d && sleep 3 &&
docker exec -d web_go_book_management /bin/sh -c "cd /go/rundir && go run main.go" 
docker exec -d web_react_book_management /bin/sh -c "cd /front/book-management && npm start" &&
sleep 3 && open http://localhost:3000

