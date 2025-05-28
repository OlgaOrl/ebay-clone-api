# TC-008: Kasutaja profiili uuendamine

**Kriitilisus:** Medium  
**Kategooria:** CRUD  
**Eeltingimused:** Kasutaja on registreeritud ja sisse logitud (token olemas)  
**Test andmed:** Uuendatud kasutaja andmed

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada PATCH päring `/users/{id}` uue username'iga | HTTP 200 status |
| 2 | Kontrolli response body struktuuri | Sisaldab uuendatud `username` |
| 3 | Saada PATCH päring uue email'iga | HTTP 200 status |
| 4 | Kontrolli, et andmed on uuendatud | GET `/users/{id}` tagastab uued andmed |

## Täiendav info
- **API Endpoint:** PATCH /users/{id}
- **Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```
- **Request Body:**
```json
{
  "username": "updatedUser001",
  "email": "updated001@example.com"
}
```
- **Expected HTTP Status:** 200
- **Response Validation:**
```json
{
  "id": 1,
  "username": "updatedUser001", 
  "email": "updated001@example.com"
}
```

## Märkused
- Ainult autenditud kasutaja saab oma profiili muuta
- Parool uuendamine peaks olema eraldi endpoint või nõudma vana parooli
- ID ei tohiks olla muudetav