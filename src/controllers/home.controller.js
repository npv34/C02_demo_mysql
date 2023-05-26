const BaseController = require('./base.controller')
class HomeController extends BaseController {
    async getHomePage(req, res) {
        let html = await this.getTemplate('./src/views/admin/dashboard.html');
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(html);
        res.end();
    }
}

module.exports = new HomeController;
