---
hide:
  - toc
---
# SonarQube - Analysis

This stage is optional but to configure it make sure to have the credential part covered [Set jenkins SonarQube Token](../credentials/jenkins_sonar.md).

The Sonar `projectKey` and other properties should be configured in a `sonar-project.properties` file at the root of your project (see [SonarScanner documentation](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)).

=== ":fontawesome-brands-java: Java"

    ```Groovy
    podTemplate(
      inheritFrom: 'jenkins-inbound-agent',
      containers: [
        containerTemplate(name: 'sonar-container', image: 'kube9-dtr-dev.fr.world.socgen/byo-ad016-dev-acid/maven-builder:3.8.2-jdk-1.8.0_131', alwaysPullImage: false, ttyEnabled: true, command: 'cat')
      ]
    ){
      node(POD_LABEL) {
        stage('SonarQube - Analysis') {
          withSonarQubeEnv('SONAR_SOFA') {
            container('sonar-container') {
              echo 'running sonar-scanner...'
              sh """
              mvn -B -f pom.xml -P sonar -Dsonar.projectKey=my_project_key clean verify
              """
            }
          }
        }
      }
    }
    ```

=== ":fontawesome-brands-js: JavaScript"

    ```Groovy
    podTemplate(
      inheritFrom: 'jenkins-inbound-agent',
      containers: [
        containerTemplate(name: 'sonar-container', image: 'kube9-dtr-dev.fr.world.socgen/byo-ad016-dev-acid/sonar-scanner:3.3.0.1492', alwaysPullImage: false, ttyEnabled: true, command: 'cat')
      ]
    ){
      node(POD_LABEL) {
        stage('SonarQube - Analysis') {
          withSonarQubeEnv('SONAR_SOFA') {
            container('sonar-container') {
              echo 'running sonar-scanner...'
              sh """
              sonar-scanner \
                -Dsonar.projectKey=my_project_key \
                -Dsonar.sources=.
              """
            }
          }
        }
      }
    }
    ```
=== ":material-dot-net: DotNet"

    ```Groovy
    podTemplate(
      inheritFrom: 'jenkins-inbound-agent',
      containers: [
        containerTemplate(name: 'dotnet-container', image: 'kube9-dtr-dev.fr.world.socgen/byo-ad016-dev-acid/dotnet-sdk:3.1.417', alwaysPullImage: false, ttyEnabled: true, command: 'cat')
      ]
    ){
      node(POD_LABEL) {
        stage('SonarQube - Analysis') {
          withSonarQubeEnv('SONAR_SOFA') {
            container('sonar-container') {
              echo 'running sonar-scanner...'
              sh """
              dotnet tool install --global dotnet-sonarscanner
              dotnet sonarscanner begin /k:"project_key" /d:sonar.host.url="https://cdp-sonar.fr.world.socgen/sonar"  /d:sonar.login=${TOKEN}
              dotnet build
              dotnet sonarscanner end /d:sonar.login=${TOKEN}
              """
            }
          }
        }
      }
    }
    ```