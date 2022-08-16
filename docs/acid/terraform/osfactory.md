## Description

Creates OS Factory images for OCS instances. See [OS Factory documentation](https://documentation.cloud.socgen/private/products/compute/osf/index.html).

> For Cloud Native applications, developers needs to build customized OS images with application installed and configured into, OS factory will provide that.
>
> You give to OS Factory a source image (given by GTS) and a configuration (ansible or puppet), it provides you a new image with your cutomization.

!!! info
    New GTS base images are available each week. You need to update your derived images regularly to make sure the system packages on your servers are up to date. Your images are automatically deactivated after 90 days. See [OS Factory image lifecycle](https://documentation.cloud.socgen/private/products/compute/osf/concepts/lifecycle.html).

Terraform cannot destroy images while they are being used by an OCS instance. To avoid long downtimes, the Jenkins job that uses this brick removes the old images from the Terraform state before building new images. As a result, old images are never deleted.

!!! tip
    You can use the `osfactory_cleanup` brick to automatically delete old images. (TODO)

Required scopes to use this brick are: `osf:read` and `osf:write`.

## Example (tfvars)

The variable `osf_images` is a map: its keys are the `name_key` of the images (name without global resource prefix), and its values are the specification of each image (see [Inputs](#inputs) below).

1. Creating the image:

    ```terraform
    osf_images = {
      my_image = {
        size         = 32
        source_image = { os_name = "Linux", os_distrib = "CentOS", os_version = "7" }
        derivations = [{
          type     = "ansible_playbook"
          url      = "https://sgithub.fr.world.socgen/dds-itf-acid/kube"
          revision = "master"
          properties = {
            playbook_file = "acid/IaC/Ansible/derivation.yaml"
            parameters    = {}
          }
        }]
      }
    }
    ```

2. Using the image on an OCS instance:

    ```terraform
    ocs_instances = {
      my_instances = {
        ...
        image = { name_key = "my_image" }
        ...
      }
    }
    ```

    !!! note
        Updating the image of an OCS instance forces recreation of the instance.

<!-- BEGIN_TF_DOCS -->
## Resources

| Name | Type |
|------|------|
| cloudplatform_osfactory_image.image | resource |
| cloudplatform_osfactory_image_source.source | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_size"></a> [size](#input\_size) | Size (in Gbytes) of the source image. 3 possible sizes : 8, 16, 32 | `number` | n/a | yes |
| <a name="input_source_image"></a> [source\_image](#input\_source\_image) | Source image<br>2 methods to search a source image:<br>* By its exact name (needs "name" argument")<br>* By the Operating System description (needs the 3 arguments "os\_name", "os\_distrib" and "os\_version") | <pre>object({<br>    # Human name of the source image<br>    name = string<br><br>    # Name of the Operating System (Ex: Linux)<br>    os_name = string<br><br>    # Name of the Operating System Distribution (Ex: CentOS)<br>    os_distrib = string<br><br>    # Major version of the Operating System Distribution (Ex: 7)<br>    os_version = string<br>  })</pre> | n/a | yes |
| <a name="input_derivations"></a> [derivations](#input\_derivations) | List of derivation to apply on the source image | <pre>list(object({<br>    # Type of the derivations. 3 possibles values : ansible_role, ansible_playbook, puppet<br>    type = string<br><br>    # Url of the git repo<br>    url = string<br><br>    # Git revision<br>    revision = string<br><br>    properties = object({<br>      # In case of ansible_playbook, the playbook file<br>      playbook_file = string<br><br>      # Parameters sent to ansible/puppet. Warning, it mustn't be secrets as it will be available in API<br>      parameters = map(string)<br>    })<br>  }))</pre> | `[]` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_id"></a> [id](#output\_id) | n/a |
<!-- END_TF_DOCS -->
