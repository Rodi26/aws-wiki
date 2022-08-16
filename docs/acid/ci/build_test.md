---
hide:
  - toc
---
# Build / Test

The second step will be to manage everything related to your source code ```build/test``` chain.

It depends on the type of your application.

For example:

=== ":fontawesome-brands-java: Java"

    ```Groovy
    podTemplate(
      inheritFrom: 'jenkins-inbound-agent',
      containers: [
        containerTemplate(name: 'java-container', image: 'kube9-dtr-dev.fr.world.socgen/byo-ad016-dev-acid/maven-builder:3.8.2-jdk-1.8.0_131', alwaysPullImage: false, ttyEnabled: true, command: 'cat')
      ]
    ){
      node(POD_LABEL) {
        stage('Build/Tests') {
          container('java-container') {
            sh """
            mvn -B -f <app_name>/pom.xml -s $HOME/settings.xml clean install
            """
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
        containerTemplate(name: 'node-container', image: 'kube9-dtr-dev.fr.world.socgen/byo-ad016-dev-acid/node-builder:12.22.9', alwaysPullImage: false, ttyEnabled: true, command: 'cat')
      ]
    ){
      node(POD_LABEL) {
        stage('Build/Tests') {
          container('node-container') {
            sh """
            npm config set registry "https://sofa.dns20.socgen/nexus/repository/npm-public/" && npm config set strict-ssl false
            npm install
            npm run lint --if-present
            npm run test:ci --if-present
            npm run build --if-present
            """
          }
        }
      }
    }
    ```

=== ":fontawesome-brands-python: Python"

    ```Groovy
    podTemplate(
      inheritFrom: 'jenkins-inbound-agent',
      containers: [
        containerTemplate(name: 'python-container', image: 'kube9-dtr-dev.fr.world.socgen/byo-ad016-dev-acid/python-builder:3.10.1', alwaysPullImage: false, ttyEnabled: true, command: 'cat')
      ]
    ){
      node(POD_LABEL) {
        stage('Build/Tests') {
          container('python-container') {
            echo 'running python test...'
            sh """
            pip install --upgrade pip && pip install setuptools wheel
            pip install -e ./
            FLASK_CONFIG=dev API_LOG_MONITOR_APP_PATH=\$(pwd) python -m pytest
            """
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
        stage('Build/Tests') {
          container('dotnet-container') {
            echo 'running python test...'
            sh """
            dotnet restore --configfile nuget.config
            dotnet publish -c Release -o out
            """
          }
        }
      }
    }
    ```
    ??? abstract "Example Nuget configuration"
  
        ```groovy
          <?xml version="1.0" encoding="utf-8"?>
          <configuration>
            <packageSources>
              <add key="nuget.org" value="https://itbox-nexus-arc.fr.world.socgen/nexus-arc/service/local/nuget/ext-public-nuget-proxy-releases" />
              <add key="nuget.org artifactory-proxy"  value="https://cdp-artifactory.fr.world.socgen/artifactory/api/nuget/ext-nuget-proxy-release" />
              <add key="SG|API releases" value="https://cdp-artifactory.fr.world.socgen/artifactory/api/nuget/nuget-local-apibank-releases"/>
            </packageSources>
          </configuration>
        ```

    !!! tip
        **NuGet** NuGet behavior is controlled by settings in different NuGet.Config or nuget.config files.
        Add a nuget.config file in the root of your project repository. This is considered a best practice as it promotes repeatability and ensures that different users have the same NuGet configuration. You may need to configure clear elements to ensure no user or machine specific configuration is applied.
