---
layout: post
title: Linux Usage
date: 21-10-08 20:08:15 +0800
categories: notes
---

记录在Linux环境下的Errors，Settings和Tricks。

以下的所有内容皆来自在`Linux Mint 20.2`下的实验，maybe work for Ubuntu, too.

## Errors

### 1. Could not install packages due to an EnvironmentError: Missing dependencies for SOCKS support.

设置了命令行代理之后，在安装Python包时出现这个报错，解决方法：

1. 关闭命令行代理`unset all_proxy`；
2. 安装pysocks包`pip install pysocks`；

重启代理，如果报错：`ValueError: Unable to determine SOCKS version from socks://127.0.0.1:1080/`，则用下面的命令：

1. `export all_proxy="socks5://127.0.0.1:1080"`

## Settings

### 1. 查看Linux Mint对应的Ubuntu版本

```sh
cat /etc/os-release
```

```sh
NAME="Linux Mint"
VERSION="20.2 (Uma)"
ID=linuxmint
ID_LIKE=ubuntu
PRETTY_NAME="Linux Mint 20.2"
VERSION_ID="20.2"
HOME_URL="https://www.linuxmint.com/"
SUPPORT_URL="https://forums.linuxmint.com/"
BUG_REPORT_URL="http://linuxmint-troubleshooting-guide.readthedocs.io/en/latest/"
PRIVACY_POLICY_URL="https://www.linuxmint.com/"
VERSION_CODENAME=uma
UBUNTU_CODENAME=focal ## ! This line
```

### 2. 安装PyAudio时报错：fatal error: portaudio.h: No such file or directory

需要安装依赖项`libportaudio2`

```sh
sudo apt-get install libportaudio2
```

然后`pip install PyAudio`

或者直接使用`apt`安装：

```sh
sudo apt-get install python3-pyaudio
```

### 3. Ubuntu SSH server

```sh
sudo apt-get update
sudo apt-get install openssh-server
```

`ssh-key`配置：

```shell
## 1. generate rsa key
ssh-keygen -t rsa

## 2. copy public key to target server's ~/.ssh/authorized_keys
scp .ssh/id_rsa.pub $TARGET_USERNAME@$TARGET_SERVER_IP:/.ssh/authorized_keys 
```

## Tricks

### 1. 命令行获取本机对其他公网机器的公网IP

```sh
curl ip.me
# 111.187.23.115
```

### 2. 快速复制粘贴终端上的文字

用鼠标选中文字后，单击滚轮。

### 3. Linux修改图片分辨率的工具：`imagemagick`

`sudo apt install imagemagick`后，使用`mogrify`来修改：

```sh
mogrify -resize 120x120 -format jpg [image_name]
```

### 4. Shell Script遍历数组

```shell
#!/bin/bash
a=(192.168.1.1 192.168.1.2 192.168.1.3)
# 方法1：foreach 遍历
for ip in ${a[@]}; do
    echo $ip
done

# 方法2：下标遍历
for i in $(seq 0 $((${#a[@]} - 1))); do
    echo ${a[$i]}
done
```

### 5. ssh远程执行shell命令

一般命令：

```shell
ssh $USERNAME@$IP "ls | grep Desktop"
```

需要sudo权限的命令：

```shell
ssh -t $USERNAME@$IP "sudo docker images"
```

加上`-t`之后就可以交互地输入密码了，但是如果想同时对多台服务器进行命令执行，还是不方便。还是对用户配置一些不需要输入密码即可`sudo`权限执行的命令比较好。
