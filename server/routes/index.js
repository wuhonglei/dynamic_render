var express = require('express');
var router = express.Router();

const path = require('path');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

/* GET home page. */
router.get('/template/:id', async function(req, res, next) {
    const content = await getTemplateContent(req.params.id);

    res.json({
        code: 0,
        data: {
            content
        },
        msg: '请求正常'
    })
});

function getTemplateContent(id) {
    const nameMap = {
        1: 'one',
        2: 'two'
    };
    const filepath = path.join(__dirname, `../components/${nameMap[id]}.vue`);
    return fs.readFileAsync(filepath, { encoding: 'utf8' });
}

module.exports = router;