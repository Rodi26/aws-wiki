---
hide:
  - toc
---
# Automatic version retrieval

These stages will be in charge of extracting application version from:

- ```package.json``` for JavaScript applications (JS, NodeJS, Angular, ReactJS...).
- ```pom.xml``` for Java applications.

=== ":fontawesome-brands-java: Java"

    ```Groovy
    stage('Get Image Tag') {
      pomXML = readMavenPom file: 'pom.xml'
      version = pomXML.version.split("-")[0]
      image_tag = "${version}"
    }
    ```

=== ":fontawesome-brands-js: JavaScript"

    ```Groovy
    stage('Get Image Tag') {
      packageJSON = readJSON file: 'package.json'
      version = packageJSON.version
      image_tag = "${version}"
    }
    ```

For docker image tagging, it is up to you to choose what to add besides the extracted version:

  - Timestamp
  - CommitHash
  - Jenkins Build Job number

!!! example
    In this example, we add the build jenkins job number to the extracted version:

    ```Groovy
    image_tag = "${env.BUILD_ID}-${version}"
    ```