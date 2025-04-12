### Sport booking API design

| SIGN     | DESCRIPTION     |
| -------- | --------------- |
| &#x2705; | Implemented     |
| &#x274c; | Not Implemented |

## Group APIs: **_/api/v1_**

#### **address**

Address API for user (Admin, Club Owner, Member, User)

| No  | Implemented | Method | Path                               | Permission | Description          |
| --- | ----------- | ------ | ---------------------------------- | ---------- | -------------------- |
| 1   | &#x2705;    | POST   | /addresses/provinces               |            | Province list        |
| 2   | &#x2705;    | POST   | /addresses/provinces/:id           |            | Province detail      |
| 4   | &#x2705;    | POST   | /addresses/provinces/:id/districts |            | Province's districts |
| 3   | &#x2705;    | POST   | /addresses/districts/:id           |            | District detail      |
| 5   | &#x2705;    | POST   | /addresses/districts/:id/wards     |            | District's wards     |
| 6   | &#x2705;    | POST   | /addresses/wards/:id               |            | Ward's detail        |

---

#### **auth**

Authentication API for user (Admin, Club Owner, Member, User)

| No  | Implemented | Method | Path                               | Permission | Description                                               |
| --- | ----------- | ------ | ---------------------------------- | ---------- | --------------------------------------------------------- |
| 1   | &#x2705;    | POST   | /auth/login                        |            | Admin, Club Owner, Member, User can login                 |
| 2   | &#x2705;    | POST   | /auth/register                     |            | User can register                                         |
| 4   | &#x2705;    | POST   | /auth/logout                       |            | Admin, Club Owner, Member, User can logout                |
| 3   | &#x2705;    | POST   | /auth/refresh                      |            | Admin, Club Owner, Member, User can refresh               |
| 5   | &#x2705;    | POST   | /auth/verify-register-token        |            | Club Owner, Member, User can verify register token        |
| 6   | &#x2705;    | POST   | /auth/verify-register-token/resend |            | Club Owner, Member, User can resend verify register token |
| 7   | &#x2705;    | POST   | /auth/forgot-password              |            | Club Owner, Member, User can reset password               |
| 8   | &#x2705;    | POST   | /auth/verify-forgot-password-token |            | Club Owner, Member, User can reset password               |
| 9   | &#x2705;    | POST   | /auth/reset-password               |            | Club Owner, Member, User can reset password               |
| 10  | &#x2705;    | POST   | /auth/ses-verify                   |            | Verify AWS SES identity                                   |
| 11  | &#x2705;    | POST   | google callback                    |            | Member, User can login by google                          |

---

#### **clubs**

Manage clubs by Admin, Club Owner

| No  | Implemented | Method | Path                                                  | Permission  | Description                               |
| --- | ----------- | ------ | ----------------------------------------------------- | ----------- | ----------------------------------------- |
| 1   | &#x2705;    | GET    | /clubs?i={items}&p={page}&b={order by}&t={order type} |             | Get all clubs with pagination and sorting |
| 2   | &#x2705;    | GET    | /clubs/:id                                            |             | Get club by id                            |
| 3   | &#x2705;    | POST   | /clubs/                                               | club:create | Create new club                           |
| 4   | &#x2705;    | PUT    | /clubs/:id                                            | club:update | Update club info                          |
| 5   | &#x2705;    | DELETE | /clubs/:id                                            | club:delete | Delete club                               |
| 6   | &#x2705;    | POST   | /clubs/:id/media                                      | club:update | Add club's media                          |
| 7   | &#x2705;    | DELETE | /clubs/media/:id                                      | club:update | Delete club's media                       |
| 8   | &#x274c;    | GET    | /clubs/:id/units                                      |             | Get club's units                          |
| 9   | &#x274c;    | GET    | /clubs/:id/members                                    | club:member | Get all club's member                     |
| 10  | &#x274c;    | GET    | /clubs/:id/members/:id                                | club:member | Get club's member                         |
| 11  | &#x274c;    | POST   | /clubs/:id/members                                    | club:member | Create club's member                      |
| 12  | &#x274c;    | PUT    | /clubs/:id/members/:id                                | club:member | Update club's member info                 |
| 13  | &#x274c;    | DELETE | /clubs/:id/members/:id                                | club:member | Delete club's member info                 |

---

#### **metadata**

Manage metadata

| No  | Implemented | Method | Path           | Permission      | Description         |
| --- | ----------- | ------ | -------------- | --------------- | ------------------- |
| 1   | &#x2705;    | GET    | /metadata/:key | metadata:read   | Get metadata by key |
| 2   | &#x2705;    | PUT    | /metadata/:key | metadata:update | Update metadata     |

---

#### **notifications**

Manage notification

| No  | Implemented | Method | Path                        | Permission | Description                      |
| --- | ----------- | ------ | --------------------------- | ---------- | -------------------------------- |
| 1   | &#x274c;    | POST   | /notifications/sender/:id   |            | Get all notification of sender   |
| 2   | &#x274c;    | POST   | /notifications/receiver/:id |            | Get all notification of receiver |

---

#### **orders**

Manage orders by Admin, Club Owner, Member, User

| No  | Implemented | Method | Path                  | Permission   | Description                                       |
| --- | ----------- | ------ | --------------------- | ------------ | ------------------------------------------------- |
| 1   | &#x2705;    | POST   | /orders/pay           |              | Create order pay by User                          |
| 2   | &#x2705;    | POST   | /orders/momo/callback |              | MoMo payment callback                             |
| 3   | &#x274c;    | GET    | /orders/:id           |              | Get orders of user by user_id                     |
| 4   | &#x274c;    | POST   | /orders/              | order:create | Create order by client/member                     |
| 5   | &#x274c;    | POST   | /orders/:id           | order:create | Submit order by client/member                     |
| 6   | &#x274c;    | DELETE | /orders/:id           | order:delete | Delete order (not submitted yet) by client/member |

---

#### **sport-types**

Manage Sport Type

| No  | Implemented | Method | Path             | Permission        | Description           |
| --- | ----------- | ------ | ---------------- | ----------------- | --------------------- |
| 1   | &#x2705;    | GET    | /sport-types/    |                   | Get all sport type    |
| 2   | &#x2705;    | GET    | /sport-types/:id |                   | Get sport type by id  |
| 3   | &#x2705;    | POST   | /sport-types/    | sport_type:create | Create new sport type |
| 4   | &#x2705;    | PUT    | /sport-types/:id | sport_type:update | Update sport type     |
| 5   | &#x2705;    | DELETE | /sport-types/:id | sport_type:delete | Delete sport type     |

---

#### **unit**

Manage units by Admin, Club Owner, Member

| No  | Implemented | Method | Path                                                                                                                                                                                     | Permission  | Description                                |
| --- | ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------ |
| 1   | &#x2705;    | GET    | /units/:id                                                                                                                                                                               |             | Get unit by id                             |
| 2   | &#x2705;    | POST   | /units/                                                                                                                                                                                  | unit:create | Create new unit                            |
| 3   | &#x2705;    | PUT    | /units/:id                                                                                                                                                                               | unit:update | Update unit info                           |
| 4   | &#x2705;    | DELETE | /units/:id                                                                                                                                                                               | unit:delete | Delete unit                                |
| 5   | &#x2705;    | GET    | /units?i={items}&p={page}&b={order by}&t={order type}&q={query - unit name or club name}&st={sport type}&pv={province}&wd={ward}&dt={district}&lng={longitude}&lat={latitude}&r={radius} |             | Search units by name, location, sport type |
| 6   | &#x2705;    | POST   | /units/:id/media                                                                                                                                                                         | unit:update | Add unit's media                           |
| 7   | &#x2705;    | DELETE | /units/media/:id                                                                                                                                                                         | unit:update | Delete unit's media                        |

---

#### **users**

Manage users by Admin, Club Owner, Member

| No  | Implemented | Method | Path       | Permission  | Description                              |
| --- | ----------- | ------ | ---------- | ----------- | ---------------------------------------- |
| 1   | &#x2705;    | GET    | /users/:id | user:read   | Get user by id depend on **role**        |
| 2   | &#x2705;    | PUT    | /users/:id | user:update | Update user depend on **role**           |
| 3   | &#x274c;    | GET    | /users/    | user:list   | Get user's depend on **role**            |
| 4   | &#x274c;    | POST   | /users/    | user:create | Create user with role depend on **role** |

---
