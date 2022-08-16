---
hide:
  - toc
---
# Deploy

1. Modify your CD JenkinsFile as follows

    ```Groovy
    stage('Deploy') {
      container('kubectl') {
        withCredentials([file(credentialsId: 'kube-config', variable: 'KUBECONFIG')]){
          echo 'Applying K8s manifests...'
          sh """
            # Deploy all K8S resources
            kubectl apply -n "ns-${workspace}" -f ./acid/dev/K8S/cm.yaml
            # Set image tag in deployment.yaml
            sed -i "s/IMAGE_TAG/${image_tag}/g" ./acid/dev/K8S/deployment.yaml
            kubectl apply -n "ns-${workspace}" -f ./acid/dev/K8S/deployment.yaml
            kubectl apply -n "ns-${workspace}" -f ./acid/dev/K8S/svc.yaml
            kubectl apply -n "ns-${workspace}" -f ./acid/dev/K8S/ingress.yaml
          """
        }
      }
    }
    ```

    !!! tip
        Wait for pods to start: add this line to make sure pods are up and running.

        ```Groovy hl_lines="8"
        stage('Deploy') {
          container('kubectl') {
            withCredentials([file(credentialsId: 'kube-config', variable: 'KUBECONFIG')]){
              echo 'Applying K8s manifests...'
              sh """
                ...
                # Wait for pods to start and return error if pod is stuck Pending
                kubectl rollout status -n "ns-${workspace}" --timeout 2m deployment/<DEPLOYMENT-NAME>
              """
            }
          }
        }
        ```

2. Use IMAGE_TAG flag in your [deployment.yaml](https://sgithub.fr.world.socgen/dds-itf-acid/acid-base/blob/main/acid/dev/K8S/deployment.yaml)

    ```yaml
    ...
    spec:
      containers:
        - image: kube9-dtr-dev.fr.world.socgen/byo-ad016-dev-acid/image-name-dev:IMAGE_TAG
    ...
    ```

    If you want to manage your image tag dynamically, follow this example:

3. Add this to your CD casc file [jenkins_casc](../extras/jcasc.md)

    ```groovy
    jobs:
      - script: >
          folder('ACID')
      - script: >
          pipelineJob('ACID/<SERVICE-NAME>-CD') {
            parameters {
              stringParam("image_tag", "", "The image tag to be used for deployment") # Parameters needed for the CD pipeline
            }
            definition {
              cpsScm {
                ...
              }
            }
          }
    ```
