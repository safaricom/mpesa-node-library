import * as tslib_1 from 'tslib';
export function lipaNaMpesaQuery(mpesa, options) {
  return tslib_1.__awaiter(this, void 0, void 0, function() {
    var _shortCode, _passKey, timeStamp, password, req;
    return tslib_1.__generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          _shortCode = options.shortCode || mpesa.configs.lipaNaMpesaShortCode;
          _passKey = options.passKey || mpesa.configs.lipaNaMpesaShortPass;
          timeStamp = new Date()
            .toISOString()
            .replace(/[^0-9]/g, '')
            .slice(0, -3);
          password = Buffer.from(
            '' + _shortCode + _passKey + timeStamp
          ).toString('base64');
          return [4 /*yield*/, mpesa.request()];
        case 1:
          req = _a.sent();
          return [
            2 /*return*/,
            req.post('/mpesa/stkpushquery/v1/query', {
              BusinessShortCode: _shortCode,
              Password: password,
              Timestamp: timeStamp,
              CheckoutRequestID: options.checkoutRequestId,
            }),
          ];
      }
    });
  });
}
//# sourceMappingURL=lipa-na-mpesa-query.js.map
