# Deploy white application

In this section we will show you how to deploy a white application on an OCS VM using Terraform and Ansible.

!!! attention "DISCLAIMER"
    The white application used in this section is limited only to a **CFT ECO SYSTEM**.
    If you're interested but you're not **CFT** , please mail us via <a href="mailto:list.par-dds-acid@socgen.com">PAR-DDS-ACID</a>.


## Prerequisites.

- An IAM account and an associated role with the following scopes:
    * OSF/OCS
        if you want to create a vm and mount the file system created  
        - [x] `osf:admin`: delete images
        - [x] `osf:read`: list images and get details
        - [x] `osf:write`: create images
        - [x] `ccs:read`: list images, flavors, networks, keypairs and get details about your already created Openstack instances
        - [x] `ccs:write`: create and delete Openstack instances 
    * Docker
        - [x] `dockeraas:admin`: Use and manages Docker services

        !!! info
            At the moment you can't see the Docker related permissions in DoItNow, you will have to enable them via WHATS by creating a role with it.    
        
            For more details, go to [Cloud Platform IAM documentation](https://documentation.cloud.socgen/private/products/security/iam/concepts/product_description.html)
  
- Have a valid SSH key pair or keyname if you want SSH to your VM : [Tutorial To Create Your SSH Keypair](https://sgithub.fr.world.socgen/gts-professional-services/l3-bootcamp-prerequesites)
- Have a client id with the same scope as mentioned above  
  A dedicated HandsOn to learn how to setup authorizations and create a client-id is available at: [HandsOn](https://sgithub.fr.world.socgen/gts-professional-services/l2-how-to-set-up-account-authorizations-clientid).

- Install Terraform binary  
  if you want to create resources through Terraform, see installation instructions on [Tutorial Link](http://go/terraform)
- If you are connected through the VPN, have a way to access non-whitelisted internal urls.

## Steps

  1. Clone this repository :
```bash  
git clone https://sgithub.fr.world.socgen/dds-itf-acid/e2ocs.git
```
  2. Go to the directory acid/IAAS/Terraform
```bash  
cd acid/IAAS/Terraform
```  
  3. Set the 3 environments variables, execute: 
```bash  
export ACCOUNT_ID=<your ACCOUNT_ID> 
export CLIENT_ID=<your clent id> 
export CLIENT_SECRET='<your client secret>  
 ```  

  4. Edit the file [terraform.tfvars](https://sgithub.fr.world.socgen/dds-itf-acid/e2ocs/blob/master/acid/IaC/Terraform/terraform.tfvars) with your environment configuration, a detailed description of each variable to edit is presented below:

```HCL
# The region in which you want to create your resources.
region                      = "eu-fr-paris"
# The environment (dev/hml or prd).
infra_env                   = "dev"
# Your application name.
app_shortname               = "acid"

# The operating system name you want to use to deploy your OCS Vms.
os_name                     = "Linux"
# The operating system distribution you want to use to deploy your OCS Vms.
os_distrib                  = "CentOS"
# The operating system version you want to use to deploy your OCS Vms.
os_version                  = 7
# Size (in Gbytes) of the source image. 3 possible sizes : 8,16, 32.
image_size                  = 8
# The Flavor of the VM.
compute_flavor              = "Medium 2vCPU-4GB"
# The network which the VM will be connected.
compute_network             = "L1_COMMON_HOM"
# The server group policy to apply for the deployment of the VM.
server_group_policy         = "affinity"
# Type of the derivations. 3 possibles values : ansible_role, ansible_playbook, puppet.
os_derivations_type         = "ansible_role"
# The derivation's url of the git repo.
os_derivations_git_repo     = "https://sgithub.fr.world.socgen/dds-itf-acid/ansible-sudoers"
# The number of the OCS VMs to deploy.
ocs_instance_count          = 1
# The Az on will is put the instance.
# If not given, it will be put on one of the AZ of the region.
ocs_availability_zone       = "eu-fr-paris-1"
# The SSH public Key that is injected in the VM.
ocs_compute_ssh_public_key  = "ssh-rsa AAAAAABBBBBBCCCCC=="
```
### Launch Deployment Using Terraform

1. Initialize the provider plugin, by executing:
```bash  
terraform init 
```
2. Check whether the proposed changes match what you expected before applying the changes on your infrastructure, by executing:
```bash  
terraform plan
```
3. Create OSF image and OCS VM, by executing:
```bash  
terraform apply
```

!!! tip
    If you want to launch deployment automatically without manual envolvment, you can execute:
    ```bash  
    terraform apply --auto-approve
    ```
    The `terraform apply` command performs a plan just like Terraform plan does, but then applies the changes on your infrastructure after asking the user for approvement.
    The `--auto-approve` flag is used to skip user's confirmation.

### Clean up
You can destroy all resources you have created with Terraform by lauching:
```bash   
terraform destroy
```

!!! attention
    If you have used DIN, please use DIN to delete resources.