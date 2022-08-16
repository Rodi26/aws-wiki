---
hide:
  - toc
---

{% raw %}

| Name                                    | Command                                                                            |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| Run curl test temporarily               | `kubectl run --generator=run-pod/v1 --rm mytest --image=yauritux/busybox-curl -it` |
| Run nginx deployment with 2 replicas    | `kubectl run my-nginx --image=nginx --replicas=2 --port=80`                        |
| Set namespace preference                | `kubectl config set-context <context_name> --namespace=<ns_name>`                  |
| List pods with nodes info               | `kubectl get pod -o wide`                                                          |
| Get resources with json output          | `kubectl get pods --all-namespaces -o json`                                        |
| Validate yaml file with dry run         | `kubectl create --dry-run --validate -f pod-dummy.yaml`                            |
| Explain resource                        | `kubectl explain pods, kubectl explain svc`                                        |
| Watch pods                              | `kubectl get pods -n wordpress --watch`                                            |
| Open a bash terminal in a pod           | `kubectl exec -it storage sh`                                                      |
| Kubectl apply a folder of yaml files    | `kubectl apply -R -f .`                                                            |
| Get services sorted by name             | `kubectl get services –sort-by=.metadata.name`                                     |
| Get resource usage for a given pod      | `kubectl top <podname> --containers`                                               |
| Delete pod                              | `kubectl delete pod/<pod-name> -n <my-namespace>`                                  |
| Delete pod by force                     | `kubectl delete pod/<pod-name> --grace-period=0 --force`                           |
| Delete pods by labels                   | `kubectl delete pod -l env=test`                                                   |
| Delete deployments by labels            | `kubectl delete deployment -l app=wordpress`                                       |
| Delete all resources filtered by labels | `kubectl delete pods,services -l name=myLabel`                                     |
| List all pods                           | `kubectl get pods`                                                                 |
| List pods with more info                | `kubectl get pod -o wide, kubectl get pod/<pod-name> -o yaml`                      |
| Get Pod initContainer status            | `kubectl get pod --template '{{.status.initContainerStatuses}}' <pod-name>`        |
| Scale out                               | `kubectl scale --replicas=3 deployment/nginx-app`                                  |
| online rolling upgrade                  | `kubectl rollout app-v1 app-v2 --image=img:v2`                                     |
| Roll backup                             | `kubectl rollout app-v1 app-v2 --rollback`                                         |
| List rollout                            | `kubectl get rs`                                                                   |
| Rollback to previous version            | `kubectl rollout undo deployment/nginx-deployment`                                 |
| List all services                       | `kubectl get services`                                                             |
| List service endpoints                  | `kubectl get endpoints`                                                            |
| Get service detail                      | `kubectl get service nginx-service -o yaml`                                        |
| List secrets                            | `kubectl get secrets --all-namespaces`                                             |
| Get secret                              | `kubectl get secret denny-cluster-kubeconfig`                                      |
| Generate secret                         | `echo -n 'mypasswd', then redirect to base64 --decode`                             |
| Get a specific field of a secret        | `kubectl get secret denny-cluster-kubeconfig -o jsonpath=”{.data.value}”`          |
| Create secret from cfg file             | `kubectl create secret generic db-user-pass –from-file=./username.txt`             |
| List Events sorted by timestamp         | `kubectl get events –sort-by=.metadata.creationTimestamp`                          |

{% endraw %}
