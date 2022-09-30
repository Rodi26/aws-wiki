#! /bin/bash
sudo apt update
sudo apt install python3
sudo apt install python3-pip
sudo apt install git -y
cd /tmp/
sudo git clone "https://github.com/Rodi26/aws-wiki"
cd /tmp/aws-wiki
sudo pip3 install mkdocs-material
sudo pip3 install -r ./requirements.txt
sudo  mkdocs serve
