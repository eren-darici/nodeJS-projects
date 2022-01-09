const maintenanceMode = (req, res, next) => {
        res.status(503).send({error: 'Maintenance mode is currently on - please try again later'});
}

module.exports = maintenanceMode;