# TC-003: Kuulutuse loomine

**Kriitilisus:** High  
**Kategooria:** CRUD  
**Eeltingimused:** Kasutaja on sisse logitud (TC-002 läbitud), Bearer token olemas  
**Test andmed:** Valjaõpetatud kuulutuse andmed

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada POST päring `/listings` endpoint'ile koos Authorization header'iga | HTTP 201 status |
| 2 | Kontrolli response body struktuuri | Sisaldab `id`, `title`, `description`, `price` välju |
| 3 | Kontrolli, et andmed õigesti salvestatud | Response andmed vastavad request body'le |
| 4 | Kontrolli `id` välja tüüpi | `id` on integer ja > 0 |

## Täiendav info
- **API Endpoint:** POST /listings
- **Headers:**
```
Authorization: Bearer {token_from_TC-002}
Content-Type: application/json
```
- **Request Body:**
```json
{
  "title": "Test Smartphone",
  "description": "Brand new smartphone for testing",
  "price": 299.99
}
```
- **Expected HTTP Status:** 201
- **Response Validation:**
```json
{
  "id": 1,
  "title": "Test Smartphone",
  "description": "Brand new smartphone for testing", 
  "price": 299.99
}
```

## Märkused
- Ilma Authorization header'ita peaks tagastama 401 Unauthorized
- Salvesta listing ID järgmiste testide jaoks