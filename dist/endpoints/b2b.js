import * as tslib_1 from 'tslib';
// TODO Possible Spelling Error "RecieverIdentifierType" -> "ReceiverIdentifierType"
export function b2b(mpesa, options) {
  return tslib_1.__awaiter(this, void 0, void 0, function() {
    var req, securityCredential;
    return tslib_1.__generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, mpesa.request()];
        case 1:
          req = _a.sent();
          securityCredential = mpesa.security();
          return [
            2 /*return*/,
            req.post('/mpesa/b2b/v1/paymentrequest', {
              Initiator: options.initiator || mpesa.configs.initiatorName,
              SecurityCredential: securityCredential,
              CommandID: options.commandId || 'BusinessToBusinessTransfer',
              SenderIdentifierType: options.senderType || 4,
              RecieverIdentifierType: options.receiverType || 4,
              Amount: options.amount,
              PartyA: options.senderParty,
              PartyB: options.receiverParty,
              AccountReference: options.accountRef,
              Remarks: options.remarks || 'B2B Request',
              QueueTimeOutURL: options.queueUrl,
              ResultURL: options.resultUrl,
            }),
          ];
      }
    });
  });
}
//# sourceMappingURL=b2b.js.map
