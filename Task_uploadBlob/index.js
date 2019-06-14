const storage = require('../storageService/storageClient');
module.exports = function (context) {
    context.log('@@@ Activity 4 @@@'); 
    const blobService = storage.client();
    const container = context.bindings.name.containerName;
    const blobName = context.bindings.name.fileName;
    
    blobService.createBlockBlobFromLocalFile(container, blobName, blobName,function (error) {
        if (error) {
            throw error;
        }
        context.done(null,{fileName:blobName});
    });
};