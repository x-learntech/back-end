#!/usr/bin/env bash

ROOT_DIR=$(dirname $0)
USER=ruxin
DEST_HOST=back.learntech.cn
DEST_DIR=/data/www/learntech-back/build

if ! yarn run build; then
  exit 1
fi
echo "success!!!"

rsync -azv --exclude '.*' --delete "${ROOT_DIR}/build/" -e "ssh -p 10222" "${USER}@${DEST_HOST}:${DEST_DIR}"