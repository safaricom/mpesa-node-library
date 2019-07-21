import * as tslib_1 from 'tslib';
export function transactionStatus(mpesa, options) {
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
            req.post('/mpesa/transactionstatus/v1/query', {
              Initiator: options.initiator || mpesa.configs.initiatorName,
              SecurityCredential: securityCredential,
              CommandID: options.commandId || 'TransactionStatusQuery',
              TransactionID: options.transactionId,
              PartyA: options.receiverParty,
              IdentifierType: options.idType,
              ResultURL: options.resultUrl,
              QueueTimeOutURL: options.queueUrl,
              Remarks: options.remarks || 'TransactionReversal',
              Occasion: options.occasion || 'TransactionReversal',
            }),
          ];
      }
    });
  });
}
//# sourceMappingURL=transaction-status.js.map
