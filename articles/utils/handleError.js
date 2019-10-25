function handleError(err, res, userObject, pathForRender) {
    if (typeof err === 'object') {
        const errorMessages = Object.entries(err.errors).map(tuple => {
            return tuple[1].message;
        })
        res.render(pathForRender, { errorMessages, userObject })
    } else {
        let errorMessages = [];
        errorMessages.push(err);
        res.render(pathForRender, { errorMessages, userObject })
    }
}

module.exports = handleError;