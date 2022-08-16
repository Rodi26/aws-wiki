## Description

Creates OCS instances (servers). See [OCS Virtual Server documentation](https://documentation.cloud.socgen/private/products/compute/ocs/index.html).

OCS stands for OpenStack Compute Service. For VMware instances, see [vcs_servers](vcs_instances.md).

!!! info
    This brick depends on the following other bricks:

    - [osfactory_image](osfactory.md)
    - [ocs_ports](ocs_ports.md)
    - [ocs_keypair](ocs_keypair.md)
    - [ocs_server_group](ocs_server_group.md) (optional)
    - [block_storage_volumes](block_storage.md) (optional)
    - [file_storage_consistency_group](file_storage.md) (optional)

Required scopes to use this brick are: `ccs:read` and `ccs:write`.
When mounting nfs filesystems, you also need `cmaas:read` and `cmaas:write` scopes.

## Example (tfvars)

The variable `ocs_instances` is a map: its keys are the `name_key` of the instances (name without global resource prefix and index suffix), and its values are the specification of each instance (see [Inputs](#inputs) below).

```terraform
ocs_instances = {
  my_instances = {
    instance_count     = 2
    description        = "my description"
    tags               = ["tag1", "tag2"]
    availability_zones = ["eu-fr-paris-1", "eu-fr-paris-2"]
    flavor             = "Micro 1vCPU-1GB"
    image              = { name_key = "my_image" }
    ports              = { name_key = "my_ports" }
    keypair            = { name_key = "my_keypair" }
    server_group       = { name_key = "my_server_group" }
    metadata = {
      is_example = "yes"
    }
    volume_mounts = [
      { name_key = "my_volumes" },
    ]
    nfs_mounts = [
      {
        consistency_group = { name_key = "my_consistency_group" }
        filesystem        = { name_key = "my_filesystem" }
        target            = "/data"
        user              = "cloud-user"
        group             = "cloud-user"
        options           = "defaults,vers=4.1"
      },
    ]
  }
}
```

!!! note
    You can create **multiple instances** of the same type using the `instance_count` variable.

    - Each instance's name will be suffixed with the index of the instance (starting at 1).
    - The `availability_zones` variable specifies the AZ of each instance. In this example, the first instance will be on `eu-fr-paris-1`, and the second one will be on `eu-fr-paris-2`. If there was a third instance, it would wrap-around on the list, so it would be `eu-fr-paris-1` too.

!!! warning
    When using **block storage volumes**, Terraform won't let you destroy OCS instances if the block storage volumes are not detached first.
    This is done so as to prevent **data corruption**. See [how to detach a volume](https://documentation.cloud.socgen/private/products/storage/block/howtos/volumes/detach_volume.html).

    - To detach a volume, `ssh` to the VM, `umount` the file system, and then detach the volume manually in DoItNow.
    After detaching the volume manually, Terraform will remove the attachement from state on the next apply/destroy.

<!-- BEGIN_TF_DOCS -->
## Resources

| Name | Type |
|------|------|
| cloudplatform_compute_instance.vms | resource |
| cloudplatform_compute_port.ports | resource |
| cloudplatform_compute_volume_attachement.attachements | resource |
| null_resource.keypair_fingerprint | resource |
| cloudplatform_compute_flavor.flavor | data source |
| cloudplatform_compute_image.image | data source |
| cloudplatform_compute_network.network | data source |
| cloudplatform_compute_security_group_v2.security_groups | data source |
| cloudplatform_compute_volumes_v1.volumes | data source |
| cloudplatform_slb_subnet.subnets | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_instance_count"></a> [instance\_count](#input\_instance\_count) | Number of instances to create using the same name prefix (resource\_prefix, name\_key) as name | `number` | n/a | yes |
| <a name="input_description"></a> [description](#input\_description) | The display/human description of the VM | `string` | `null` | no |
| <a name="input_tags"></a> [tags](#input\_tags) | List of tags of the resource | `set(string)` | `[]` | no |
| <a name="input_availability_zones"></a> [availability\_zones](#input\_availability\_zones) | Availabilty zone of each instance (one for each instance\_count), with wraparound if index is out of range (modulo) | `list(string)` | n/a | yes |
| <a name="input_flavor"></a> [flavor](#input\_flavor) | The name of the flavor of the VM (like the instance\_type for AWS) | `string` | n/a | yes |
| <a name="input_image"></a> [image](#input\_image) | Reference to an image created in this Terraform configuration (with name\_key) or externally (with id) | `map(string)` | n/a | yes |
| <a name="input_network"></a> [network](#input\_network) | The name of the Network the VM will be connected to | `string` | n/a | yes |
| <a name="input_keypair"></a> [keypair](#input\_keypair) | Reference to a keypair created in this Terraform configuration (with name\_key) or externally (with full\_name) | `map(string)` | `null` | no |
| <a name="input_keypair_fingerprint"></a> [keypair\_fingerprint](#input\_keypair\_fingerprint) | Fingerprint of the keypair, used to force recreation of the instances when it changes | `string` | `null` | no |
| <a name="input_server_group"></a> [server\_group](#input\_server\_group) | ID of the server group policy to apply for the deployment of the VM | `string` | `null` | no |
| <a name="input_security_groups"></a> [security\_groups](#input\_security\_groups) | The list of references to security groups to set on the instances (with name\_key or full\_name) | `list(map(string))` | <pre>[<br>  {<br>    "full_name": "default"<br>  }<br>]</pre> | no |
| <a name="input_metadata"></a> [metadata](#input\_metadata) | Map of metadata of the resource | `map(string)` | `{}` | no |
| <a name="input_modules"></a> [modules](#input\_modules) | Set of modules installed on the instance | <pre>list(object({<br>    # The module name must be the same as specified by CMAAS API, see the API here (GET /modules to see the public modules)<br>    name = string<br><br>    # Parameters of the Puppet module<br>    parameters = map(string) # default = {}<br><br>    # Wait for completion of the module application<br>    wait_for_completion = bool # default = true<br>  }))</pre> | `[]` | no |
| <a name="input_volume_mounts"></a> [volume\_mounts](#input\_volume\_mounts) | The list of references to block storage volumes to mount on the instances (with name\_key of id\_list) | `any` | `[]` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_id_list"></a> [id\_list](#output\_id\_list) | n/a |
| <a name="output_name_list"></a> [name\_list](#output\_name\_list) | n/a |
| <a name="output_ip_list"></a> [ip\_list](#output\_ip\_list) | n/a |
<!-- END_TF_DOCS -->

The `instances_ip` output in the root modules indicates the IP address of the instances.
