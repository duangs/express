npm install -g pm2
# 启动程序

dev环境启动脚本
pm2 start process.json

producting环境启动脚本
pm2 start process.json --env production

restart: pm2 restart myapp
stop: pm2 stop myapp
delete: pm2 delete myapp