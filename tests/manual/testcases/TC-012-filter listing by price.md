# TC-012: Kuulutuste filtreerimine hinna järgi

**Kriitilisus:** Medium  
**Kategooria:** Search/Filter  
**Eeltingimused:** Kuulutused on loodud erinevate hindadega (nt 50, 200, 500)  
**Test andmed:** Hinna vahemikud

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada GET päring `/listings?priceMin=100` | Ainult >= 100 euro kuulutused |
| 2 | Saada GET päring `/listings?priceMax=300` | Ainult <= 300 euro kuulutused |
| 3 | Saada GET päring `/listings?priceMin=100&priceMax=400` | Kuulutused 100-400 euro vahemikus |
| 4 | Saada GET päring vigaste väärtustega | HTTP 400 või ignoreerib vigased |

## Täiendav info
- **API Endpoint:** GET /listings
- **Query parameters:**
```
?priceMin=100
?priceMax=300  
?priceMin=100&priceMax=400
?priceMin=-50 (negatiivne)
?priceMin=abc (mitte number)
```
- **Expected HTTP Status:** 200
- **Response Validation:**
```json
[
  {
    "id": 2,
    "title": "Laptop",
    "description": "Gaming laptop", 
    "price": 250.00
  }
]
```

## Märkused
- priceMin ja priceMax saab kasutada koos või eraldi
- Negatiivsed hinnad peaksid olema rejekteeritud
- Vigased parameetrid võivad olla ignoreeritud või tagastada 400
- Tühi tulemus on valid, kui vahemikus pole kuulutusi