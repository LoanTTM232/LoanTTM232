#!/usr/bin/env bash

USERNAME="spb_user"
DATABASE="spb_database"

# Get the latest dump file
DUMP_FILE=$(ls -t ../migrates/dump-spb_database-*.sql | tail -n 1)
if [ -z "$DUMP_FILE" ]; then
	echo "No dump file found in ../migrates/"
	exit 1
fi

# Copy the dump file to the database container
docker cp "$DUMP_FILE" spb_database:/tmp/dump.sql

# Restore the database from the dump file
docker exec -it spb_database psql -U "$USERNAME" -d "$DATABASE" -f /tmp/dump.sql

# Remove the dump file from the container
docker exec -it spb_database rm /tmp/dump.sql
echo "Database restored from $DUMP_FILE"
