## Description

Creates SSH keypairs to log in to OCS instances. See [OCS Virtual Server documentation](https://documentation.cloud.socgen/private/products/compute/ocs/index.html).

Public keys must be provided as input. See [how to generate rsa key pair on Windows](https://documentation.cloud.socgen/private/products/compute/ocs/howtos/ssh_key.html).

Required scopes to use this brick are: `ccs:read` and `ccs:write`.

## Example (tfvars)

The variable `ocs_keypairs` is a map: its keys are the `name_key` of the keypairs (name without global resource prefix), and its values are the specification of each keypair (see [Inputs](#inputs) below).

1. Creating the keypair:

    ```terraform
    ocs_keypairs = {
      my_keypair = {
        public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC4sGP5Xa5h1APJq8aYywn0Pc3j+xOo+wsPZdzzvYZ2u/lX/zemSBxqOCqext8Rv7kXpfoCAvIsbQD68WkxAQbu3+wD28N4/LA+0DUaSotZhrmKqOketzMVwMM84uhB5zm2NL0ZxhcW1PCwNXUE6OAGeuDN3Hk15c0NHwS0Mt2nvo96TThWNXt2fROdfYozRXuGPc9rL7FnltZyJYDwjeP7Y0Ah47rdD4FuZjd5uERaEnZrRqBuo0eK0YRxrAPqy4PtHwh2AIJ3yS4hJxGfQWHY9q9II7ZcXeYGgXO+aVT2GnT7hu/0u7eUMj+yawTgla/bfqgjw8B5C+1Ap/FguPVVK09qT86tXOp10ZTu1gU0IgG74gg0xIYz+YZbEtPwWpfMKSZQoN5tTpBHaeDR2U7akANbTY1oaOG+Hjmoy+PF8LB2qqIOBzT+gfI1XVTKwoefaCdM2JOdkm6vykjTWb9UTXgZLz24yhpbXjx6PaNQrLLovZ20gv3RgJlH4VWKVaM= my_ssh_key"
      }
    }
    ```

2. Setting the keypair on an OCS instance:

    ```terraform
    ocs_instances = {
      my_instances = {
        ...
        keypair = { name_key = "my_keypair" }
        ...
      }
    }
    ```

    !!! note
        Updating the keypair of an OCS instance forces recreation of the instance.

<!-- BEGIN_TF_DOCS -->
## Resources

| Name | Type |
|------|------|
| cloudplatform_compute_keypair.key | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_public_key"></a> [public\_key](#input\_public\_key) | The public key | `string` | n/a | yes |
| <a name="input_type"></a> [type](#input\_type) | Type of key. The only current accepted value is ssh | `string` | `"ssh"` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_fingerprint"></a> [fingerprint](#output\_fingerprint) | n/a |
<!-- END_TF_DOCS -->
