#!/usr/bin/env bash

TABLES=(
	"public.address"
	"public.authentication_provider"
	"public.club"
	"public.club_member"
	"public.club_sporttype"
	"public.district"
	"public.media"
	"public.metadata"
	"public.notification"
	"public.notification_type"
	"public.order"
	"public.order_item"
	"public.permission"
	"public.province"
	"public.role"
	"public.role_permissions"
	"public.sport_type"
	"public.transaction"
	"public.unit"
	"public.unit_price"
	"public.unit_service"
	"public.unit_sporttype"
	"public.user"
	"public.ward"
)

USERNAME="spb_user"
DATABASE="spb_database"

TABLE_OPTIONS=""
for table in "${TABLES[@]}"; do 
	TABLE_OPTIONS="$TABLE_OPTIONS -t $table"
done

dest="./migrates/dump-spb_database-$(date +%Y%m%d%H%M).sql"
touch $dest
docker exec -it spb_database pg_dump -U $USERNAME -d $DATABASE $TABLE_OPTIONS > $dest
