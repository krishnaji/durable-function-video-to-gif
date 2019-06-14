const azure = require('azure-storage');
let _client;
let _blobutil;
module.exports = {
    client: () =>  {
        
    if (!_client) {
        _client =  azure.createBlobService(); 
    }
    
    return _client;
},
 blobUtilities:  () => {
    if (!_blobutil) {
        _blobutil =  azure.BlobUtilities; 
    }
    return _blobutil;
}
};