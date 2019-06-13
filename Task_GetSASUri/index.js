//https://github.com/Azure/azure-storage-node/blob/master/examples/samples/sassample.js
const storage = require('../storageService/storageClient');
module.exports = async function (context) {
    context.log (`Hello ${context.bindings.name}!`);
    const blobService = await storage.client();
    const BlobUtilities = await storage.blobUtilities();
    const container = context.bindings.name.container;
    const blobName = context.bindings.name.blob;
    const startDate = new Date();
    const expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 30);
  
    const sharedAccessPolicy = {
      AccessPolicy: {
        Permissions: BlobUtilities.SharedAccessPermissions.READ,
        Start: startDate,
        Expiry: expiryDate
      }
    };
  
    const sharedAccessSignatureToken = blobService.generateSharedAccessSignature(container, blobName, sharedAccessPolicy);
    context.log(blobService.getUrl(container, blobName, sharedAccessSignatureToken, true));
    
    return {
        uri: blobService.getUrl(container, blobName, sharedAccessSignatureToken, true)
    };

    
};