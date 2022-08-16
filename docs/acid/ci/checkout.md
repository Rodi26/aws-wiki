---
hide:
  - toc
---
# Code Checkout

The first step will be to checkout the source code for the project.
Since the Jenkinsfile is being pulled directly from source control via the [jenkins-casc](../extras/jcasc.md), pipeline provides a quick and easy way to access the right revision of the source code.

```Groovy
stage('Checkout scm') {
    checkout scm
}
```
!!! info
    The ```checkout``` step will checkout code from source control; ```scm``` is a special variable which instructs the ```checkout``` step to clone the specific revision which triggered this Pipeline run.

!!! important
    To checkout code from a private repository, you need to:

    1. Setup properly sgithub credentials for the service account in jenkins refering to [Git Credentials](../credentials/pat.md)

    2. Update git configuration of the concerned job/pipeline with the appropriate credentials in jenkins-casc.yaml:
    ```groovy hl_lines="7"
    - script: >
        pipelineJob('<FOLDER-NAME>/<SERVICE-NAME>-CD') {
          ...
            git {
              remote {
                  url '<FOLDER-NAME>'
                  credentials '<SERVICE-ACCOUNT-PAT-CREDENTIAL-ID>'
              }
            }
          ...
        }
    ```
