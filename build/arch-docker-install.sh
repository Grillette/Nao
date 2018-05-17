#!/bin/bash

# MAINTAINER Johan Maurel

sudo pacman -Syy --noconfirm docker
sudo systemctl enable docker.service
sudo systemctl start docker.service
sudo usermod -aG docker $USER
newgrp docker
groups
docker run hello-world #Test
echo "### You must reboot your machine to really apply your permission to use DOCKER without sudo ###"