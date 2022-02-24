#!/bin/bash

if [[ ! -f /mnt/beautysh.arguments ]]
then
  echo "No beautysh.arguments file found."
  beautysh.py -help
  exit 1
fi

mapfile -t < /mnt/beautysh.arguments

for file in $@
do
  beautysh.py ${MAPFILE[@]} "/mnt/${file}"
done