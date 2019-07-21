import * as tslib_1 from 'tslib';
export function accountBalance(mpesa, options) {
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
            req.post('/mpesa/accountbalance/v1/query', {
              Initiator: options.initiator || mpesa.configs.initiatorName,
              SecurityCredential: securityCredential,
              CommandID: options.commandId || 'AccountBalance',
              PartyA: options.shortCode,
              IdentifierType: options.idType,
              Remarks: options.remarks || 'Checking account balance',
              QueueTimeOutURL: options.queueUrl,
              ResultURL: options.resultUrl,
            }),
          ];
      }
    });
  });
}
//# sourceMappingURL=account-balance.js.map
