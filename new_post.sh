#!/usr/bin/env bash
TITLE=$1
if [[ ! $TITLE ]]; then
	echo "Usage: $0 <post title>"
	exit 1
fi

DATE_INFO=$(date +%Y-%m-%d)
HOURS_INFO=$(date +%H:%M:%S)
POST_FILE="docs/_posts/$DATE_INFO-$TITLE.md"

touch $POST_FILE
echo -e "---" >> $POST_FILE
echo -e "layout: post" >> $POST_FILE
echo -e "title:  '$TITLE'" >> $POST_FILE
echo -e "date:   $DATE_INFO $HOURS_INFO +0800" >> $POST_FILE
echo -e "categories: notes" >> $POST_FILE
echo -e "" >> $POST_FILE
echo -e "---" >> $POST_FILE

cat $POST_FILE

