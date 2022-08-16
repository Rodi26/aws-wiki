---
hide:
  - toc
---
# ACID Infrastructure as Code Bricks

Terraform is one of the famous and valuable tools to manage and provision cloud infrastructure using code. To work with it, thease elements are mandatory to know:

  - [x] **modules**:  Similar to the concepts of libraries, it makes it easier to navigate, understand, and update your configuration by keeping related parts of your configuration together.
  - [x] **main.tf** : Contains the main set of configuration for your module. You can also create other configuration files and organize them however makes sense for your project.
  - [x] **terraform.tfvars** : Allows to manage variable assignments systematically, tfvars files are the best and most common way to do so due to their simplicity and effectiveness.
  - [x] **backend.tfbackend** : Defines where Terraform stores its state data files.

Here is a set of Infrastucture as Code bricks based on the [Terraform Provider for GTS Cloud Platform](https://go/terraform).

## **IaC Bricks**

<div class="grid-search">
    <span class="grid-search-icon" focusable="false"></span>
    <input class="grid-search-box" type="search" placeholder="Search a brick" aria-label="Search" id="grid-search-box">
</div>

<div class="grid cards" markdown>

!!! terraform "OS Factory <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/ac5c24d8-2e4b-4635-838a-5765d6298882?type=domain&height=32&width=32' title='OS Factory'>"

    Customize OS Factory images

    ---
    [:octicons-arrow-right-24: Use this brick](osfactory.md)

!!! terraform  "OCS Virtual Server <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/f5beb37d-fef0-43cc-84c8-6191d026ab65?type=domain&height=32&width=32' title='OCS Virtual Server'>"

    Manage OCS Virtual Servers

    ---
    [:octicons-arrow-right-24: Use this brick](ocs_instances.md)

!!! terraform "OCS Keypair <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/f5beb37d-fef0-43cc-84c8-6191d026ab65?type=domain&height=32&width=32' title='OCS Server Group'>"

    Setup SSH keys

    ---
    [:octicons-arrow-right-24: Use this brick](ocs_keypair.md)

!!! terraform "OCS Server Group <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/f5beb37d-fef0-43cc-84c8-6191d026ab65?type=domain&height=32&width=32' title='OCS Server Group'>"

    Manage OCS policy for VM assignment on hypervisors

    ---
    [:octicons-arrow-right-24: Use this brick](ocs_server_group.md)

!!! terraform disabled "Security Group <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/64fced15-0007-4439-a083-93883fa5dc36?type=domain&height=32&width=32' title='Security Group'>"

    ⏳ Coming Soon...
    <!-- Configure Security Groups -->

    ---
    [:octicons-arrow-right-24: Use this brick](security_groups.md)

!!! terraform disabled "Service Load Balancer <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/70a2a278-c8f3-4112-9af0-d42444000f8d?type=domain&height=32&width=32' title='Service Load Balancer'>"

    ⏳ Coming Soon...

    ---
    [:octicons-arrow-right-24: Use this brick](slb.md)

!!! terraform "Traffic Manager <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/d9350001-df33-4002-80c6-596bb1be6561?type=domain&height=32&width=32' title='Traffic Manager'>"

    Manage Global Load Balancers

    ---
    [:octicons-arrow-right-24: Use this brick](traffic_manager.md)

!!! terraform "File Storage <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/9e7f1f8a-d741-4f6c-8e19-5193f4bba097?type=domain&height=32&width=32' title='File Storage'>"

    Manage Shared File System

    ---
    [:octicons-arrow-right-24: Use this brick](file_storage.md)

!!! terraform disabled "Object Storage <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/96809b04-5d89-4124-a8e2-210c27ed3fb1?type=domain&height=32&width=32' title='Object Storage'>"

    ⏳ Coming Soon...

    ---
    [:octicons-arrow-right-24: Use this brick](object_storage.md)

!!! terraform disabled "Object Storage Access Key <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/96809b04-5d89-4124-a8e2-210c27ed3fb1?type=domain&height=32&width=32' title='Object Storage Access Key'>"

    ⏳ Coming Soon...

    ---
    [:octicons-arrow-right-24: Use this brick](object_storage_akey.md)

!!! terraform disabled "OpenStack Block Storage <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/c6c8cbed-47ec-451d-bff0-caf593ff52fa?type=domain&height=32&width=32' title='OpenStack Block Storage'>"

    ⏳ Coming Soon...

    ---
    [:octicons-arrow-right-24: Use this brick](block_storage.md)

!!! terraform "PostgreSQL Cloud Platform <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/f93754c3-8cc0-46a0-8ea0-c101318b6d3b?type=domain&height=32&width=32' title='PostgreSQL Cloud Platform'>"

    Manage PostgreSQL Cluster

    ---
    [:octicons-arrow-right-24: Use this brick](pcp.md)

!!! terraform "Oracle Cloud Platform <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/46fcfb68-04e5-4e78-85e6-b6807cc02013?type=domain&height=32&width=32' title='Oracle Cloud Platform'>"

    Manage Oracle Database

    ---
    [:octicons-arrow-right-24: Use this brick](ocp.md)

!!! terraform disabled "RabbitMQ <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/8eff1c48-546a-47bc-a661-5dfd186eb5ad?type=domain&height=32&width=32' title='RabbitMQ'>"

    ⏳ Coming Soon...

    ---
    [:octicons-arrow-right-24: Use this brick](rmq.md)

!!! terraform disabled "Certificates <img class="card-logo" src='https://insights.eu-fr-paris.cloud.socgen/api/internal/logos/fdb67f81-0615-4267-8720-e9194eed611c?type=domain&height=32&width=32' title='Certificates'>"

    ⏳ Coming Soon...

    ---
    [:octicons-arrow-right-24: Use this brick](certificates.md)

</div>