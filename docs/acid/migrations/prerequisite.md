# Migration OpenShift - Docker EE Prerequisite

## Docker EE K8S requirements:​
* Create AD Group (if you don't have) and add application team members​ and ACID team.​
* Create a service account (if you don't have) and add it to the AD Group.​
* Create a ​[K8S namespace](https://documentation.cloud.socgen/private/products/compute/orchestratedcontainer/howtos/onboard_cluster_v3.html).
* Setup your [K8S environment](https://sgithub.fr.world.socgen/gts-professional-services/l1-setup-local-work-environment)​.

## OpenShift requirements: ​
* Give access for ACID Team to namespace OpenShift.​​
* Give access for ACID Team to Jenkins SOFA.

## Build requirements:​​
* Create a Docker repository.​
* Create a [CDP Jenkins](https://itbox-jira.fr.world.socgen/jira/projects/COCPLTF/summary).
* Give access for ACID Team to sgithub repositories (if not public).

## Operation requirements:​
* Provide the architecture diagram of your application.
* Provide flow matrix​ (if it exists).
* Define a SPoC in Application Team to interact with ACID Team.

!!! note
    ACID AD Group: GLS-SGCIB-FR-PRD-ACID_APP_USR