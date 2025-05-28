# TC-001: Edukas kasutaja registreerimine

**Kriitilisus:** High  
**Kategooria:** Authentication  
**Eeltingimused:** API server töötab localhost:3000 või https://olga-orlova.me  
**Test andmed:** Valjaõpetad test kasutaja andmed

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada POST päring `/users` endpoint'ile valjaõpetatud JSON body'ga | HTTP 201 status |
| 2 | Kontrolli response body struktuuri | Sisaldab `id`, `username`, `email` välju |
| 3 | Kontrolli, et parool ei ole response'is | Response ei sisalda `password` välja |
| 4 | Kontrolli `id` välja tüüpi | `id` on integer ja > 0 |

## Täiendav info
- **API Endpoint:** POST /users
- **Request Body:**
```json
{
  "username": "testuser001",
  "email": "testuser001@example.com", 
  "password": "TestPass123!"
}
```
- **Expected HTTP Status:** 201
- **Response Validation:**
```json
{
  "id": 1,
  "username": "testuser001",
  "email": "testuser001@example.com"
}
```

## Märkused
- Iga test run'i jaoks kasuta unikaalset email'i
- Kontrolli, et sama email'iga ei saa teist kasutajat luua (järgmine test-case)