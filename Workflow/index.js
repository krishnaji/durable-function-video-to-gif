/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {

    try {
        const sasURI= yield context.df.callActivity("Task_GetSASUri",context.bindingData.input);
        context.log("WWWWWWWWWWWWWWWWWW",sasURI);
        const downloadBlobFolderFileName = yield context.df.callActivity("Task_DownloadBlob",sasURI.url);
        const createGif = yield context.df.callActivity("Task_createGif",downloadBlobFolderFileName.fileName);
        yield context.df.callActivity("Task_uploadBlob",createGif.folderName,createGif.fileName,context.bindingData.input.container);
        return true;
    } catch (error) {
        context.log(error);
        return false;
    }
   
});