
storageName=<storageaccountname>
endpoint='https://<function-app-name>.azurewebsites.net/runtime/webhooks/eventgrid?functionName=blobEGTrigger&code=<host-key>'
resourceGroup=<resource-group-name>
storageid=$(az storage account show --name $storageName --resource-group $resourceGroup --query id --output tsv)


az eventgrid event-subscription create \
  --source-resource-id $storageid \
  --name videoUploaded \
  --endpoint $endpoint \
  --subject-begins-with '/blobServices/default/containers/videos'
