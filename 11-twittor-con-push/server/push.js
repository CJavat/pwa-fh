const vapid = require("./vapid.json");
const urlSafeBase64 = require("urlsafe-base64");

module.exports.getKey = () => {
  return urlSafeBase64.decode(vapid.publicKey);
};
