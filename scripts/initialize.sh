

# sudo curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
# sudo unzip awscliv2.zip
# sudo ./aws/install


#!/bin/bash
cd /home/ubuntu/art-ground-Refactoring/server



sudo npm install
sudo npm install pm2@latest -g
sudo apt-get update
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown ubuntu /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80

authbind --deep pm2 start init.js
authbind --deep pm2 stop init.js 2> /dev/null || true
authbind --deep pm2 delete init.js 2> /dev/null || true