var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app.default.listen(3000, () => console.log('Server started!'));
console.log("http://localhost:3000/api/discord/auth");