# [Azure Durable Functions](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview) : Video to GIF conversion
![](demo.gif)

This application uses Azure Durable functions, Blob Storage, Event Grid, Application Insights and ffmpeg.

## Provision Functions App and other resources
Use one of the below deploy options to provision the resources. 

### Deploy to Azure button
[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fkrishnaji%2Fdurable-function-video-to-gif%2Fmaster%2Fdeploy.json)

### Deploy using Azure CLI

``` 
az group deployment create --resource-group <resource-group-name> --name <deployment-name>--template-file deploy.json 
```

Once deployed you should see below resources in the resource group.

- App Service plan(Premium EP1 plan, read more about [Azure functions Premium](https://docs.microsoft.com/en-us/azure/azure-functions/functions-premium-plan) plan)
- Storage account
- App Service - Function App
- Application Insights

## Deploy application code
To deploy the functions application code please follow [these](https://docs.microsoft.com/en-us/azure/azure-functions/functions-continuous-deployment) steps. Or use [VS Code](https://code.visualstudio.com/tutorials/functions-extension/deploy-app) to deploy the application.

## Create Event Grid Subscription
In this application Event Grid is used to trigger the functions app when a new Video is added to videos blob containers. 
Before we create event grid subscription we need to get system key. Replace code= with your master key.
https://```<function-app-name>```.azurewebsites.net/admin/host/systemkeys/eventgrid_extension?```code=<master-key>```
 
This should result in something like below.
```json
{"name": "eventgrid_extension",
"value": "2aSighjJgTUxhaOaCBN91QA0y5celLfFP1WOKzTasdfdf2THig==",
"links": [{
"rel": "self",
"href": "https://<function-app-name>.azurewebsites.net/admin/host/systemkeys/eventgrid_extension"}]}
```
Use the value from above as the ```code=system-key``` in below set of commands.
Open [Azure Cloud Shell](https://shell.azure.com) and execute below commands.

```
storageName= <storage-account-name>
endpoint='https://<function-app-name>.azurewebsites.net/runtime/webhooks/eventgrid?functionName=blobEGTrigger&code=<system-key>'
resourceGroup=resource-group-name
storageid=$(az storage account show --name $storageName --resource-group $resourceGroup --query id --output tsv)
az eventgrid event-subscription create \
  --source-resource-id $storageid \
  --name vid-to-gif-function-app \
  --endpoint $endpoint \
  --subject-begins-with '/blobServices/default/containers/videos'
```
## Upload the Videos
Upload a video to Video container in your blob storage account.Wait for couple seconds and you should have a GIF created in Gifs blob container.  