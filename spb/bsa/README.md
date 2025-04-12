## Backend server application

### APIs

[APis design](API_DESIGN.md) for the backend server application

### Use Case

#### Notifications

-   User(user, club owner, staff, admin) can see notifications
-   When user register account, they receive a verify email
-   When user booking a order, then club owner (staff) can see booking details. Notification just remind from booking status.
-   When club owner (staff) approve a booking, then user can receive a notification.
-   When user book a order, then user will choose option remind time or not.

notification_type:

-   verify_email (email)
-   forgot_password (email)
-   booking_create (web/mobile)
-   booking_accept (web/mobile)
-   booking_reject (web/mobile)
-   booking_remind (web/mobile)
-   booking_success (web/mobile)

### Role - Permissions

#### Role

-   Admin
-   User
-   Client

#### Permissions

```
club:create
club:update
club:delete
club:member

metadata:read
metadata:update

order:create
order:create
order:delete

sport_type:create
sport_type:update
sport_type:delete

unit:create
unit:update
unit:delete

user:read
user:update
```
