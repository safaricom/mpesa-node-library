import * as tslib_1 from 'tslib';
export function reversal(mpesa, options) {
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
            req.post('/mpesa/reversal/v1/request', {
              Initiator: options.initiator || mpesa.configs.initiatorName,
              SecurityCredential: securityCredential,
              CommandID: options.commandId || 'TransactionReversal',
              TransactionID: options.transactionId,
              Amount: options.amount,
              ReceiverParty: options.shortCode || mpesa.configs.shortCode,
              RecieverIdentifierType: options.receiverIdType || '11',
              ResultURL: options.resultUrl,
              QueueTimeOutURL: options.queueUrl,
              Remarks: options.remarks || 'Reversal',
              Occasion: options.occasion || 'Reversal',
            }),
          ];
      }
    });
  });
}
//# sourceMappingURL=reversal.js.map
