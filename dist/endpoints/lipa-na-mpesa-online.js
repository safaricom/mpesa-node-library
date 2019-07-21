import * as tslib_1 from 'tslib';
export function lipaNaMpesaOnline(mpesa, options) {
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
            req.post('/mpesa/stkpush/v1/processrequest', {
              BusinessShortCode: _shortCode,
              Password: password,
              Timestamp: timeStamp,
              TransactionType:
                options.transactionType || 'CustomerPayBillOnline',
              Amount: options.amount,
              PartyA: options.senderMsisdn,
              PartyB: _shortCode,
              PhoneNumber: options.senderMsisdn,
              CallBackURL: options.callbackUrl,
              AccountReference: options.accountRef,
              TransactionDesc:
                options.transactionDesc || 'Lipa na mpesa online',
            }),
          ];
      }
    });
  });
}
//# sourceMappingURL=lipa-na-mpesa-online.js.map
