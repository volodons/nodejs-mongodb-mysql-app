const validateTodo = (req, res, next) => {
    const { title } = req.body;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({
            message: 'Title is required and must be a string'
        });
    }

    if (title.trim().length < 1) {
        return res.status(400).json({
            message: 'Title cannot be empty'
        });
    }

    if (title.length > 100) {
        return res.status(400).json({
            message: 'Title must be less than 100 characters'
        });
    }

    next();
};

module.exports = validateTodo;
