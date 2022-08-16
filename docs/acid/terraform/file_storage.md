## Description

Creates File Storage Consistency Groups and Filesystems. See [File Storage documentation](https://documentation.cloud.socgen/private/products/storage/file/index.html).

- Consistency groups manage write order consistency, replication, encryption, ...
- Filesystems belong to consistency groups and store the files.
- NFS clients give the right to mount an NFS filesystem to a server's IP address. Filesystems are mounted by the [ocs_instances](ocs_instances.md) brick.

!!! warning
    Failover is not automatic when using the File Storage service. See [how to use switchovers and failovers](https://documentation.cloud.socgen/private/products/storage/file/howtos/switchover.html) for the manual steps.

!!! info
    This brick depends on the following other brick: [ocs_ports](ocs_ports.md).

Required scopes to use this brick are: `files:read` and `files:write`.

## Example (tfvars)

The variable `file_storage_consistency_groups` is a map: its keys are the `name_key` of the consistency groups (name without global resource prefix), and its values are the specification of each consistency group (see [Inputs](#inputs) below). Each consistency group defines filesystems as a submap.

1. Creating the consistency group and filesystem:

    ```terraform
    file_storage_consistency_groups = {
      my_consistency_group = {
        description       = "my description"
        tags              = ["tag1", "tag2"]
        availability_zone = "eu-fr-paris-1"
        offer             = "premium"
        encryption        = false
        network           = "ITEC"

        replication = {
          mode                      = "async"
          target_availability_zones = ["eu-fr-paris-2"]
        }
        geo_replication = {
          region                    = "eu-fr-north"
          target_availability_zones = ["eu-fr-north-1"]
        }

        filesystems = {
          my_filesystem = {
            description = "Shared FS for my application"
            tags        = ["FS1"]
            size        = 10
            nfs_clients = [
              { ocs_ports = { port_count = 2, name_key = "my_ports" } },
            ]
          }
        }
      }
    }
    ```

    !!! tip
        This example shows 2+1 replication (in an AZ in the same region and in another region).

        - If you only need multi-region replication, you can remove the `replication` block.
        - If you only need multi-AZ replication, you can remove the `geo_replication` block.
        - If you don't need replication (standalone), you can remove both blocks.

2. Mounting the filesystem on an OCS instance:

    ```terraform
    ocs_instances = {
      my_instances = {
        ...
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
        ...
      }
    }
    ```

<!-- BEGIN_TF_DOCS -->
## Resources

| Name | Type |
|------|------|
| cloudplatform_files_consistency_group_v1.consistency_group | resource |
| cloudplatform_files_filesystem_v1.filesystems | resource |
| cloudplatform_compute_ports.ports | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_description"></a> [description](#input\_description) | A descriptive comment for the consistency group | `string` | `""` | no |
| <a name="input_tags"></a> [tags](#input\_tags) | The list of tags for the consistency group resource | `set(string)` | `[]` | no |
| <a name="input_availability_zone"></a> [availability\_zone](#input\_availability\_zone) | The AZ on which is built the volume | `string` | n/a | yes |
| <a name="input_offer"></a> [offer](#input\_offer) | The performance offer of the storage. At April 2020, 2 values are possible : premium, dump | `string` | n/a | yes |
| <a name="input_encryption"></a> [encryption](#input\_encryption) | The Consistency Group will be encrypted if it's set to true | `string` | `false` | no |
| <a name="input_network"></a> [network](#input\_network) | The network to which the file system should be made available to | `string` | n/a | yes |
| <a name="input_replication"></a> [replication](#input\_replication) | Multi-AZ replication in the same region (can be combined with geo\_replication for 2+1 resiliency) | <pre>object({<br>    # Replication mode of the Consistency Group. 2 values are possible : sync, async<br>    mode = string<br><br>    # List of Availability zone on which the replication is done. It mustn't include the availability_zone variable (or an error is thrown by the API)<br>    target_availability_zones = list(string)<br>  })</pre> | `null` | no |
| <a name="input_geo_replication"></a> [geo\_replication](#input\_geo\_replication) | Replication in one other region (can be combined with replication for 2+1 resiliency) | <pre>object({<br>    # Target region of the geo-replication<br>    region = string<br><br>    # List of Availability zone on which the replication is done. It mustn't include the availability_zone variable (or an error is thrown by the API)<br>    # All the availability zones must be in the geo_replication region<br>    target_availability_zones = list(string)<br>  })</pre> | `null` | no |
| <a name="input_filesystems"></a> [filesystems](#input\_filesystems) | The list of file systems | <pre>map(object({<br>    # A descriptive comment for the File System<br>    description = string # default = ""<br><br>    # The list of tags for the File System resource<br>    tags = list(string) # default = []<br><br>    # The size of the File System (in Gbytes)<br>    size = number<br><br>    # The set of NFS clients that will have access to the FS<br>    nfs_clients = list(object({<br>      # IP of the server/port that has the right to mount the NFS file system<br>      host = string # default = null, required : exactly one of host or ocs_ports<br><br>      # Reference to the OCS ports that have the right to mount the NFS file system<br>      ocs_ports = object({<br>        name_key   = string<br>        port_count = number<br>      }) # default = null, required : exactly one of host or ocs_ports<br><br>      # The permission given to this server (one of 2 values : read-write and read-only)<br>      permission = string # default = "read-write"<br><br>      # The protocol used to mount the filesystem (at April 2022, only one value allowed nfs4.1)<br>      protocol = string # default = "nfs4.1"<br>    }))<br>  }))</pre> | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_id"></a> [id](#output\_id) | n/a |
| <a name="output_name"></a> [name](#output\_name) | n/a |
| <a name="output_filesystems_id"></a> [filesystems\_id](#output\_filesystems\_id) | n/a |
| <a name="output_filesystems_name"></a> [filesystems\_name](#output\_filesystems\_name) | n/a |
| <a name="output_filesystems_mount_paths"></a> [filesystems\_mount\_paths](#output\_filesystems\_mount\_paths) | n/a |
<!-- END_TF_DOCS -->

The `filesystems_mount_paths` output in the root module indicates the name of the device file that will be mounted on the instances.
