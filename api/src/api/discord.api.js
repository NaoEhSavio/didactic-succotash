Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
const CLIENT_ID = process.env.CLIENT_ID;

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/api/discord/auth-kindelia';
router.get('/auth', (request, response) => {
  response.redirect(`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify`);
});

router.get('/auth-kindelia', async (req, res) => {
  const code = req.query.code;
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI
  });

  try {
    const tokenRes = await _axios.default.post('https://discordapp.com/api/oauth2/token', params, {});
    const token = tokenRes.data.access_token;
    const authRes = await _axios.default.get(`https://discord.com/api/v6/users/@me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    //const guildsRes = await _axios.default.get(`https://discord.com/api/v6/users/@me/guilds`, {
     // headers: {
     ///   Authorization: `Bearer ${token}`
    //  }
    //});
   // function _encode(obj) {
    //  let string = "";
      
     // for (const [key, value] of Object.fromEntries(obj)) {
     //   if (!value) continue;
    //    string += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    //  }
      
    //  return string.substring(1);
    //  }

    let userRes;
   // let guildsServer;
    userRes = authRes.data;
   // guildsServer = guildsRes.data;

    //return console.log(userRes , guildsServer ) ;
    //return res.send(user);
    return res.send(userRes);
  } catch (err) {
    return res.send(err.response.data);
  }
});
var _default = router;
exports.default = _default;
