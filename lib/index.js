"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koaRewrite = require('koa-rewrite');

var _koaRewrite2 = _interopRequireDefault(_koaRewrite);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actionExp = new RegExp(/^.*\.do/);

exports.default = {
    name: 'dev',
    'middleware.before': function middlewareBefore() {
        var app = this.app;
        app.use((0, _koaRewrite2.default)(/^.*\.html/, '/'));
    },
    'middleware': function middleware() {
        var cwd = this.cwd;
        var log = this.log;
        return regeneratorRuntime.mark(function _callee(next) {
            var request, url, path, module, data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            request = this.request, url = request.url, path = (0, _path.join)(cwd, 'dev', 'action');

                            if (actionExp.test(url)) {
                                path += url.substr(0, url.indexOf('.do'));
                                try {
                                    module = require(path);
                                    data = module;

                                    if (typeof module == 'function') {
                                        data = module(request);
                                    }
                                    this.body = JSON.stringify(data);
                                } catch (e) {
                                    log.info('can not find module ' + path);
                                }
                            }
                            _context.next = 4;
                            return next;

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        });
    }
};
module.exports = exports['default'];