exports.createUser = (req, res) => {
    // Пример логики
    const newUser = {
        id: 1,
        username: req.body.username,
        email: req.body.email
    };
    return res.status(201).json(newUser);
};

exports.getUser = (req, res) => {
    return res.status(200).json({ id: req.params.id, username: "demo", email: "demo@mail.com" });
};
