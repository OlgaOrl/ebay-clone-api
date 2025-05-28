# TC-019: Tellimuse kustutamine

**Kriitilisus:** Medium  
**Kategooria:** CRUD  
**Eeltingimused:** Kasutaja on sisse logitud, tellimus on loodud  
**Test andmed:** Olemasoleva tellimuse ID

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada DELETE päring `/orders/{id}` Authorization header'iga | HTTP 200 status |
| 2 | Kontrolli success response'i | Response kinnitab kustutamist |
| 3 | Kontrolli, et tellimus on kustutatud | GET `/orders/{id}` tagastab 404 |
| 4 | Saada DELETE päring ilma Authorization'ita | HTTP 401 status |

## Täiendav info
- **API Endpoint:** DELETE /orders/{id}
- **Headers:**
```
Authorization: Bearer {token}
```
- **Expected HTTP Status:** 200 (success), 404 (not found), 401 (unauthorized)
- **Success Response:**
```json
{
  "message": "Operation successful"
}
```

## Märkused
- Authorization on kohustuslik
- Pärast kustutamist ei tohiks tellimus olla kättesaadav
- Kasutaja peaks saama kustutada ainult oma tellimusi
- 404 error mitteolemasoleva tellimuse korral