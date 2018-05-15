#!/bin/bash

# MAINTAINER Johan Maurel

name="naoserver"
container="nao"
port="80"

function help {
    echo "--install : To build the docker image"
    echo "--start : To start nao server"
    echo "--stop : To stop nao server"
    echo "--compile : To generate the app.js"
}

function install {
    if [ -z $(docker volume list | grep naobox) ]; then
        docker volume create naobox # Mariadb volume for data persistance
    fi
    docker build -t $name build/
}

function start {
    if [ -n $(docker images | grep naobox) ]; then
        docker run
    else
        install
    fi
}

function stop {
    docker stop naoserv
}

function compile {
    docker exec $container bash -c './build.sh'
}


if [ -n $(ll /usr/bin/ | grep docker) ]; then

    if [ -n $(groups | grep docker) ]; then

        if [ $0 == "-h" ] || [ $0 == "--help" ]; then
            help
            exit 0

        elif [ $0 == "--install" ]; then
            install
            start

        elif [ $0 == "--start" ]; then
            start

        elif [ $0 == "--stop" ]; then
            stop

        elif [ $0 == "--compile" ]; then
            compile
        else
            echo "Need a valid argument"
            help
            exit 1
        fi

    else
        echo "Need execution permission on docker"
        exit 1
    fi
else
    echo "Install docker"
    exit 1
fi