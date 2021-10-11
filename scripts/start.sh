#!/bin/bash
cd /home/ubuntu/art-ground/server


export ART_GROUND_ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ART_GROUND_ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export ART_GROUND_CRYPTOJS_SECRETKEY=$(aws ssm get-parameters --region ap-northeast-2 --names ART_GROUND_CRYPTOJS_SECRETKEY --query Parameters[0].Value | sed 's/"//g')
export ART_GROUND_OAUTH_URL=$(aws ssm get-parameters --region ap-northeast-2 --names ART_GROUND_OAUTH_URL --query Parameters[0].Value | sed 's/"//g')
export ART_GROUND_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names ART_GROUND_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export ART_GROUND_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ART_GROUND_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export ART_GROUND_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names ART_GROUND_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export ART_GROUND_GRANT_TYPE=$(aws ssm get-parameters --region ap-northeast-2 --names ART_GROUND_GRANT_TYPE --query Parameters[0].Value | sed 's/"//g')
export ART_GROUND_GOOGLEINFO_URL=$(aws ssm get-parameters --region ap-northeast-2 --names ART_GROUND_GOOGLEINFO_URL --query Parameters[0].Value | sed 's/"//g')
export ART_GROUND_KAKAO_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names ART_GROUND_KAKAO_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export ART_GROUND_KAKAO_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names ART_GROUND_KAKAO_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')








authbind --deep pm2 start index.js

# cd /home/ubuntu/redis-6.2.5/src

# sudo ./redis-server &