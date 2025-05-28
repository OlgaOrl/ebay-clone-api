# TC-011: Kuulutuste otsimine

**Kriitilisus:** High  
**Kategooria:** Search/Filter  
**Eeltingimused:** Vähemalt 2-3 kuulutust on loodud erinevate nimedega  
**Test andmed:** Otsingu märksõnad

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada GET päring `/listings?search=phone` | HTTP 200 status |
| 2 | Kontrolli, et tulemused sisaldavad märksõna | Kõik tulemused sisaldavad "phone" |
| 3 | Saada GET päring `/listings?search=nonexistent` | HTTP 200, tühi array |
| 4 | Saada GET päring `/listings?search=` | Tagastab kõik kuulutused |

## Täiendav info
- **API Endpoint:** GET /listings?search={keyword}
- **Test scenarios:**
```
GET /listings?search=phone
GET /listings?search=laptop
GET /listings?search=nonexistent
GET /listings?search=
```
- **Expected HTTP Status:** 200
- **Response Validation:**
```json
[
  {
    "id": 1,
    "title": "iPhone 15 Pro",
    "description": "Latest smartphone",
    "price": 999.99
  }
]
```

## Märkused
- Otsing peaks toimima title ja description väljade pealt
- Case-insensitive otsing on eelistatud
- Tühi search parameter peaks tagastama kõik kuulutused
- Mitteleidmise korral tühi array, mitte 404