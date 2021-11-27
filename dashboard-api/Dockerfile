FROM openjdk:11

WORKDIR /usr/src/myapp

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","app.jar"]