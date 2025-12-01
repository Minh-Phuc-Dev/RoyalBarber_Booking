const wrapperAsyncHandler = fn => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

const wrapperSyncHandler = fn => {
    return (req, res, next) => {
        try {
            fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    wrapperSyncHandler,
    wrapperAsyncHandler,
}