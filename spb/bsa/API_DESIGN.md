### Sport booking API design

| SIGN     | DESCRIPTION     |
| -------- | --------------- |
| &#x2705; | Implemented     |
| &#x274c; | Not Implemented |

Group APIs: **_/api/v1_**

---

#### **auth**

Authentication API for user (Admin, Club Owner, Member, User)

| No  | Implemented | Method | Path                  | Permission | Description                                             |
| --- | ----------- | ------ | --------------------- | ---------- | ------------------------------------------------------- |
| 1   | &#x2705;    | POST   | /auth/login           |            | Admin, Club Owner, Member, User can login               |
| 2   | &#x2705;    | POST   | /auth/register        |            | User can register                                       |
| 3   | &#x2705;    | POST   | /auth/refresh         |            | Admin, Club Owner, Member, User can refresh             |
| 4   | &#x274c;    | POST   | /auth/logout          |            | Admin, Club Owner, Member, User can logout              |
| 5   | &#x274c;    | GET    | /auth/verify-email    |            | Club Owner, Member, User can verify email               |
| 6   | &#x274c;    | POST   | /auth/resend-verify   |            | Club Owner, Member, User can resend verify email        |
| 7   | &#x274c;    | POST   | /auth/forgot-password |            | Admin, Club Owner, Member, User can use forgot password |
| 8   | &#x274c;    | POST   | /auth/reset-password  |            | Club Owner, Member, User can reset password             |

---

#### **users**

Manage users by Admin, Club Owner, Member

| No  | Implemented | Method | Path                                                  | Permission  | Description                                                                |
| --- | ----------- | ------ | ----------------------------------------------------- | ----------- | -------------------------------------------------------------------------- |
| 1   | &#x2705;    | GET    | /users?i={items}&p={page}&b={order by}&t={order type} | read_users  | Get all users with pagination and sorting and full name depend on **role** |
| 2   | &#x2705;    | GET    | /users/:id                                            | read_user   | Get user by id depend on **role**                                          |
| 3   | &#x2705;    | POST   | /users/                                               | create_user | Create new user depend on **role**                                         |
| 4   | &#x2705;    | PATCH  | /users/:id                                            | update_user | Update user depend on **role**                                             |
| 5   | &#x2705;    | DELETE | /users/:id                                            | delete_user | Delete user depend on **role**                                             |

---

#### **unit_service**

Manage unit services for club and unit

| No  | Implemented | Method | Path                                                                                                      | Permission          | Description                                                                    |
| --- | ----------- | ------ | --------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------ |
| 1   | &#x274c;    | GET    | /unit_service?i={items}&p={page}&b={order by}&t={order type}&k={kind club or unit}&u={club id or unit id} | read_unit_services  | Get all services for **club** or **unit** with pagination and sorting and name |
| 2   | &#x274c;    | GET    | /unit_service/:id                                                                                         | read_unit_service   | Get service for **club** or **unit** by id                                     |
| 3   | &#x274c;    | POST   | /unit_service/                                                                                            | create_unit_service | Create service for **club**                                                    |
| 4   | &#x274c;    | PATCH  | /unit_service/:id                                                                                         | update_unit_service | Update, Assign or Unassign service to **unit**                                 |
| 5   | &#x274c;    | DELETE | /unit_service/:id                                                                                         | delete_unit_service | Delete service from **club** by id                                             |

---

#### **clubs**

Manage clubs by Admin, Club Owner

| No  | Implemented | Method | Path                                                                                                            | Permission  | Description                                          |
| --- | ----------- | ------ | --------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------- |
| 1   | &#x274c;    | GET    | /clubs?i={items}&p={page}&b={order by}&t={order type}&c={club name}&lg={longitude}&lt={latitude}&s={sport type} | read_clubs  | Get all clubs with pagination and sorting and filter |
| 2   | &#x274c;    | GET    | /clubs/:id                                                                                                      | read_club   | Get club by id                                       |
| 3   | &#x274c;    | POST   | /clubs/                                                                                                         | create_club | Create new club                                      |
| 4   | &#x274c;    | PATCH  | /clubs/:id                                                                                                      | update_club | Update club info                                     |
| 5   | &#x274c;    | DELETE | /clubs/:id                                                                                                      | delete_club | Delete club                                          |

---

#### **unit**

Manage units by Admin, Club Owner, Member

| No  | Implemented | Method | Path                                                                                                            | Permission  | Description                                             |
| --- | ----------- | ------ | --------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------- |
| 1   | &#x274c;    | GET    | /units?i={items}&p={page}&b={order by}&t={order type}&c={unit name}&lg={longitude}&lt={latitude}&s={sport type} | read_units  | Get all units with pagination and sorting and full name |
| 2   | &#x274c;    | GET    | /units/:id                                                                                                      | read_unit   | Get unit by id                                          |
| 3   | &#x274c;    | POST   | /units/                                                                                                         | create_unit | Create new unit                                         |
| 4   | &#x274c;    | PATCH  | /units/:id                                                                                                      | update_unit | Update unit info                                        |
| 5   | &#x274c;    | DELETE | /units/:id                                                                                                      | delete_unit | Delete unit                                             |

---

#### **location**

Manage locations

| No  | Implemented | Method | Path       | Permission      | Description         |
| --- | ----------- | ------ | ---------- | --------------- | ------------------- |
| 1   | &#x274c;    | GET    | /locations | read_locations  | Get all locations   |
| 2   | &#x274c;    | POST   | /locations | create_location | Create new location |

---

#### **metadata**

Manage metadata

| No  | Implemented | Method | Path      | Permission      | Description         |
| --- | ----------- | ------ | --------- | --------------- | ------------------- |
| 1   | &#x274c;    | GET    | /metadata | read_metadata   | Get all metadata    |
| 2   | &#x274c;    | POST   | /metadata | create_metadata | Create new metadata |

---

#### **order**

Manage orders by Admin, Club Owner, Member, User

| No  | Implemented | Method | Path                                                               | Permission            | Description                      |
| --- | ----------- | ------ | ------------------------------------------------------------------ | --------------------- | -------------------------------- |
| 1   | &#x274c;    | GET    | /orders?i={items}&p={page}&b={order by}&t={order type}&u={unit id} | read_orders           | Get all orders                   |
| 2   | &#x274c;    | GET    | /orders/:id                                                        | read_order            | Get order by id                  |
| 3   | &#x274c;    | POST   | /orders/request                                                    | create_order          | Create new order - request order |
| 4   | &#x274c;    | POST   | /orders/approve-request                                            | approve_request_order | Approve or reject request order  |
| 5   | &#x274c;    | POST   | /orders/payment                                                    | create_order          | Create new order - payment       |
| 6   | &#x274c;    | POST   | /orders/approve-payment                                            | approve_payment_order | Approve payment order            |

---

#### **media**

Manage media (images, videos)

| No  | Implemented | Method | Path       | Permission | Description |
| --- | ----------- | ------ | ---------- | ---------- | ----------- |
| 1   | &#x274c;    | GET    | /media/:id |            | Get media   |
