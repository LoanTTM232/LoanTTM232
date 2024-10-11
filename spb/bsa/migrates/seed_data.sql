INSERT INTO
	"permission" (id, "name", created_at, updated_at)
VALUES
	(
		'afb5c6c7-4720-4e1c-8396-c9ada7b9c411' :: uuid,
		'user:list',
		NOW(),
		NOW()
	),
	(
		'f15f644d-07b7-4aa1-a2d5-c8d09c75de64' :: uuid,
		'user:read',
		NOW(),
		NOW()
	),
	(
		'48f78a0c-0ef7-4421-89f6-57f327f93b87' :: uuid,
		'user:create',
		NOW(),
		NOW()
	),
	(
		'ff141b2b-19df-4eed-b72c-b4befcf210f0' :: uuid,
		'user:update',
		NOW(),
		NOW()
	),
	(
		'd11b8ea5-11bc-44cb-9e82-26785c1b420b' :: uuid,
		'user:delete',
		NOW(),
		NOW()
	),
	(
		'd7fe40c7-3961-4bf6-970a-08fb33209870' :: uuid,
		'unit_service:create',
		NOW(),
		NOW()
	),
	(
		'72cdcd72-e94c-4c03-92ce-462c4c719699' :: uuid,
		'unit_service:update',
		NOW(),
		NOW()
	),
	(
		'c397fa8a-20d7-4ec4-9d0e-ba164710fb03' :: uuid,
		'unit_service:delete',
		NOW(),
		NOW()
	),
	(
		'91364a8e-0734-4a5c-81cb-58f4b02c9b23' :: uuid,
		'club:create',
		NOW(),
		NOW()
	),
	(
		'6a30974f-29fa-4f53-9d93-29de1ce1bd5c' :: uuid,
		'club:update',
		NOW(),
		NOW()
	),
	(
		'ccdac793-c1e7-4756-ae01-719283ef5089' :: uuid,
		'club:delete',
		NOW(),
		NOW()
	),
	(
		'06ce821d-5db8-4993-b088-79c4b78110ff' :: uuid,
		'unit:create',
		NOW(),
		NOW()
	),
	(
		'cf5a936d-3e9d-4175-925f-728a8b113c81' :: uuid,
		'unit:update',
		NOW(),
		NOW()
	),
	(
		'9cbdef70-fc8a-484a-88e4-0e4781b7a1b0' :: uuid,
		'unit:delete',
		NOW(),
		NOW()
	),
	(
		'c392852d-281b-4b17-94dd-ebb67d0b452b' :: uuid,
		'location:create',
		NOW(),
		NOW()
	),
	(
		'da137b1e-1f5f-451f-a426-4a55e952e34d' :: uuid,
		'metadata:create',
		NOW(),
		NOW()
	),
	(
		'15f98766-be1c-4247-bb97-d494b9533c03' :: uuid,
		'metadata:read',
		NOW(),
		NOW()
	),
	(
		'faba17b0-3688-4ea3-83b3-037fb7931fd8' :: uuid,
		'order:list',
		NOW(),
		NOW()
	),
	(
		'6b2b754c-c474-424a-a835-131ce5e7d1f9' :: uuid,
		'order:read',
		NOW(),
		NOW()
	),
	(
		'0caff751-b8f0-42f8-87b7-6195d5f8659b' :: uuid,
		'order:create',
		NOW(),
		NOW()
	),
	(
		'cb804a5d-22eb-4250-9c1b-662cdea5e1f9' :: uuid,
		'order:approve_request',
		NOW(),
		NOW()
	),
	(
		'e3851eca-e550-4857-915d-f7ea19eb2f1f' :: uuid,
		'order:approve_payment',
		NOW(),
		NOW()
	);

INSERT INTO
	"role" (id, "name", parent_id, created_at, updated_at)
VALUES
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'admin',
		null,
		NOW (),
		NOW ()
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'client',
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		NOW (),
		NOW ()
	),
	(
		'9666740a-4ff5-4d22-830f-ab3361ba5ef4' :: uuid,
		'user',
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		NOW (),
		NOW ()
	);

INSERT INTO
	role_permissions (role_id, permission_id)
VALUES
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'afb5c6c7-4720-4e1c-8396-c9ada7b9c411' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'f15f644d-07b7-4aa1-a2d5-c8d09c75de64' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'48f78a0c-0ef7-4421-89f6-57f327f93b87' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'ff141b2b-19df-4eed-b72c-b4befcf210f0' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'd11b8ea5-11bc-44cb-9e82-26785c1b420b' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'd7fe40c7-3961-4bf6-970a-08fb33209870' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'72cdcd72-e94c-4c03-92ce-462c4c719699' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'c397fa8a-20d7-4ec4-9d0e-ba164710fb03' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'91364a8e-0734-4a5c-81cb-58f4b02c9b23' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'6a30974f-29fa-4f53-9d93-29de1ce1bd5c' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'ccdac793-c1e7-4756-ae01-719283ef5089' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'06ce821d-5db8-4993-b088-79c4b78110ff' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'cf5a936d-3e9d-4175-925f-728a8b113c81' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'9cbdef70-fc8a-484a-88e4-0e4781b7a1b0' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'c392852d-281b-4b17-94dd-ebb67d0b452b' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'da137b1e-1f5f-451f-a426-4a55e952e34d' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'15f98766-be1c-4247-bb97-d494b9533c03' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'faba17b0-3688-4ea3-83b3-037fb7931fd8' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'6b2b754c-c474-424a-a835-131ce5e7d1f9' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'0caff751-b8f0-42f8-87b7-6195d5f8659b' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'cb804a5d-22eb-4250-9c1b-662cdea5e1f9' :: uuid
	),
	(
		'cc203bb9-7b33-4391-8917-0089588356f2' :: uuid,
		'e3851eca-e550-4857-915d-f7ea19eb2f1f' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'afb5c6c7-4720-4e1c-8396-c9ada7b9c411' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'f15f644d-07b7-4aa1-a2d5-c8d09c75de64' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'48f78a0c-0ef7-4421-89f6-57f327f93b87' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'd7fe40c7-3961-4bf6-970a-08fb33209870' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'72cdcd72-e94c-4c03-92ce-462c4c719699' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'c397fa8a-20d7-4ec4-9d0e-ba164710fb03' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'91364a8e-0734-4a5c-81cb-58f4b02c9b23' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'6a30974f-29fa-4f53-9d93-29de1ce1bd5c' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'ccdac793-c1e7-4756-ae01-719283ef5089' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'06ce821d-5db8-4993-b088-79c4b78110ff' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'cf5a936d-3e9d-4175-925f-728a8b113c81' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'9cbdef70-fc8a-484a-88e4-0e4781b7a1b0' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'faba17b0-3688-4ea3-83b3-037fb7931fd8' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'6b2b754c-c474-424a-a835-131ce5e7d1f9' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'cb804a5d-22eb-4250-9c1b-662cdea5e1f9' :: uuid
	),
	(
		'6c8647dc-091f-4249-b9f7-12bed594d124' :: uuid,
		'e3851eca-e550-4857-915d-f7ea19eb2f1f' :: uuid
	),
	(
		'9666740a-4ff5-4d22-830f-ab3361ba5ef4' :: uuid,
		'faba17b0-3688-4ea3-83b3-037fb7931fd8' :: uuid
	),
	(
		'9666740a-4ff5-4d22-830f-ab3361ba5ef4' :: uuid,
		'6b2b754c-c474-424a-a835-131ce5e7d1f9' :: uuid
	),
	(
		'9666740a-4ff5-4d22-830f-ab3361ba5ef4' :: uuid,
		'0caff751-b8f0-42f8-87b7-6195d5f8659b' :: uuid
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
		email_verify_token,
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
		NULL,
		false,
		'9666740a-4ff5-4d22-830f-ab3361ba5ef4' :: uuid
	);

INSERT INTO
	notification_type (
		id,
		"type",
		"title",
		"template",
		description,
		created_at,
		updated_at
	)
VALUES
	(
		gen_random_uuid(),
		'VERIFY:USER',
		'Sport Booking - Email Address Verification Request',
		'<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .content { text-align: left; padding: 20px; } .center { display: flex; justify-content: center; margin: 30px 0; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="content"> <h1>Hi, {{.Name}}</h1> <p>Thank you for registering at {{.CompanyName}}! <br /></p> <p> To complete your registration, please verify your email address by clicking the link below: </p> <div class="center"> <a href="{{.VerificationLink}}" class="button" >Verify My Email</a > </div> <p> If you didn’t sign up for an account, please ignore this email. </p> <p>Thank you,</p> <p>{{.CompanyName}} Team</p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>',
		'verify email',
		NOW(),
		NOW()
	),
	(
		gen_random_uuid(),
		'RESET:PASSWORD',
		'Sport Booking - Reset Your Password',
		'<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .content { text-align: left; padding: 20px; } .center { display: flex; justify-content: center; margin: 30px 0; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="content"> <h1>Hi, {{.Name}}</h1> <p> We received a request to reset your password for your {{.CompanyName}} account. <br /> </p> <p>To reset your password, <b>click the link below:</b></p> <div class="center"> <a href="{{.VerificationLink}}" class="button" >Reset My Password</a > </div> <p> If you did not request a password reset, please ignore this email. Your password will remain unchanged. </p> <p>Thank you,</p> <p>{{.CompanyName}} Team</p> <hr /> <i>This link will expire in <b>{{.Expire}}</b>.</i> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>',
		'reset password',
		NOW(),
		NOW()
	);

INSERT INTO
	public."metadata" (
		id,
		"key",
		"value",
		created_at,
		updated_at
	)
VALUES
	(
		gen_random_uuid(),
		'operator_email',
		'hoangduc97dn@gmail.com',
		NOW(),
		NOW()
	)