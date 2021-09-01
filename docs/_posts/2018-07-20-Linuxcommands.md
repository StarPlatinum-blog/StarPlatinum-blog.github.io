---
layout: post
title:	Linux指令整理
date:   2018-07-20 13:00:12 +0800
categories: notes
---

- 于2018/07/20创建
- 本文档只记录指令，参数和选项请查阅笔记或man page

2018/07/28更新

- 整理十一到十五章所用的命令

初版更新：

- 鸟哥Linux私房菜第一章到第十章所用到的shell指令

---

## 查询查找相关指令

`--help`选项可以查看简易帮助

`man`+指令查看操作手册，按q退出

`info info`查看info的说明

指令查找`which -a command`

`whereis [-bmsu] fileordirname`在一些特定目录中寻找文件名

`locate [-ir] keyword`找出所有和keyword相关的文件名

`find [PATH] [option] [action]`

### 正则表达式

`grep [-A][-B][--color=auto] 'strtofind' filename`

`sed [-nefr] [action]`

 `sed 's/str to be replaced/new str/g'`

`printf '格式' content`

`awk '条件1{动作1} 条件2{动作2}' filename`

`diff [-bBi] from-file to-file`文件对比（按行比较）（文件都可以用 - 取代，表示stdin）

`patch -p0 < passwd.patch`使用patchfile升级旧文件

`pr /etc/man_db.config`可以自动产生文件时间、文件名、页码

---

## 磁盘相关指令

`df -T /boot`找出/boot挂载点下文件系统的superblock记录

`xfs_info /dev/sda2`

`du [-ahskm] fileordirname`评估文件系统的磁盘使用量

`ln [-sf] source destination`创建Symbolic Link

`lsblk [-dfimpt] [device]`列出系统上所有的磁盘列表

`blkid`列出设备的UUID等参数

`parted [device_name] print`列出磁盘的分区表类型与分区信息

`gdisk device_name`GPT分区使用gdisk

`partprobe`更新Linux核心的分区表信息

`mkfs.xfs [-bdfiLlr] device`创建xfs文件系统（格式化）

`xfs_repair`救援xfs文件系统

使用`fsck.ext4`来处理Ext4文件系统

`dumpe2fs -h /dev/sda5|grep 'Blocks per group'`查看每个block群组有多少个block

`mount UUID="" /data/xfs`挂载

`df /data/xfs`查看分区挂载情况（常用所以再列了一次）

`umount`卸载设备

`mknod device [bcp] [major] [minor]`手动创建设备文件

`xfs_admin [-lu] [-L label] [-U uuid] device`修改UUID和Label name

`uuidgen`生成新的UUID

创建空文件在/src/loopdev`dd if=/dev/zero of=/srv/loopdev bs=1M count=512`

swap格式化 `mkswap`

 `swapon device`开始使用swap

观察 swap`free & swapon -s`

关闭swap file`swapoff /tmp/swap /dev/sda6`

---

## 压缩打包相关指令

`tar [-zjJ](gz,bz,xz压缩) [-cv] [-f + newfilename] filename `可以将多个文件打包成一个文件

`gzip [-cdtv#] filename`：使用最广的压缩指令：可以解开compress，zip与gzip等软件所压缩的文件

`bzip2`为了取代gzip并提供更好的压缩比而来，用法几乎和gzip相同

`xz`用法几乎也和gzip，bzip2相同

`time [gzip|bzip2|xz] -c services > services.[gz|bz2|xz]`测试执行时间

`xfsdump [-L S_label] [-M M_label] [-l #] [-f backupfile] filetobackup`XFS filesystem备份

`xfsrestore -f /sev/boot.dump -L boot_all /boot`复原之前创建的备份

`mkisofs [-o xxxx.iso] [-Jrv] [-V vol] [-m excludefile] filetoiso`创建镜像文件

`isoinfo -d -i` 查看iso文件的内容

`rsync -a source destination`可以完整地复制所有数据权限属性

`wodim -v dev=/dev/sr0 speed-4 -dummy -eject /emp/system.img`光盘烧录

`dd if=/etc/passwd of=/tmp/passwd.back`直接读取磁盘设备（直接读取扇区），然后备份

`cpio`

---

## 关机相关指令

`who`命令，可以查看已登录的用户

`netstat -a`，查看网络的连线状态

`ps -aux`,查看主机当前的使用状态

将内存中的数据同步写入硬盘：`sync`

关机指令：`shutdown`

重启，关机：`reboot、halt、poweroff`

---

## 权限相关指令

输入命令`ls -al`，显示出当前目录所有文件权限

`chgrp [options] dirname filename`改变文件所属群组

`chown [options] username filename`改变文件拥有者

`chmod [options] 权限数字 filename`数字类型改变权限

`chmod u=rwx,go=rx filename`符号类型改变权限

---

## 文件目录相关指令

`su -`切换到root账户

`cd /tmp`进入目录

`mkdir testing`创建目录

`rmdir`删除一个空目录

`mv [file] [directory]`移动文件到另一个目录

`pwd`显示目前目录（print working dictionary）

`touch testing/testing`创建文件

`rm [options] 文件或目录`移除文件或目录

`ls` 列出所有文件

`cp [options] source destination`复制文件或目录

获取文件名`basename /etc/sysconfig/network`

获取目录名`dirname /etc/sysconfig/network`

`cat` 从第一行开始显示文件内容

`tac` 从最后一行显示文件内容

`nl`  显示的时候，同时输出行号

`more` 一页一页的显示文件内容

`less` 与`more`相同，可以向前翻页

`head` 只看头几行

`tail `只看尾巴几行

`od` 以二进制的方式读取文件内容

`touch -acdmt file` 修改文件的时间

`umask -S`以符号表示显示默认权限设置

`umask`以数字表示显示默认权限设置

`chattr [+-=][ASacdistu]` 设置文件的隐藏属性

`lsattr [-adR] file or directory`显示文件的隐藏属性

---

## Bash指令

`date`显示时间和日期

`cal`显示日历，`cal [month] [year]`

`bc`计算器

`history -n #`查看历史指令

命令别名设置`alias lm='ls -al'`

`type [-tpa] cmdname`指令是否为Bash shell

`uname -r`查看核心版本

`uname -m`查看操作系统的位数

显示变量`echo`

`export` `env`观察所有的环境变量

`delcare -i number=${RANDOM}*10/32768`声明变量为数值（默认字符串）

`PS1`命令提示符格式设置（其实这是个变量）

`locale -a`查询Linux到底支持多少语系

`read [-pt] var`等待用户从键盘键入变量

`declare [-aixr] var`声明变量的类型

`ulimit [-SHacdfltu] [配额]`设置内存和CPU的使用限制

`source`读入环境配置文件

`stty -a`列出终端机输入按键代表的意义

`set`设置指令环境

`cat > file`创建一个文件，直接在命令行输入（^D结束创建）

`cut -d ':' -f 1-4`以 ：为分隔符，截取第一个到第四个并显示

`grep [-acinv] 'str' file `搜寻信息

`sort [-fbMnrutk] [fileorstdin]`排序命令

`uniq`重复的项目只显示一次

`wc`计算文件中有多少字符（word count）

`tee`双向导向：将数据流另存为一个文件，同时把数据流继续以stdout传给下一个命令

`tr [-ds] SET1`来删除或取代数据流的信息

` tr [a-z] [A-Z]`把数据流中的小写字母换成大写字母

`col [-xb]`文件内容替换

`join [-til2] file1 file2`默认情况下以” “分隔符，比对第一个字段，相同则将数据连成一行

`paste [-d] file1 file2`合并文件

`expand -t # -` \# 从把Tab转换成#个字符，- 从stdin中读取数据

`split [-bl] file PREFIX`分割

`xargs`参数代换

`dmesg`列出核心讯息

### shell scripts

`test`测试命令（与|| && 符号搭配输出信息）

判断符号`[]`，可以使用`test`的参数

`if ...; then ... fi`

`shift`参数号码偏移

`netstat -tuln`查询目前主机启动的服务

`case ... esac`判断，同时判断多个变量

`/etc/init.d/syslog restart`重启`syslog`服务

`function fname(){ 指令 }`bash函数

`while`循环，满足条件时循环

`until`循环，满足条件时停止

`for`循环，已知循环次数

`seq 1 100`表示列出1到100

`sh [-nvx] script.sh`

---

## vim相关指令

请直接去笔记搜索



---

## 用户管理相关指令

`groups`命令，用户可以输入此命令查看自己所在的群组，第一个输出的是有效群组

`newgrp [群组名]`切换有效群组

`usermod -G users captainxu`管理员可以把captainxu加入users群组中

`useradd [-u UID] [-g initgroup] [-G minorgroup] [-mM] [-c info] [-d homedir] [-s shell] username`

`passwd [--stdin]`所有用户都可以使用，用来更改自己的密码

`passwd [-l][-u][--stdin][-S][-n days][-x days][-w days][-i date] user`此指令只能由root下达

`chage [-ldEImMW] username`详细显示口令参数

`usermod [-cdegGlsuLU] username`修改用户参数

`userdel [-r] username`删除用户及其数据

`finger [-s] username`列出用户的账号，全名、终端机代号与登录时间等

`chfn`change finger information

`chsh [-ls]`change shell

`id`列出正在使用的用户的所有相关信息

`groupadd [-g GID] [-r] groupname`新增群组

`groupmod [-g GID] [-n groupname] groupname`

`groupdel groupname`删除群组

`gpasswd [-A user1, ...] [-M user3, ...] groupname`群组管理员创建

`gpasswd [-ad] user groupname`群组管理员可用

`setfacl [-bkRd] [{-m|-x} acl参数] 目标文件名`取得某个文件/目录的ACL配置项目

`getfacl filename`可以查看文件详细的权限信息

`su [-lm] [-c command] username`切换用户

`sudo [-b] [-u user] command`

可以用`visudo`来修改/etc/sudoers，用法与vim相同

`last`查看用户的登录时间

`w`or`who`可以查看目前已登录的用户

`lastlog`可以查看每个账户最近的登录时间。

`write username usertty`打开聊天会话，^D结束

输入`mesg n` 就可以关闭聊天功能，将不接受write

再次输入`mesg y`就可以打开

使用`wall ""`可以对所有用户广播

`mail username@localhost -s "title"`可以寄出邮件，即使用户不在线 也可以收到

`pwck`用来检查/etc/passwd，对比和/etc/shadow是否一致，如果passwd文件中的字段错误，就会提示用户修订

群组检查可以使用`grpck`

`pwconv`对比/etc/passwd 和 /etc/shadow

`chpasswd`可以用来修改口令，可以从stdin读入数据`echo "captainxu:123456" | chpasswd -m`就可以以MD5加密，并修改好口令

---

## 磁盘配额、软件磁盘阵列等命令

`xfs_quota -x -c "command" [mountpoint]`

`mdadm --detail /dev/md0`显示详细信息，设置软件RAID

`mdadm --create /dev/md[0-9] --auto=yes --level=[015] --chunk=NK --raid-devices= N --spare-devices=N /dev/sdx /dev/hdx`建立RAID

`mdadm --manage /dev/md[0-9] [--add device] [--remove device] [--fail device]`RAID出错处理

`pvscan`  搜索目前任何具有PV的磁碟

`pvcreate /dev/sda{4,5,6,7}`将分区建立为PV

`pvdisplay /dev/sda5`查看一下，Allocatable表示是否已被分配

`vgcreate [-s N[mgt]] VGname PVname` 建立VG

`vgextend captainxu /dev/sda7`把sda7也加入VG

`lvcreate [-L/l N[mgt]] [-n LVname] VGname`

`lvdisplay /dev/captainvg/captainlv`

`lvresize -L +500M /dev/captainvg/captainlv`使用lvresize把多余的容量加入LV

`xfs_growfs /srv/lvm`文件系统的放大

`lvremove /dev/captainvg/captainthin /dev/captainvg/lvpool`

`vgchange -a n captainvg`

`vgremove captainvg`

`pvremove /dev/sda{4,5,6,7}`

---

## 定时工作相关指令

`systemctl restart atd`重启atd服务

`systemctl enable atd`让服务开机自启

`systemctl status atd`查看atd当前状态

`at [-mldv] TIME`

`atq`查询目前有多少工作安排

`strm [jobnumber]`移除第jobnumber个工作

`batch`：在系统空闲时才进行工作，CPU负载小于0.8

`uptime`查看工作负载

`jobs`查看后台工作

`kill -9 %1 %2..`删除工作

`crontab [-u username] [-l|-e|-r]`

`anacron [-sfn] [job]`

`anacron -u [job]`