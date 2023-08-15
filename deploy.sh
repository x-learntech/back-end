#!/usr/bin/env bash

ROOT_DIR=$(dirname $0)
USER=root
DEST_HOST=back.learntech.cn
DEST_DIR=/data/ruxin/www/learntech-back/build

if ! npm run build; then
  exit 1
fi
echo "success!!!"

rsync -azv --delete "${ROOT_DIR}/dist/" -e "ssh -p 10222" "${USER}@${DEST_HOST}:${DEST_DIR}"