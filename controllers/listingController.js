// controllers/listingController.js
const listings = []; // In memory for testing

// Create listing
exports.createListing = (req, res) => {
    console.log('📝 Creating listing:', req.body);
    console.log('📸 Files received:', req.files);

    const { title, description, price, category, condition, location } = req.body;

    // Validation for required fields
    if (!title || !description || !price) {
        const missingFields = [];
        if (!title) missingFields.push('title');
        if (!description) missingFields.push('description');
        if (!price) missingFields.push('price');
        
        return res.status(400).json({
            error: `${missingFields.join(', ')} ${missingFields.length === 1 ? 'is' : 'are'} required`
        });
    }

    // Validate price is a positive number
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
        return res.status(400).json({
            error: 'Price must be a positive number'
        });
    }

    // Process uploaded images
    let images = [];
    if (req.files && req.files.length > 0) {
        images = req.files.map(file => ({
            id: Date.now() + Math.random(),
            filename: file.filename,
            originalName: file.originalname,
            url: `/uploads/${file.filename}`,
            size: file.size
        }));
    }

    const newListing = {
        id: listings.length + 3, // +3 to avoid conflicts with mock data
        title,
        description,
        price: parsedPrice,
        category: category || 'Other',
        condition: condition || 'Used',
        location: location || 'Not specified',
        images: images,
        userId: req.user?.id || 1,
        createdAt: new Date().toISOString()
    };

    listings.push(newListing);
    console.log('✅ Listing created:', newListing);

    return res.status(201).json(newListing);
};

// Get all listings
exports.getAllListings = (req, res) => {
    console.log('📋 Getting all listings');

    // Mock data + created listings
    const allListings = [
        {
            id: 1,
            title: "iPhone 14 Pro",
            description: "Excellent condition iPhone 14 Pro with original box",
            price: 850,
            category: 'Electronics',
            condition: 'Like New',
            location: 'New York',
            images: [
                {
                    id: 1,
                    url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
                    filename: 'iphone.jpg'
                }
            ],
            createdAt: '2024-01-15T10:00:00Z'
        },
        {
            id: 2,
            title: "Gaming Laptop RTX 4070",
            description: "High-performance gaming laptop with RTX 4070 graphics card",
            price: 1200,
            category: 'Electronics',
            condition: 'Used',
            location: 'California',
            images: [
                {
                    id: 2,
                    url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
                    filename: 'laptop.jpg'
                }
            ],
            createdAt: '2024-01-14T15:30:00Z'
        },
        {
            id: 3,
            title: "Vintage Leather Jacket",
            description: "Authentic vintage brown leather jacket, size M. Perfect for autumn and winter. Soft genuine leather with classic design.",
            price: 180,
            category: 'Clothing',
            condition: 'Used',
            location: 'Chicago',
            images: [
                {
                    id: 3,
                    url: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400',
                    filename: 'leather-jacket.jpg'
                }
            ],
            createdAt: '2024-01-13T09:15:00Z'
        },
        {
            id: 4,
            title: "Mountain Bike Trek 2024",
            description: "Brand new Trek mountain bike with 21-speed gear system. Perfect for trails and city riding. Never used, still has warranty.",
            price: 5000,
            category: 'Sports',
            condition: 'New',
            location: 'Denver',
            images: [
                {
                    id: 4,
                    url: 'https://www.cyclesuk.com/content/products/trek-rail-9-9-cxr-gen-4-625wh_116587.jpg',
                    filename: 'mountain-bike.jpg'
                }
            ],
            createdAt: '2024-01-12T14:20:00Z'
        },
        {
            id: 5,
            title: "Ceramic Plant Pot Collection",
            description: "Beautiful set of 3 handmade ceramic plant pots in different sizes. Perfect for succulents or small houseplants. Drainage holes included.",
            price: 45,
            category: 'Home & Garden',
            condition: 'New',
            location: 'Portland',
            images: [
                {
                    id: 5,
                    url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
                    filename: 'plant-pots.jpg'
                }
            ],
            createdAt: '2024-01-11T16:45:00Z'
        },
        ...listings
    ];

    return res.status(200).json(allListings);
};

// Get listing by id
exports.getListingById = (req, res) => {
    const listingId = parseInt(req.params.id, 10);
    console.log('🔍 Finding listing with ID:', listingId);

    // Search in mock data
    if (listingId === 1) {
        return res.status(200).json({
            id: 1,
            title: "iPhone 14 Pro",
            description: "Excellent condition iPhone 14 Pro with original box and all accessories. Battery health 95%. No scratches or dents.",
            price: 850,
            category: 'Electronics',
            condition: 'Like New',
            location: 'New York',
            images: [
                {
                    id: 1,
                    url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
                    filename: 'iphone.jpg'
                },
                {
                    id: 2,
                    url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400',
                    filename: 'iphone2.jpg'
                }
            ],
            createdAt: '2024-01-15T10:00:00Z'
        });
    } else if (listingId === 2) {
        return res.status(200).json({
            id: 2,
            title: "Gaming Laptop RTX 4070",
            description: "High-performance gaming laptop with RTX 4070 graphics card, 32GB RAM, 1TB SSD. Perfect for gaming and content creation.",
            price: 1200,
            category: 'Electronics',
            condition: 'Used',
            location: 'California',
            images: [
                {
                    id: 3,
                    url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
                    filename: 'laptop.jpg'
                }
            ],
            createdAt: '2024-01-14T15:30:00Z'
        });
    } else if (listingId === 3) {
        return res.status(200).json({
            id: 3,
            title: "Vintage Leather Jacket",
            description: "Authentic vintage brown leather jacket, size M. Perfect for autumn and winter. Made from soft genuine leather with classic motorcycle design. Has been gently worn but in excellent condition with no tears or damage. All zippers work perfectly. A timeless piece that will last for years.",
            price: 180,
            category: 'Clothing',
            condition: 'Used',
            location: 'Chicago',
            images: [
                {
                    id: 3,
                    url: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400',
                    filename: 'leather-jacket.jpg'
                }
            ],
            createdAt: '2024-01-13T09:15:00Z'
        });
    } else if (listingId === 4) {
        return res.status(200).json({
            id: 4,
            title: "Mountain Bike Trek 2024",
            description: "Brand new Trek mountain bike with 21-speed Shimano gear system. Features front suspension, disc brakes, and aluminum frame. Perfect for mountain trails, city commuting, and weekend adventures. Never used, still has manufacturer warranty. Includes all original accessories and documentation.",
            price: 650,
            category: 'Sports',
            condition: 'New',
            location: 'Denver',
            images: [
                {
                    id: 4,
                    url: 'https://www.cyclesuk.com/content/products/trek-rail-9-9-cxr-gen-4-625wh_116587.jpg',
                    filename: 'mountain-bike.jpg'
                }
            ],
            createdAt: '2024-01-12T14:20:00Z'
        });
    } else if (listingId === 5) {
        return res.status(200).json({
            id: 5,
            title: "Ceramic Plant Pot Collection",
            description: "Beautiful set of 3 handmade ceramic plant pots in different sizes (small, medium, large). Each pot features unique glazing and is perfect for succulents, herbs, or small houseplants. All pots have drainage holes and come with matching saucers. Handcrafted by local artisan with attention to detail.",
            price: 45,
            category: 'Home & Garden',
            condition: 'New',
            location: 'Portland',
            images: [
                {
                    id: 5,
                    url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
                    filename: 'plant-pots.jpg'
                }
            ],
            createdAt: '2024-01-11T16:45:00Z'
        });
    }

    // Search in created listings
    const listing = listings.find(l => l.id === listingId);
    if (listing) {
        return res.status(200).json(listing);
    }

    return res.status(404).json({ message: "Listing not found" });
};

// Update listing
exports.updateListing = (req, res) => {
    const listingId = parseInt(req.params.id, 10);
    const { title, description, price, category, condition, location } = req.body;

    console.log('📝 Updating listing:', listingId, req.body);

    // Process new uploaded images
    let newImages = [];
    if (req.files && req.files.length > 0) {
        newImages = req.files.map(file => ({
            id: Date.now() + Math.random(),
            filename: file.filename,
            originalName: file.originalname,
            url: `/uploads/${file.filename}`,
            size: file.size
        }));
    }

    // Search in created listings
    const listingIndex = listings.findIndex(l => l.id === listingId);

    if (listingIndex !== -1) {
        // Update existing listing
        const existingImages = listings[listingIndex].images || [];

        listings[listingIndex] = {
            ...listings[listingIndex],
            title: title || listings[listingIndex].title,
            description: description || listings[listingIndex].description,
            price: price !== undefined ? parseFloat(price) : listings[listingIndex].price,
            category: category || listings[listingIndex].category,
            condition: condition || listings[listingIndex].condition,
            location: location || listings[listingIndex].location,
            images: newImages.length > 0 ? [...existingImages, ...newImages] : existingImages,
            updatedAt: new Date().toISOString()
        };

        console.log('✅ Listing updated:', listings[listingIndex]);
        return res.status(200).json(listings[listingIndex]);
    }

    // If it's a mock listing (ID 1 or 2), create updated version
    if (listingId === 1 || listingId === 2) {
        const updatedListing = {
            id: listingId,
            title: title || (listingId === 1 ? "iPhone 14 Pro" : "Gaming Laptop RTX 4070"),
            description: description || (listingId === 1 ? "Excellent condition iPhone" : "High-performance gaming laptop"),
            price: price !== undefined ? parseFloat(price) : (listingId === 1 ? 850 : 1200),
            category: category || 'Electronics',
            condition: condition || (listingId === 1 ? 'Like New' : 'Used'),
            location: location || (listingId === 1 ? 'New York' : 'California'),
            images: newImages.length > 0 ? newImages : [],
            userId: req.user?.id || 1,
            updatedAt: new Date().toISOString()
        };

        console.log('✅ Mock listing updated:', updatedListing);
        return res.status(200).json(updatedListing);
    }

    console.log('❌ Listing not found:', listingId);
    return res.status(404).json({ error: 'Listing not found' });
};

// Delete listing
exports.deleteListing = (req, res) => {
    const listingId = parseInt(req.params.id, 10);
    console.log('🗑️ Deleting listing:', listingId);

    // Search in created listings
    const listingIndex = listings.findIndex(l => l.id === listingId);

    if (listingIndex !== -1) {
        const deletedListing = listings.splice(listingIndex, 1)[0];
        console.log('✅ Listing deleted:', deletedListing.title);
        return res.status(200).json({
            message: `Listing "${deletedListing.title}" deleted successfully`,
            deletedBy: req.user?.id || 1
        });
    }

    // Mock listings cannot be deleted, but return success
    if (listingId === 1 || listingId === 2) {
        console.log('⚠️ Attempting to delete mock listing:', listingId);
        return res.status(200).json({
            message: `Mock listing ${listingId} cannot be deleted`,
            deletedBy: req.user?.id || 1
        });
    }

    console.log('❌ Listing for deletion not found:', listingId);
    return res.status(404).json({ error: 'Listing not found' });
};
