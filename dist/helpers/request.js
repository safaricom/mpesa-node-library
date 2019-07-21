import * as tslib_1 from 'tslib';
import axios from 'axios';
export function request(mpesa, _baseURL) {
  return tslib_1.__awaiter(this, void 0, void 0, function() {
    var credentials, instance;
    return tslib_1.__generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, mpesa.oAuth()];
        case 1:
          credentials = _a.sent();
          instance = axios.create({
            baseURL: _baseURL || mpesa.baseURL,
            timeout: 5000,
            headers: {
              Authorization: 'Bearer ' + credentials.data['access_token'],
              'Content-Type': 'application/json',
            },
          });
          return [2 /*return*/, instance];
      }
    });
  });
}
//# sourceMappingURL=request.js.map
