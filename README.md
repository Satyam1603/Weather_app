# Weather_app
Simple weather app created using html css and js
to deploy this app using k8s ,docker and argocd follow the steps

==================================================================================================================
GIT COMMANDS
git clone 
git add .
git commit -m ""
git push
==================================================================================================================
now build the docker filr (Dockerfile) and run command 
docker build -t weather_app:latest
docker tag weather_app:latest bsatyam123/weather_app:latest
docker push username/reponame:latest
===================================================================================================================
MINIKUBE
minikube status
minikube start
minikube create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl get pods -n argocd
kubectl get svc -n argocd
kubectl port-forward svc/argocd-server -n argocd 8080:443
https://localhost:8080 (copy this in browser)

check the manifest file(deployment , service)  for our app
kubectl apply -f <file-or-directory>
kubectl get pods 
kubectl get logs <pod name>
kubectl get svc
kubectl port-forward svc/<service-name> <local-port>:<service-port> -n <namespace>
====================================================================================================================
TO CONNECT ARGOCD WITH APPLN
argocd app create <APP_NAME> \
  --repo <REPO_URL> \
  --path <APP_PATH_IN_REPO> \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace <NAMESPACE>
 ------------------OR------------------------------------------
 go to argocd ui 
 new app
 SOURCE
   application name 
   project name
   source git url with .git extension
   in path give the folder name where manifest files are present
 Destination
  cluster url -> example -> https://kubernetes.default.svc
  Namespace : default
  click on create 
  =======================================================================================================================
 
<img width="1258" height="592" alt="image" src="https://github.com/user-attachments/assets/bf6fd8a0-eb1f-4dbb-bdae-07addcb982fa" />
<img width="1199" height="567" alt="image" src="https://github.com/user-attachments/assets/b7aea6c9-57c7-472a-bdda-4ddcd9494697" />

