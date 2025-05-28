# TC-020: Autoriseerimise ebaõnnestumise testid

**Kriitilisus:** High  
**Kategooria:** Security  
**Eeltingimused:** API server töötab  
**Test andmed:** Vigased ja puuduvad token'id

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada PATCH `/users/1` ilma Authorization header'ita | HTTP 401 status |
| 2 | Saada POST `/orders` vale token'iga | HTTP 401 status |
| 3 | Saada DELETE `/sessions` aegunud token'iga | HTTP 401 status |
| 4 | Saada GET `/orders` malformed token'iga | HTTP 401 status |

## Täiendav info
- **Test scenarios:**
```
// Puuduv Authorization header
PATCH /users/1
{body}

// Vale token
Authorization: Bearer invalid-token-here
POST /orders

// Malformed token  
Authorization: Bearer not-a-jwt-token
GET /orders

// Tühi token
Authorization: Bearer 
DELETE /sessions

// Vale Bearer formaat
Authorization: invalid-format-token
PATCH /users/1
```
- **Expected HTTP Status:** 401 Unauthorized
- **Response Validation:**
```json
{
  "error": "Unauthorized - Token not provided or invalid"
}
```

## Märkused
- Kõik kaitstud endpoint'id peavad kontrollima Authorization
- 401 error peab olema consistent kõigi endpoint'ide vahel
- Error message ei tohiks paljastada sensitive infot
- Token validation peab olema robust ja secure