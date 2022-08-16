---
hide:
  - toc
---
## Set Jenkins Git Credentials

1. First, let's be sure that git token has been generated [Get GIT Personal Access Token](pat.md).

2. Then we need to add new credential, so navigate to: **Manage Jenkins >> Manage Credentials >>** Under **Stores scoped to Jenkins**, select (**global**) in the Domains column **>> Select Add Credentials** in the left panel:

    ![](../../assets/images/docs/credentials/scoped_jenkins.png){.img-fluid tag=1}

3. Finally, we configure the credential as follow :

    * Select **Username with password** as a credential type.
    * **Username** is the service account name.
    * Add the **Personal Access Token** in the password field.
