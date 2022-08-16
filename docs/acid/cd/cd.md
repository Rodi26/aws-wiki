---
hide:
  - toc
---
# ACID CD Jenkinsfile

## **CD Pipeline**

Jenkinsfile is a text file that contains the definition of a Jenkins Pipeline and is checked into source control. Consider the following [ACID Jenkinsfile](https://sgithub.fr.world.socgen/dds-itf-acid/acid-base/blob/main/acid/dev/CD/Jenkinsfile) which implements a basic continuous deployment pipeline.

First, the credentials for the CD part must be set correctly [kube](../credentials/jenkins_kube.md)

??? abstract "CD Pipeline Skeleton"

    ```groovy
    podTemplate(
      inheritFrom: 'jenkins-inbound-agent',
      containers: [
        // The containers you want to launch inside this pod.
        // You will want to add containers with the tool chains required to build your application.
      ]
    ){
      node(POD_LABEL) {
        stage('Checkout scm'){
          // This is where we clone the source code
        }

        stage('Vault'){
          // Vault integration section
        }

        stage('Deploy on kubernetes'){
          // Deploy on kubernetes namespace
        }
      }
    }
    ```

## **CD Bricks**

<div class="grid-search">
    <span class="grid-search-icon" focusable="false"></span>
    <input class="grid-search-box" type="search" placeholder="Search a brick" aria-label="Search" id="grid-search-box">
</div>

<div class="grid cards" markdown>

!!! git "Code Checkout"

    Clone source code

    ---
    [:octicons-arrow-right-24: Use this brick](../ci/checkout.md)

!!! jenkins  "Deploy"

    Deploy application

    ---
    [:octicons-arrow-right-24: Use this brick](deploy.md)

!!! vault "Vault Integration"

    Setup Vault integration

    ---
    [:octicons-arrow-right-24: Use this brick](vault.md)

</div>