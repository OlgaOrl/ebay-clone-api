# TC-004: Kõigi kuulutuste hankimine

**Kriitilisus:** High  
**Kategooria:** CRUD  
**Eeltingimused:** Vähemalt üks kuulutus on loodud (TC-003 läbitud)  
**Test andmed:** Pole vaja

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada GET päring `/listings` endpoint'ile | HTTP 200 status |
| 2 | Kontrolli response body struktuuri | Tagastatakse array kuulutustest |
| 3 | Kontrolli iga kuulutuse struktuuri | Iga kuulutus sisaldab `id`, `title`, `description`, `price` |
| 4 | Kontrolli, et TC-003 kuulutus on olemas | Array sisaldab eelnevalt loodud kuulutust |

## Täiendav info
- **API Endpoint:** GET /listings
- **Headers:**
```
Content-Type: application/json
```
- **Expected HTTP Status:** 200
- **Response Validation:**
```json
[
  {
    "id": 1,
    "title": "Test Smartphone",
    "description": "Brand new smartphone for testing",
    "price": 299.99
  }
]
```

## Märkused
- See endpoint ei vaja autentimist
- Tühi array on ka lubatud tulemus, kui kuulutusi pole
- Järgmistes testides katame search ja filter parameetreid