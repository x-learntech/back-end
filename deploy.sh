#!/usr/bin/env bash

ROOT_DIR=$(dirname $0)
USER=root
# tailscale 组网内网IP
DEST_HOST=100.114.135.91
DEST_DIR=/data/www/learntech-back/build

if ! yarn run build; then
  exit 1
fi
echo "success!!!"

rsync -azv --exclude '.*' --delete "${ROOT_DIR}/build/" -e "ssh -p 10222" "${USER}@${DEST_HOST}:${DEST_DIR}"