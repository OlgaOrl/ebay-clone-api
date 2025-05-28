# TC-006: Vigane kasutaja registreerimine

**Kriitilisus:** High  
**Kategooria:** Validation  
**Eeltingimused:** API server töötab  
**Test andmed:** Vigased registreerimise andmed

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada POST päring `/users` tühi email väljaga | HTTP 400 status |
| 2 | Saada POST päring `/users` vigase email formaadiga | HTTP 400 status |
| 3 | Saada POST päring `/users` tühi parool väljaga | HTTP 400 status |
| 4 | Saada POST päring `/users` juba olemasoleva email'iga | HTTP 400 status |

## Täiendav info
- **API Endpoint:** POST /users
- **Test scenarios:**

**1. Tühi email:**
```
{
  "username": "testuser",
  "email": "",
  "password": "TestPass123!"
}
```

**2. Vigane email formaat:**
```
{
  "username": "testuser", 
  "email": "invalid-email",
  "password": "TestPass123!"
}
```

**3. Tühi parool:**
```
{
  "username": "testuser",
  "email": "test@example.com",
  "password": ""
}
```

**4. Duplikaat email:**
```
{
  "username": "testuser2",
  "email": "testuser001@example.com",
  "password": "TestPass123!"
}
```

- **Expected HTTP Status:** 400
- **Response Validation:**
```
{
  "error": "Validation error message"
}
```

## Märkused
- Iga vigane input peab tagastama 400 Bad Request
- Error message peaks olema informatiivne
- Kasutaja ei tohiks olla loodud vigaste andmetega