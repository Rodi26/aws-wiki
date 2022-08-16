# How to trigger another pipeline from current job

You have probably encountered the situation that you wanted to run another Jenkins job from the current pipeline.

Objective of this section is to explain how you can automatically run CD job from CI pipeline.
In the CI pipeline, you have to add an additional stage **Run CD pipeline** :

  ```Groovy
  stage('Run CD pipeline'){
    container('docker-container') { 
      echo 'Run CD pipeline!'
      build job: 'Your_CD_JOB_NAME'
    }
  }
  ```

!!! tip
    If the target job needs parameters, you can configure the trigger stage as follows:
    ```Groovy hl_lines="2 3"
      build job: 'Your_CD_JOB_NAME', parameters: [
        string(name: 'PARAM_1', value: "${VAR_1}"),
        string(name: 'PARAM_2', value: "${VAR_2}")
      ]
    ```

As shown below:

  ```Groovy hl_lines="7 8 9 10 11 12"
        stage('Build Docker Image'){
          // This is where we build the Docker image
        }
        stage('Push Docker Image'){
          // This is where we push the Docker image
        }
        stage('Run CD pipeline'){
          container('docker-container') { 
            echo 'Run CD pipeline!'
            build job: 'Your_CD_JOB_NAME'
          }
        }
      }
  ```
