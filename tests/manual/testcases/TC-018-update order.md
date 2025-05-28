# TC-018: Tellimuse uuendamine

**Kriitilisus:** Medium  
**Kategooria:** CRUD  
**Eeltingimused:** Kasutaja on sisse logitud, tellimus on loodud  
**Test andmed:** Uuendatud tellimuse andmed

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada PATCH päring `/orders/{id}` uue quantity'ga | HTTP 200 status |
| 2 | Kontrolli, et quantity ja totalPrice on uuendatud | Response sisaldab uusi väärtusi |
| 3 | Saada PATCH päring uue listingId'ga | HTTP 200 status |
| 4 | Saada PATCH päring ilma Authorization'ita | HTTP 401 status |

## Täiendav info
- **API Endpoint:** PATCH /orders/{id}
- **Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```
- **Request Body:**
```json
{
  "quantity": 3,
  "totalPrice": 899.97
}
```
- **Expected HTTP Status:** 200 (success), 401 (unauthorized)
- **Response Validation:**
```json
{
  "id": 1,
  "userId": 1,
  "listingId": 1,
  "quantity": 3,
  "totalPrice": 899.97
}
```

## Märkused
- Authorization on kohustuslik
- totalPrice peaks olema recalculated quantity muutmisel
- Ainult osa välju võib olla uuendatud
- Kasutaja peaks saama muuta ainult oma tellimusi