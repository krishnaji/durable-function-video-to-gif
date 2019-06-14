
[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fkrishnaji%2Fdurable-function-video-to-gif%2Fmaster%2Fdeploy.json%3Ftoken%3DAACVEKRUX4T42AYQTZUHT6S5AQAB4>)

storageName=<storageaccountname>
endpoint='https://<function-app-name>.azurewebsites.net/runtime/webhooks/eventgrid?functionName=blobEGTrigger&code=<host-key>'
resourceGroup=<resource-group-name>
storageid=$(az storage account show --name $storageName --resource-group $resourceGroup --query id --output tsv)


az eventgrid event-subscription create \
  --source-resource-id $storageid \
  --name videoUploaded \
  --endpoint $endpoint \
  --subject-begins-with '/blobServices/default/containers/videos'
