## Description

Creates OCS server groups to control OCS instances scheduling on physical hosts / hypervisors. See [server group and affinity](https://documentation.cloud.socgen/private/products/compute/ocs/concepts/server_group.html).

> One of the most important point when dealing with cloud instances is how to be sure that your service will stay online, independently of the event who can occur on the underlying infrastructure. In order to to do that, one of the key feature you can use is Server Groups.
>
> Server Groups allows user to explicitely specify if they want or not a group of Virtual Servers to run on the same hosts. These policies are called “Affinity” and “Anti-Affinity”.

![anti-affinity](https://documentation.cloud.socgen/private/products/compute/ocs/concepts/images/Design_ocs_servers_groups_anti-affinity.png)

Required scopes to use this brick are: `ccs:read` and `ccs:write`.

## Example (tfvars)

The variable `ocs_server_groups` is a map: its keys are the `name_key` of the server groups (name without global resource prefix), and its values are the specification of each server group (see [Inputs](#inputs) below).

1. Creating the server group:

    ```terraform
    ocs_server_groups = {
      my_server_group = {
        policies = ["anti-affinity"]
      }
    }
    ```

2. Setting the server group on an OCS instance:

    ```terraform
    ocs_instances = {
      my_instances = {
        ...
        server_group = { name_key = "my_server_group" }
        ...
      }
    }
    ```

    !!! note
        Updating the server group of an OCS instance forces recreation of the instance.

<!-- BEGIN_TF_DOCS -->
## Resources

| Name | Type |
|------|------|
| cloudplatform_compute_server_group.server_group | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_policies"></a> [policies](#input\_policies) | The policy of server assignation on hypervisors. Currently only 2 policies are managed affinity, anti-affinity | `set(string)` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_id"></a> [id](#output\_id) | n/a |
<!-- END_TF_DOCS -->
