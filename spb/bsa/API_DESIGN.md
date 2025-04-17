### Sport booking API design

| SIGN     | DESCRIPTION     |
| -------- | --------------- |
| &#x2705; | Implemented     |
| &#x274c; | Not Implemented |

## Group APIs: **_/api/v1_**

#### **address**

Address API for user (Admin, Club Owner, Member, User)

| No  | Implemented | Method | Path                               | Permission   | Description          |
| --- | ----------- | ------ | ---------------------------------- | ------------ | -------------------- |
| 1   | &#x2705;    | GET    | /addresses/provinces               | address:read | Province list        |
| 2   | &#x2705;    | GET    | /addresses/provinces/:id           | address:read | Province detail      |
| 4   | &#x2705;    | GET    | /addresses/provinces/:id/districts | address:read | Province's districts |
| 3   | &#x2705;    | GET    | /addresses/districts/:id           | address:read | District detail      |
| 5   | &#x2705;    | GET    | /addresses/districts/:id/wards     | address:read | District's wards     |
| 6   | &#x2705;    | GET    | /addresses/wards/:id               | address:read | Ward's detail        |

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
| 10  | &#x2705;    | POST   | /auth/ses-verify                   | auth:aws   | Verify AWS SES identity                                   |
| 11  | &#x2705;    | POST   | google callback                    |            | Member, User can login by google                          |

---

#### **clubs**

Manage clubs by Admin, Club Owner

| No  | Implemented | Method | Path                                                  | Permission  | Description                               |
| --- | ----------- | ------ | ----------------------------------------------------- | ----------- | ----------------------------------------- |
| 1   | &#x2705;    | GET    | /clubs?i={items}&p={page}&b={order by}&t={order type} | club:read   | Get all clubs with pagination and sorting |
| 2   | &#x2705;    | GET    | /clubs/:id                                            | club:read   | Get club by id                            |
| 3   | &#x2705;    | POST   | /clubs/                                               | club:create | Create new club                           |
| 4   | &#x2705;    | PUT    | /clubs/:id                                            | club:update | Update club info                          |
| 5   | &#x2705;    | DELETE | /clubs/:id                                            | club:delete | Delete club                               |
| 6   | &#x2705;    | POST   | /clubs/:id/media                                      | club:update | Add club's media                          |
| 7   | &#x2705;    | DELETE | /clubs/media/:id                                      | club:update | Delete club's media                       |
| 8   | &#x274c;    | GET    | /clubs/:id/units                                      | club:read   | Get club's units                          |
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

| No  | Implemented | Method | Path                        | Permission        | Description                      |
| --- | ----------- | ------ | --------------------------- | ----------------- | -------------------------------- |
| 1   | &#x2705;    | POST   | /notifications/sender/:id   | notification:read | Get all notification of sender   |
| 2   | &#x2705;    | POST   | /notifications/receiver/:id | notification:read | Get all notification of receiver |

---

#### **orders**

Manage orders by Admin, Club Owner, Member, User

| No  | Implemented | Method | Path                     | Permission   | Description                                       |
| --- | ----------- | ------ | ------------------------ | ------------ | ------------------------------------------------- |
| 1   | &#x2705;    | POST   | /orders/pay              | order:pay    | Create order pay by User                          |
| 2   | &#x2705;    | POST   | /orders/zalopay/callback |              | ZaloPay payment callback                          |
| 3   | &#x2705;    | GET    | /orders/:id              | order:read   | Get orders of user by user_id                     |
| 4   | &#x274c;    | POST   | /orders/                 | order:create | Create order by client/member                     |
| 5   | &#x274c;    | POST   | /orders/:id              | order:create | Submit order by client/member                     |
| 6   | &#x274c;    | DELETE | /orders/:id              | order:delete | Delete order (not submitted yet) by client/member |

---

#### **payment-methods**

Manage payment_method by Admin, Club Owner, Member, User

| No  | Implemented | Method | Path                | Permission            | Description            |
| --- | ----------- | ------ | ------------------- | --------------------- | ---------------------- |
| 1   | &#x274c;    | GET    | /payment-method     | payment_method:read   | Get all payment_method |
| 2   | &#x274c;    | PUT    | /payment-method/:id | payment_method:update | Update payment_method  |
| 3   | &#x274c;    | POST   | /payment-method     | payment_method:create | Create payment_method  |

---

#### **sport-types**

Manage Sport Type

| No  | Implemented | Method | Path             | Permission        | Description           |
| --- | ----------- | ------ | ---------------- | ----------------- | --------------------- |
| 1   | &#x2705;    | GET    | /sport-types/    | sport_type:read   | Get all sport type    |
| 2   | &#x2705;    | GET    | /sport-types/:id | sport_type:read   | Get sport type by id  |
| 3   | &#x2705;    | POST   | /sport-types/    | sport_type:create | Create new sport type |
| 4   | &#x2705;    | PUT    | /sport-types/:id | sport_type:update | Update sport type     |
| 5   | &#x2705;    | DELETE | /sport-types/:id | sport_type:delete | Delete sport type     |

---

#### **unit**

Manage units by Admin, Club Owner, Member

| No  | Implemented | Method | Path                                                                                                                                                                                     | Permission  | Description                                |
| --- | ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------ |
| 1   | &#x2705;    | GET    | /units/:id                                                                                                                                                                               | unit:read   | Get unit by id                             |
| 2   | &#x2705;    | POST   | /units/                                                                                                                                                                                  | unit:create | Create new unit                            |
| 3   | &#x2705;    | PUT    | /units/:id                                                                                                                                                                               | unit:update | Update unit info                           |
| 4   | &#x2705;    | DELETE | /units/:id                                                                                                                                                                               | unit:delete | Delete unit                                |
| 5   | &#x2705;    | GET    | /units?i={items}&p={page}&b={order by}&t={order type}&q={query - unit name or club name}&st={sport type}&pv={province}&wd={ward}&dt={district}&lng={longitude}&lat={latitude}&r={radius} | unit:read   | Search units by name, location, sport type |
| 6   | &#x2705;    | POST   | /units/:id/media                                                                                                                                                                         | unit:update | Add unit's media                           |
| 7   | &#x2705;    | DELETE | /units/media/:id                                                                                                                                                                         | unit:update | Delete unit's media                        |
| 8   | &#x2705;    | GET    | /units/:id/booked-time                                                                                                                                                                   |             | Get unit's booked time on day              |

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
