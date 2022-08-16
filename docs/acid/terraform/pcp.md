## Introduction

Here we will create a postgresql cluster and a database with terraform. See [Postgresql documentation](https://documentation.cloud.socgen/private/products/database/postgresql/index.html)

## Tfvars File

You can add a postgresql cluster with many databases following the [Inputs](#inputs).

```terraform
postgres_clusters = {
  cluster1 = {
    availability_zone = "eu-fr-paris-1"
    network           = "ITEC_DEV_2"
    environment       = "dev"
    vm_provider       = "OCS"
    type              = "Medium 2vCPU-4GB"
    volume_type       = "tiefighter"
    storage           = 20
    db_version        = 11
    has_backup        = true
    has_monitoring    = true
    replication = {
      availability_zone = "eu-fr-paris-2"
    }
    databases = {
      dbdev = {
        username   = "USERNAME_TO_REPLACE" 
        password   = "PASSWORD_TO_REPLACE" # it must contains between 8 and 25 characters, with at least one lowercase character, one uppercase character and one digit.
        extensions = []
      }
    }
  }
}
```


## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_resource_prefix"></a> [resource\_prefix](#input\_resource\_prefix) | The prefix to add to all resource names | `string` | n/a | yes |
| <a name="input_name_key"></a> [name\_key](#input\_name\_key) | Human name for the cluster (without resource\_prefix) | `string` | n/a | yes |
| <a name="input_tags"></a> [tags](#input\_tags) | The list of tags for the cluster | `list(string)` | `[]` | no |
| <a name="input_availability_zone"></a> [availability\_zone](#input\_availability\_zone) | Availability zone of the Pg cluster | `string` | n/a | yes |
| <a name="input_network"></a> [network](#input\_network) | Network on which the cluster will be provisioned | `string` | n/a | yes |
| <a name="input_environment"></a> [environment](#input\_environment) | Environment of the Postgres cluster (Possible values : dev, hml, prd) | `string` | n/a | yes |
| <a name="input_vm_provider"></a> [vm\_provider](#input\_vm\_provider) | Virtual machine provider of the PostgreSQL cluster (Possible values: OCS, EDGE) | `string` | `"OCS"` | no |
| <a name="input_type"></a> [type](#input\_type) | Size of the underlying VM (ex : Micro 1vCPU-1GB) | `string` | n/a | yes |
| <a name="input_volume_type"></a> [volume\_type](#input\_volume\_type) | OCS Storage Flavor (Possible values: xwing, tiefighter) | `string` | `"tiefighter"` | no |
| <a name="input_storage"></a> [storage](#input\_storage) | Size of Database in Gbytes | `number` | n/a | yes |
| <a name="input_db_version"></a> [db\_version](#input\_db\_version) | PostgreSQL version | `number` | `"12"` | no |
| <a name="input_lc_collate"></a> [lc\_collate](#input\_lc\_collate) | Collation order to use in the cluster databases | `string` | `"fr_FR.UTF-8"` | no |
| <a name="input_lc_ctype"></a> [lc\_ctype](#input\_lc\_ctype) | Character classification to use in the cluster databases | `string` | `"fr_FR.UTF-8"` | no |
| <a name="input_has_backup"></a> [has\_backup](#input\_has\_backup) | Activate managed backup on the cluster | `bool` | n/a | yes |
| <a name="input_has_monitoring"></a> [has\_monitoring](#input\_has\_monitoring) | Activate monitoring on the cluster | `bool` | n/a | yes |
| <a name="input_replication"></a> [replication](#input\_replication) | Replication parameters | <pre>object({<br>    # Availability zone of the replica<br>    availability_zone = string<br><br>    # Network name of the replica<br>    network = string # defaults to var.network<br>  })</pre> | `null` | no |
| <a name="input_databases"></a> [databases](#input\_databases) | List of databases to create in the cluster. Keys are the name of the databases. They must contain only lowercase alphanumeric and underscore characters and must start with a letter | <pre>map(object({<br>    # The username of the database. It must contain only lowercase alphanumeric and underscore characters and must start with a letter<br>    username = string<br><br>    # Password of the database. It must contain at least one lowercase and one uppercase alpha-numeric characters and one digit character.<br>    password = string<br><br>    # A set of extensions to be installed on the database. (See the Postgres documentation for a list of available extensions)<br>    extensions = list(string) # defaults to empty list<br>  }))</pre> | n/a | yes |


## Outputs

| Name | Description |
|------|-------------|
| <a name="output_cluster_fqdn"></a> [cluster\_fqdn](#output\_cluster\_fqdn) | The FQDN of  cluster |
| <a name="output_databases_name"></a> [databases\_name](#output\_databases\_name) | The name of the databases |


