INSERT INTO
	"permission" (id, "name", created_at, updated_at)
VALUES
	(
		'cb6541f1-a32b-42aa-a6b2-1e84024fa076',
		'user:create',
		NOW (),
		NOW ()
	),
	(
		'728b7199-8d4b-4a2d-bd97-7b53f284091c',
		'user:update',
		NOW (),
		NOW ()
	),
	(
		'3008638a-ea1c-4be3-9d24-1b2ebd578bc0',
		'user:delete',
		NOW (),
		NOW ()
	),
	(
		'1683cbe9-8076-40da-8210-624a600e340d',
		'user:read',
		NOW (),
		NOW ()
	),
	(
		'2083cbe9-8072-40aa-a210-a24a600e340d',
		'user:list',
		NOW (),
		NOW ()
	);

INSERT INTO
	"role" (id, "name", parent_id, created_at, updated_at)
VALUES
	(
		'cc203bb9-7b33-4391-8917-0089588356f2',
		'admin',
		null,
		NOW (),
		NOW ()
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124',
		'client',
		'cc203bb9-7b33-4391-8917-0089588356f2',
		NOW (),
		NOW ()
	),
	(
		'9666740a-4ff5-4d22-830f-ab3361ba5ef4',
		'user',
		'6c8647dc-091f-4249-b9f7-12bed594d124',
		NOW (),
		NOW ()
	);

INSERT INTO
	role_permissions (role_id, permission_id)
VALUES
	(
		'cc203bb9-7b33-4391-8917-0089588356f2',
		'cb6541f1-a32b-42aa-a6b2-1e84024fa076'
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2',
		'728b7199-8d4b-4a2d-bd97-7b53f284091c'
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2',
		'3008638a-ea1c-4be3-9d24-1b2ebd578bc0'
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2',
		'1683cbe9-8076-40da-8210-624a600e340d'
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2',
		'2083cbe9-8072-40aa-a210-a24a600e340d'
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124',
		'1683cbe9-8076-40da-8210-624a600e340d'
	);

INSERT INTO
	public."user" (
		id,
		created_at,
		updated_at,
		deleted_at,
		email,
		"password",
		full_name,
		phone,
		is_email_verified,
		role_id
	)
VALUES
	(
		'78574593-757c-49bc-aad1-3a8dd5c03970' :: uuid,
		NOW (),
		NOW (),
		NULL,
		'admin@gmail.com',
		'$2a$10$nCvN3CAF4b1mMuramtpSre8Dx7fsBf4FoRG2btotNKvbLftZPKbqu',
		NULL,
		NULL,
		true,
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid
	),
	(
		'6bb9e18d-69e7-4dd3-bf7a-7b9ee15b3aeb' :: uuid,
		NOW (),
		NOW (),
		NULL,
		'client@gmail.com',
		'$2a$10$A20KBHwJ8dpuL951mY23P.D0gV6kek73rKqspLgAm2sfkCe7HgbFm',
		NULL,
		NULL,
		true,
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid
	),
	(
		'043aad47-c234-4e76-a809-d65dc5708646' :: uuid,
		NOW (),
		NOW (),
		NULL,
		'user1@gmail.com',
		'$2a$10$buwiJga6U0oGp4eim88zCuKYYFdxLz3cGgGxb9mhzuXoh3G5vpY26',
		NULL,
		NULL,
		false,
		'9666740a-4ff5-4d22-830f-ab3361ba5ef4' :: uuid
	);