const path = require('path');


class Routes {

    init(app) {
        this.app = app;
        
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../client/index.html'));
        });
        
        app.get('/ping', (req, res) => {
            res.sendStatus(200);
        });
    }
}

module.exports = Routes;