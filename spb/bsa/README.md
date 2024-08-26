## Backend server application

### APIs

Group APIs: **_/api/v1_**

---

**_/auth_**

-   [x] POST /login
-   [x] POST /register
-   [x] POST /refresh
-   [ ] POST /logout

---

**/user**

-   [x] GET /?i={items}&p={page}&b={order by}&t={order by}
-   [x] GET /:id
-   [x] POST /
-   [x] PATCH /
-   [x] DELETE /:id

---

**/club**

-   [ ] GET /
-   [ ] GET /:id
-   [ ] POST /
-   [ ] PATCH /
-   [ ] DELETE /:id

---

**/unit**

-   [ ] GET /
-   [ ] GET /:id
-   [ ] POST /
-   [ ] PATCH /
-   [ ] DELETE /:id

---

**/location**

-   [ ] GET /
-   [ ] GET /:id

---

**/metadata**

-   [ ] GET /
-   [ ] POST /:id

---

**/booking**

-   [ ] POST /
-   [ ] POST /book
-   [ ] POST /request
-   [ ] POST /request/:id
-   [ ] POST /request/approve
-   [ ] POST /order
-   [ ] POST /order/:id
-   [ ] POST /order/approve

---

**/media**

-   [ ] GET /
-   [ ] GET /:id
-   [ ] POST /
-   [ ] PATCH /
-   [ ] DELETE /:id

---

**/analyze**

-   [ ] POST /
-   [ ] POST /totalprice
