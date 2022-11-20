#!/usr/bin/env bash

ROOT_DIR=$(dirname $0)
USER=ruxin
DEST_HOST=49.234.192.155
DEST_DIR=/data/ruxin/www/learntech-note/back/dist

if ! npm run build; then
  exit 1
fi
echo "success!!!"

rsync -azv --delete "${ROOT_DIR}/dist/" -e "ssh -p 22022" "${USER}@${DEST_HOST}:${DEST_DIR}"