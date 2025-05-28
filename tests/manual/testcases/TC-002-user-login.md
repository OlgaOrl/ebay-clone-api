# TC-002: Edukas kasutaja sisselogimine

**Kriitilisus:** High  
**Kategooria:** Authentication  
**Eeltingimused:** Kasutaja on eelnevalt registreeritud (TC-001 läbitud)  
**Test andmed:** Olemasoleva kasutaja email ja parool

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada POST päring `/sessions` endpoint'ile login andmetega | HTTP 200 status |
| 2 | Kontrolli response body struktuuri | Sisaldab `token` välja |
| 3 | Kontrolli token'i formaat | Token on string ja mitte tühi |
| 4 | Salvesta token järgmiste testide jaoks | Token on JWT formaadis |

## Täiendav info
- **API Endpoint:** POST /sessions
- **Request Body:**
```json
{
  "email": "testuser001@example.com",
  "password": "TestPass123!"
}
```
- **Expected HTTP Status:** 200
- **Response Validation:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Märkused
- Kasuta sama email'i ja parooli, mis TC-001 testis kasutatud
- Token'i vaja järgmiste autenditud endpoint'ide testimiseks
- Vigase email/parooliga testimine on eraldi test-case