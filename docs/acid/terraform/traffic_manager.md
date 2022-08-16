## Introduction

This documentation will help you go through the creation of traffic manager using the terrform brick on sgcloudplatfom. See [Traffic manager documentation](https://documentation.cloud.socgen/private/products/network/trafficmanager/howtos/create_tm.html)

## Tfvars file

You can create multiple traffic managers with multiple members for loadbalancers as shown in the [Inputs](#inputs).

```terraform
traffic_managers = {
  master_traffic_manager = {
    description                  = "traffic manager master"
    zone_name                    = "gslb.eu-fr-paris.cloud.socgen"
    loadbalancer_type            = "SLB"
    healthcheck_name             = "http1_test"
    healthcheck_port_type        = "HTTP"
    healthcheck_port             = 8080
    traffic_manager_service_name = "testTF_1"
    tags                         = [""] #this argument is optional
    enabled                      = true #this argument is optional, its' set to true by default
    members_list = [{
      name         = "slb_1"
      slb_priority = 20
      enabled      = true #this argument is optional, it's set to true by default
      },{
      name         = "slb_2"
      slb_priority = 80
      enabled      = true #this argument is optional, it's set to true by default
      }
    ]
  }
}
```


## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_resource_prefix"></a> [resource\_prefix](#input\_resource\_prefix) | The prefix to add to all resource names | `string` | n/a | yes |
| <a name="input_description"></a> [description](#input\_description) | description for traffic manager | `string` | n/a | yes |
| <a name="input_zone_name"></a> [zone\_name](#input\_zone\_name) | traffic manager zone | `string` | n/a | yes |
| <a name="input_healthcheck_name"></a> [healthcheck\_name](#input\_healthcheck\_name) | traffic manager healthecheck | `string` | n/a | yes |
| <a name="input_healthcheck_port"></a> [healthcheck\_port](#input\_healthcheck\_port) | traffic manager healthecheck port | `number` | n/a | yes |
| <a name="input_healthcheck_port_type"></a> [healthcheck\_port\_type](#input\_healthcheck\_port\_type) | traffic manager healthecheck port type | `string` | n/a | yes |
| <a name="input_traffic_manager_service_name"></a> [traffic\_manager\_service\_name](#input\_traffic\_manager\_service\_name) | traffic manager name | `string` | n/a | yes |
| <a name="input_loadbalancer_type"></a> [loadbalancer\_type](#input\_loadbalancer\_type) | load balancer type | `string` | n/a | yes |
| <a name="input_tags"></a> [tags](#input\_tags) | traffic manager tags | `list(string)` | `[]` | no |
| <a name="input_enabled"></a> [enabled](#input\_enabled) | traffic manager enable status | `bool` | `true` | no |
| <a name="input_members_list"></a> [members\_list](#input\_members\_list) | list of vips/priority associate to each slb | `list(map(string))` | n/a | yes |
| <a name="input_slb_name_to_vip_id"></a> [slb\_name\_to\_vip\_id](#input\_slb\_name\_to\_vip\_id) | map of slb vips create by slb module | `map(string)` | n/a | yes |


## Outputs

| Name | Description |
|------|-------------|
| <a name="output_traffic_manager_fqdn"></a> [traffic\_manager\_fqdn](#output\_traffic\_manager\_fqdn) | The FQDN of traffic manager |
