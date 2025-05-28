# TC-007: Vigane kasutaja sisselogimine

**Kriitilisus:** High  
**Kategooria:** Authentication  
**Eeltingimused:** Vähemalt üks kasutaja on registreeritud  
**Test andmed:** Vigased login andmed

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada POST päring `/sessions` vale parooliga | HTTP 400 status |
| 2 | Saada POST päring `/sessions` mitteolemasoleva email'iga | HTTP 400 status |
| 3 | Saada POST päring `/sessions` tühjade andmetega | HTTP 400 status |
| 4 | Kontrolli, et token'it ei tagastata | Response ei sisalda token'it |

## Täiendav info
- **API Endpoint:** POST /sessions
- **Test scenarios:**

**1. Vale parool:**
```
{
  "email": "testuser001@example.com",
  "password": "WrongPassword123!"
}
```

**2. Mitteolemasolev email:**
```
{
  "email": "nonexistent@example.com",
  "password": "TestPass123!"
}
```

**3. Tühjad andmed:**
```
{
  "email": "",
  "password": ""
}
```

- **Expected HTTP Status:** 400
- **Response Validation:**
```
{
  "error": "Invalid credentials"
}
```

## Märkused
- Turvalisuse kaalutlustel ei tohiks error message paljastada, kas email eksisteerib
- Generic "Invalid credentials" message on parem
- Token'it ei tohi tagastada vigase login'i korral