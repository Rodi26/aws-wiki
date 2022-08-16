---
hide:
  - toc
---
# ACID CI Jenkinsfile

Once The [CDP](https://cdp.fr.world.socgen/) Jenkins is provided, we will begin our journey in the CI/CD.

## **CI Pipeline**

Jenkinsfile is a text file that contains the definition of a Jenkins Pipeline and is checked into source control. Consider the following [ACID Jenkinsfile](https://sgithub.fr.world.socgen/dds-itf-acid/ci-base/blob/master/Jenkinsfile) which implements a basic continuous integration pipeline.

??? abstract "The definition of variables"

    ```groovy
    dtr_url = 'dtr_url' // The Docker Trusted Registry URL (Where you store you Docker images)
    dtr_organization = 'team-workspace'  // The repository created through dtr
    ucp_url = 'ucp_url' // The Universal Control Plane URL
    image_name = 'image-name'
    image_tag = '1.0.0'
    version="${image_tag}"
    image_full_name = "${dtr_url}/${dtr_organization}/${image_name}"
    ```

    !!! tip
        **image_tag** can be retrieved via an [automatic version retrieval](auto_version_retrieval.md) and Docker image tagging as mentioned below.

??? abstract "CI Pipeline Skeleton"

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

        stage('Build/Tests'){
          // This is where we build and test the source code
        }

        stage('SonarQube - Analysis'){
          // This is where we scan the source code
        }

        stage('Quality Gate'){   
          // This is where we enforce ratings of the source code
        }

        stage('Checkmarx Scan'){   
          // This is where we execute checkmarx scan
        }

        stage('Build Docker Image'){
          // This is where we build the Docker image
        }

        stage('Push Docker Image'){
          // This is where we push the Docker image
        }
      }
    }
    ```

## **CI Bricks**

<div class="grid-search">
    <span class="grid-search-icon" focusable="false"></span>
    <input class="grid-search-box" type="search" placeholder="Search a brick" aria-label="Search" id="grid-search-box">
</div>

<div class="grid cards" markdown>

!!! git "Code Checkout"

    Clone source code

    ---
    [:octicons-arrow-right-24: Use this brick](checkout.md)

!!! jenkins  "Build / Test"

    Build and Test source code

    ---
    [:octicons-arrow-right-24: Use this brick](build_test.md)

!!! jenkins "Automatic version retrieval"

    Automatically retrieve version from source code

    ---
    [:octicons-arrow-right-24: Use this brick](auto_version_retrieval.md)

!!! sonar "SonarQube - Analysis"

    Scan source code

    ---
    [:octicons-arrow-right-24: Use this brick](sonarqube_analysis.md)

!!! sonar "SonarQube - Quality Gate"

    Enforce ratings of source code

    ---
    [:octicons-arrow-right-24: Use this brick](sonar_quality_gate.md)

!!! checkmarx "Checkmarx"

    Execute checkmarx scan

    ---
    [:octicons-arrow-right-24: Use this brick](checkmarx.md)

!!! docker "Docker Build"

    Build the Docker image

    ---
    [:octicons-arrow-right-24: Use this brick](build_docker_image.md)

!!! docker "Docker Push"

    Push the Docker image

    ---
    [:octicons-arrow-right-24: Use this brick](push_docker_image.md)

!!! jenkins "Trigger CD pipeline from CI job"

    Trigger CD pipeline from CI pipeline

    ---
    [:octicons-arrow-right-24: Use this brick](auto_cd.md)

</div>
