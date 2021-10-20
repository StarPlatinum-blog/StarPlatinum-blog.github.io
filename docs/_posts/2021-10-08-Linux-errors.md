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

1.   关闭命令行代理`unset all_proxy`；
2.   安装pysocks包`pip install pysocks`；

重启代理，如果报错：`ValueError: Unable to determine SOCKS version from socks://127.0.0.1:1080/`，则用下面的命令：

1.   `export all_proxy="socks5://127.0.0.1:1080"`



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



## Tricks

### 1. 命令行获取本机对其他公网机器的公网IP

```sh
curl ip.me
# 111.187.23.115
```



### 2. 快速复制粘贴终端上的文字

用鼠标选中文字后，单击滚轮。
