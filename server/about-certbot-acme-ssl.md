# 获取ssl证书并自动更新

## certbot-auto

```bash
# 获取certbot-auto，存放到本地，例如:/data/
wget https://dl.eff.org/certbot-auto
# 赋予执行权限
chmod a+x ./certbot-auto
# 生成证书 PS：生成的过程中会让你添加邮箱及域名记录（注意类型是TXT）
./certbot-auto --server https://acme-v02.api.letsencrypt.org/directory -d "learntech.cn" -d "*.learntech.cn" --manual --preferred-challenges dns-01 certonly
```

一切顺利的话，最后会在目录下生成对应的文件 fullchain.pem和privkey.pem。

> Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/learntech.cn/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/learntech.cn/privkey.pem
   Your cert will expire on 2020-03-26. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot-auto
   again. To non-interactively renew *all* of your certificates, run
   "certbot-auto renew"

```bash
ssl_certificate       /etc/letsencrypt/live/learntech.cn/fullchain.pem;
ssl_certificate_key   /etc/letsencrypt/live/learntech.cn/privkey.pem;
```

过期时间的问题，证书每三个月会过期，但是可以无限续签。过期前会有邮件通知。也可以使用命令查看是否过期：`./certbot-auto certificates`

```bash
./certbot-auto certificates

Found the following certs:
  Certificate Name: learntech.cn
    Domains: learntech.cn *.learntech.cn
    Expiry Date: 2020-03-26 15:46:18+00:00 (VALID: 89 days)
    Certificate Path: /etc/letsencrypt/live/learntech.cn/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/learntech.cn/privkey.pem
```

### 手动续签命令

```bash
./certbot-auto renew
# 如果提示未到期，cert not due for renewal，可以强制更新如下
./certbot-auto renew --force-renew
# 看到success表示成功了
```

### 自动续签命令，写一个sh脚本，例如名称叫 renew-cert.sh，位置随意

```bash
#!/bin/bash
# 停止nginx
nginx -s stop
# 续签
/dir/certbot-auto renew --force-renew
# 重启nginx
nginx -s reload
```

### 给所有的用户添加执行 renew-cert.sh 这个文件的权限

```bash
chmod a+x renew-cert.sh
```

### 利用系统定时器定期执行脚本

```bash
# 每隔两个月的1号凌晨4点自动更新https证书
0 4 1 */2 * /data/sh/renew-cert.sh >> /dev/null 2>&1
```

### 补充：到期后升级会提示错误，需要添加dns api，操作可查看

- [https://github.com/al-one/certbot-auth-dnspod](https://github.com/al-one/certbot-auth-dnspod)

## acme.sh

### 安装很简单, 一个命令

```bash
curl  https://get.acme.sh | sh
# 会自动生成一条类似如下的定时器
13 0 * * * "/home/user/.acme.sh"/acme.sh --cron --home "/home/user/.acme.sh" > /dev/null
```

```bash
# 1、以dnspod cn为例，设置ID和key
$ export DP_Id=""
$ export DP_Key=""
# 2、申请证书
acme.sh --issue --dns dns_dp -d learntech.cn -d *.learntech.cn
# 3、拷贝证书
acme.sh --installcert -d learntech.cn --key-file /etc/nginx/cert/learntech.cn/privkey.pem --fullchain-file /etc/nginx/cert/learntech.cn/fullchain.pem --reloadcmd "service nginx force-reload"
```

官方中文文档其实说的很详细了，其他的直接看官方文档吧：[https://github.com/Neilpang/acme.sh/wiki/说明](https://github.com/Neilpang/acme.sh/wiki/%E8%AF%B4%E6%98%8E)

PS：目前在使用acme

PS：本地证书生成：<https://github.com/FiloSottile/mkcert>
