insert into "permission" (id, "name", created_at, updated_at)
values 
(1, 'create_user', NOW(), NOW()),
(2, 'update_user', NOW(), NOW()),
(3, 'delete_user', NOW(), NOW()),
(4, 'read_user', NOW(), NOW());

insert into "role" (id, "name", parent_id, created_at, updated_at)
values
(1, 'admin', null, NOW(), NOW()),
(2, 'client', 1, NOW(), NOW()),
(3, 'user', 2, NOW(), NOW());

insert into role_permission (role_id, permission_id)
values 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 4);