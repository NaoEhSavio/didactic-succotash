Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./lib/env");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _discord = _interopRequireDefault(require("./api/discord.api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use('/api/discord', _discord.default);
var _default = app;
exports.default = _default;