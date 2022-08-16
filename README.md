ACID Wiki - In progress 
=============================

🎌 - Read here  - https://wiki-example.com

🎫 Contribute 

- Clone the forked repo.

- Start the app locally 

```
$serve.sh 
```
- Use the URL http://localhost:8000 to view the documentation.

- Update the documentation as per the folder structure.

- Test the build locally
```
$cd guide
$mkdocs build --clean
```
- Push the changes to your local sgithub repo.
- Raise the PR from your local git-hub repo to master branch of Master repo..

NOTE 

- The deployment of wiki will be based on the PR acceptance.
- Once the PR is accepted ,the build will complete and push to object storage.
- Incase of build error ,check the Jenkins job or local build and manage.
