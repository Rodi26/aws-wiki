---
hide:
  - toc
---
# SonarQube - Quality Gate

In this stage we validate the output of Sonar Analysis.

!!! important
    The token generated in [Set jenkins SonarQube Token](../credentials/jenkins_sonar.md) will be used by `waitForQualityGate` commands in the stage of `Quality Gate`.

    Be sure that the token have all needed permissions selected under project --> settings --> permission [ Browse, See Source Code, Execute analysis ]

```Groovy
podTemplate(
  inheritFrom: 'jenkins-inbound-agent',
  containers: [
    containerTemplate(name: 'sonar-container', image: 'kube9-dtr-dev.fr.world.socgen/byo-ad016-dev-acid/maven-builder:3.8.2-jdk-1.8.0_131', alwaysPullImage: false, ttyEnabled: true, command: 'cat')
  ]
){
  node(POD_LABEL) {
    stage('Quality Gate') {
      container('sonar-container') {
        echo 'waiting quality gate report...'
        sleep(10)
        timeout(time: 2, unit: 'MINUTES') {
          def qg = waitForQualityGate()
          if (qg.status != 'OK') {
          error "Pipeline aborted due to quality gate failure: ${qg.status}"
          }
        }
      }
    }
  }
}
```
