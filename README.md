# Budibase big-query-plugin

# Description

This plugin allows you to connect your Budibase application to Google Cloud Platform's Big Query data warehouse solution. 

Find out more about [BigQuery](https://cloud.google.com/bigquery)
Find out more about [Budibase](https://github.com/Budibase/budibase).

## Installation

See [official documents] for the installation instructions.

Once installed, you'll see bigquery as a new data source.

Create a service account in Google Cloud and provide sufficient permission.

In budibase, you need to enter

 - email of service account
 - private key
 - GCP project ID
 - BigQuery dataset ID and dataset location


## Development Instructions

To build your new plugin run the following in your Budibase CLI:
```
budi plugins --build
```

You can also re-build everytime you make a change to your plugin with the command:
```
budi plugins --watch
```


