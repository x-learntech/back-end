#!/usr/bin/env bash

ROOT_DIR=$(dirname $0)
USER=root
DEST_HOST=admin.imruxin.com
DEST_DIR=/data/www/learntech-back/dist

if ! npm run build; then
  exit 1
fi
echo "success!!!"

rsync -azv --delete "${ROOT_DIR}/dist/" -e "ssh -p 10222" "${USER}@${DEST_HOST}:${DEST_DIR}"