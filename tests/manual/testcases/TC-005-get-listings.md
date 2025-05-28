# TC-005: Tellimuse loomine

**Kriitilisus:** High  
**Kategooria:** CRUD  
**Eeltingimused:** Kasutaja sisse logitud (token olemas), kuulutus olemas  
**Test andmed:** Valjaõpetatud tellimuse andmed

## Testi sammud

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada POST päring `/orders` endpoint'ile koos Authorization header'iga | HTTP 201 status |
| 2 | Kontrolli response body struktuuri | Sisaldab `id`, `userId`, `listingId`, `quantity`, `totalPrice` |
| 3 | Kontrolli arvutatud totalPrice | totalPrice = listing.price * quantity |
| 4 | Kontrolli, et order ID on unikaalne | `id` on integer ja > 0 |

## Täiendav info
- **API Endpoint:** POST /orders
- **Headers:**
```
Authorization: Bearer {token_from_TC-002}
Content-Type: application/json
```
- **Request Body:**
```json
{
  "userId": 1,
  "listingId": 1,
  "quantity": 2,
  "totalPrice": 599.98
}
```
- **Expected HTTP Status:** 201
- **Response Validation:**
```json
{
  "id": 1,
  "userId": 1,
  "listingId": 1,
  "quantity": 2,
  "totalPrice": 599.98
}
```

## Märkused
- userId peab vastama autenditud kasutajale
- listingId peab viitama olemasolevale kuulutusele
- Ilma Authorization header'ita tagastab 401