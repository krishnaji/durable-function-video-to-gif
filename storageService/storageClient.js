const azure = require('azure-storage');
let _client;
let _blobutil;
module.exports = {
    client: async() =>  {
    if (!_client) {
        _client = await azure.createBlobService(); 
    }
    
    return _client;
},
 blobUtilities: async () => {
    if (!_blobutil) {
        _blobutil = await azure.BlobUtilities; 
    }
    return _blobutil;
}
};