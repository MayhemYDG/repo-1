#!/bin/bash

if [[ ! -f /mnt/beautysh.arguments ]]
then
  echo "No beautysh.arguments file found."
  echo -e "List of available arguments:\n"
  beautysh.py --help
  exit 1
fi

mapfile -t < /mnt/beautysh.arguments

for file in $@
do
  beautysh.py ${MAPFILE[@]} "/mnt/${file}"
done