# Use eclipse-temurin:21 as the base image
FROM eclipse-temurin:17-jammy AS builder

# Install dependencies
RUN apt-get update && apt-get install -y 
RUN apt-get install xz-utils unzip

ENV EAS_NO_VCS=1

# install node 20 
RUN wget https://nodejs.org/dist/v20.19.4/node-v20.19.4-linux-x64.tar.xz
RUN tar -xvf node-v20.19.4-linux-x64.tar.xz -C /opt
RUN rm -r node*
ENV PATH=/opt/node-v20.19.4-linux-x64/bin:${PATH}
RUN npm install -g eas-cli@16.15.0 yarn@1.22.22 pnpm@9.15.5 node-gyp@11.1.0


# install android command line tools
RUN wget https://dl.google.com/android/repository/commandlinetools-linux-13114758_latest.zip
RUN unzip commandlinetools-linux-13114758_latest.zip 

RUN mkdir /opt/android_sdk
RUN mkdir /opt/android_sdk/cmdline-tools
RUN mv cmdline-tools /opt/android_sdk/cmdline-tools/latest

ENV ANDROID_HOME=/opt/android_sdk/
ENV REPO_OS_OVERRIDE=linux

ENV PATH=/opt/android_sdk/cmdline-tools/latest/bin:${PATH}

# Install buiild-tools
# Install required Android SDK components
# "build-tools;35.0.0" "build-tools;36.0.0" "ndk:27.1.12297006" "ndk;28.2.13676358" "platforms;android-34" "platforms;android-35" "platforms;android-36"


RUN yes | sdkmanager --licenses || true

RUN sdkmanager  --install "build-tools;33.0.0" "build-tools;34.0.0" "ndk;26.1.10909125" "platform-tools" "platforms;android-33"
RUN wget https://services.gradle.org/distributions/gradle-8.13-bin.zip
RUN unzip gradle-8.13-bin.zip

RUN mkdir /opt/gradle
RUN mv gradle-8.13 /opt/gradle
ENV GRADLE_HOME=/opt/gradle/gradle-8.13
ENV PATH=${GRADLE_HOME}/bin:${PATH}

RUN mkdir /usr/app
WORKDIR /usr/app

# Copy package json files to cache node-modules for subsequent builds
# COPY package-lock.json package-lock.json
# COPY package.json package.json


FROM builder

COPY . .
RUN rm -rf node_modules

RUN npm ci 

ARG EXPO_TOKEN
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_ORG=tushar-s-agrawal
ENV SENTRY_PROJECT=money-bracket

RUN eas build --platform android --local
