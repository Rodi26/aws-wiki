# Getting Started

![CMF Video](https://CMF.mp4){.video-fluid tag=1}

## ACID Team



Contributors



## Objective
This section is devoted to provide you an overview of ACID services and how to get started with them.

Want a demo and an explanation of ACID ? Mail or ping us through "par-dds-acid" mailing list.

## How ACID Works

ACID is made with lego approach in mind which means:

- Deliver you a working blueprint, as a pull request, that you can use out of the box.
- Explain you the pull request and its bricks.
- You can modify any of the bricks of the lego (CI bricks or CD bricks, blueprints bricks).
- ACID does not provide a `DAY TWO*` service, every team is a maintainer of their pipelines.
- Color of bricks, aka configuration, are non blueprint breaker.

!!! info
    To emphasize : `DAY TWO` means that you have to maintain your modifications once you received the pipelines. **ACID IS NOT RESPONSIBLE OF THEM !**

## Migration

This service concerns all CFT applications that needs to migrate either from [Openshift](https://documentation.cloud.socgen/private/products/application/openshift/index.html) to [Docker EE](https://documentation.cloud.socgen/private/products/compute/orchestratedcontainer/index.html) or from [Edge](#) to [OCS](https://documentation.cloud.socgen/private/products/compute/ocs/concepts/product_description.html).

### OpenShift To Docker EE

This section presents the steps to go through in order to migrate form Openshift to Docker EE and Build your CICD & Kubernetes blueprints using ACID.

Before going further, make sure you have all the needed [requirements](acid/migrations/prerequisite.md) to follow these steps:

#### 🔔 Get The Blueprints (PR)

The blueprints are sent as [ACID PR](https://sgithub.fr.world.socgen/dds-itf-acid/acid-base/tree/main/acid/dev) provided by our team. it contains the pipelines and kubernetes configuration used for the build/deploy of the applications.

#### 🐆 Prepare required Credentials

For this section we will need to generate the following credentials:

- [Get Kubernetes Cluster credentials](acid/credentials/ucp.md).
- [Get Sonar Server Token](acid/credentials/sonar.md).
- [Get Git Personal Access Token](acid/credentials/pat.md).
- [Get Nexus Token](acid/credentials/nexus.md).

Then set these credentials on jenkins side:

- [Set Jenkins ucp crednetial](acid/credentials/jenkins_ucp.md).
- [Set Jenkins sonar](acid/credentials/jenkins_sonar.md).
- [Set Jenkins kube](acid/credentials/jenkins_kube.md).

#### 🐆 Create CI (Jenkins job)

- Create CI and Jenkins jobs as described in the [CI blueprint section](acid/ci/ci.md).
- Configure your CI pipeline using [Jenkins-casc](acid/extras/jcasc.md) (optional).
- Configure the pipeline's trigger to automatically run CD job every:
    - [Push event](acid/extras/auto_ci.md).
    - [Pull Request](acid/extras/pr_ci.md).

!!! tip
    You can use both of these events to trigger your pipeline at the same time.

#### 🐆 Create CD (Jenkins job)

- Create CD and the Jenkins job as described in the [CD blueprint section](acid/cd/cd.md).
- Configure your CD pipeline using [Jenkins-casc](acid/extras/jcasc.md) (optional).
- Configure the pipeline's [trigger](acid/ci/auto_cd.md) to automatically run CD job from CI pipeline (optional).

#### 🐆 Build your own certificates

To build your own certificates, follow this [tutorial](acid/extras/certificate.md).


#### 👁️‍🗨️ Deployment / Dev2Prod

Just follow this [link](acid/extras/dev2prod.md) to learn how to promote your application for the production environment.


### Edge To Ocs

This section presents the steps to go through in order to migrate form Edge to OCS and build your Terraform and Ansible blueprints.

At the moment, we are not yet on a Pull Request as a Service but we provide :

- A [documentation](acid/ocs/ocs.md) to create an OCS Vm using DIN.
- An example to [deploy a white application](acid/ocs/white_app.md) using Terraform and Ansible.
- A template to fork and steps to use it in order to [deploy your own application](acid/ocs/own_app.md) using Terraform and Ansible.


## Onboarding

This section presents the steps to go through in order to create your CICD & Kubernetes blueprints using ACID for a standalone applications.

!!! note
    A standalone application does not have a CICD pipeline implementation, it only provide the source code of the product.

At the moment, this is a work in progress.
