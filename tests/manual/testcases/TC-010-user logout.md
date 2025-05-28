# TC-010: Kasutaja väljalogimine

**Kriitilisus:** Medium  
**Kategooria:** Authentication  
**Eeltingimused:** Kasutaja on sisse logitud (token olemas)  
**Test andmed:** Kehtiv JWT token

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada DELETE päring `/sessions` Authorization header'iga | HTTP 204 status |
| 2 | Kontrolli, et response body on tühi | No content response |
| 3 | Kontrolli token kehtivust | Järgmine API call sama token'iga tagastab 401 |
| 4 | Kontrolli double logout | Teine logout sama token'iga tagastab 401 |

## Täiendav info
- **API Endpoint:** DELETE /sessions
- **Headers:**
```
Authorization: Bearer {token_from_login}
```
- **Expected HTTP Status:** 204 No Content
- **Response Validation:** Empty response body

## Märkused
- 204 No Content on standardne logout response
- Token peaks muutuma kehtetuks kohe pärast logout'i
- Ilma Authorization header'ita peaks tagastama 401
- Double logout katsed peaksid olema gracefully handled