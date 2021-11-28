
#stop container
docker rm -f "$(docker ps | grep "home-dashboard-api" | awk '{ print $1 }')"

#delete old image
docker rmi -f $(docker images --filter=reference="*dashboard-api-demo*" -q)

cd ~/workspace/home-dashboard/dashboard-api/

mvn clean install

docker build --tag home-dashboard-api-demo:v1.0 .

docker run -d -p 8080:8080 home-dashboard-api:v1.0