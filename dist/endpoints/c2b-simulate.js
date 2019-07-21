import * as tslib_1 from 'tslib';
export function c2bSimulate(mpesa, options) {
  return tslib_1.__awaiter(this, void 0, void 0, function() {
    var req;
    return tslib_1.__generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, mpesa.request()];
        case 1:
          req = _a.sent();
          return [
            2 /*return*/,
            req.post('/mpesa/c2b/v1/simulate', {
              ShortCode: options.shortCode || mpesa.configs.shortCode,
              CommandID: options.commandId || 'CustomerPayBillOnline',
              Amount: options.amount,
              Msisdn: options.msisdn,
              BillRefNumber: options.billRefNumber,
            }),
          ];
      }
    });
  });
}
//# sourceMappingURL=c2b-simulate.js.map
