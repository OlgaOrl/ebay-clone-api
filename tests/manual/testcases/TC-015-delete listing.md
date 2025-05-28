# TC-015: Kuulutuse kustutamine

**Kriitilisus:** Medium  
**Kategooria:** CRUD  
**Eeltingimused:** Kuulutus on loodud ja ID on teada  
**Test andmed:** Olemasoleva kuulutuse ID

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada DELETE päring `/listings/{id}` | HTTP 200 status |
| 2 | Kontrolli success response'i | Response kinnitab kustutamist |
| 3 | Kontrolli, et kuulutus on kustutatud | GET `/listings/{id}` tagastab 404 |
| 4 | Saada DELETE päring mitteolemasolevale ID'le | HTTP 404 status |

## Täiendav info
- **API Endpoint:** DELETE /listings/{id}
- **Expected HTTP Status:** 200 (success), 404 (not found)
- **Success Response:**
```json
{
  "message": "Operation successful"
}
```
- **Test sequence:**
```
1. DELETE /listings/1
2. GET /listings/1 (peaks tagastama 404)
3. DELETE /listings/999 (peaks tagastama 404)
```

## Märkused
- Kontrolli kas Authorization on nõutav (spec'is pole märgitud)
- Pärast kustutamist ei tohiks kuulutus olla kättesaadav
- Seotud tellimused peaksid olema käsitletud
- 404 error mitteolemasoleva kuulutuse korral
- Double delete peaks gracefully handled olema