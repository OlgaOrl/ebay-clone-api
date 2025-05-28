# TC-009: Kasutaja kustutamine

**Kriitilisus:** Medium  
**Kategooria:** CRUD  
**Eeltingimused:** Kasutaja on registreeritud ja sisse logitud  
**Test andmed:** Olemasoleva kasutaja ID

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada DELETE päring `/users/{id}` Authorization header'iga | HTTP 200 status |
| 2 | Kontrolli success response'i | Response sisaldab kinnitust |
| 3 | Kontrolli, et kasutaja on kustutatud | GET `/users/{id}` tagastab 404 |
| 4 | Kontrolli, et token on kehtetu | Järgmised API calls tagastavad 401 |

## Täiendav info
- **API Endpoint:** DELETE /users/{id}
- **Headers:**
```
Authorization: Bearer {token}
```
- **Expected HTTP Status:** 200
- **Response Validation:**
```json
{
  "message": "Operation successful"
}
```

## Märkused
- Kasutaja saab kustutada ainult oma kontot
- Pärast kustutamist peaks token olema kehtetu
- Seotud andmed (listings, orders) peaksid olema käsitletud
- 404 error GET päringul kinnitab kustutamist