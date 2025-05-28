# TC-013: Ühe kuulutuse hankimine

**Kriitilisus:** High  
**Kategooria:** CRUD  
**Eeltingimused:** Vähemalt üks kuulutus on loodud  
**Test andmed:** Olemasoleva kuulutuse ID

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada GET päring `/listings/{valid_id}` | HTTP 200 status |
| 2 | Kontrolli response struktuuri | Sisaldab id, title, description, price |
| 3 | Saada GET päring `/listings/{invalid_id}` | HTTP 404 status |
| 4 | Saada GET päring `/listings/abc` | HTTP 400 või 404 status |

## Täiendav info
- **API Endpoint:** GET /listings/{id}
- **Test scenarios:**
```
GET /listings/1 (olemasolev)
GET /listings/999 (mitteolemasolev)
GET /listings/abc (vigane ID formaat)
GET /listings/-1 (negatiivne ID)
```
- **Expected HTTP Status:** 200 (success), 404 (not found)
- **Success Response:**
```json
{
  "id": 1,
  "title": "Test Smartphone",
  "description": "Brand new smartphone for testing",
  "price": 299.99
}
```
- **Error Response:**
```json
{
  "error": "Listing not found"
}
```

## Märkused
- See endpoint ei vaja autentimist
- 404 error on standardne mitteolemasoleva resursi jaoks
- ID validatsioon peaks käsitlema vigaseid formaate
- Response peab olema consistent API-ga