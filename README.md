
storageName=spablob
endpoint=https://64480578.ngrok.io/runtime/webhooks/eventgrid?functionName=blobEGTrigger
resourceGroup=Apps
storageid=$(az storage account show --name $storageName --resource-group $resourceGroup --query id --output tsv)


storageid=$(az storage account show --name $storageName --resource-group $myResourceGroup --query id --output tsv)

az eventgrid event-subscription create \
  --source-resource-id $storageid \
  --name demoSubToStorage \
  --endpoint $endpoint

 