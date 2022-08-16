# Deploy own application

In this section we will show you how to use our ACID template to deploy your own application on an OCS VM using Terraform and Ansible.

## Prerequisites.

- An IAM account and an associated role with the following scopes:
    - OSF/OCS
        if you want to create a vm and mount the file system created
        - [x] `osf:admin`: delete images
        - [x] `osf:read`: list images and get details
        - [x] `osf:write`: create images
        - [x] `ccs:read`: list images, flavors, networks, keypairs and get details about your already created Openstack instances
        - [x] `ccs:write`: create and delete Openstack instances
    - Docker
        - [x] `dockeraas:admin`: Use and manages Docker services

        !!! info
            At the moment you can't see the Docker related permissions in DoItNow, you will have to enable them via WHATS by creating a role with it.    
        
            For more details, go to [Cloud Platform IAM documentation](https://documentation.cloud.socgen/private/products/security/iam/concepts/product_description.html)
  
- Have a valid SSH key pair or keyname if you want SSH to your VM : [Tutorial To Create Your SSH Keypair](https://sgithub.fr.world.socgen/gts-professional-services/l3-bootcamp-prerequesites)
- Have a client id with the same scope as mentioned above  
  A dedicated HandsOn to learn how to setup authorizations and create a client-id is available at: [HandsOn](https://sgithub.fr.world.socgen/gts-professional-services/l2-how-to-set-up-account-authorizations-clientid).

- Install Terraform binary  
  if you want to create resources through Terraform, see installation instructions on [tutorial link](http://go/terraform)
- If you are connected through the VPN, have a way to access non-whitelisted internal urls.

## Steps

  1. Clone this repository :  
```bash
git clone https://sgithub.fr.world.socgen/dds-itf-acid/e2ocs.git
```
  2. Copy `acid/` directory into your application repository, make sure to copy it near the `src/` directory as 
  described in the white application template.

  3. Go to the directory acid/IaC/Terraform/ansible:
```bash
cd acid/IaC/Terraform/ansible
```
  4. Copy your Ansible roles in `roles/` directory.
   
  5. Edit the [playbook](https://sgithub.fr.world.socgen/dds-itf-acid/e2ocs/blob/master/acid/IaC/Ansible/deploy.yml) and put the list of your roles to use:
```yaml
    - hosts: localhost
      connection: local
      become: yes
      name: Install And Deploy Application
      tasks:
          - name: Including role for application specific infra creation
            include_role:
                name: '{{ item }}'
            loop:
                - < Your first role name >
                - < Your second role name >
```

    !!! tip
        Find this [docs](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html) to know more about Ansible playbooks.

  6. Set the 3 environments variables, execute:
```bash  
export ACCOUNT_ID=<your ACCOUNT_ID>
export CLIENT_ID=<your clent id>
export CLIENT_SECRET=<your client secret>
```

  7. Go to the directory acid/IaC/Terraform  
```bash
cd acid/IaC/Terraform
```
  8.  Edit the file [terraform.tfvars](https://sgithub.fr.world.socgen/dds-itf-acid/e2ocs/blob/master/acid/IaC/Terraform/terraform.tfvars) with your environment configuration, each variable is described in the white application tutorial.

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