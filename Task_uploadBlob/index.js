const storage = require('../storageService/storageClient');
module.exports = function (context) {
    const blobService = storage.client();
    const container = context.bindings.name.containerName;
    const blobName = context.bindings.name.fileName;
    context.log(`AAAAAAAAAAAA4444444444444444444 ${context.bindings.name.fileName},${context.bindings.name.containerName}!`);
    
    blobService.createBlockBlobFromLocalFile(container, blobName, blobName,function (error) {
        if (error) {
            throw error;
        }
        context.done();
    });
};