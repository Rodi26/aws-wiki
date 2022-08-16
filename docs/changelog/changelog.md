# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [2.4] - 2022-08-01
### Added
- SearchBar for Bricks List.
- **Terraform Bricks** section:
    - [x] [OS Factory](https://acid-wiki.fr.world.socgen/2.4/acid/terraform/osfactory.html)
    - [x] [OCS Virtual Server](https://acid-wiki.fr.world.socgen/2.4/acid/terraform/ocs_instances.html)
    - [x] [OCS Keypair](https://acid-wiki.fr.world.socgen/2.4/acid/terraform/ocs_keypair.html)
    - [x] [OCS Server Group](https://acid-wiki.fr.world.socgen/2.4/acid/terraform/ocs_server_group.html)
    - [ ] [Security Group]()
    - [ ] [Service Load Balancer]()
    - [x] [Traffic Manager](https://acid-wiki.fr.world.socgen/2.4/acid/terraform/traffic_manager.html)
    - [x] [File Storage](https://acid-wiki.fr.world.socgen/2.4/acid/terraform/file_storage.html)
    - [ ] [Object Storage]()
    - [ ] [Object Storage Access Key]()
    - [ ] [OpenStack Block Storage]()
    - [x] [PostgreSQL Cloud Platform](https://acid-wiki.fr.world.socgen/2.4/acid/terraform/pcp.html)
    - [x] [Oracle Cloud Platform](https://acid-wiki.fr.world.socgen/2.4/acid/terraform/ocp.html)
    - [ ] [RabbitMQ]()
    - [ ] [Certificates]()
- **Ansible Bricks** section:
    - [ ] [Java]()
    - [ ] [Node]()
    - [ ] [Python]()
- New icons in the CMF report:
    - [x] '🎯' = 'Comitted': Application commited to work with CMF.
    - [x] '📅' = 'Planned': Application planned to be migrated/onboarded.
    - [x] '❌' = 'Descoped': Application declined the use of CMF.
- Extra logo capability for cards.
### Changed
- "Code Checkout" Brick: add tip to clone private repositories.
- "Checkmarx" Brick: explain how to setup properly <PROJECT-NAME>.
- "Trigger CD from CI" Brick: add tip for triggering a job with parameters.
- "Vault" Brick: Fix secret template to avoid security issue in Jenkins logs.
- "Contacts" page: add contacts table for SGCP service providers.
- Datatables capabilities only on specefic tables (search, pagination...).
- New icons for **Contribute** & **FAQ** sections.
- Remove Topics page from **FAQ** section.
- Some typos fix.

## [2.3] - 2022-07-07
### Added
- Video capabilities in the Wiki
- CMF Video in Getting Started page
### Changed
- Update Sonar URL in credentials configuration.
- Fix some typos.

## [2.2] - 2022-06-15
### Added
- CMF Report in Migrations Section.
### Changed
- Upgrade MkDocs Material to version 8.3.5 and related dependencies.

## [2.1] - 2022-06-03
### Added
- **Hands-on** section:
    - [x] [How to scale your application Horizontally in an Orchestrated Containers Service](https://sgithub.fr.world.socgen/dds-itf-acid/hands-on-hpa)
    - [x] [Deploy your application on a VCS VM using Terraform and Ansible with ACID](https://sgithub.fr.world.socgen/dds-itf-acid/hands-on-acid-vcs)
    - [x] [Deploy your application on an OCS VM using Terraform and Ansible with ACID](https://sgithub.fr.world.socgen/dds-itf-acid/hands-on-acid-ocs)
- ASP.NET Core CI Bricks:
    - [x] Build / Test.
    - [x] SonarQube - Analysis.
- Dev2Prod using Parameterized Remote Trigger.
- Jenkins Configuration As Code throught API.
- Chart & Graphs with [Chart.js](https://www.chartjs.org/) integration.
### Changed
- A better Image presentation with zoom feature.
- Wiki Tables improvements based on [DataTables](https://datatables.net/):
    - [x] Pagination
    - [x] Search Bar
    - [x] Sort
    - [x] New Compact Design

## [2.0] - 2022-04-20
### Added
- **Extras** section:
    - [Jenkins Configuration as Code](https://acid-wiki.fr.world.socgen/2.0/acid/extras/jcasc.html).
    - [Creating Jenkins job](https://acid-wiki.fr.world.socgen/2.0/acid/extras/job.html).
    - [Triggering a Jenkins Job](https://acid-wiki.fr.world.socgen/2.0/acid/extras/auto_ci.html).
    - [Run a Jenkins Job on Pull Request](https://acid-wiki.fr.world.socgen/2.0/acid/extras/pr_ci.html).
    - [Build certificate](https://acid-wiki.fr.world.socgen/2.0/acid/extras/certificate.html).
    - [Dev2Prod](https://acid-wiki.fr.world.socgen/2.0/acid/extras/dev2prod.html).
- **Docker images** :
    - [x] ASP.NET Core Runtime
    - [x] ASP.NET Core SDK
    - [x] Checkmarx scanner
    - [x] Fluentd
    - [x] Apache
    - [x] Apache Safe Agent
    - [x] Redis.
- **Wiki Internal** :
    - Integrate [Matomo](https://matomo.org/).
### Changed
- Catalog view for CI & Rename **CI Blueprints** section to [**CI Bricks**](https://acid-wiki.fr.world.socgen/2.0/acid/ci/ci.html).
- Catalog view for CD & Rename **CD Blueprints** section to [**CD Bricks**](https://acid-wiki.fr.world.socgen/2.0/acid/cd/cd.html).
- Moved configuration related topics to the new **Extras** section.
- Split **Docker** section into two separate tables:
    - [Docker images](https://acid-wiki.fr.world.socgen/2.0/acid/docker/docker.html).
    - [CI Docker images](https://acid-wiki.fr.world.socgen/2.0/acid/docker/docker_jenkins.html).
- Enhanced K8S deployment stage.
- Some typos Fix.

## [1.2] - 2022-03-28
### Added
- **Credentials** :
    - [Set NEXUS in Jenkins](https://acid-wiki.fr.world.socgen/1.2/acid/credentials/jenkins_nexus.html)
### Changed
- Update Sonar credentials setup page [Set Jenkins Sonar Credentials](https://acid-wiki.fr.world.socgen/1.2/acid/credentials/jenkins_sonar.html).
- Some typos Fix.
- Upgrade MkDocs to v1.3.0 & MkDocs Material to version 8.2.8 and related dependencies. 
- Several visual improvements:
    - [x] [Admonitions](https://squidfunk.github.io/mkdocs-material/reference/admonitions/) also known as call-outs to handle notes, informations, quotes...
    - [x] Add Back to Top button.
    - [x] Theme fonts: Rubik & Rubik Mono

## [1.1] - 2022-02-22
### Added
- **Credentials** Restructure section and add more detailed pages information on the setup of:
    - [Set UCP Bundle for CI/CD in Jenkins](https://acid-wiki.fr.world.socgen/1.1/acid/credentials/jenkins_ucp.html)
    - [Set kubernetes credentials in Jenkins](https://acid-wiki.fr.world.socgen/1.1/acid/credentials/jenkins_kube.html)
    - [Set SONAR in Jenkins](https://acid-wiki.fr.world.socgen/1.1/acid/credentials/jenkins_sonar.html)
    - [Set GIT token in Jenkins](https://acid-wiki.fr.world.socgen/1.1/acid/credentials/jenkins_git.html)
### Changed
- More links between interconnected pages.
- Add better description to technical terms and concepts.

## [1.0] - 2022-02-08
### Added
- Version navigation.
- [**Getting Started**](https://acid-wiki.fr.world.socgen/1.0/index.html) section composed of ACID related informations regarding it's structure, inner workings and technicals instructions.
- [**Changelog**](#) section to keep track of the wiki evolution.
- **Credentials** section with information on the retrival of:
    - [UCP Bundles](https://acid-wiki.fr.world.socgen/1.0/acid/credentials/ucp.html)
    - [Sonar Tokens](https://acid-wiki.fr.world.socgen/1.0/acid/credentials/sonar.html)
    - [Git Personal Access Tokens](https://acid-wiki.fr.world.socgen/1.0/acid/credentials/pat.html)
    - [Nexus Access](https://acid-wiki.fr.world.socgen/1.0/acid/credentials/nexus.html)
- **CI Blueprints** section with informations on:
    - [ACID CI Jenkinsfile](https://acid-wiki.fr.world.socgen/1.0/acid/ci/ci.html)
    - [Jenkins CASC](https://acid-wiki.fr.world.socgen/1.0/acid/ci/jcasc.html)
    - [Trigger of Jenkins Jobs](https://acid-wiki.fr.world.socgen/1.0/acid/ci/auto_ci.html)
    - [Run a Jenkins Job on Pull Request](https://acid-wiki.fr.world.socgen/1.0/acid/ci/pr_ci.html)
- **CI Blueprints** section with informations on:
    - [How to use ACID CD Jenkinsfile](https://acid-wiki.fr.world.socgen/1.0/acid/cd/cd.html)
    - [Vault integration](https://acid-wiki.fr.world.socgen/1.0/acid/cd/vault.html)
    - [How to trigger CD pipeline from CI job](https://acid-wiki.fr.world.socgen/1.0/acid/cd/auto_cd.html)
    - [Build certificate](https://acid-wiki.fr.world.socgen/1.0/acid/cd/certificate.html)
    - [Dev2Prod](https://acid-wiki.fr.world.socgen/1.0/acid/cd/dev2prod.html)
- **Docker** section with informations on [ACID base Docker images](https://acid-wiki.fr.world.socgen/1.0/acid/docker/docker.html).
- **K8S Blueprints** section with informations on [Secret Managment on UCP](https://acid-wiki.fr.world.socgen/1.0/acid/k8s/add_secrets.html).
- **OCS Blueprints** section with informations on:
    - [Create an OCS VM using DIN](https://acid-wiki.fr.world.socgen/1.0/acid/ocs/ocs.html)
    - [Deploy a white application using terraform and ansible](https://acid-wiki.fr.world.socgen/1.0/acid/ocs/white_app.html)
    - [Deploy your own application using terraform and ansible](https://acid-wiki.fr.world.socgen/1.0/acid/ocs/own_app.html)
- **Onboarding** section with informations on:
    - [Docker EE Prerequisite](https://acid-wiki.fr.world.socgen/1.0/acid/onboardings/caas_prerequisite.html)
    - Docker EE Onboarding [Report](https://acid-wiki.fr.world.socgen/1.0/acid/onboardings/report.html) and Backlog
- **Migration** section with informations on:
    - [Migration OpenShift - Docker EE Prerequisite](https://acid-wiki.fr.world.socgen/1.0/acid/migrations/prerequisite.html)
    - [Migration report](https://acid-wiki.fr.world.socgen/1.0/acid/migrations/report.html)
    - [Openshift 2 Docker EE](https://acid-wiki.fr.world.socgen/1.0/acid/migrations/o2d.html)
- **Tools** section with informations on [K8S ide](https://acid-wiki.fr.world.socgen/1.0/acid/tools/ide.html) (Lens).
- **Contacts** section with informations on [how to contact](https://acid-wiki.fr.world.socgen/1.0/acid/contacts/contacts.html) the ACID team.
- **Contribute** section with informations on:
    - [Collaboration](https://acid-wiki.fr.world.socgen/1.0/acid/contribute/collaboration.html)
    - Internal [Resources](https://acid-wiki.fr.world.socgen/1.0/acid/contribute/ressources.html) of the Wiki
    - [Guidelines](https://acid-wiki.fr.world.socgen/1.0/acid/contribute/guidelines.html) regarding the Wiki management
- **FAQ** section with informations on:
    - [K8S troubleshooting](https://acid-wiki.fr.world.socgen/1.0/acid/faq/troubleshooting.html)
    - [Kubectl commands](https://acid-wiki.fr.world.socgen/1.0/acid/faq/commands.html)
    - [Topics](https://acid-wiki.fr.world.socgen/1.0/acid/faq/topics.html)
- Automatic reporting CSVs retrivals on s3 Bucket.
- Automatic retrival of CSVs last update date.
- Light and dark theme.
