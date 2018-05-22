#!/usr/bin/env bash

# MAINTAINER Johan Maurel

sudo ls
if [ $? -eq "0" ]; then

    ping -c 3 8.8.8.8
    if [ $? -eq "0" ]; then

        sudo apt update && sudo apt upgrade
        sudo apt install -y git \
                    vim \
                    apt-transport-https \
                    ca-certificates \
                    gnupg2 \
                    wget \
                    software-properties-common \
                    ssh \
                    lsof \
                    linux-headers-4.9.0-6-all \
                    raspberrypi-kernel-headers

        echo "### INSTALL REPOSITORY ###"

        git clone https://github.com/Grillette/Nao.git
        cd /home/pi/Nao/build/rpi/base
        sudo cp sshd_config /etc/ssh
        sudo cp ascii.txt /etc/motd
        sudo cp ../../../naoserver /usr/local/bin


        echo "### INSTALL DOCKER ###"

        curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
        sudo apt-key fingerprint 0EBFCD88
        echo "deb [arch=armhf] https://download.docker.com/linux/debian \
             $(lsb_release -cs) stable" | \
            sudo tee /etc/apt/sources.list.d/docker.list
        sudo apt-get update && sudo apt-get install -y docker-ce && exit 0
        sudo usermod -aG docker pi
        sudo systemctl enable docker.service


        echo "### INSTALL RASPAP ###"

        sudo cp /etc/wpa_supplicant/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf.sav
        sudo cp wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf
        wget -q https://git.io/voEUQ -O /tmp/raspap && bash /tmp/raspap
        sudo cp dnsmasq.conf /etc
        sudo sed -i -e 's/80/4242/g' /etc/lighttpd/lighttpd.conf
        sudo cp interfaces /etc/network
        sudo cp hostapd.conf /etc
        sudo systemctl enable hostapd.service
        sudo systemctl enable dnsmasq.service


        echo "### REBOOTING ###"

        sudo reboot

    else
        echo "You need to have internet access ..."
        exit 1
    fi
else
    echo "You need to have admin permissions ..."
    exit 1
fi