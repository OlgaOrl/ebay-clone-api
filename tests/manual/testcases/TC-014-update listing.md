# TC-014: Kuulutuse uuendamine

**Kriitilisus:** Medium  
**Kategooria:** CRUD  
**Eeltingimused:** Kasutaja on sisse logitud, kuulutus on loodud  
**Test andmed:** Uuendatud kuulutuse andmed

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada PATCH päring `/listings/{id}` uue title'iga | HTTP 200 status |
| 2 | Kontrolli, et title on uuendatud | Response sisaldab uut title'it |
| 3 | Saada PATCH päring uue hinnaga | HTTP 200 status |
| 4 | Kontrolli ilma Authorization header'ita | HTTP 401 status (kui nõutav) |

## Täiendav info
- **API Endpoint:** PATCH /listings/{id}
- **Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```
- **Request Body:**
```json
{
  "title": "Updated Smartphone Pro",
  "description": "Updated description with new features",
  "price": 349.99
}
```
- **Expected HTTP Status:** 200
- **Response Validation:**
```json
{
  "id": 1,
  "title": "Updated Smartphone Pro",
  "description": "Updated description with new features", 
  "price": 349.99
}
```

## Märkused
- Kontrolli kas Authorization on nõutav (API spec järgi pole märgitud)
- Ainult osa välju võib olla uuendatud (partial update)
- ID ei tohiks olla muudetav
- Mitteolemasoleva kuulutuse puhul 404 error