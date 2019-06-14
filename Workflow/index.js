const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {

    try {
        const sasURI= yield context.df.callActivity("Task_GetSASUri",context.bindingData.input);
        const downloadBlobFolderFileName = yield context.df.callActivity("Task_DownloadBlob",context.bindingData.input);
        const createGif = yield context.df.callActivity("Task_createGif",downloadBlobFolderFileName.fileName);
        const uploadedFile = yield context.df.callActivity("Task_uploadBlob",{fileName:createGif.fileName,containerName:'gifs'});
        yield context.df.callActivity("Task_cleanUp",{fileName:uploadedFile.fileName});
        return true;
    } catch (error) {
        context.log(error);
        return false;
    }
   
});