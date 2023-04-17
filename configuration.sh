#!/bin/bash
if [ $1 != "" ] && [ $2 != "" ] && [ $3 != "" ]
then
  awk -v project="$2" '{sub("project_name", project)} {print}' $1 > temp.txt && mv temp.txt $3
fi
