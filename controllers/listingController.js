// controllers/listingController.js

// Создать объявление
exports.createListing = (req, res) => {
    // Пример простой логики
    const newListing = {
        id: 1,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        userId: req.user?.id // Информация из токена
    };
    return res.status(201).json(newListing);
};

// Обновить объявление
exports.updateListing = (req, res) => {
    const listingId = parseInt(req.params.id, 10);

    // Пример логики обновления
    const updatedListing = {
        id: listingId,
        title: req.body.title || "Updated title",
        description: req.body.description || "Updated description",
        price: req.body.price || 200,
        userId: req.user?.id, // Информация из токена
        updatedAt: new Date().toISOString()
    };

    return res.status(200).json(updatedListing);
};

// Удалить объявление
exports.deleteListing = (req, res) => {
    const listingId = parseInt(req.params.id, 10);

    // Пример логики удаления
    return res.status(200).json({
        message: `Listing ${listingId} deleted successfully`,
        deletedBy: req.user?.id // Информация из токена
    });
};

// Получить все объявления
exports.getAllListings = (req, res) => {
    // Пример возвращаемого массива
    const listings = [
        { id: 1, title: "Phone", description: "Good phone", price: 150 },
        { id: 2, title: "Laptop", description: "Gaming laptop", price: 1200 }
    ];
    return res.status(200).json(listings);
};

// Получить объявление по id
exports.getListingById = (req, res) => {
    const listingId = parseInt(req.params.id, 10);
    // Пример: всегда возвращаем условный объект
    if (listingId === 1) {
        return res.status(200).json({
            id: 1,
            title: "Phone",
            description: "Good phone",
            price: 150
        });
    } else {
        return res.status(404).json({ message: "Listing not found" });
    }
};