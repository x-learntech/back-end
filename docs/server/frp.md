# FRP 内网穿透

内网上部署了一些服务，希望在公网可以直接访问，可以使用 frpc 可以实现内网穿透。

项目地址在这边：[https://github.com/fatedier/frp](https://github.com/fatedier/frp)

中文文档在这边：[https://gofrp.org/zh-cn/](https://gofrp.org/zh-cn/)

具体配置请查看这边：[https://gofrp.org/zh-cn/docs/examples/](https://gofrp.org/zh-cn/docs/examples/)

## brew 安装

mac 上推荐使用 brew 来安装。

```bash
# mac 上我其实只用到了 frpc
brew install frpc # 配置文件 frpc -c /opt/homebrew/etc/frp/frpc.toml
brew install frps # 配置文件 frps -c /opt/homebrew/etc/frp/frps.toml

# 启动
brew services start frpc
```

## 官网安装

创建 Plist

在 macOS 系统中，Plist（Property List）是一种数据存储格式，用于存储配置信息。它是一种轻量级的 XML 格式，可以存储字符串、数字、日期、数据（二进制数据）和数组或字典等数据类型。Plist 文件通常用于存储应用程序的设置和偏好配置，以及系统配置。

Plist 文件具有以下特点：

- 可读性：Plist 文件是纯文本格式，可以很容易地用文本编辑器查看和编辑。
- 跨平台：Plist 格式在不同的操作系统和编程语言中都得到了支持。
- 易于使用：通过编程语言中的 API，可以方便地读取和写入 Plist 文件。

Plist 文件的扩展名通常是.plist。在 macOS 中，许多应用程序和系统服务都会使用 Plist 文件来存储配置信息。例如，应用程序的偏好设置、启动项列表、系统服务的配置等。

- 如果需要 root，并且是需要用户登陆后才能运行，把 plist 放在 /Library/LaunchAgents/
- 如果需要 root，并且不需要用户登陆后都能运行，把 plist 放在 /Library/LaunchDaemons/

因为我们需要开机启动，所以

```bash
sudo vim  /Library/LaunchDaemons/frpc.plist
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
 <key>KeepAlive</key>
 <true/>
 <key>Label</key>
 <string>FRPC</string>
 <key>ProgramArguments</key>
 <array>
    <string>/path/frp/frpc</string>
    <string>-c</string>
    <string>/path/frp/frpc.toml</string>
 </array>
 <key>RunAtLoad</key>
 <true/>
</dict>
</plist>
```

执行如下命令，将 frpc 设置为守护进程：

```bash
sudo launchctl load -w /Library/LaunchDaemons/frpc.plist
```

取消开机启动，执行下面命令：

```bash
sudo launchctl unload -w /Library/LaunchDaemons/frpc.plist
```

这个开源软件目前使用确实不错，最大的缺点是需要有一台公网 IP 的设备。
