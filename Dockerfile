# Use eclipse-temurin:21 as the base image
FROM eclipse-temurin:21 AS builder

# Install dependencies
RUN apt-get update && apt-get install -y 
RUN apt-get install xz-utils unzip

ARG EXPO_TOKEN
ENV EAS_NO_VCS=1

# install node 22
RUN wget https://nodejs.org/dist/v22.17.0/node-v22.17.0-linux-x64.tar.xz 
RUN tar -xvf node-v22.17.0-linux-x64.tar.xz -C /opt
RUN rm -r node*
ENV PATH=/opt/node-v22.17.0-linux-x64/bin:${PATH}

# install android command line tools
RUN wget https://dl.google.com/android/repository/commandlinetools-linux-13114758_latest.zip
RUN unzip commandlinetools-linux-13114758_latest.zip 

RUN mkdir /opt/android_sdk
RUN mkdir /opt/android_sdk/cmdline-tools
RUN mv cmdline-tools /opt/android_sdk/cmdline-tools/latest

RUN ls -la

ENV ANDROID_HOME=/opt/android_sdk/
ENV REPO_OS_OVERRIDE=linux

ENV PATH=/opt/node-v22.17.0-linux-x64/bin:/opt/android_sdk/cmdline-tools/latest/bin:${PATH}

# Install buiild-tools
RUN echo yes |  sdkmanager --install "build-tools;36.0.0" "build-tools;35.0.0" "ndk:27.1.12297006" "ndk;28.2.13676358" "platforms;android-35" "platforms;android-36"

RUN wget https://services.gradle.org/distributions/gradle-8.13-bin.zip
RUN unzip gradle-8.13-bin.zip

RUN mkdir /opt/gradle
RUN mv gradle-8.13

ENV PATH=/opt/gradle/gradle-8.13/bin:${PATH}

RUN mkdir /usr/app
WORKDIR /usr/app

# Copy package json files to cache node-modules for subsequent builds
COPY package-lock.json package-lock.json
COPY package.json package.json
RUN npm ci 


COPY . .
RUN ls -la /usr/app
RUN rm -rf node_modules

# Install eas-cli
# 16.15.0 is the latest version of eas-cli AS OF 11/07/2025
RUN npm install -g eas-cli@16.15.0

RUN eas build --platform android --local
