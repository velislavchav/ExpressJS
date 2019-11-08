function handleError(err, res, user, pathForRender) {
    if (typeof err === 'object') {
        const errorMessages = Object.entries(err.errors).map(tuple => {
            return tuple[1].message;
        })
        res.render(pathForRender, { errorMessages, user })
    } else {
        let errorMessages = [];
        errorMessages.push(err);
        res.render(pathForRender, { errorMessages, user })
    }
}

module.exports = handleError;