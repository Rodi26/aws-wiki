## Introduction

This documentation will help you go through the creation of oracle database using the terrform brick on sgcloudplatfom. See [Oracle documentation](https://documentation.cloud.socgen/private/products/database/oracle/howtos/create_database.html)


## Tfvars file

The variable `oracle_databases` is a map, you can add as many databases as you wish with the following [Inputs](#inputs).

!!! warning
    The backup sheduling is a must to add for the terraform provider.

```terraform
oracle_databases = {
  master = {
     backup_enabled                 = true
     character_set                  = "AL32UTF8"
     description                    = "My Oracle Database"
     flavor_name                    = "Medium-mem16 2vCPU-16GB"
     name_suffix                    = "ACID-DB"
     network_name                   = "DCITS_DEV"
     oracle_version                 = "12.1.0.2"
     primary_availability_zone      = "eu-fr-paris-2"
     replication_availability_zones = ["eu-fr-paris-1"]
     #tags                           = ["my_tag"]
     backup_scheduling_settings = [{
        backup_days = "mon-sat"
        backup_time = "00:00"
        backup_type = "FULL"
     }]
   }
}
```


## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_description"></a> [description](#input\_description) | description for oracle database | `string` | `""` | no |
| <a name="input_backup_enabled"></a> [backup\_enabled](#input\_backup\_enabled) | activate backup database | `bool` | n/a | yes |
| <a name="input_character_set"></a> [character\_set](#input\_character\_set) | character set | `string` | n/a | yes |
| <a name="input_flavor_name"></a> [flavor\_name](#input\_flavor\_name) | database suffix | `string` | n/a | yes |
| <a name="input_name_suffix"></a> [name\_suffix](#input\_name\_suffix) | database suffix | `string` | `null` | no |
| <a name="input_network_name"></a> [network\_name](#input\_network\_name) | database network | `string` | n/a | yes |
| <a name="input_oracle_version"></a> [oracle\_version](#input\_oracle\_version) | database version | `string` | n/a | yes |
| <a name="input_primary_availability_zone"></a> [primary\_availability\_zone](#input\_primary\_availability\_zone) | The zone for primary availability | `string` | n/a | yes |
| <a name="input_replication_availability_zones"></a> [replication\_availability\_zones](#input\_replication\_availability\_zones) | The zones of replication availabilities | `list(string)` | `[]` | no |
| <a name="input_tags"></a> [tags](#input\_tags) | list of tags | `list(string)` | `[]` | no |
| <a name="input_backup_scheduling_settings"></a> [backup\_scheduling\_settings](#input\_backup\_scheduling\_settings) | backup scheduling day, time and type | <pre>list(object({<br>    # Days of the scheduled backup, [mon,tue,wed,thu,fri,sat,sun] (the format can be a range or individual days: "mon-sat": Each day from monday included to saturday both || "mon,sat": Only monday and saturday || "sun": only sunday)<br>    backup_days = string<br><br>    # The time of the backup (the format is "hh:mm")<br>    backup_time = string<br><br>    # The type of the backup (FULL or INCR)<br>    backup_type = string<br>  }))</pre> | n/a | yes |


## Outputs

| Name | Description |
|------|-------------|
| <a name="output_name"></a> [name](#output\_name) | The database long name |
| <a name="output_dns_alias"></a> [dns\_alias](#output\_dns\_alias) | Set of the database alias dns |