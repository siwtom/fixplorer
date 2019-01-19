#! /usr/bin/env bash

set -e

USAGE="usage: init [app_name]"

if [[ $# -le 0 ]]; then
	echo "$USAGE" 1>&2
	exit 1
fi

app_name="$1"

echo "app name: $module_name"
echo "initializing ..."

sed -i "s/{{APP_NAME}}/$app_name/g" package.json

npm install

echo "completed"
