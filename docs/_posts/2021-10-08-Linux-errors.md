---
layout: post
title: Linux Usage
date: 21-10-08 20:08:15 +0800
categories: notes
---

记录在Linux环境下的各种Errors以及Settings

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

