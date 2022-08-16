---
hide:
  - toc
---
# Build Docker Image

Typically this stage of the pipeline will create your Docker image:
    
  ```Groovy
  podTemplate(
    inheritFrom: 'jenkins-inbound-agent',
    containers: [
      containerTemplate(name: 'docker-container', image: 'kube-dtr-dev.fr.world.socgen/cdl-94999-prd-k8s/docker-client:docker-19.03-kube-1.16', alwaysPullImage: false, ttyEnabled: true, command: 'cat')
    ]
  ){
    node(POD_LABEL) {
      stage('Build Docker Image'){
        container('docker-container') {
          withEnv(["DOCKER_HOST=tcp://kube9-dev.fr.world.socgen:443", "DOCKER_TLS_VERIFY=1"]){
            withCredentials([[$class: 'DockerServerCredentialsBinding', credentialsId: "kube9-dev-acid-bundle", variable: 'DOCKER_CERT_PATH']]){
              sh """
              docker build -t ${image_full_name} --build-arg VERSION=${version} -f acid/Docker/Dockerfile .
              """
            }
          }
        }
      }
    }
  }
  ```

!!! tip
    Replace :

      - **DOCKER_HOST** with your Docker EE platform
      - **credentialsId** (created in this step [set Jenkins ucp credentials](../credentials/jenkins_ucp.md))
