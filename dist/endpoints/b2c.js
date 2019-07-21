import * as tslib_1 from 'tslib';
export function b2c(mpesa, options) {
  return tslib_1.__awaiter(this, void 0, void 0, function() {
    var securityCredential, req;
    return tslib_1.__generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          securityCredential = mpesa.security();
          return [4 /*yield*/, mpesa.request()];
        case 1:
          req = _a.sent();
          return [
            2 /*return*/,
            req.post('/mpesa/b2c/v1/paymentrequest', {
              InitiatorName:
                options.initiatorName || mpesa.configs.initiatorName,
              SecurityCredential: securityCredential,
              CommandID: options.commandId || 'BusinessPayment',
              Amount: options.amount,
              PartyA: options.senderParty,
              PartyB: options.receiverParty,
              Remarks: options.remarks || 'B2C Payment',
              QueueTimeOutURL: options.queueUrl,
              ResultURL: options.resultUrl,
              Occasion: options.occasion,
            }),
          ];
      }
    });
  });
}
//# sourceMappingURL=b2c.js.map
