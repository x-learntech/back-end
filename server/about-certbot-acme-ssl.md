# 获取ssl证书并自动更新

## acme.sh

安装很简单, 一个命令。建议在root下安装，否则在更新nginx的时候需要配置那条命令不需要密码。

```bash
# 让test用户可以免密sudo执行所有命令
echo "test ALL=(ALL:ALL)  NOPASSWD:ALL" >> /etc/sudoers
# 给指定命令放开免密sudo权限
test ALL=(ALL) NOPASSWD: /usr/bin/tail,/usr/bin/cat,/bin/vim,/usr/bin/du
```

```bash
curl  https://get.acme.sh | sh
# 会自动生成一条类似如下的定时器
13 0 * * * "/home/user/.acme.sh"/acme.sh --cron --home "/home/user/.acme.sh" > /dev/null
```

PS：如果上述过程中下载资源失败，则可能需要下载git到服务器安装。

```bash
# 1、以dnspod cn为例，设置ID和key
$ export DP_Id=""
$ export DP_Key=""
# 2、申请证书
acme.sh --issue --dns dns_dp -d learntech.cn -d *.learntech.cn
# 3、拷贝证书
acme.sh --installcert -d learntech.cn --key-file /etc/nginx/cert/learntech.cn/privkey.pem --fullchain-file /etc/nginx/cert/learntech.cn/fullchain.pem --reloadcmd "sudo service nginx force-reload"
```

官方中文文档其实说的很详细了，其他的直接看官方文档吧：[https://github.com/Neilpang/acme.sh/wiki/说明](https://github.com/Neilpang/acme.sh/wiki/%E8%AF%B4%E6%98%8E)

PS：目前在使用acme

PS：本地证书生成：<https://github.com/FiloSottile/mkcert>

PS：不少人用 [Caddy](https://caddyserver.com/) 了
