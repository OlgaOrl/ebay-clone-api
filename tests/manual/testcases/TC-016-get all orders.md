# TC-016: Kõigi tellimuste hankimine

**Kriitilisus:** High  
**Kategooria:** CRUD  
**Eeltingimused:** Kasutaja on sisse logitud, vähemalt üks tellimus on loodud  
**Test andmed:** Kehtiv Authorization token

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada GET päring `/orders` Authorization header'iga | HTTP 200 status |
| 2 | Kontrolli response struktuuri | Array tellimusi või tühi array |
| 3 | Saada GET päring `/orders?userId=1` | Filtreerib kasutaja ID järgi |
| 4 | Saada GET päring ilma Authorization'ita | HTTP 401 status |

## Täiendav info
- **API Endpoint:** GET /orders
- **Headers:**
```
Authorization: Bearer {token}
```
- **Query parameters:**
```
?userId=1 (optional filter)
```
- **Expected HTTP Status:** 200 (success), 401 (unauthorized)
- **Response Validation:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "listingId": 1,
    "quantity": 2,
    "totalPrice": 599.98
  }
]
```

## Märkused
- Authorization on kohustuslik selle endpoint'i jaoks
- userId filter võimaldab filtreerida kasutaja tellimusi
- Tühi array on valid response, kui tellimusi pole
- 401 error ilma token'ita