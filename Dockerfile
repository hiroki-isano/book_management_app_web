FROM golang:1.19.1-alpine
RUN apk update && apk add git
#COPY ./config/go/.go_env /go/.go_env
WORKDIR /go
RUN go mod vendor