# TC-017: Ühe tellimuse hankimine

**Kriitilisus:** High  
**Kategooria:** CRUD  
**Eeltingimused:** Kasutaja on sisse logitud, tellimus on loodud  
**Test andmed:** Olemasoleva tellimuse ID

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada GET päring `/orders/{valid_id}` Authorization header'iga | HTTP 200 status |
| 2 | Kontrolli response struktuuri | Sisaldab id, userId, listingId, quantity, totalPrice |
| 3 | Saada GET päring `/orders/{invalid_id}` | HTTP 404 status |
| 4 | Saada GET päring ilma Authorization'ita | HTTP 401 status |

## Täiendav info
- **API Endpoint:** GET /orders/{id}
- **Headers:**
```
Authorization: Bearer {token}
```
- **Test scenarios:**
```
GET /orders/1 (olemasolev)
GET /orders/999 (mitteolemasolev)
GET /orders/abc (vigane ID)
```
- **Expected HTTP Status:** 200 (success), 404 (not found), 401 (unauthorized)
- **Success Response:**
```json
{
  "id": 1,
  "userId": 1,
  "listingId": 1,
  "quantity": 2,
  "totalPrice": 599.98
}
```

## Märkused
- Authorization on kohustuslik
- 404 error mitteolemasoleva tellimuse korral
- Kontrollida kas kasutaja näeb ainult oma tellimusi
- ID validatsioon vigaste formaatide jaoks