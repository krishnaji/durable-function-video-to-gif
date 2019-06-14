const storage = require('../storageService/storageClient');
const uuid = require('uuid');
module.exports = async function (context) {
    context.log('AAAAAAAAAAAA222222222222222');
    const blobService = await storage.client();
    const container = context.bindings.name.container;
    const blobName = context.bindings.name.blob;
    let downloadedFileName = uuid()+'.'+(blobName.split('.'))[1];
    
    blobService.getBlobToLocalFile(container, blobName, downloadedFileName, function(error) {
        if(error) {
            context.log('Unable to download',blobName);
        }
        else {
            context.log('Downloaded file',blobName);
         }
        });
        return {
            fileName:downloadedFileName
        }; 
};
