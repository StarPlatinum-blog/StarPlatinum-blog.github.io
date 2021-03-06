---
layout: post
title:	鸟哥的Linux私房菜
date:   2018-07-17 13:00:12 +0800
categories: notes
---

## 鸟哥的Linux私房菜——学习笔记

- 本学习笔记是本人在[鸟哥的Linux私房菜](http://linux.vbird.org/)学习的全部笔记。
- 笔记内容自2018/07/13起按时间递增，最新的笔记将在最上方显示。

---

### 2018-8-13

终于装好了双系统Ubuntu，从今天开始的笔记都在Ubuntu上用vim写吧～

强行让自己习惯Linux的操作方式，不过Ubuntu的字体真的很好看啊。

碰到不少的坑，明天再开一篇来写一下遇到的坑，以备以后重装系统的时候吧……虽然完全不想再重装啦

#### 第二十二章 软件安装RPM SRPM, YUM

CentOS的RPM和Debian的dpkg

- dpkg

最早是由Debian Linux社群开发的，通过dpkg就可以很简单地安装软件，同时可以提供安装后的软件信息。Ubuntu也是由Debian衍生出来的Linux distribution，所以也是支持dpkg的

- RPM (Red Hat Package Manager)

由 Red Hat 公司开发出来的，很多 distribution 都在使用的非常方便的软件管理方式。

因为是已经编译好的软件，所以通常不同 distribution 释出的RPM不能安装在别的 distribution 上面

因此就有了SRPM，SRPM是PRM的源码，自己提供了 configure 和 Makefile, 可以修改参数设定文件，编译出适合正在使用的 distribution 的RPM 文件

SRPM用法：

- 先将软件以RPM方式编译为RPM文件
- 再将这个RPM安装进系统中

SRPM文件后缀：xxx.src.rpm



RPM文件名：

例：`rp-pppoe-3.11-5.el7.x86_64.rpm`

文件名不同项目以-来分隔。

- 软件名称：rp-pppoe
- 版本信息：3.11
- 释出版本的次数：5，同一版本中因为bug或是安全问题进行小幅度patch或重设编译参数，之后重新打包成RPM文件
- 操作硬件平台：`.el7.x86_64`,不同的平台设定参数也有所不同

平台名称：

i386	适用所有的x86平台
i586	针对586等级的电脑进行最佳化编译
i686	目前市场的大部分都是这个等级的CPU
x86_64	针对64位的CPU最佳化编译
noarch	没有任何硬件等级的限制，一般是shell脚本软件

目前的软件大多是i686 x86_64 和 noarch版本，386可以在一些很特别的软件上面看到，硬件方面是向下兼容的。



RPM管理软件：`rpm`

只有使用root权限才能操作rpm指令(Ubuntu里对应的是dpkg)

`rpm -ivh package_name.rpm`
-i	install	安装
-v	verbose	显示详细安装信息
-h	显示安装进度

`rpm -U|F -vh pakage_name.rpm`

升级更新软件：

-U	如果没有安装过后面的软件，则安装；如果有新版可用，则更新
-F	只有已经安装了的软件才会更新，不会自动安装未安装的软件

`rpm qa`查询已经安装的软件

`rpm q[licdR] [name]`查询已安装的软件名称

`rpm qf [filename]`

`rpm -qp[licdR] [name]`

-q	仅查询

-qa	列出所有软件名称

-qi	列出软件的详细信息

-ql	列出该软件的所有文件与目录所在完整文件名

-qc	列出该软件的所有设定文件

-qd	列出该软件的所有说明文件

-qR	列出与该软件有关的相依软件所含档案

-q --scripts	列出是否含有安装后需要执行的脚本文件

-p	packages 列出某个RPM文件



rpm命令和dpkg命令的对应：

`rpm -q logrotate`	=	`dpkg --list logrotating`

`rpm -ql logrotate`	=	`dpkg --listfiles logrotate`




`rpm -V`验证数字签名

`rpm -e`卸载



`yum`线上升级

---
### 2018-8-8

为什么使用make：

`wget -nd http://linux.vbird.org/linux_basic/0520source/main.tgz`

解压后获取四个C语言文件，用gcc编译

```bash
gcc -c main.c
gcc -c haha.c
gcc -c sin_value.c
gcc -c cos_value.c

gcc -o main main.o haha.o sin_value.o cos_value.o -lm
```



使用make来编译，先建立名为makefile的文件：

`vim makefile`

```
main: main.o haha.o sin_value.o cos_value.o
	gcc -o main main.o haha.o sin_value.o cos_value.o -lm
```

Makefile语法：
```
Target: object1 object2
<tab>	gcc -o binaryfile object1 object2
<tab>	other commands


```

make编译一次后，如果有更改源码，再重新进行一次make就可以更新binary文件了

环境变量：CFLAGS等

赋予方式：

1. `CFLAGS="-Wall" make clean main`
2. 在makefile中加上`CFLAGS = -Wall`
3. 也可以直接读取当前shell环境的环境变量

优先级：make命令中加入的 > makefile中指定的 > shell的环境变量



特殊变量：`$@`，在makefile中代表前面的Target



Tarball软件安装和管理

源码编译所需要的基础软件：

- gcc等编译器（C compiler）
- make、autoconfig等软件
- Kernel提供的函数库以及相关的Include文件，尤其是驱动程序需要的模组

目前的Linux distribution预设一般是没有安装gcc或者make等软件的，CentO S或RedHat中可以选择Development Tools或是Kernel Source Development等软件包安装

CentOS和RedHat都可以使用RPM来安装软件，在有网络连接的情况下也可以使用yum来安装

yum有软件群组安装功能

- 安装gcc等软件开发工具`yum groupinstall "Development Tools"`
- 若待安装的软件需要图形界面支持`yum groupinstall "X Software Development"`
- 若安装的软件较旧，可以`yum groupinstall "Legacy Software Development"`

具体在下一章有，下面还是来看Tarball

Tarball的安装流程：

- tar解压到/usr/local/src
- 进入目录，查询INSTALL文件或README文件
- 使用configure或config侦测环境，建立makefile
- make编译
- 用make和Makefile的参数设定，依据install这个target来安装到正确的路径



指令下达方式：

- `./configure`，建立Makefile
- `make clean`，清除一下object file
- `make`依据Makefile中预设的工作进行编译。一般是编译产生object files
- `make install`最后的安装步骤，将上一步编译完成的文件安装到指定目录

上述指令必须是依序进行的，如果上一步执行不成功，下一步也无法执行



软件安装常用目录：

以Apache为例：

- /etc/httpd
- /usr/lib
- /usr/bin
- /usr/share/man

内容大致在etc, lib, bin, man等目录中，分别对应设定文件，函数库，可执行文件，线上说明文件



如果你用Tarball来安装，放在/usr/local中，你的资料会放在：

- /usr/local/etc
- /usr/local/bin
- /usr/local/lib
- /usr/local/man

如果安装的软件多了的话，升级或是移除就比较难以查询文件来源，如果安装的单独的目录，就会在这个目录中创建 etc, bin, lib, man四个目录，如

- /usr/local/apache/etc
- /usr/local/apache/bin
- /usr/local/apache/lib
- /usr/local/apache/man

这样只要删除这个文件夹，就可以删除软件了，但是实际安装时，还是需要查看Makefile里面的install信息。

但是这样的操作虽然简化了删除，却会让命令下达时必须使用绝对路径。

在多个相依程序安装和更新上，使用Tarball也会面临更新一个程序就需要重新把所有相依程序都编译一遍的问题。

这就是使用Tarball弊端，在卸载上有一些难度，为了方便Tarball管理，鸟哥建议：

- 将Tarball的源码解压到/usr/local/src目录中
- 安装时，最好安装到/usr/local这个预设路径下
- 考虑到未来的反安装，最好把每个软件单独在/usr/local安装
- 为安装到单独目录的软件的man page加入man path：
  - `vim /etc/man_db.conf`
  - `40G`
  - 添加`MANPATH_MAP /usr/local/software/bin /usr/local/software/man`

INSTALL或README一定要仔细阅读，查看./configure的选项也很重要



利用patch更新源码

`patch -pN < patchfile`这个N指的是要更新的文件所在目录，与patchfile所在目录差几级

例如：要更新的文件绝对路径为 /home/guest/file2update

-p1 就表示 home/guest/file2update

-p2 就表示 guest/file2update

-p3 就表示file2update



函数库管理

动态Dynamic与静态Static函数库

静态函数库的特点：

- 扩展名：`.a`
- 编译行为：会直接整合到可执行文件中，因此会扩大可执行文件
- 可独立执行：编译后的可执行文件可以独立执行，不需要向外部要求读取函数库内容
- 升级较困难：函数库升级后，所有调用了此函数库的程序都要重新编译



动态函数库的特点：

- 扩展名：`.so`
- 编译行为：程序里只有一个指针来指向函数库位置。程序使用到函数库时才会调用
- 不能被独立执行，需要有函数库的支持
- 升级函数库后不需要重新编译程序



目前的Linux distribution大多使用动态函数库

大多数函数库的位置在：/lib64, /lib目录下，kernel的函数库放置在 /lib/modules里面



将动态函数库载入内存：

1. 在 /etc/ld.so.conf 里面加入需要载入内存的动态函数库所在目录
2. `ldconfig`来将 /etc/ld.so.conf中的信息读入内存
3. 同时记录一份资料在 /etc/ld.so.cache 中

`ldconfig [-f conf] [-C cache]`

-f 以后面接的文件作为函数库的路径，而不是/etc/ld.so.conf

-C 以后就接的文件作为 内存的函数库资料，而不是 /etc/ld.so.cache

`ldconfig [-p]`

-p 列出目前有的所有函数库资料内容



查看程序的动态函数库或者查看和某个函数相关的其他函数库：

`ldd [-vdr] filename`

-v verbose

-d 重新将信息有遗失的link点显示出来

-r 将ELF有关的错误内容显示出来



验证软件的正确性：指纹验证。

`md5sum / sha1sum / sha256sum [-bct] filename`

-b 使用binary的读取方式，预设是 Windows/DOS文件形态的读取方式

-c 检验文件指纹

-t 以文字形式读取文件指纹

`md5sum / sha1sum / sha256sum [--status|--warn] --check filename`



你必须要在你的Linux上面为你的重要文件进行指纹资料库建立。

- /etc/passwd
- /etc/shadow
- /etc/group
- /usr/bin/passwd
- /sbin/rpcbind
- /bin/login
- /bin/ls
- /bin/ps
- /bin/top

这几个文件最容易被修改了，建议建立MD5指纹库，定期以shell script的方式由程序来检查指纹是否正常

下面是我自己写的脚本

```bash
#!/bin/bash
#Program:
# 	This Program is used to  and check the MD5 prints of file: /etc/passwd /etc/shadow /etc/group /usr/bin/passwd /sbin/rpcbind /bin/login /bin/ls /bin/ps /bin/top
# History:
# 2018/08/08	Captainxu	First release

PATH=/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin:/bin:/sbin:/home/captainxu/.local/bin:/home/captainxu/bin
export PATH

echo "$0 start to funcion..."

if [ ! -f /root/md5prints ];then
	echo "This is the first time when this script is used!"
	echo "A file named '/root/md5prints' will be established as the original data."
	echo "This script will use this original data to compare the MD5 code of several important files."
	echo "To make sure that your important files had not been changed by some bad guys."
	echo "Creating files..."
	touch /root/md5prints
	for file in /etc/passwd /etc/shadow /etc/group /usr/bin/passwd /sbin/rpcbind /bin/login /bin/ls /bin/ps /bin/top
	do
		echo $(md5sum ${file}) >> /root/md5prints
	done
	echo "DONE!"
	echo "I advise you to add this script to your crontab, so that it can sostenuto check the files."
else
	declare -i i=1
	for file in /etc/passwd /etc/shadow /etc/group /usr/bin/passwd /sbin/rpcbind /bin/login /bin/ls /bin/ps /bin/top
	do
		PRINT=$(md5sum ${file} | cut -d " " -f1)
		FILECONTENT=$(sed -n "${i},1p" /root/md5prints | cut -d " " -f1)
		echo "${file}:"
		echo " original:	${FILECONTENT}"
		echo " now:		${PRINT}"
		[ "$PRINT" == "$FILECONTENT"  ] && echo "$file is OK!" || echo "$file has bad md5!"
		((i++))
	done
fi


```

---

### 2018-8-7

累积备份和差异备份

完整累积备份

第一次完整备份后，就只备份与当前系统有差异的部分

使用dd, cpio, xfsdump/xfsrestore



完整差异备份

第一次完整备份后，就只备份与第一次备份有差异的部分

工具也可以使用上面列出的，还可以使用rsync来进行镜像备份

`rsync -av sourcedir destination`

例如将/home备份进/backupdata/home

`rsync -av /home /backupdata`会在/backupdata自动创建一个/home子目录



关键资料备份：如果主机即使宕机一两天也不会影响你的正常生活，就可以仅备份关键资料

可以直接使用tar和date来处理：

`tar -jpcvf mysql.$(date +%Y-%m-%d).tar.bz2 /var/lib/mysql`

可以写一个脚本放入crontab




鸟哥的备份策略：

每日备份经常变动的数据，每周备份不常变动的数据

备份硬件：使用一个独立的filesystem，挂载到/backup中

每日进行：仅备份Mysql数据库

每周进行：/home, /var, /etc, /boot, /usr/local等目录与特殊服务的目录

使用crontab来自动进行

异地备份：每月定期把资料烧录到光碟或通过网络传给另一台机器

鸟哥的每月备份脚本

```bash
#!/bin/bash
# ====================================================================
# 使用者參數輸入位置：
# basedir=你用來儲存此腳本所預計備份的資料之目錄(請獨立檔案系統)
basedir=/backup/weekly  <==您只要改這裡就好了！

# ====================================================================
# 底下請不要修改了！用預設值即可！
PATH=/bin:/usr/bin:/sbin:/usr/sbin; export PATH
export LANG=C

# 設定要備份的服務的設定檔，以及備份的目錄
named=$basedir/named
postfixd=$basedir/postfix
vsftpd=$basedir/vsftp
sshd=$basedir/ssh
sambad=$basedir/samba
wwwd=$basedir/www
others=$basedir/others
userinfod=$basedir/userinfo
# 判斷目錄是否存在，若不存在則予以建立。
for dirs in $named $postfixd $vsftpd $sshd $sambad $wwwd $others $userinfod
do
	[ ! -d "$dirs" ] && mkdir -p $dirs
done

# 1. 將系統主要的服務之設定檔分別備份下來，同時也備份 /etc 全部。
cp -a /var/named/chroot/{etc,var}	$named
cp -a /etc/postfix /etc/dovecot.conf	$postfixd
cp -a /etc/vsftpd/*			$vsftpd
cp -a /etc/ssh/*			$sshd
cp -a /etc/samba/*			$sambad
cp -a /etc/{my.cnf,php.ini,httpd}	$wwwd
cd /var/lib
  tar -jpc -f $wwwd/mysql.tar.bz2 	mysql
cd /var/www
  tar -jpc -f $wwwd/html.tar.bz2 	html cgi-bin
cd /
  tar -jpc -f $others/etc.tar.bz2	etc
cd /usr/
  tar -jpc -f $others/local.tar.bz2	local

# 2. 關於使用者參數方面
cp -a /etc/{passwd,shadow,group}	$userinfod
cd /var/spool
  tar -jpc -f $userinfod/mail.tar.bz2	mail
cd /
  tar -jpc -f $userinfod/home.tar.bz2	home
cd /var/spool
  tar -jpc -f $userinfod/cron.tar.bz2	cron at
```

使用`wget -nd http://linux.vbird.org/linux_basic/0580backup/backupwk-0.1.sh`也可以获取

对MySQL数据库的每日备份脚本：
```bash
#!/bin/bash
# =========================================================
# 請輸入，你想讓備份資料放置到那個獨立的目錄去
basedir=/backup/daily/  <==你只要改這裡就可以了！

# =========================================================
PATH=/bin:/usr/bin:/sbin:/usr/sbin; export PATH
export LANG=C
basefile1=$basedir/mysql.$(date +%Y-%m-%d).tar.bz2
basefile2=$basedir/cgi-bin.$(date +%Y-%m-%d).tar.bz2
[ ! -d "$basedir" ] && mkdir $basedir

# 1. MysQL (資料庫目錄在 /var/lib/mysql)
cd /var/lib
  tar -jpc -f $basefile1 mysql

# 2. WWW 的 CGI 程式 (如果有使用 CGI 程式的話)
cd /var/www
  tar -jpc -f $basefile2 cgi-bin

```

也可以`wget -nd http://linux.vbird.org/linux_basic/0580backup/backupday.sh`获取

将脚本加入crontab就可以定期自动进行备份了



两台Linux之间通过网络备份数据：

`rsync -av -e ssh basedir id@ip:remotedir`



问题（犯蠢）记录：

在做鸟哥课后练习中，备份现有系统再重装一台CentOS 7，之后用备份的CentOS 7恢复到新装的机器中。

当我重启原来的机器时，发现无法顺利开机，在图形画面的读条界面停止，之后自动进入救援模式。

显示错误：

1. \[sda\] Assuming drive cache: write through
2. Host SMBus controller not enabled



第一个问题在开机时grub界面按`e`，删除 rhgb(图形进度条模式) 和 quiet(方便Debug)

第二个问题在/etc/modprobe.d/blacklist.conf文件中，添加`blacklist i2c_piix4`

两个问题即可解决

但是重启之后还是不能顺利开机，问题完全没有解决。



后来在/etc/fstab中发现，我之前删除了RAID磁盘序列，并且将磁盘重新分出一个区来挂载到/backup，而原来的RAID自动挂载的命令没有删除。

解决方法：`vim /etc/fstab`，注释掉或者删除挂载RAID的行，重启，顺利开机！

总结：多查看系统日志信息，查看详细的开机日志。



#### 第二十一章 软件安装：源码与Tarball

可执行文件：一般是指二进制文件

使用`file /bin/bash`命令可以查看文件的类型到底是什么

二进制文件会显示 ELF 64-bit LSB executable

而脚本文件会显示 text executable（因为开头一行写了#!/bin/bash）



Linux标准的程序语言是C，可以使用C来编写程序源码，然后使用gcc来编译，就可以制作一个Binary program了。

编译过程中会产生后缀为`.o`的目标文件(object file)，C语言源码一般后缀为`.c`



Linux自带函数库：分为动态函数库和静态函数库



Linux核心就提供了很多核心相关的函数库，相关信息在 /usr/include, /usr/lib, /usr/lib64中



`make`会在目录下讯在Makefile文件，这个文件中记录了源码如何编译的详细信息。

软件开发商一般会写一个侦测程序来侦测使用者的系统环境，来查看环境中是否有开发商所需要的功能，侦测程序运行结束后，就会主动建立Makefile，一般这个程序叫做`configure` `config`

一般侦测程序会检查：

- 是否有合适的编译器可以编译程序源码
- 是否已经存在本软件需要的函数库或其他相依软件
- 操作系统是否适合本软件，包括kernel版本
- 核心的头文件是否存在(header include)(驱动程序必须要的侦测)

编译流程基本就是两部：

- configure（一定要成功）
- make



Tarball软件

就是将源码以tar打包，再压缩

里面的文件一般包含：

- 源码
- 侦测程序
- 软件说明和安装说明



更新软件的需求：

- 需要新版功能
- 安全问题补丁
- 执行效率升级

更新软件的方式:

- 通过源码编译来安装
- 通过编译好的二进制文件来安装



预先编译好程序再释出的机制在很多distribution中都有，如

Red Hat系统发展的RPM软件管理机制与yum线上更新模式

Debian使用的dpkg软件管理机制和apt线上更新模式



CentOS是依据标准的Linux distribution，可以使用Tarball或RPM来进行升级

安装Tarball的过程：

- 下载`*.tar.gz`文件
- 解开打包，得到源码
- 使用gcc编译源码，产生object file
- 使用gcc来进行函数库、主程序、副程序连接，形成主要的二进制文件
- 将上述的二进制文件及设定档安装在主机上

3、4步可以使用make来简化



C语言程序设计(Linux环境)：

`yum groupinstall "Development Tools"`安装gcc等软件


`vim hello.c`创建C文件

```c
#include <stdio.h>
int main(void){
    printf("Hello World\n");
}
```

编译这个hello world`gcc hello.c`

产生`a.out`文件

`./a.out`运行



编译产生hello.o文件`gcc -c hello.c`

`gcc -o hello hello.o`产生可执行文件



主、副程序的连接

如果在一个程序中引用了另一个程序：

`vim thanks.c`

```c
#include <stdio.h>
int main(void){
    printf("Hello World\n");
    thanks_2();
}
```

`vim thanks_2.c`

```c
#include <stdio.h>
void thanks_2(void){
    printf("Thank you!\n");
}
```



进行程序的编译`gcc -c thanks.c thanks_2.c`

连接目标文件`gcc -o thanks thanks.o thanks_2.o`

产生二进制文件 thanks，运行输出 Hello world thanke you !



在编译过程中，可以加入参数来使用gcc的不同功能

`gcc -O -c thanks.c` -O为产生最佳化的参数

`gcc -Wall -c thanks.c` -Wall 会在编译过程中显示Debug信息(Warnings Errors)

`gcc sin.c -lm -L/lib -L/lib64`

-l	表示加入某个函数库
m	表示libm.so这个函数库
-L	表示到后面接的目录去寻找函数库

`gcc sin.c -lm -I/usr/include` -I后面接的目录的要去搜寻的目录



总结：（gcc 的简易用法）

编译：`gcc -c hello.c`产生目标文件

最佳化编译：`gcc -O -c hello.c`

添加寻找函数的路径：`gcc sin.c -lm -L/lib -I/usr/include`

将编译结果输出为特定的文件名：`gcc -o hello hello.c`

输出Debug信息：`gcc -Wall -o hello hello.c`



更多功能可以`man gcc`

看到 21.3使用make进行编译

---

### 2018-8-6

模组载入

建议使用`modprobe`来载入模组，它会自动克服模组的相依性，再决定需要载入哪些模组

`insmod`完全是由用户来载入一个完整的模组，不能主动分析相依性

`insmod [/full/path/module_name][parameters]`

`rmmod [-fw] module_name`

-f	强制移除该模组，无论是否正在被使用



`modprobe [-cfr] module_name`

-c	列出目前系统所有的模组

-f	强制载入该模组

-r	类似rmmod，移除模组



19-3	Boot loader: Grub2

Linux将boot loader的程序码执行和设定载入分成了两个stage

1. 执行boot loader主程序

因为MBR实在太小，所以MBR或boot sector通常只安装主程序

2. 主程序载入设定文件

设定文件一般都在/boot下

`ll /boot/grub2`

grub2的优点：

- 支持较多文件系统
- 开机时可以自行编辑与修改开机设定项目
- 可以动态搜索设定文件，不需要在修改设定后重新安装grub2



磁盘与分区在grub2中的代号

(hd0, 1) 		# 自动判断格式

(hd0, msdos) # MBR模式

(hd0, gpt1) 	# GPT模式

搜索到的第一个磁盘编号为hd0

第一个分区编号为1，分 MBR GPT 分别标注





查看grub2的设定文件`cat /boot/grub2/grub.cfg`



主要环境设定文件`cat /etc/default/grub`

TIMEOUT		预设倒数读秒的秒数

DISTRIBUTOR	

DEFAULT		预设开机选单，使用哪一个选单则添加相关的数字，从0开始编号

DISABLE_SUBMENU	是否隐藏次选单

TERMINAL_OUTPUT	指定信息输出的终端机格式

CMDLINE_LINUX		在menuentry括号内的LINUX16项目后续的核心参数

DISABLE_RECOVERY	取消救援选单的制作

编辑完主要环境设定档后，使用`grub2-mkconfig`来重建grub.cfg



选单的建立目录

`ll /etc/grub.d`

menuentry选单的功能：

- 直接指定核心开机

默认通过10_linux脚本制作，想添加别的参数，可以先到grub.cfg中复制相关的选单项目，粘贴到40_custom中，在custom文档中修改



通过chain loader移交loader控制权

例如要将控制权交给Windows的loader，只有一个磁盘，且Windows的分区在/dev/sda1，那么可以这样写：

```
menuentry "Windows"{
    insmod chain # 载入chainloader模组
    insmod ntfs # 载入Windows所在的文件系统
    set root=(hd0,1) # Windows所在分区号
    chainloader +1 # 去boot sector读取loader
}
```



initramfs必要的时刻

- 根目录磁盘为SATA、USB、SCSI等连接界面
- 根目录文件系统为LVM，RAID等特殊格式
- 根目录文件系统为非传统Linux认识的文件系统
- 其他必须要在核心载入时提供的模组

重制initramfs

`dracut [-fv] [--add-drivers 列表] initramfs文件名 核心版本`

-f	强制编译处initramfs，如果已经存在，则覆盖

-v	显示dracut的运行过程

--add-drivers 列表	在原本预设的核心模组中添加你想要的模组

initramfs文件名		设置文件名，开头最好是initramfs，后面接版本和功能

核心版本		一般是目前运行的版本（uname -r）

--modules	将dracut提供的核心模组载入，`/usr/lib/dracut/modules.d/`下为可用模组

--gzip|--bzip|--xz	使用某种方式来压缩initramfs，默认gzip

--filesystems	加入某些额外的文件系统



测试与安装grub2

如果没有预装grub2，可以安装

`grub2-install [--boot-directory=DIR] INSTALL_DEVICE`

--boot-directory	指定DIR为目标目录，默认目录为/boot/grub2/*

INSTALL_DEVICE	安装的装置代号（要安装在哪个磁盘的MBR下）

`grub2-install /dev/sda`

重装之后，/boot/grub2/下的目录都更新了，但是也没有设定文件，需要自己建立

`grub2-mkconfig -o /boot/grub2/grub.cfg `



重启时在grub2选单按下e，可以查看选中的选单的设置，并且可以直接编辑

在linux16那一行加入 `systemd.unit=rescue.target`再按下^X来进入系统，就可以进入救援模式



在systemd使用时，进入救援模式也需要root密码，要是忘记了root密码



通过图形显示grub：

在/etc/default/grub中加入

```
GRUB_TERMINAL=gfxterm
GRUB_GFXMODE=1024x768x24
GRUB_GFXPAYLOAD_LINUX=keep
```



grub2账户密码与选单设定

superusers	相当于root，选单的修改受限

users		设定一般账户的相关参数和密码

在 grub.cfg中

```
set superusers="captain"
password captain qwertyuiop
password mortal1 123456
menuentry "Everyone" --unrestricted{
    set root=(hd0,1)
    chainloader +1
}

menuentry "Only superusers" --users""{
    set root=(hd0,2)
    chainloader +1
}
menuentry "Only mortal and captain" --users mortal{
    set root=(hd0,3)
    chainloader +1
}
```

生成加密的密码：

`grub2-mkpasswd-pbkdf2`

`vim /etc/grub.d/01_users`
```
EOF
cat << EOF
set superusers="captain"
password_dbkdf2 captain grub.pbkdf2.sha512.10000.25376F4AF885B82064982E056C67432832D39923A95D42EF33EA671212D3EF6F7FA1EB769EB9C482B504762422C2CE7DC00A5FB3220A52AD30567FAE712F45BE.DE5D23698DCB96F1381B713B5E772D122E519286371DBB5DB08FF1999263C95D1598D2F8ED7C1B7D620F4E253579B6ABC4ABEEEC8A469DF8C6EEFC9340E5CD7E
EOF
```



19-4	开机过程的问题解决

通过rd.break核心参数来重设root密码（忘记了密码时）

在重启画面中，按e进入编辑模式，在linux16项目下添加 rd.break，按下^X开机

进入RAM Disk环境，就直接取得了root权限

mount查看sysroot的挂载点

`mount -o remount,rw /sysroot`挂载为可读写

`chroot /sysroot`切换根目录的位置到/sysroot

`echo "your passswd" | passwd --stdin root`更改密码

`touch /.autorelabel` 变回SELinux的安全本文

exit

reboot



#### 第二十章 基础系统设置与备份策略

网络设定

获取网络参数

手动设定参数

- IP
- 子网掩码 netmask
- 网关 gateway
- DNS服务器的IP　168.95.1.1

自动获取参数DHCP

以太网卡 Ethernet ethN

新的CentOS7对网卡编号为：

- eno1	主板BIOS内建的网卡
- ens1        主板BIOS内建的PCI-E网卡
- enp2s0    PCI-E界面的独立网卡
- eth0          以上网卡以外的

`nmcli connection show`显示当前系统上预设的网卡代号和连线代号

设置网络参数

`nmcli connection modify ens33 \`

`connection.autoconnect yes\`

`ipv4.method manual\`

`ipv4.addresses 172.16.1.1/16\ `

`ipv4.gateway 172.16.200.254\`

`ipv4.dns 172.16.200.254`



`nmcli connection up ens33`激活ens33



自动取得IP

`nmcli connection modify ens33 connection.autoconnect yes ipv4.method auto`

`nmcli connection up ens33`

就好了



修改主机名称：

`hostnamectl [set-hostname 主机名]`

日期与时间设定：

`timedatectl [command]`

list-timezones	列出系统上所以支持的时区名称

set-timezone		设定时区

set-time			设定时间

set-ntp			设定网络校时系统

手动网络校时:

`ntpdate ntp1.aliyun.com`和阿里云服务器同步

`hwclokcl -w`写入BIOS

语系设定：

`localectl`

`export LC_ALL=en_US.utf8`切换为英文

`localectl set-locale LANG=en_US.utf8`设置为英文

防火墙简易设定（详细设定见服务器篇）：

服务

端口



获取服务器的硬件信息

`dmidecode -t type`

type:

1	详细系统资料

4	CPU相关资料

9	系统的相关插槽格式

17	每一个内存插槽的规格



硬件设置都被记录在了/proc和/sys中了

呼叫硬件的指令：

```
gdisk	分区列表
dmesg	查看核心工作过程中显示的信息记录
vmstat	分析系统目前状态
lspci	列出PCI接口的设备
lsusb	列出USB端口的状态和USB设备
iostat	和vmstat类似，可以即时分析
```

`lspci [-vvn]`

-v	显示更多信息

-vv	更加多信息

-n	直接观察PCI的ID

更新pci的文件档案：

`update-pciids`



`lsusb -t`

`iostat [-c|-d] [-k|-m] [-t] 间隔秒数 侦测次数`

-c	仅显示CPU信息

-d	仅显示存储设备的状态

-k	以KB为单位显示

-m	以MB为单位显示

-t	显示日期

如果有设置次数，那么第一个显示的是开机到现在的总数量



了解磁盘的健康状态：

`smartd`服务【Self-Monitoring，Analysis and Reporting Technology System】

`smartctl -a /dev/sda`显示sda的信息

`smartctl -t short /dev/sda`让设备进行一次自检



备份要点

备份因素考量：

- 备份哪些档案
- 选择什么媒体
- 备份的方式
- 备份的频率
- 备份的工具



具有备份意义的文件：

- 系统基本设定
- 网络服务的文件



文件系统本身需要备份的档案：

- /etc/passwd
- /etc/shadow
- /etc/group
- /etc/gshadow
- /home

Linux的重要参数文件都在/etc/下，所以只要备份这个目录，就可以备份几乎所以的设定文件

/var/spool/mail	的内容也值得备份

设定过的文件夹：

- /var/spool/(at|cron)
- /boot
- /root
- 如果安装过其他软件，/usr/local和/opt也应该备份



网络服务的数据库：

如果我们使用的软件都是远程RPM安装的，需要备份的资料有：

- 软件本身的设定文件
- 软件提供的服务信息
  - WWW信息：/var/www目录，/srv/www目录，用户家目录等
  - Mariadb：/var/lib/mysql目录
- 其他在Linux主机上面提供服务的数据库文件



如果因为经费有限等原因，至少需要备份下列目录

- /etc
- /home
- /root
- /var/spool/mail
- /var/spool/cron
- /var/spool/at
- /var/lib



不需要备份的目录：

- /dev
- /proc, /sys, /run
- /mnt, /media
- /tmp



备份媒体的选择：

经费充足的情况下，可以使用外接式NAS设备

经费不足的情况下，可以使用磁盘来备份



看到20.4 备份的种类、频率与工具的选择



---

### 2018-8-2

CentOS 7.x的initramfs 文件内容

`sudo lsinitrd /boot/initramfs-3.10.0-862.el7.x86_64.img`

可以看见init确实被systemd取代了

要解开此文件，先要去除前面的 kernel/x86/microcode/GenuineIntel.bin之前的文件



1. 获取需要去除的容量：

`sudo cpio -i -d --no-absolute-filenames -I /boot/initramfs-3.10.0-862.el7.x86_64.img`

结果 192blocks，容量=192*512=98304B

2. 将不需要的档案头文件部分去除

`sudo dd if=/boot/initramfs-3.10.0-862.el7.x86_64.img of=initramfs.gz bs=98304 skip=1`

3. 解压产生的文件

`gzip -d initramfs.gz`

产生了新的cpio文件，再用cpio解开

`cpio -d -i -H newc --no-absolute-filenames < initramfs`

解压后`ll`发现几乎产生了一个小型的根目录，这样就可以让kernel挂载了



核心载入完成后，主机硬件就准备就绪了，此时核心会呼叫systemd作为第一支程式。

systemd通过预设的/etc/systemd/system/default.target 来规划准备软件的使用环境

预设的操作环境：

multi-user.target 和 graphical.target两个

systemd为了和systemV的操作行为兼容，将runlevel与系统操作环境做了结合

`ll -d /usr/lib/systemd/system/runlevel*.target | cut -c 28-`



init 0	= systemctl poweroff

init 1 	= systemctl rescue

init 2-4 	= systemctl isolate multi-user.target

init 5	= systemctl isolate graphical.target

init 6	= systemctl reboot



/etc/systemd/system/graphical.target.wants 	使用者设定载入的wants

/usr/lib/systemd/system/graphical.target.wants	系统预设载入的wants



systemd的开机流程：

 1	local-fs.target + swap.target：挂载本机 /etc/fstab 里面所规范的文件系统与内存交换空间

2	sysinit.target ：侦测硬件，载入所需要的核心模组等

3	basic.target：载入主要的周边硬件驱动与防火墙相关的服务

4	multi-user.target下的一般系统和网络服务

5	图形界面相关服务如gdm.service 等其他服务



开机启动指令或者脚本可以写入 /etc/rc.d/rc.local



其他常见的环境设定文件
authconfig：用于使用者的身份验证。建议使用 authconfig-tui 来修改

cpupower：Linux核心如何操作CPU的原则，预设是用多少算多少

firewalld, iptables-config, ip6tables-config, ebtables-config:

都是防火墙服务的启动

network-scripts：设置网卡，在服务器架设篇才会提到



核心一般是压缩文件，只有解压缩之后才能使用

核心和核心模组的位置：

核心： /boot/vmlinuz或/boot/vmlinuz-version

核心解压缩所用RAM Disk： /boot/initramfs

核心模组：/lib/modules/version/kernel或/lib/modules/$(uname -r)/kernel

核心源码：/usr/src/linux或/usr/src/kernels

核心顺利载入后，会记录下来：

核心版本：/proc/version

系统核心功能：/proc/sys/kernel

有一个新的硬件，操作系统不支持，怎么办？

- 重新编译核心，并加入最新的硬件驱动程序源码
- 将该硬件的驱动程序编译为模组，在开机时载入该模组



核心模组的放置处: /lib/modules/$(uname -r)/kernel

该目录下有一下几个次目录：

arch	与硬件平台有关的项目，CPU等级等

ctypto	核心支持的加密算法

drivers	一些硬件的驱动程序

fs		核心支持的filesystem

lib		一些函数库

net		与网络有关的各项协议文件

sound	与音效有关的各项模组



检查模组相依性：

`depmod [-Ane]`

-A	搜寻比modules.dep更加新的模组，找到新的模组才会更新

-n	不写入modules.dep，而是直接输出结果(stdout)

-e	显示出现在已经载入的不可执行的模组名称

kernel核心模组后缀名一定是.ko



`lsmod`显示核心目前已经载入的模组

`modinfo [-F field] [-adln] [module_name|filename]`查看模组信息

-F	仅列出后面接的项目（author description license parm depends alias等）

-a	仅列出作者名称

-d	仅列出description

-l	仅列出授权license

-n	仅列出模组的路径



看到19.2.3 核心模组的载入与移除





---

### 2018-8-1

18-1	什么是登录档

记录系统活动的几个档案，何时何人何地做了什么事

CentOS 7的登录档：

记录daemon运行过程中产生的信息

- 解决系统错误
- 解决网络服务问题
- 过往事件的记录



常见登录档文件名

/var/log/boot.log		上次开机时启动的信息

/var/log/cron			例行性工作的日志

/var/log/dmesg		系统开机时核心侦测的信息

/var/log/lastlog		可以记录最近一次登录系统的相关资讯

/var/log/mail*		记录邮件往来的信息，主要是记录postfix（SMTP）和dovecot（POP3）信息

/var/log/messages	系统发生的错误信息记录

/var/log/secure		所有需要输入密码的软件

/var/log/wtmp(faillog)	正确登录系统(wtmp)和错误登录(faillog)的信息

/var/log/httpd/*

/var/log/samba/*		网络服务记录



记录登录档需要的程序和服务有：

- systemd-journald.service 主要的信息收集
- rsyslog.service 登录系统与网络等服务的信息
- logrotate 进行登录档的轮替



18-2	rsyslog.service 记录登录档的服务

设定档：/etc/rsyslog.conf

规定了[服务名称	信息等级	    信息记录在哪里]

Linux核心的syslog服务类型

0	kernel	核心产生的信息

1	user	使用者产生的信息

2	mail	邮件收发产生的信息

3	daemon	系统服务信息

4	auth	认证授权有关的机制

5	syslog	由syslog产生的信息

6	lpr		打印相关信息

7	news	新闻群组服务器有关

8	uucp	全名：Unix to Unix Copy Protocol

9	cron	例行工作

10	authpriv	类似auth，但记录更多账户的私人信息

11	ftp		与FTP通信协议相关的信息

16-23	local0-local7	保留给本机用户使用的登录档信息



将各种类别的服务的登录档，记录在不同的档案中，就是/etc/rsyslog.conf要做的



信息等级

7	debug

6	info

5	notice

4	warning

3	err			重大的错误信息

2	crit			更严重的错误信息

1	alert		警告，更加严重

0	emerg		系统即将宕机，硬件出问题导致核心无法顺利工作才会发出



等级连接符：

.	比后面还要严重的等级都被记录。mail.info：只有等级高于info的信息才被记录

.=	只记录后面等级的信息

.!	反向选择，只有低于这个等级的信息才被记录



常见的放置记录档位置：

/var/log

/dev/lp0	打印机

使用者名称	显示给使用者

远程主机

\*		线上的所有人



/etc/rsyslog.conf文件格式

mail.info	/var/log/maillog

意为把mail相关的信息，等级高于info，都写入后面的文件



news.\*;cron.\*	/var/log/cronnews	把news和cron产生的信息写入

news.=warn;cron.=warn	/var/log/cronnews.warn	把warn等级的信息另外写入



查看rsyslog.conf

`cat /etc/rsyslog.conf | grep -v '^#' | grep -v '^\$' | grep -v '^$'; cat /etc/rsyslog.conf | grep '#kern'`

如果登录档被删除，很大可能是主机被黑了

登录档只要被编辑过就无法继续记录，此时需要重启`rsyslog.service`

增加隐藏属性，使登录档无法被删除，只能被添加，但是会导致我们无法使用logrotate

`chattr +a /var/log/kern.log`

查看`lsattr /var/log/`

rsyslogd，可以使用一台机器作为登录档服务器

网络较为稳定，可以使用UDP，想要信息稳定传输，建议使用TCP

将加注释的下面两行的注释取消

```
# Provides TCP syslog reception
$ModLoad imtcp
$InputTCPServerRun 514
```

重启rsyslogd

登录档发送客户端：

/etc/rsyslog.conf

要将所有信息发送给服务器(192.168.1.100)的话，添加：

`*.* @@192.168.1.100`TCP

`*.* @192.167.1.100`UDP



18-3	登录档的轮替

logrotate程序是在cron 中进行的

`ls /etc/cron.daily`

logrotate的设定档

/etc/logrotate.conf

/etc/logrotate.d

执行一次logrotate，原log文件会变成 log.1，然后在创建一个新的log空文件，继续存储日志

.conf设定语法

登录档的文件名 {

​	个别参数设定值

​	sharedscripts

​	prerotate # 轮替前执行的命令

​	  /usr/bin/chattr -a /var/log/messages

​	endscript

​	sharedscripts

​	postrotate # 轮替后执行的命令

​	  /usr/bin/chattr +a /var/log/messages

​	endscript

}



`logrotate -v /etc/logrotate.conf`进行轮替



18-4	systemd-journald.service简介

建议启动rsyslodf来协助分类记录。因为systemd-journald只记录本次开机的情况

`journalctl [-nrpf] [--since TIME] [--until TIME] _optional`

-n	显示最近几行，也就是最新的记录

-r	反向输出，显示最旧的记录

-p	输出后面接的信息的重要性排序

-f	持续显示日志内容

--since --until		设定开始与结束的时间

\_SYSTEMD\_UNIT=unit.service	只输出unit.service 的信息

_COMM=bash	只输出与bash有关的信息

_PID=pid		只输出PID为pid的信息

_UID=uid		只输出UID为uid的信息

SYSLOG\_FACILITY=[0-23]	使用syslog.h规范的服务相对序号来呼叫出正确的资料

`logger [-p daemonname.level] "message"`让自己的信息存入登录档

`logger -p user.info "I will check logger command"`

保存journal：

创建目录`/var/log/journal`



18-5	分析登录档

CentOS 7预设使用 logwatch 进行登录档分析

安装：挂载iso到/mnt

`yum install /mnt/Packages/perl-5.*.rpm /mnt/Packages/perl-Date-Manip-*.rpm /mnt/Packages/perl-Sys-CPU-*.rpm /mnt/Packages/perl-Sys-MemInfo-*.rpm /mnt/Packages/logwatch-*.rpm  `

安装之后就将logwatch写入cron.daily了

#### 第十九章 开机流程、模组管理与loader

19-1	Linux开机流程分析

1. 载入BIOS硬件信息并进行自检，依据设置取得第一个可开机的装置
2. 读取并执行第一个开机装置（硬盘）内MBR的boot loader
3. 依据boot loader 的设定载入Kernel，Kernel开始侦测硬件与载入驱动程序
4. 硬件驱动成功后，Kernel会主动调用systemd程序，并以default.target流程开机
   1. systemd 执行 sysinit.target 初始化系统及basic.target 准备操作系统
   2. systemd 执行 multi-user.target 下的本机与服务器服务
   3. systemd 执行 multi-user.target 下的 /etc/rc.d/rc.local 档案
   4. 。。。。。。。。。。。。。。。。。getty.target 及 登录服务
   5. 。。。。。。。graphical需要的服务



核心启动后会接管BIOS的工作，重新检测一次硬件设备

核心档案 /boot/vmlinuz

核心模组 /lib/modules (/lib 与 / 不可以放在不同的partition中)

目前驱动程序都是在 /lib/modules内的，但是在核心不认识SATA硬盘的情况下，无法挂载根目录，也就无法读取SATA的驱动程序，此时需要虚拟档案系统来处理。



虚拟档案系统（Initial RAM Disk/Filesystem）

文件名一般是 /boot/initrd 或 /boot/initramfs

能通过boot loader 载入内存，然后被解压缩为一个根目录，能够提供一个可执行文件，通过这个文件来载入开机过程需要的核心模组，如USB、RAID、LVM、SCSI等

载入完成后，可以帮助核心重新调用　systemd来开始后续的正常开机流程

看到图19.1.3



---

### 2018-7-31

#### 第十七章 认识系统服务（daemons）

常驻在内存中的程序，命名一般是程式名加d（daemon）

在SystemV时，由init去启动所有系统服务

CentOS 7 已经不再用init 管理，相关的管理方式可以查看[鸟哥的旧版教程](http://linux.vbird.org/linux_basic/0560daemons//0560daemons-centos5.php)

使用systemd来管理启动服务

优点：

- 平行处理所有服务，加速开机流程，可以让所有的服务同时启动
- 一经要求就回应的on-demand启动方式，仅通过systemd服务和systemctl指令来处理
- 自行检查服务相依性，如果相依的服务没有启动，systemd会自动帮忙启动
- systemd将所有的服务都作为服务单位（unit），并将其分为不同的类（type），如：service, socket等
- 将多个服务集合成一个target，启动target就启动了很多daemon
- 向下兼容init脚本

无法完全取代init的地方

- runlevel对应：只有1，3，5对应systemd的target
- 不可自定参数
- 手动启动的服务无法通过systemd侦测到，也无法进行后续管理
- 无法通过stdin传入信息



systemd的设定文件：

- /usr/lib/systemd/system：每个服务的主要启动脚本设定
- /run/systemd/system：系统执行过程中产生的服务脚本，优先级高于上面的
- /etc/systemd/system：管理员依据主机系统的需求建立的执行脚本，优先级更高，开机时会先查看此目录，来启动开机需要启动的服务，实际上此目录都是链接到/usr/lib/systemd/system的链接文件



常见的systemd服务类型：

.service	一般服务类型，主要是系统服务，经常被使用到的服务都是这个类型

.socket	内部程序信息交换服务，主要是IPC的传输信息插槽文件，一般是比较不常用的服务

.target	执行环境类型，是一群unit的集合，也就是一群其他服务的集合

.mount/.automount	文件系统挂载服务，来自网络的自动挂载，NFS文件系统等

.path	侦测特定文件或目录类型，用于需要某些目录来支持的服务

.timer	循环执行的服务，类似与anacrontab



通过`systemctl`来管理服务

服务的启动分为：现在立即启动和开机时是否启动

`systemctl [command] [unit]`

command:

start	立即启动后面的unit

stop	立即关闭后面的unit

restart	立即重启后面的unit

reload	不关闭后面的unit情况下，重新载入设定文件

enable	设定下次开机时，启动后面的unit

disable	下次开机不启动后面的unit

status	目前后面unit的状态，列出是否正在执行，开机是否启动，登录

is-active	目前有没有正在运行

is-enabled	开机时有没有预设要启用

mask		强制注销服务

unmask		解除强制注销



Active状态：

active(running)	正在执行

active(exit)		仅执行一次就正常结束的服务

active(waiting)	等待其他事件才能继续处理

inactive			服务没有运作



daemon预设状态

enabled	开机执行

disabled	开机不会执行

static	不可以自己启动，但是可以被其他enabled服务来唤醒

mask	无论如何都不能启动`systemctl unmask`可以改回原来的状态



相互依赖的服务会在启动一个服务时，自动启动依赖的服务，所以必须全部关掉才能保证不被启动



通过systemctl观察系统上的所有服务：

`systemctl [command] [--type=TYPE] [--all]`

command

list-units		列出目前启动的unit，--all可以列出没启动的

list-unit-files	将所有文件列表说明

--type=TYPE	unit type



取得target

`systemctl [command] [unit.target]`

command:

get-default	取得目前的target

set-default	设定一个target为默认的操作模式

isolate		切换到后面的target模式



multi-user.target	命令行模式

graphical.target	图形模式



切换操作模式的指令`systemctl [command]`

command:

poweroff	关机

reboot		重启

suspend		暂停模式，将资料状态保存在内存中，然后关掉大部分硬件，并没关机

hibernate	休眠模式，将状态保存在硬盘中，关机

rescue		救援模式

emergency	紧急救援模式



追踪unit的相依性

`systemctl list-dependencies [unit] [--reverse]`

--reverse	表示谁会用到unit这个服务

直接查询表示查询unit的相依服务



系统daemon相关目录：除了上面的三个以外

/etc/sysconfig/*	所有服务的初始化选项

/var/lib			会产生资料的服务，都会将资料写入此目录

/run			放置临时文件



让网络服务和端口号对应的文件：/etc/services

建议关闭不必要的网络服务

`netstat -tlunp`查看

关闭 avahi-daemon

一般服务器至少需要25号端口，22号端口需要防火墙，其余的端口都可以关闭了



想要建立服务：

需要修改/etc/systemd/system

官方预设的设定文件在 /usr/lib/systemd/system/vsftpd.service

个人设定文件可以写在：/etc/systemd/system/vsftpd.service.d/custom.conf

/etc/systemd/system/vsftpd.service。wants/*	放置连接文件，启动vsftpd.service后，最好再加上这个目录下建议的服务

/etc/systemd/system/vsftpd.service.requires/*	放置连接文件，启动服务前，需要事先启动哪些服务



设定文件的结构:

Unit		unit本身的说明

- Description
- Documentation
- After 表示在哪个daemon之后启动，仅是说明启动顺序，不强制要求
- Before 同，仅说明启动顺序
- Requires 必须在哪个daemon之后启动，强制要求的相依服务
- Wants 最好在启动服务后，再启动这些服务
- Conflicts 冲突的服务

	ervice、Socket、Timer、Mount、Path	不同的unit type使用相应的设置

Service部分

- Type 代表启动方式
  - simple 预设，表示这个daemon由ExecStart接的指令串来启动
  - forking 由ExecStart启动的程序通过spawns延伸出其他子程序来作为此daemon的主要服务
  - oneshot 类似simple，，不过这个程序在工作完成后就结束了
  - dbus 必须取得一个D-Bus名称后，才能继续运行，需要设定Bus Name
  - idle  类似simple，要执行这个daemon必须要所有工作都执行完才行 
- EnvironmentFile 指定脚本的环境
- Exec Start 实际执行此daemon的指令或脚本程序。
- ExecStop  与systemctl stop 有关
- ExecReload 与systemctl reload有关
- Restart 结束一个服务后，这个服务会马上重启
- RemainAfterExit 
- TimeoutSec  强制结束等待时间
- KillMode 
- RestartSec 服务重启等待时间

	nstall		将此unit安装到哪个target的意思

- WantedBy 这个unit本身是挂在哪个target下
- Also 当这个服务被enable，此项目后面的unit也enable
- Alias 建立别名



建立两个同时运作的vsftp

复制一份`vsftpd.conf`在/etc/vsftpd下，命名为`vsftpd2.conf`，修改监听端口

`cp vsftpd.conf vsftpd2.conf`

复制一份启动脚本设定，修改Description为新的描述，Exec Start目录为刚才的conf文件

`cp /usr/lib/systemd/system/vsftpd.service vsftpd2.service`

重新载入systemd脚本设定

`systemctl daemon-reload`

`systemctl list-unit-files --all | grep vsftpd`

重启服务

`systemctl restart vsftpd.service vsftpd2.service`

在设置新的服务开机自启就好了

设定规则：

- 设定项目是可重复的，后面的会覆盖前面的
- 逻辑值设定可以使用：0/1 yes/no true/false on/off 都可以
- 空白行、开头为#或；的行都表示注释



将tty的数量降低到4个

`systemctl stop getty@tty5.service`

` systemctl stop getty@tty6.service`

`systemctl restart systemd-logind.service`

打开第8个tty

`systemctl start getty@tty8.service`



暂时新增vsftpd到2121端口

利用/usr/lib/systemd/system下的vsftp@.service

文件中 %i 表示的就是@后面接的数字

新增 vsftpd3.conf，监听端口2121

然后启动服务

`sudo systemctl start vsftpd@vsftpd3.service`

启动成功



自己新建一个service

1. 新建执行脚本，给予权限
2. 在/etc/systemd/system/目录下添加文件，设置好Unit，Service，Install

```bash
[Unit]
Description=backup my server
Requires=atd.service

[Service]
Type=simple
ExecStart=/bin/bash -c " echo /backups/backup.sh | at now"

[Install]
WantedBy=multi-user.target
```

3. `systemctl daemon-reload`重新载入配置文件
4. `systemctl start`开启服务



使用 Timer来代替crontab

使用Timer的前提

- 系统的timer.target必须启动
- 需要有一个 something.service 服务存在（something是自己设置的名字）
- 需要有一个 something.timer 时间启动服务存在



something.timer的设定值

`/etc/systemd/system/*.timer`

| 設定參數          | 參數意義說明                                                 |
| ----------------- | ------------------------------------------------------------ |
| OnActiveSec       | 當 timers.target 啟動多久之後才執行這隻 unit                 |
| OnBootSec         | 當開機完成後多久之後才執行                                   |
| OnStartupSec      | 當 systemd 第一次啟動之後過多久才執行                        |
| OnUnitActiveSec   | 這個 timer 設定檔所管理的那個 unit 服務在最後一次啟動後，隔多久後再執行一次的意思 |
| OnUnitInactiveSec | 這個 timer 設定檔所管理的那個 unit 服務在最後一次停止後，隔多久再執行一次的意思。 |
| OnCalendar        | 使用實際時間 (非循環時間) 的方式來啟動服務的意思！至於時間的格式後續再來談。 |
| Unit              | 一般來說不太需要設定，因此如同上面剛剛提到的，基本上我們設定都是 sname.server + sname.timer，那如果你的 sname 並不相同時，那在 .timer 的檔案中， 就得要指定是哪一個 service unit 囉！ |
| Persistent        | 當使用 OnCalendar 的設定時，指定該功能要不要持續進行的意思。通常是設定為 yes ，比較能夠滿足類似 anacron 的功能喔！ |



时间设定的格式：

`英文周名	YYYY-MM-DD	HH:MM:SS`

`Thu 2018-07-31 13:00:00`

小单位写在前面

`10s 300m 5day`



一些服务介绍：（服务器）

abrtd				让使用者可以针对不同的应用软件去设计登录错误的机制

accounts-daemon	进行使用者账户信息查询

alsa-X				音效有关，服务器可以关闭这些服务

atd		at的服务

auditd	SELinux所需服务之一

avahi-daemon	客户端的服务，自动分析与管理网络，可以关闭

brandbot, rhel-*	用于关机过程中需要的各种侦测环境的脚本，也提供网络界面的启动和关闭

chronyd, ntpd, ntpdate	用于网络时间矫正

cpupower	提供CPU的运作规范。/etc/sysconfig/cpupower有详细内容

crond	crontab支持服务

cups	印表机（打印机）服务，没有的话可以关闭

dbus	使用D-Bus方式在不同的应用程序间传送信息

dm-event，multipathd	监控装置对应表的服务（device mapper）

dmraid-activation, mdmonitor	启动Software RAID的服务

dracut-shutdown		用来处理initramfs相关行为，和开机流程相关性较高

ebtables		设定网卡为桥接时的封包分析政策。防火墙

emergency、rescue	紧急模式和救援模式的服务

firewalld		防火墙系统，取代iptables

gdm	GNOME登入管理员

getty@	在本机产生几个终端的服务

hyper、ksm、libvirt、vmtoolsd	虚拟机相关服务

irqbalance	多核心硬件的系统需要这个服务，可以自动分析系统中断

iscsi		可以挂载来自网络磁碟机的服务

kdump	Linux核心出错时，用来记录内存的东西

lvm2-*	LVM相关的许多服务

microcode	Intel的CPU提供的微指令集

ModemManager、network、NetworkManager* 		数据机，网络设定的服务

quotaon		启动Quota用到的服务

rc-local		相容 /etc/rc.d/rc.local的调用方式，必须有x权限

rsyslog		记录系统产生的各项讯息

smartd		自动的侦测硬盘状态，发生问题时回报给管理员

sysstat		sar指令会记录系统资源的使用情况，这个服务用来让这些情况写入log

systemd-*	系统运作过程需要的服务

plymount*、upower	与图形界面使用相关的服务



查询服务端口

`cat /etc/services | grep Port`



#### 第十八章 认识与分析登录档



---

### 2018-7-30

#### 程序管理与SELinux初探

PID：给予程序的ID

根据使用者的权限，程序也会拥有不同的权限

在程序中调用程序后，互称父子程序，由PPID（Parent PID）可以得知父程序

如果有process在被kill之后又出现，如果不是crontab，就肯定是父程序的问题，只要kill掉父程序就好了

Linux程序调用的流程： fork and exec，先由父程序复制一个子程序，再以exec的方式来执行

常驻内存的程序：系统和网络服务（daemon）

- 一般daemon程序名后面都有个d

Linux的多人环境：

- 每个人的系统环境都可以随每个人的喜好来设定：~/.bashrc 因为每个人取得的shellPID不同
- Linux预设了六个命令行界面和一个图形界面使用ALT+ F1~F7来切换
- Linux可以随时kill掉死掉的程序，输入`ps -aux`找出错误的程序再kill掉就好了
- `cp file1 file2 &`可以在后台进行程序

工作管理

- 要管理的工作必须是你shell的子程序
- 你可以控制和下达指令的环境称为前景
- 可以自行运作，无法用^C终止的程序，称为背景，可以使用`bg/fg`呼叫该工作
- 背景中执行的程序不能等待终端的输入



`&` 在指令的末尾，就可以使指令进入背景运行，并在开始运行时显示工作号码和PID，结束运行时显示ＤＯＮＥ

但是如果指令有stdout，还是会输出在前景上，所以需要使用 &> log.txt 将数据流导向文件

`^z`可以将目前的程序放入背景，并暂停程序

`jobs [-lrs]`查看目前背景工作状态

`-l`除了jobnumber和指令串外，同时列出PID号码

`-r`仅列出在背景run的工作

`-s`仅列出正在背景中暂停的工作

列出的程序中带有+表示是最后一个被放入背景，带有-表示是倒数第二个被放入背景，倒数第三个及以上就没有标志了



`fg %jobnumber`将工作拉回前景来进行

`bg`让程序在背景中的状态变为运行中

`kill -signal %jobnumber`结束背景工作

`kill -l`

`-l`列出当前kill能使用的signal

signal:

- -1 重新读取一次参数设定文件
- -2 由键盘输入^c同样的动作
- -9 立刻强制删除一个工作
- -5 以正常的方式终止一项工作

一般知道正常关闭顺序的程序应该使用正常关闭顺序关闭，不知道的情况下才用kill -9



!注意，上文提到的背景指的是shell的背景，主要作用是可以避免被 ^C结束掉，当shell结束时，背景中的工作也会结束

`nohup`可以把工作放入系统背景，即使登出ssh工作还可以继续

nohup不支持bash的内建指令，指令必须是外部指令

`nohup scripts &`

登出再登录，用`pstree`查看，发现脚本还在执行



程序查看

`ps aux`查看系统所以程序的情况

`ps -lA`同样观察所有程序

`-l`	较长，较详细地列出该程序的信息

-A	显示所有的Process

`ps axjf`连同部分程序树状态也显示

-a	显示不与终端有关的process

x	通常和a一起用，可以列出完整信息

j	列出工作的格式

f	做更为完整的输出



`ps -l`查询自己bash的程序状态

F	process flag

- 4表示权限为root
- 1表示子程序仅有复制而没有执行的权限

		process status

- R表示程序正在运作中
- S表示程序在睡眠状态
- D表示不可唤醒的睡眠状态，可能是在等待IO
- T停止状态，可能是在工作控制或除错状态
- Z僵尸状态，程序已经终止但无法被移出内存

	ID/PID/PPID	此程序被该UID拥有，程序PID，程序PPID

			CPU使用率

	RI/NI	Priority/Nice，CPU执行的优先级，数字越小优先级越高

	DDR	kernel function，指出该程序在内存的哪个部分

	Z		此程序用掉多少内存

	CHAN	目前程序是否在运行，- 代表在运行

	TY		登入者的终端号

	IME	用掉的CPU时间

	MD	此程序的指令

`ps aux`查询所有系统程序的状态

USER	process的所属用户

PID		process的程序识别码

%CPU	使用掉的CPU资源占比

%MEM	占用的实体内存百分比

VSZ		占用的虚拟内存量KB

RSS		占用的固定内存量

TTY		在哪个终端运作，若无终端则显示？

STAT	程序状态，与`ps -l`的flag相同

TIME	使用的CPU运作时间

COMMAND	程序的指令



僵尸程序的成因是本应该结束的程序，系统却无法将其结束，于是就留在内存中



`top [-d number] | top [-bnp]`动态观察程序的变化

-d	接秒数，画面更新的间隔，秒

-b	按批次执行top

-n	和b搭配，设置进行的次数

-p	指定某些PID来进行观测

在执行过程 中可以使用的按键



`top -b -n 2 > /tmp/top.txt`将top的结果输出到文件

`top -d 2 -p PID`观察PID为PID的process

`$$`获取当前bash的PID



`pstree [-A|U] [-up]`

-A	各程序树之间的连接以ASCII字符表示

-U	各程序树之间的连接以UNICODE来表示

-p	同时列出每个process的PID

-u	同时列出每个process所属的账号名称



程序之间管理的signal：`kill -l`

1	SIGHUP		重启程序，可让程序重新读取自己的设定文件

2	SIGINT		中断程序，相当于^C

9	SIGKILL		强制中断，可能会留下临时文件

15	SIGTERM	以正常的方式结束程序，如果无法使用正常的程序结束，那么这个signal没有用

19	SIGSTOP		相当于^z	暂停程序



`killall [-ile] [command name]`

-i	interactive 互动式，若要删除时会出现提示字符

-e	exact，后面的command name要一致，但命令不能超过15个字符

`-l`	指定名称忽略大小写



执行优先级：

PRI是由核心动态调整的，用户只能通过改NI的方式来调整PRI：

PRI[new] = PRI[old] + NI

但是最后的PRI值并不是简单的求和结果，而是由核心分析后决定的



更改NI：top -> r -> input PID -> input NI value



- nice值的范围是 -20 ~ 19
- root可以调整自己或他人程序的nice值
- 一般用户可调整自己的nice值，且范围是0~19
- 一般用户只能将nice值越调越高



`nice [-n number] command`给command在执行时就加上新的nice值

number 的范围是 -20~19，指的是在原有的nice值下加上一个值，变成新的nice值



`renice [number] PID`

设置PID为PID的process优先级为number



观察系统资源

`free [-b|-k|-m|-g|-h] [-t] [-s N -c N]`内存使用情况

-b	可以自己指定单位：b=bytes，m=Mbytes, k=Kbytes。。。-h表示让系统自己指定单位

-t	在输出的结果中显示内存和虚拟内存的总量

-s	让系统每几秒钟输出一次



如果发现系统使用的swap超过20%，请及时添加内存



`uname [-asrmpi]`查阅系统与核心相关信息

-a	所有系统相关的信息

-s	系统核心名称

-r	核心版本

-m	系统的硬件名称

-p	CPU的类型，与-m类似

-i	硬件的平台



`uptime`观察系统启动时间与工作负载，显示的是开机时间和1、5、15分钟的平均工作负载

`netstat [-atunlp]`追踪网络或插槽

-a	列出系统所有的连接、监听、Socket信息

-t	列出tcp网络封包的信息

-u	列出udp网络封包的信息

-n	不以程序的服务名称，以端口号来表示

-l	列出目前正在监听的服务

-p	列出该网络服务的PID

显示信息的意义：

Proto	网络封包的协定

Recv-Q			非由使用者程式連結到此 socket 的複製的總 bytes 數； （看不懂。。。。）

Send-Q			非由遠端主機傳送過來的 acknowledged 總 bytes 數； 

Local Address	本地端IP端口情况

Foreign Address	远端主机的IP端口情况

State			连线状态



socket file 可以沟通两个程序之间的信息。

上面指令显示的socket file项目的意义：

Proto	一般都是unix

RefCnt	连接到此socket的程序数量

Flags	连线的flag

Type	socket的存取类型，主要有STREAM和DGRAM两种

State	若为CONNECTED表示多个程序之间已经建立连线

Path	连接到此socket的相关程序路径



`netstat -tulnp`查看程序启动的网络后门（监听的端口等）

`dmesg`分析核心产生的信息

一般配合`less`使用`dmesg|less`

`vmstat`侦测系统资源变化，动态显示系统资源的运作

`vmstat [-a] [延迟[总计侦测次数]]`CPU、内存等信息

`vmstat [-fs]`内存相关

-f	开机到目前为止，系统复制的程序数

-s	将开机到目前为止，事件导致内存状态变化情况列表说明

`vmstat [-S 单位]`

-S	让显示的信息有单位 K M等

`vmstat [-d]`

-d	列出磁盘读写总量的统计表

`vmstat [-p 分隔槽]`

-p	可显示该分隔槽的读写总量统计表



`vmstat 1 3`统计目前CPU状态，每秒1次，共3次

`vmstat 5`代表5秒一次，无穷次，只能用^C停止

`vmstat`显示的信息意义：

procs：这里的数量越多，系统越忙碌

r		等待运行的程序数量

b		不可被唤醒的程序数量

memory：

swpd	虚拟内存被使用的容量

free		未被使用的内存量

buff		缓冲区容量

cache	快速读取的内存容量

swap：如果这里的数值很大表示内存和磁盘经常进行存取，系统速度会很慢

si		由磁盘中将程序取出的量

so		由于内存不足而将没用的程序写入swap的量

io：此处数量大表示系统IO繁忙

bi		从磁盘读入区块的量

bo		写入磁盘的区块数量

system：此处代表系统与周边设备的沟通频率

in		每秒被中断的程序次数

cs		每秒进行的事件切换次数

cpu：

us		非核心层的CPU使用状态

sy		核心层使用的CPU状态

id		闲置的状态

wa		等待IO所耗费的CPU状态

st		被虚拟机盗用的CPU使用状态



`vmstat -d`可以显示磁盘的信息

寻找有特殊权限的文件`find / -perm /6000`



/proc/*各文件的意义：

各个程序（进程process）的PID都以目录的形式存在/proc中

查看/proc/1的内容

主要看：

- cmdline	是这个程序被启动的指令串
- environ   是这个程序的环境变量内容

	  /proc/cmdline	載入 kernel 時所下達的相關指令與參數！查閱此檔案，可瞭解指令是如何啟動的！

	  /proc/cpuinfo	本機的 CPU 的相關資訊，包含時脈、類型與運算功能等

	  /proc/devices	這個檔案記錄了系統各個主要裝置的主要裝置代號，與 mknod 有關呢！

	  /proc/filesystems	目前系統已經載入的檔案系統囉！

	  /proc/interrupts	目前系統上面的 IRQ 分配狀態。

	  /proc/ioports	目前系統上面各個裝置所配置的 I/O 位址。

	  /proc/kcore	這個就是記憶體的大小啦！好大對吧！但是不要讀他啦！

	  /proc/loadavg	還記得 top 以及 uptime 吧？沒錯！上頭的三個平均數值就是記錄在此！

	  /proc/meminfo	使用 free 列出的記憶體資訊，嘿嘿！在這裡也能夠查閱到！

	  /proc/modules	目前我們的 Linux 已經載入的模組列表，也可以想成是驅動程式啦！

	  /proc/mounts	系統已經掛載的資料，就是用 mount 這個指令呼叫出來的資料啦！

	  /proc/swaps	到底系統掛載入的記憶體在哪裡？呵呵！使用掉的 partition 就記錄在此啦！

	  /proc/partitions	使用 fdisk -l 會出現目前所有的 partition 吧？在這個檔案當中也有紀錄喔！

	 /proc/uptime	就是用 uptime 的時候，會出現的資訊啦！

	  /proc/version	核心的版本，就是用 uname -a 顯示的內容啦！

	  /proc/bus/*	一些匯流排的裝置，還有 USB 的裝置也記錄在此喔！



`fuser [-umv] [-k [i] [-signal]] file/dir`由文件或文件系统找出正在使用该文件的程序

-u	除了程序的PID之外，同时列出该程序的拥有者

-m	后面接的文件名会主动地提到文件系统最顶层，对卸载不成功很有效

-v	可以列出每个文件与程序还有指令的完整相关性

-k	找出使用该文件/目录的PID，并试图把SIGKILL讯号发送给这个PID

-i	必须和k配合，在删除PID之前询问使用者

-signal	发送signal，预设是-9，SIGKILL



当想要卸载磁盘时发现Device is busy，就可以使用fuser来追踪



`fuser -uv .`

此处的权限项目意义为：

c	此程序在当前目录下

e	可被触发为执行状态

f	是一个被开启的文件

r	代表顶层目录

F	该文件被开启了，不过在等待回应中

m	可能为分享的动态函数库



`fuser -mvu dir`可以看到有多少进程在存取这个目录

有进程在存取文件系统时，这个分区就无法卸载

`fuser -mki dir`可以一个一个地删除这些正在使用的进程

`fuser`也可以对文件使用，查看有哪些进程在存取文件

`fuser -uv /run/systemd/sessions/5.ref`



`lsof [-auU] [+d]`列出被程序所开启的文件名

-a	多项文件需要同时成立才显示结果：AND

-U	仅列出UNIX like系统的socket档案类型

-u	后面接username，列出该使用者相关程序所开启的文件

+d	后面接目录，即，找出某个目录下已经被开启的文件



`pidof`找出某个正在执行的程序的PID

`pidof [-sx] programname`

-s	仅列出一个PID而不列出其他PID

-x	同时列出该程序可能的父程序的PID



SELinux（Security Enhanced Linux）

自主式存取控制（Discretionary Access Control，DAC）：就是之前一直使用的依据程序拥有者的rwx权限来决定存取能力

DAC的弊端：

- root有至高无上的权力，如果被cracker获得，会造成很大麻烦
- 使用者可以取得程序来变更文件资源的存取权限。不小心把权限设置成777等问题



委任式存取控制：MAC

可以针对特定程序与特定的文件资源来进行权限控制。

也就是说，即使是root，在获得某些程序时，权限不一定是root

![]({{ site.url }}/imgs/Vbird/16-1.1.png)

这是Apache网络服务使用DAC和MAC的不同结果



SELinux 的运作方式

通过MAC管理程序，目标是该程序能否读取的档案资源

- 主体（Subject）：SELinux管理的程序，=process
- 目标（Object）：主题程序能否存取的目标资源，一般是文件系统
- 政策（Policy）：SELinux会依据某些服务来制订基本的存取安全性政策。这些政策内有详细的规则来指定不同的服务。
  - targeted：针对网络服务的限制多，针对本机的限制较少，是预设政策，建议使用
  - minimum：由targeted修订，仅针对选择的程序进行保护
  - mls：完整的SELinux限制，限制方面较为严格
- 安全性文本（security context）：主体与目标的安全性文本必须一致才能顺利存取。如果设置错误会产生权限不符的错误信息



SELinux运作流程：

1. 程序主题请求SELinux验证
   1. SELinux分析政策规则
2. 进行安全性文本比对
   1. 比对正确则通过
   2. 比对错误则AVC拒绝存取的信息说明

通过SELinux之后，程序主体还必须拥有必要的rwx权限才能继续进行对目标的存取



程序存取出现权限不符的情况时，就需要分析SELinux和DAC权限中可能出现的问题

安全性文本（security context）：放置在文件的inode中，读取文件时就可以进行比对

使用`ls -Z`可以查看安全性文本（必须先打开SELinux功能）

其中安全性文本主要分为三栏

`identify:role:type`

身份识别	角色	类型

身份识别（Identify）：

相当于账号方面的身份识别：

​	unconfined_u	不受限的用户，该文件产生于不受限的程序。预设的Bash是不受SELinux限制的。所以产生的文件都是不受SELinux限制的

​	system_u		系统用户，大部分是系统产生的文件

角色（Role）：

通过这个栏位，可以知道资料是属于程序、文件资源还是代表使用者

​	object_r		代表文件或目录等档案资源，也是最常见的

​	system_r	代表程序，一般使用者也会被指定为system_r

类型（Type）：最重要

一个主体程序能不能读取到档案资源与这个有关

​	type	在Object上称为Type

​	domain	在Subject上称为domain



`ps -eZ`

在一个设定好的领域（domain）内的程序只能读取由政策设定好的type的文件，即使这个文件的权限设置为777，如果domain type不对，也无法读取



SELinux的三种模式启动、关闭、观察

- enforcing模式：强制模式，代表SELinux运作中，并且已经正确地开始限制domain/type了
- permissive：宽容模式，仅有警告信息，并不会限制domain/type，此模式用于debug
- disabled：关闭，SELinux没有运作



`getenforce`获取目前的SELinux的模式

`sestatus [-vb]`查看SELinux的政策

-v	检查/etc/sestatus.conf	内的文件与程序的安全性文本内容

-b	将目前政策的规则逻辑值取出，1/0 表示某些规则是否启动



更改SELinux的设定：

直接更改文件`/etc/selinux/config`

改变政策后要重新开机才能生效



在Enforcing模式也可能因为一些设定导致SELinux让某些服务无法正常运作。此时可以把Enforcing模式改为permissive模式

`setenforce [0|1]`

0	permissive模式

1	Enforcing模式

无法在disable模式下切换



查询系统上面的全部规则启动与否。

`sestatus -b`  `getsebool -a`列出目前系统上面所以SELinux规则的逻辑值



查询每个SELinux规则下的具体内容`seinfo`

安装时并没有默认安装seinfo，从光盘（iso）安装

将iso文件挂载到/mnt目录

`mount /dev/sr0 /mnt`

`yum install /mnt/Packages/setools-console-*`

安装完成后就可以使用seinfo了

`seinfo [-trub]`

--all	列出SELinux的状态、规则逻辑值、身份识别、角色、类别等所以资讯

-u	列出所有身份识别的种类

-r	列出所有角色种类

-t	列出所有类别种类

-b	列出所有规则的逻辑值



查询主体类别能够读取的档案类型

`sesearch [-A] [-s SubjectType] [-t ObjectType] [-b Boolean]`

-A	列出后面信息中，允许【读取或放行】的相关信息

-b	后面还要接SELinux的规则



`sesearch -A -s crond_t | grep spool`找出crond_t能够读取的档案类型



`sesearch -A -s crond_t | grep admin_home_t`在用户根目录下建立的checktime为名的cron格式文件类型为admin_home_t，查询cron_t类型是否能读取。

发现居然可以读取，但是这是总体的咨询，没有针对某些规则读取，所以还是不能确定checktime能够被读取



`semanage boolean -l | grep httpd_enable_homedirs`

`sesearch -A -b httpd_enable_homedirs`



修改SELinux规则的Boolean值，setsebool

`getsebool [policyname]`

`sersebool [-P] [policyname] [0|1]`



SELinux安全文本修改

`chcon [-R] [-t type] [-u user] [-r role] file\dir`手动修改

-R	连同此目录也同时修改

-t	后面接安全性文本的类型

-u	后面接身份识别

-r	后面接角色

-v	详细显示

`chcon [-R] --reference=examplefile file\dir`

--reference=	那某个文件作文范例



让SELinux预设目录下的SELinux type（恢复默认设置）

`restorecon [-Rv] file/dir`

-R	连同次目录

-v	verbose



预设目录安全性文本查询与修改

`semanage {login|user|port|interface|fcontext|translation} -l`

`semanage fcontext -{a|d|m} [-frst] file_spec`

fcontext	用于安全性文本方面的用途

-l	查询

-a	增加

-m	修改

-d	删除

将mycron文件夹预设值改为system_cron_spool_t

```bash
 semanage fcontext -a -t system_cron_spool_t "/srv/mycron(/.*)?"
 semanage fcontext -l | grep '^/srv/mycron'
```



setroubleshoot --> 将错误信息写入 /var/log/messages与/var/log/setroubleshoot/*



` rpm -qa | grep setroubleshoot`查询setroubleshoot是否安装

搭建一个FTP来实践SELinux，详细

```bash
useradd -s /sbin/nologin ftptest
echo "myftp123" | passwd --stdin ftptest

yum install /mnt/Packages/vsftpd-3*
systemctl start vsftpd
systemctl enable vsftpd
netstat -tlnp

cp -a /etc/securetty /etc/sysctl.conf /var/ftp/pub

curl ftp://localhost/pub/
curl ftp://localhost/pub/sysctl.conf	# 可以查看
curl ftp://localhost/pub/securetty		# 不能查看
chmod a+r /var/ftp/pub/securetty		# 更改权限
curl ftp://localhost/pub/securetty		# 可以查看了
# 可见不能读取不一定是SELinux的问题
echo "testing" > ~ftptest/test.txt
cp -a /etc/hosts /etc/sysctl.conf ~ftptest/
curl ftp://ftptest:myftp123@localhost/~/
curl ftp://ftptest:myftp123@localhost/~/test.txt	# 没有权限
setenforce 0
curl ftp://ftptest:myftp123@localhost/~/test.txt	# 可以下载了
setenforce 1

```

一系列的遇到无法下载问题如何寻找原因的操作

包含：

- 匿名者无法下载的问题

- 无法从家目录下载文件问题的分析和解决
- 一般账户从非正规目录上传、下载文件
- 无法变更FTP连接端口的问题分析与解决

超出预计时间12分钟完成。下次要加油呀！

---

### 2018-7-28

进个城不容易呀，九点钟整理了这周的指令进了 [指令整理](/2018/07/20/2018-07-20-Linuxcommands/)，明天打扫打扫宿舍，带朋友转转嘉定，游个泳，下周再继续努力吧！

---

### 2018-7-27

> 不积跬步，无以至千里；不积小流，无以成江海。

放大LVM的容量：

- VG中有剩余的容量，可以用vgextend加入新的PV
- 使用lvresize把多余的容量加入LV
- 文件系统的放大，EXT、XFS都支持放大，但只要EXT支持缩小。xfs_growfs即可

`lvresize -L +500M /dev/captainvg/captainlv`

`xfs_growfs /srv/lvm`  不用卸载设备也能操作



LVM thin Volume 时用时取的磁盘容量池，用多少容量分配多少容量



- 从captainvg的剩余容量中取出1G，制作一个 lvpool
- 由captainvg内的lvpool产生名为captainthin的10GBLV装置
- 格式化为xfs文件系统，挂载于/srv/thin目录

`lvcreate -L 1G -T captainvg/lvpool`

`lvcreate -V 10G -T captainvg/lvpool -n captainthin`



建立快照

- 查看剩余容量：`vgdisplay captainvg`
- 建立快照区：`lvcreate -s -l 26 -n captainsnap1 /dev/captainvg/captainlv`26是剩余的PE数量

快照相当于原来LV的备份，建立后的容量和内容都会和原来的LV相同

快照挂载：`mount -o nouuid /dev/captainvg/captainsnap1 /srv/snapshot1`

因为XFS不允许相同的UUID文件系统挂载，所以要加入nouuid参数



使用快照恢复系统

要恢复的文件量不能高于快照区所能承载的实际容量



![]({{ site.url }}/imgs/Vbird/13-5.1.png)



移除LVM（重要啊）：

- 卸载已挂载的LVM文件系统
- 使用 lvremove移除LV
- 使用 vgchange -a n VGname 让VG不再有Active标志
- 使用 vgremove 移除VG
- 使用 pvremove 移除PV
- 使用gdisk修改system ID

` umount /srv/thin/ /srv/lvm/;lvs captainvg;`

删除顺序：thin -> pool -> LV

`lvremove /dev/captainvg/captainthin /dev/captainvg/lvpool`

`lvremove /dev/captainvg/captainlv `

`vgchange -a n captainvg`

`vgremove captainvg`

`pvremove /dev/sda{4,5,6,7}`

`gdisk /dev/sda`



**在RAID上面架构LVM系统**

`gdisk /dev/sda` --> fd00 sda{4,5,6}

`mdadm --create /dev/md0 --auto=yes --level=5 --raid-devices=3 /dev/sda{4,5,6}`

`mdadm --detail /dev/md0 | grep UUID`复制UUID

`vim /etc/mdadm.conf`增加`ARRAY /dev/md0 UUID=...`

`pvcreate /dev/md0`

`vgcreate raidvg /dev/md0`

`lvcreate -L 1.5G -n raidlv raidvg`

`lvscan`

`mkfs.xfs /dev/raidvg/raidlv`

`blkid /dev/raidvg/raidlv`复制UUID

`vim /etc/fstab`添加`UUID=...	/srv/raidlvm	xfs	defaults	0 0`

`mkdir /srv/raidlvm`

`mount -a`

`df -Th`



#### 第十五章 例行性工作 crontab

Linux工作排程种类：at cron

at 处理一次性工作，需要atd服务支持，CentOS默认是开启的

crontab 处理例行性工作，循环执行某些工作。由crond服务支持



常见的例行性工作

- 定时清理登录记录
- 通过logwatch分析登录记录
- 建立locate数据库，定时运行updatedb
- 建立mandb，自动更新man page的资料库
- RPM软件登录记录
- 移除临时文件，定时执行tmpwatch命令
- 分析网络服务，WWW服务器软件，分析登录记录



手动启动atd服务

`systemctl restart atd`重启atd服务

`systemctl enable atd`让服务开机自启

`systemctl status atd`查看atd当前状态



at的工作方式

通过`at`指令或写入/var/spool/at目录

通过/etc/at.allow和/etc/at.deny两个档案进行at的使用限制

- 在/etc/at.allow文件中的用户才能使用at
- 如果allow文件不存在，则寻找at.deny文件，不在这个文件中的用户就能使用at
- 如果两个文件都不存在，则只要root可以使用at

一般的distribution中通常只保留一个at.deny空文件



实际运用：

`at [-mldv] TIME`

-m 	at工作完成后，以email通知使用者工作已完成

-l	列出目前系统上所有用户的at排程

-d	取消一个在at排程中的工作

-v	可以使用较为明显的格式列出at排程中的工作列表

TIME格式：

HH:MM	在今日的HH：MM时刻运行，若今日的此时刻已经错过，则在明日的此时刻进行工作

HH:MM YYYY-mm-dd	在某年某月某日进行工作

HH:MM[am|pm] \[Month]\[Date]同上

HH:MM[am|pm] +number [mins|hours|days|weeks] 在某个时间点，在加几个时间后进行

`at -c [workcode]`

-c	可以列出后面接的工作的指令内容



输入`at TIME`之后就可以开始写指令，使用指令时最好用绝对路径，按^D结束输入

at执行与终端环境无关，所有的stdin和stdout都会传送到执行者的邮箱中，想要在终端输出数据，可以使用`echo "hello" > /dev/tty1`输出到制定的终端机



at的优点：可以在后台运行指令，不怕系统突然宕机



移除既定的事件：

`atq`查询目前有多少工作安排

`strm [jobnumber]`移除第jobnumber个工作



`batch`：在系统空闲时才进行工作，CPU负载小于0.8

`echo "scale=100000; 4*a(1)" | bc -lq &`计算PI（用来使CPU负载）

`uptime`查看工作负载

`jobs`查看后台工作

`kill -9 %1 %2..`删除工作

在系统平均负载低于0.8之后，batch设定的指令就会自动执行



循环执行的例行性工作排程

crond服务控制

同样有限制使用cron的账号列表

- /etc/cron.allow
- /etc/cron.deny

crontab的记录目录：/var/spool/cron，是以脚本的形式记录的，但是不要用vim直接编辑，会导致无法使用cron



`crontab [-u username] [-l|-e|-r]`

-u	只有root可以使用的参数。给其他用户建立/删除crontab工作

-e	编辑crontab的工作内容

-l	查阅crontab的工作内容

-r	移除所有的crontab工作内容，如果只想移除一项，请使用-e去编辑



输入`crontab -e`可以开始编辑例行命令。

格式

- `分钟	小时	日期	月份	周	指令`
- 周的0和7都代表星期天

辅助字符：

\*	此项的任意时刻都执行

,	时间点的分隔符：0 3,5 * * *表示每天的3点和5点时执行

\-	表示时间端：0 8-12 * * *表示每天的8点到12点这段时间内，每个整点都执行一次command

/n	n代表数字，每隔n单位间隔的意思：*/5 * * * * 表示每五分钟执行一次

/etc/crontab文件结构

每一行比直接使用 crontab -e 要在命令前多加一个使用者的名称

MAILTO=root	如果例行性工作的指令发生错误时，将错误信息发给root

crond有三个执行脚本设置文件：

- /etc/crontab
- /etc/cron.d/*
- /etc/spool/cron/*

/etc/cron.d/0hourly 设置在大约5分钟内的随机时间来执行 /etc/cron.hourly目录内的所以可执行文件，因此，放在/etc/cron.hourly中的文件必须是可以被直接执行的脚本



总结

- 个人定制的例行性工作使用`crontab -e`来建立
- 系统维护使用`vim /etc/crontab`，重要系统工作，这样可以方便管理
- 自己开发的软件使用`vim /etc/cron.d/newfile`使用全新的设定文件



注意事项：

- 很多crontab同时启动会使系统非常繁忙，所以交错地设置启动时间可以减轻系统的压力
- 取消不必要的输出，可以使用 2> /dev/null 把一些错误信息扔掉
- 经常性地检查/var/log/cron的内容来看看是不是有木马之类的东西混入
- 周的设定不可以与日月的设定共存



anacron 执行关机期间未执行但还是需要的crontab

是由crontab来读取的，每小时主动执行一次

在 /etc/cron.hourly中

`anacron [-sfn] [job]`

-s	开始连续地执行各项工作，依据时间记录文件判断是否执行

-f	强制执行，不去判断时间记录文件的时间戳

-n	立即进行未进行的任务

job	由 /etc/anacrontab 定义的各项工作名称

`anacron -u [job]`

-u	仅更新时间记录文件的时间戳而不进行工作



anacron的执行流程

```
由 /etc/anacrontab 分析到 cron.daily 這項工作名稱的天數為 1 天；
由 /var/spool/anacron/cron.daily 取出最近一次執行 anacron 的時間戳記；
由上個步驟與目前的時間比較，若差異天數為 1 天以上 (含 1 天)，就準備進行指令；
若準備進行指令，根據 /etc/anacrontab 的設定，將延遲 5 分鐘 + 3 小時 (START_HOURS_RANGE 的設定)；
延遲時間過後，開始執行後續指令，亦即『 run-parts /etc/cron.daily 』這串指令；
執行完畢後， anacron 程式結束。
```



如果CentOS有一段时间未开机，那么开机后就会有一段时间的系统忙碌，就是anacron在执行之前 未执行的各项工作



crond与anacron的关系：

1. crond主动去读取 /etc/crontab, /var/spool/cron/\*, /etc/cron.d/\* 等设定文件，依据 分 时 日 月 周的时间设定去安排工作流程
2. 依据 /etc/cron.d/0hourly 的设定，去 /etc/cron.hourly 目录下，执行所以该目录下的可执行文件
3. 因为存在 /etc/cron.hourly/0anacron 文件的存在，crond每小时主动执行anacron，并呼叫 /etc/anacrontab 的设定文件
4. 根据 /etc/anacrontab 的设定，依据天 月 周，去分析 /etc/cron.daily, /etc/cron.weekly, /etc/cron.monthly 内的执行文件，进行固定周期需要执行的命令



个人实验：

- 目的：在搭建了SS的VPS上建立一个crontab，在每天的12：00给我的邮箱发送ss昨天的log文件

使用的系统是Ubuntu，安装mail`apt install mailutils`

添加脚本 `~/scripts/mail.sh`

```bash
#!/bin/bash

# This program will send a email to jakob
# The content of the mail is last 30 lines of ss's log file.

PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
export PATH

Yesterday=$(date -d yesterday +%Y'-'%m'-'%d)

cp mail.txt mail2.txt

tail -n 10000 /var/log/shadowsocks.log | grep $Yesterday | sed "s/$Yesterday//g" | sed 's/:[0-9]*$//g' | sed 's/[0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}//g' | grep -v "Decrypt failed" | uniq > mail.txt

unix2dos mail.txt

DIFFERENT=$(diff mail.txt mail2.txt)

if [ "$DIFFERENT" == "" ]; then
        echo "There is no Log of yesterday detected. Or this scripts has been run twice today." | mailx -s "Daily Log" jakobzcooper@gmail.com
        exit 0
fi

echo "VPS Log of $Yesterday.\n Sent time: $(date +%H:%M)" | mailx -s "Daily Log" -A mail.txt jakobzcooper@gmail.com
```

加入crontab

`crontab -e`

`0 12 * * * bash /root/scripts/mail.sh`

注意使用`timedatectl set-timezone Asia/Shanghai`指令把VPS的时区调成上海的



---

### 2018-7-26

#### 第十四章 磁碟配额(Quota)与进阶文件系统管理

一般用途(网络)：

- 针对 www server
- 针对 mail server
- 针对 file server

主机：

- 限制群组所能使用的配额
- 限制某一使用者的配额
- 以link方式，使邮件可以作为配额限制



Quota的局限性

- EXT文件系统只能针对整个filesystem。XFS可以使用project模式来设计不同目录的配额
- 核心必须支持Quota
- 只对一般身份用户有效
- SELinux下，进行了Quota限制，只能对/home进行设定



XFS文件系统不需要额外的记录文件



Quota对XFS文件系统的限制：

- 分别针对用户，群组和目录
- 容量限制和文件数量限制
  - 限制inode用量
  - 限制block用量
- 警告和禁止（soft/hard）
  - hard：绝不能超过此限额，超过会锁住该用户的磁盘使用权
  - soft：每次登入系统时，会收到磁盘即将满的警告信息，并且给予宽限时间
- 宽限时间（grace time）如果在宽限时间内不进行磁盘处理，soft将变为hard，从而锁住磁盘



实际操作：

- 账号：五个账号，用户名从myquota1到myquota5，密码都是passwd，初始群组都是myquotagrp
  - 使用下方脚本可以自动创建

```bash
#!/bin/bash

PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

# Create new group
groupadd myquotagrp

for username in $(seq 1 5)
do
	user="myquota$username"
	useradd -g myquotagrp $user
	echo "password" | passwd --stdin $user
done 
```

- 容量限制：每个用户300MB磁盘容量，超过250MB开始警告，文件数量不限
  - 群组限制：限制myquotagrp磁盘容量为1GB
  - 共享目录限制：共享目录设置为： /home/myquota/ ，限制容量为500MB
  - 以上两个限制不能同时存在
- 宽限时间设置：14天



创建共享目录：

```bash
mkdir /home/myquota
chgrp myquotagrp /home/myquota
chmod 2770 /home/myquota
```



重启Quota以设置

XFS文件系统，检查文件系统：`df -hT /home`

以前版本的文件系统可以使用`mount -o remount`重新挂载来启动Quota

XFS在挂载时就宣告了Quota的使用，无法使用`remount`来重新启动Quota

在/etc/fstab 中/home的第四栏加入下面的两个项目，然后重新挂载/home，才能重启Quota

`/dev/mapper/centos-home  /home  xfs  defaults,usrquota,grpquota   0 0`

`umount /home`

`mount -a`

`mount | grep home`



Quota限制项目

- uquota/usrquota/quota：针对用户的限制
- gquota/grpquota：针对群组的限制
- pquota/prjquota：针对目录的限制



XFS文件系统Quota最重要命令：

`xfs_quota -x -c "command" [mountpoint]`

-x ：专家模式，开启后才能输入指令

-c ：后面加指令：

- print：列出主机内文件系统参数等
- df：和`df`功能相同，列出磁盘使用情况及挂载点等
- report：列出Quota项目，有-ugr，user，group，project，及-bi等参数
- state：说明目前支持Quota的文件系统的信息



`xfs_quota -x -c "df -h" /home`列出/home挂载的设备，空间使用状态

`xfs_quota -x -c "report -ubih" /home`列出/home的所有用户的Quota限制值

`xfs_quota -x -c "state"`列出当前支持Quota的文件系统是否启动了Quota功能



设置容量限制：

`xfs_quota -x -c "limit [-ug] b[soft|hard]=N i[soft|hard]=N name"`

针对user/group来限制

- bsoft/bhard：block的限制值，也就是磁盘容量的限制值，可以加单位
- isoft/ihard：inode的限制值
- name：username groupname



设置宽限时间：

`xfs_quota -x -c "timer [-ug] [-bir] Ndays"`



脚本：

```bash
#!/bin/bash

PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH

# This Program will set the quota to
#	 user:
#		myquota1~5 bsoft=250M bhard=300M no inode limit
#	 group:
#	 	myquotagrp bsoft=950M bhard=1G   no inode limit auch
#
# History	20180726	First release
# Author	Captainxu
for username in $(seq 1 5)
do
	user="myquota$username"
	xfs_quota -x -c "limit -u bsoft=250M bhard=300M $user" /home
done

xfs_quota -x -c "limit -g bsoft=950M bhard=1G myquotagrp" /home

xfs_quota -x -c "timer -ug -b 14days" /home

# Echo output

xfs_quota -x -c "report -ubih" /home
xfs_quota -x -c "report -gbih" /home
xfs_quota -x -c "state" /home
```



针对目录限制

更改/etc/fstab的值，删除grpquota，加入prjquota，卸载/home重新挂载

`xfs_quota -x -c "state"`来查看是否打开project的Quota功能



目录的设定需要 专案名称、专案识别码 来规范（专案=专用文件？）

```bash
echo "11:/homr/myquota" >> /etc/projects 	# 指定专案识别码与目录对
echo "myquotaproject:11" >> /etc/projid		# 专案名称与识别码对

xfs_quota -x -c "project -s myquotaproject"	# 初始化专案名称

```



目录设置限制 450M/500M

```bash
xfs_quota -x -c "limit -p bsoft=450M bhard=500M myquotaproject" /home
xfs_quota -x -c "report -pbih" /home
```

对目录的限制，即使root也受影响



xfs_quota 其他指令

- -c "disable" 暂时取消quota限制，但系统其实还是在计算quota
- -c "enable" 启用Quota，是对disable的恢复
- -c "off" 完全关闭Quota限制
- -c "remove" 移除quota的限制设定。取消project的设定只需要`xfs_quota -x -c "remove -p" /home`

EXT文件系统可以参考上一般的鸟哥Linux



将不在一个分区的目录共同限制一个Quota，例子：

1. 将/var/spool/mail目录完整复制到/home 下
2. 利用 `ln -s /home/mail/ /var/spool/mail`建立链接
3. 给/home设置Quota限额



磁盘阵列RAID（Redundant Arrays of Independent Disks）

RAID-0 等量模式，效能最佳

- 把磁盘分割为等量的区块
- 放入文件时，文件会等量地被放在多个磁盘中
- 如果有一个磁盘损毁，就会导致整个文件损毁
- 当较小容量的磁盘被用完后，存储效能就会变差

RAID-1映射模式，完整备份

- 会在两个磁盘上完整的放入同样的文件，因此被称为mirror
- 软件磁盘整列的情况下效能会很差
- 硬件磁盘阵列下效能会好一些



兼顾效能与安全性：

RAID 1+0，RAID 0+1

RAID 1+0

- 共四个硬盘
- 每两个组成两个RAID1
- 再将两个RAID1组成RAID0

RAID 0+1则相反



RAID-5

- 至少三个磁盘
- 加入同位检查资料（Parity），这个资料会记录其他磁盘的备份资料
- 每次写入时，都会有Parity被记录在不同的硬盘
- RAID-5的总体容量是：总容量 - 一个磁盘的容量
- 仅能支撑一个磁盘损毁的情况

RADI-6：在RAID-5的基础上，可以支撑两个硬盘损毁，硬盘容量也会少两颗

Spare Disk：平时不再磁盘阵列中的一颗磁盘，当有磁盘损坏时，自动使用这颗磁盘代替，如果有热插拔功能就可以再磁盘工作时，取下坏掉的硬盘，安装一颗好的硬盘，再次设置为 Spare Disk



磁盘阵列的优点：

- 保证资料安全性
- 读写效能提升 RAID 0
- 增大容量



软件RAID、硬件RAID

硬件磁盘阵列通过磁盘阵列卡达成阵列。通过磁盘阵列卡来处理RAID任务，效能方面会很好。但是好的磁盘阵列卡很贵，便宜的磁盘阵列卡又不能支持高级功能。因此又产生了软件磁盘阵列。

软件RAID的设备名一般是/dev/md[01234]

CentOS 提供mdadm来进行软件磁盘阵列搭建。以分区为单位，支持RAID 0 RAID 1 RAID 5 Spare Disk等，拥有热插拔功能



设置软件RAID

`mdadm --detail /dev/md0`显示详细信息

`mdadm --create /dev/md[0-9] --auto=yes --level=[015] --chunk=NK --raid-devices= N --spare-devices=N /dev/sdx /dev/hdx`建立RAID

--auto=yes  决定后面接的软件RAID装置，即/dev/md0, /dev/md1..

--chunk=NK  设置chunk 的大小，一般64K或512K

--raid-devices=N  使用几个分区作为RAID的装置

--spare-devices=N  使用几个分区作为 Spare Disk

--level=[015]  设置RAID的等级，建议只用0，1，5即可



实际搭建RAID 5：

- 使用4个分区，每个分区1GB
- 使用1个分区作为Spare Disk，同样1GB
- chunk 设置为512K
- 将RAID5 挂载到 /srv/raid下



`gdisk /dev/sda`在剩余的9G中进行实验

文档code为 FD00

`partprobe` `lsblk`

查看分区情况



开始建立RAID

`mdadm --create /dev/md0 --auto=yes --level=5 --chunk=256K --raid-devices=4 --spare-devices=1 /dev/sda{4,5,6,7,8}`

`mdadm --detail /dev/md0` 

`cat /proc/mdstat`都可以查看RAID情况

>  第一行部分：指出 md0 為 raid5 ，且使用了 vda8, vda7, vda6, vda5 等四顆磁碟裝置。每個裝置後面的中括號 [] 內的數字為此磁碟在 RAID 中的順序 (RaidDevice)；至於 vda9 後面的 [S] 則代表 vda9 為 spare 之意。

>  第二行：此磁碟陣列擁有 3142656 個block(每個 block 單位為 1K)，所以總容量約為 3GB， 使用 RAID 5 等級，寫入磁碟的小區塊 (chunk) 大小為 256K，使用 algorithm 2 磁碟陣列演算法。 [m/n] 代表此陣列需要 m 個裝置，且 n 個裝置正常運作。因此本 md0 需要 4 個裝置且這 4 個裝置均正常運作。 後面的 [UUUU] 代表的是四個所需的裝置 (就是 [m/n] 裡面的 m) 的啟動情況，U 代表正常運作，若為 _ 則代表不正常。



格式化并挂载

`mkfs.xfs -f -d su=256k,sw=3 -r extsize=768k /dev/md0`

`mkdir /srv/raid`

`mount /dev/md0 /srv/raid`

`df -Th /srv/raid`



RAID出错处理

`mdadm --manage /dev/md[0-9] [--add device] [--remove device] [--fail device]`

--add		将后面的设备加入这个RAID

--remove	将后面的设备从这个RAID移除

--fail		将后面的设备设置为出错状态

当一个磁盘坏掉后，

- --remove the disk
- 关机，拔出坏的磁盘，插上好的
- --add the new disk



开机自动启动RAID并自动挂载：

获取RAID的UUID：`mdadm --detail /dev/md0`

进入设定文件 /etc/mdadm.conf

添加`ARRAY /dev/md0 UUID=...`

添加开机自动挂载

`blkid /dev/md0`获取UUID，和上一个不同

`vim /etc/fstab`添加`UUID=...	/srv/raid	xfs	defaults	0 0`

测试成功即可



关闭RAID

`umount /srv/raid`卸载

`vim /etc/fstab`	删除刚刚添加的行

覆盖RAID的metadata和XFS的superblock

`dd if=/dev/zero of=/dev/md0 bs=1M count=50`

`mdadm --stop /dev/md0`关闭

覆盖掉记录在其他磁盘上的RAID的信息

`dd if=/dev/zero of=/dev/sda[45678] bs=1M count=10`

`cat /proc/mdstat`上面都成功之后会显示unused devices: \<none\>

删除/etc/mdadm.conf 里面新增的行（或者注释掉）



LVM(Logical Volume Manager) 可以弹性调整file system的容量。

逻辑卷轴管理员

- PV，Physical Volume 实体卷轴：LVM最底层的卷轴
- VG，Volume Group    卷轴群组，将许多PV整合成一个VG
- PE，Physical Extent     实体范围区块，默认4MB，是LVM的最小储存区块
- LV，Logical Volume      逻辑卷轴，VG被切成LV，和磁盘分区有同样的性质



LVM的弹性变更原理是：把原本LV内的PE转移到别的设备中以降低LV容量，把别的设备的PE加进来以增加容量

磁盘->PV->VG->LV->格式化->挂载



资料写入LV的方式

- 线性方式（linear）：完整地写入设备，一个设备容量用完后才使用下一个
- 交错方式（triped）：将资料拆分，分别写入不同的设备，效能较高，安全性差，尽量别用（可以RAID追求效能）

LVM的最重要的要点是可以弹性地管理磁盘容量，所以不求高效能低稳定性



实际操作：

- 更改之前的RAID分区，system ID改为8E00（如果没有做前面的则新建分区即可）
- 将全部分区整合为一个VG，名称设为captainvg，PE大小为16MB
- 建立名为captainlv的LV，容量为2G
- 格式化为xfs文件系统，挂载在/srv/lvm中



`gdisk /dev/sda` -> `t` -> `[45678]` -> `8E00` -> `w`

PV阶段：

- pvcreate   将分区建立为PV
- pvscan      搜索目前任何具有PV的磁碟
- pvdisplay   显示出目前系统的PV状态
- pvremove  移除PV属性

`pvscan`会发现之前虽然没有创建过PV，但是也有一个LVmh存在

`pvcreate /dev/sda{4,5,6,7}`

`~这一步发生了问题，显示 Device /dev/sda[4567] excluded by a filter`

根据网上的信息：

1. 尝试重新格式化

![]({{ site.url }}/imgs/Vbird/13-3.1.png)

在做后面的题目时发现在将[4567]四个分区的 system ID改回fd00后，使用`lsblk`查看磁盘分区情况，发现之前的md0还在，说明在关闭RAID时出现一些问题，现在重新关闭一次。

重新执行

```bash
[root@study ~]# dd if=/dev/zero of=/dev/md0 bs=1M count=50
[root@study ~]# mdadm --stop /dev/md0
mdadm: stopped /dev/md0
[root@study ~]# dd if=/dev/zero of=/dev/vda5 bs=1M count=10
[root@study ~]# dd if=/dev/zero of=/dev/vda6 bs=1M count=10
[root@study ~]# dd if=/dev/zero of=/dev/vda7 bs=1M count=10
[root@study ~]# dd if=/dev/zero of=/dev/vda8 bs=1M count=10
[root@study ~]# dd if=/dev/zero of=/dev/vda9 bs=1M count=10
```

后再次尝试创建PV

![]({{ site.url }}/imgs/Vbird/13-4.1.png)

看到这个success我眼泪都出来了。。

那么继续吧

`pvdisplay /dev/sda5`查看一下，Allocatable表示是否已被分配



VG阶段：

- vgcreate 建立VG
- vgscan 搜寻存在的VG
- vgdisplay  显示系统上面的VG状态
- vgextend   在VG内增加额外的PV
- vgreduce    在VG内删除PV
- vgchange    设定VG是否启动
- vgremove    删除一个VG

`vgcreate [-s N[mgt]] VGname PVname`

-s   后接PE的大小，单位可以是m g t都行



`vgcreate -s 16M captainvg /dev/vda{4,5,6}`

 显示  Volume group "captainvg" successfully created



`vgextend captainxu /dev/sda7`把sda7也加入VG



LV阶段：

- lvcreate  建立LV
- lvscan      搜寻已有的LV
- lvdisplay  显示LV的信息
- lvextend   增加LV容量
- lvreduce    减少LV容量
- lvremove   删除一个LV
- lvresize      对LV进行大小调整

`lvcreate [-L/l N[mgt]] [-n LVname] VGname`

-L   接容量，必须是PE的倍数

-l     接个数，也就是PE的个数

-n    接LV的名称



`lvcreate -L 2G -n captainlv captainvg`

`lvdisplay /dev/captainvg/captainlv`



文件系统阶段：

`mkfs.xfs /dev/captainvg/captainlv`

`mkdir /srv/lvm`

`mount /dev/captainvg/captainlv /srv/lvm`

`df -Th /srv/lvm`



看到：14.3.3 放大LV的容量

---

### 2018-7-25

**账号管理**

`useradd [-u UID] [-g initgroup] [-G minorgroup] [-mM] [-c info] [-d homedir] [-s shell] username`

-u 指定UID、-g 初始组、-G 次要组、-c  /etc/passwd第五栏的说明（info）、-d 指定home路径、-s 指定shell，默认bash

-M  强制不要创建home目录（系统账号默认）

-m  强制创建home目录（一般账号默认）

-e date  格式为YYYY-MM-DD的日期，可写入/etc/shadow的第八字段，即账号失效日期

-f   指定密码是否会失效，0为立即失效，-1为永不失效

-r   创建系统账号

创建的home目录默认权限为700

简单的使用`useradd username`来创建账号就好了，有很多默认值

用户自己创建的系统账号一般UID是从100起算的（

**但是我创建的系统账号UID=699**，之前创建的三个账号UID也是从1000开始的，可能我使用的CentOS 7 保留的系统UID是1-999



`useradd -D`可以打印出`useradd`的参考文件/etc/default/useradd

- 可以更改里面的内容例如HOME 是`~`目录的父目录



GID=100的群组为user，默认创建账户初始群组为user

- 私有群组机制：系统自动创建一个与用户名相同的群组，这样配置的保密性更高。
- 公共群组机制：以GROUP=100为新账号的初始群组，因此每个账户都属于user组，可以共享/home目录内的数据

HOME=/home：表示用户目录的基准目录

INACTIVE=-1：密码失效的天数

EXPIRE=：账户失效的日期

SHELL=/bin/bash：默认使用的shell程序名

SKEL=/etc/skel：创建用户目录的样本目录（/home/captain1在创建时就是用这个目录完全地复制过去）

CREATE_MAIL_SPOOL=yes：创建使用者的 mailbox，也就是在/var/spool/mail/目录下创建一个账户文件

UID/GID 样本文件：/etc/login.defs

文件内容：

```
MAIL_DIR        /var/spool/mail	<==用户默认邮件信箱放置目录

PASS_MAX_DAYS   99999	<==/etc/shadow 内的第 5 栏，多久需变更口令日数
PASS_MIN_DAYS   0	<==/etc/shadow 内的第 4 栏，多久不可重新配置口令日数
PASS_MIN_LEN    5	<==口令最短的字符长度，已被 pam 模块取代，失去效用！
PASS_WARN_AGE   7	<==/etc/shadow 内的第 6 栏，过期前会警告的日数

UID_MIN         500	<==使用者最小的 UID，意即小于 500 的 UID 为系统保留
UID_MAX       60000	<==使用者能够用的最大 UID
GID_MIN         500	<==使用者自定义组的最小 GID，小于 500 为系统保留
GID_MAX       60000	<==使用者自定义组的最大 GID

CREATE_HOME     yes	<==在不加 -M 及 -m 时，是否主动创建用户家目录？
UMASK           077     <==用户家目录创建的 umask ，因此权限会是 700
USERGROUPS_ENAB yes     <==使用 userdel 删除时，是否会删除初始群组
MD5_CRYPT_ENAB yes      <==口令是否经过 MD5 的加密机制处理
```

新创建的账户密码为空，此时是被锁定的，无法登录，需要设置密码



`passwd [--stdin]`所有用户都可以使用，用来更改自己的密码

`passwd [-l][-u][--stdin][-S][-n days][-x days][-w days][-i date] user`

此指令只能由root下达

--stdin：可以通过一个管线来作为要更改的密码输入

-l  ：lock，使密码失效，会在/etc/shadow第二栏加上！

-u ：unlock，解锁

-S ：列出口令相关的参数

-n ：不可修改密码的天数，shadow第4字段

-x ：必须修改密码的天数，shadow第5字段

-w：密码过期的警告天数，shadow第6字段

-i  ：密码失效日期，shadow第7字段



`chage [-ldEImMW] username`详细显示口令参数

`-l ` ：列出该账户的详细口令参数

-d YYYY-MM-DD：修改shadow第3字段（最近修改密码日期），

-E YYYY-MM-DD：修改shadow第8字段（账户失效日）

`-I days`：修改shadow第7字段（密码失效日）

-m ：修改第4字段（口令最短保留天数）

-M ：修改第5字段（口令多久需要变更）

-W ：修改第6字段（口令过期前警告天数）

以上：口令==密码

想要让使用者在第一次登录时强制更改口令：`chage -d 0 username`



不小心设置错了参数，可以到/etc/passwd 和 /etc/shadow中去修改对应的字段

也可以使用指令`usermod`

`usermod [-cdegGlsuLU] username`修改用户参数

-c  账户说明，passwd文件第5栏

-d  `~`目录，passwd文件第6栏

-e YYYY-MM-DD shadow第八字段

-f  days shadow第七字段

-g  初始群组，passwd的GID字段

-G  次要群组，group文件

-a   添加次要群组的支持

-l    修改账号名称，passwd第一栏

-s    shell的文件路径

-u    UID数字，passwd第三栏

-L    冻结用户口令，lock

-U   解冻用户口令，unlock

`usermod -a -G vbird1,vbird2,vbird3 dmtsai `可以不影响对原本已经支持的次要群组的情况下，加入新的群组



`userdel [-r] username`删除用户及其数据

-r   连同~目录一起删除



一般可以使用`find / -user username`找出用户的所有文件，并删除



`finger`命令（为什么我的CentOS 7没有这个命令）

`finger [-s] username`

-s  仅列出用户的账号，全名、终端机代号与登录时间等



`chfn`change finger information，没有finger命令但是有这个命令

`chfn [-foph] username`

-f   接全名

-o  办公室房间号码

-p  办公室电话号码

-h  家里电话号码

。。。。。一般用不到吧



`chsh`change shell

`chsh [-ls]`

`-l` 列出系统上所有的shell

-s    配置修改自己的shell



`id`列出正在使用的用户的所有相关信息

`id username`列出其他用户。。。



`groupadd [-g GID] [-r] groupname`新增群组

-r  创建系统群组



`groupmod [-g GID] [-n groupname] groupname`

-n  修改组名

不要随意更改GID，会导致系统资源错乱



`groupdel groupname`删除群组

不能删除某个用户的有效群组（主组）



`gpasswd`群组管理员创建

`gpasswd [-A user1, ...] [-M user3, ...] groupname`

`gpasswd [-rR] groupname`

无参数时 表示给group一个口令

-A 将后面的user设为 group的群组管理员

-M  将某些账号加入这个群组

-r    将group的口令移除

-R    让group的口令栏失效



群组管理员可用：

`gpasswd [-ad] user groupname`

-a   将某位使用者加入group中

-d   将某位使用者移除

添加组testgroup，设置captainxu为管理员，并把captain1加入组中

![]({{ site.url }}/imgs/Vbird/12-2.1.png)

![]({{ site.url }}/imgs/Vbird/12-2.2.png)



将用户的shell指定为 `/sbin/nologin`后，用户就无法登录主机了



让三个用户可以在同一个目录工作，并且他们还都拥有各自的~目录和私有群组

```bash
groupadd projecta

useradd -G projecta -c "projecta user" pro1
useradd -G projecta -c "projecta user" pro2
useradd -G projecta -c "projecta user" pro3

echo "password" | passwd --stdin pro1
echo "password" | passwd --stdin pro2
echo "password" | passwd --stdin pro3

mkdir /srv/projecta
chgrp projecta /srv/projecta
chmod 2770 /srv/projecta # 添加SGID
ll -d /srv/projecta
```



**ACL(access control list)的使用**

目的：提供对使用者、群组、目录默认属性的rwx权限设置



查看文件系统对ACL的支持：

`mount | grep '/ type'` 

`dumpe2fs -h /dev/mapper/centos-root`



取得某个文件/目录的ACL配置项目

`setfacl [-bkRd] [{-m|-x} acl参数] 目标文件名`

-m  配置后续的 ACL 参数 给文件

-x    删除后续的 ACL 参数

-b    移除所有的 ACL 参数

-k     移除默认的 ACL 参数

-R     递归配置 ACL == 此目录也一同配置

-d     配置默认 ACL 参数



`setfacl -m u:captainxu:rx file1`



`getfacl filename`可以查看文件详细的权限信息

参数相同

其中，mask表示有效权限，只有在其中的权限，用户才能拥有

通过`setfacl -m m:rwx file1`来设置



将用户对目录的权限设为r-x之后，就可以让该用户只能进入而不能改变其中的文件了



让目录的子目录和文件继承ACL：

`setfacl -m d:u:myuser1:rx /srv/project1`

d: 设置后，产生了新的default属性



`setfacl -b dirname`取消ACL属性



身份切换的必要性：

- 平时使用一般账号，能避免一些严重错误的指令（`rm -rf /*`），只有在配置系统时才使用root账号
- 以较低权限启动服务，避免apache之类的程序被crack后导致系统崩溃
- 软件限制：telnet  ssh等可以限制root登录



`su [-lm] [-c command] username`切换用户

\-   ：一条短杠加用户名代表使用 login-shell变量文件读取登录系统，没有用户名默认为root

`-l`：类似 -

-m ：== -p  表示使用目前的环境配置

-c  ：仅进行一次命令

不加任何参数表示使用 non-login shell方式，PATH、MAIL等变量都将保持为当前用户的



`sudo [-b] [-u user] command`

-b   后台运行命令

-u   使用user的身份运行命令，默认为root



可以在上面的command使用`sh -c "commands"`执行多个命令



`visudo`和 /etc/sudoers

只有在 /etc/sudoers 文件中的用户才能使用sudo

可以用`visudo`来修改/etc/sudoers，用法与vim相同



在含有：root ALL=(ALL) ALL 的行下方，增加形如：captainxu  ALL=(ALL)  ALL ，就可以让用户captainxu可以使用sudo

上面的四个值的含义是：使用者账号、登录者来源主机名、（可切换的身份）、可下达的指令

注意，注释可下达的指令时，必须使用绝对路径



在使用者账号前加上%表示群组，添加群组后，在此群组中的用户也可以使用sudo

增加NOPASSWD，可以免除输入密码使用sudo

`%wheel	ALL=(ALL)	NOPASSWD:ALL`



注意在给与：passwd等命令的root权限时，用户是可以改变root的密码的，所以要限制用户的命令参数

`myuser1	ALL=(root)	!/usr/bin/passwd, /usr/bin/passwd [A-Za-z]*, !/usr/bin/passwd root`    对passwd root的限制一定要在 允许 passwd [a-zA-Z]* 后面

以上加上`！`代表不能运行的命令和参数

这样就不能运行`passwd` 和 `passwd root`了，也就不能改变root 的密码了



账户别名、命令别名、主机别名

```bash
User_Alias ADMPW = pro1, pro2, pro3, myuser1, myuser2 # 创建了账号ADMPW
Cmnd_Alias ADMPWCOM = !/usr/bin/passwd, /usr/bin/passwd [A-Za-z]*, \
                      !/usr/bin/passwd root # 创建命令集合 ADMPWCOM
ADMPW   ALL=(root)  ADMPWCOM  # 使用创建的账户和命令集合来配置
```

这样配置之后，以后只需要改ADMPW和ADMPWCOM就可以了



让一般用户可以输入`sudo su -`，和自己的密码，就可以切换为root账户

```bash
User_Alias	ADMINS = pro1, pro2, pro3, myuser1
ADMINS	ALL=(root)	/bin/su -
```

不过注意，加入的使用者必须是能够信任的用户



将用户的shell设置为/sbin/nologin，就可以让他们无法登录系统取得shell

等用户尝试登录时，就会显示 /etc/nologin.txt 的内容



PAM模块

应用程序编程接口（Application Programming Interface，API）

PAM仅是一套验证机制，可以在程序中引用，来使用PAM的验证功能

PAM拥有不同的模块来做不同的验证。

pam_cracklib.so 用来验证passwd尝试修改的口令是否是弱口令

程序调用PAM后，PAM会到/etc/pam.d寻找和程序同名的验证模块



`/etc/pam.d/passwd`

```
[root@VbirdLinux-2018-7 ~]# cat /etc/pam.d/passwd 
#%PAM-1.0
auth       include	system-auth
account    include	system-auth
password   substack	system-auth
-password   optional	pam_gnome_keyring.so use_authtok
password   substack	postlogin
```

第一行表示PAM版本，其余以#开头的均为注释

每行有三个字段：验证类别( type )、控制标准( flag )、PAM模块与模块的参数

第二个字段的 include 表示调用后面的文件来作为这个类别的验证

验证类别：

- auth： authentication（认证）的缩写，用来验证用户身份
- account： authorization（授权）的缩写，用来检验用户权限
- session：会话，主要管理环境配置
- password：口令，修改、变更口令

控制标准（flag）：

- required：通过此验证则带有success标志、失败则带有failure标志，通过与否都会继续进行下面的验证
- requisite：验证失败则回报failure标志，并终止后续验证流程，验证成功则带着success标志继续下面的验证
- sufficient：验证成功则立即回传success标志给源程序，并终止后续验证流程，验证失败则带着failure标志继续后续的验证
- optional：用于显示信息



PAM的模块信息：

- /etc/pam.d/* ：每个程序个别的PAM配置文件
- /lib/security/*：PAM模块文件的实际放置目录
- /etc/security/*：其他PAM环境的配置文件
- /usr/share/doc/pam-*：详细的PAM说明文件



常用模块：

- pam_securetty.so：确保root只能从安全的终端登录：/etc/securetty
- pam_nologin.so：限制一般用户能否登录主机，当文件/etc/nologin存在时，所有的一般用户都无法登录系统了，正常情况下不应该存在这个文件
- pam_selinux.so： SELinux，针对程序来进行细部的权限管理，因为会对用户程序运行产生影响，所以此PAM模块用来将SELinux暂时关闭，验证完成后再打开
- pam_console.so： 帮助处理文件权限问题，让用户可以通过特殊的console登录系统
- pam_loginuid.so ：验证用户UID是真实的（一般用户UID必须大于500）
- pam_env.so : 用来配置环境变量，可以参考 /etc/security/pam_env.conf 这个文件的说明
- pam_unix.so ：拥有很多功能：验证中的认证功能、授权中的许可证管理、会话中的登录文件记录。。。
- pam_cracklib.so ：弱口令检测
- pam_limits.so ：ulimit提供的能力，限制内存和CPU的使用额度



login PAM验证过程：

```bash
[root@VbirdLinux-2018-7 ~]# cat /etc/pam.d/login 
#%PAM-1.0

# 验证阶段
# 通过pam_securetty.so判断，如果是root，则参考/etc/securetty的配置
auth [user_unknown=ignore success=ok ignore=ignore default=bad] pam_securetty.so
# 调用 system-auth ，内容在下方↓
auth       substack     system-auth
auth       include      postlogin

# 授权阶段
account    required     pam_nologin.so # 判断/etc/nologin是否存在，存在则不允许一般用户登录
# 第二次调用 system-auth，将在下方的注释中使用 #2 来表示
account    include      system-auth

# 口令阶段
# 第三次调用 system-auth，使用 #3 表示
password   include      system-auth

# 会话阶段 调用system-auth以#4表示
# pam_selinux.so close should be the first session rule
# 以 pam_selinux.so 暂时关闭SELinux
session    required     pam_selinux.so close
session    required     pam_loginuid.so # 规范不同的UID权限
session    optional     pam_console.so
# pam_selinux.so open should only be followed by sessions to be executed in the user context
session    required     pam_selinux.so open # 开启SELinux
session    required     pam_namespace.so
session    optional     pam_keyinit.so force revoke
# 调用 system-auth
session    include      system-auth
session    include      postlogin
-session   optional     pam_ck_connector.so
[root@VbirdLinux-2018-7 ~]# cat /etc/pam.d/system-auth
#%PAM-1.0
# This file is auto-generated.
# User changes will be destroyed the next time authconfig is run.
auth        required      pam_env.so # 配置额外的环境变量
auth        required      pam_faildelay.so delay=2000000
auth        sufficient    pam_fprintd.so
# pam_unix.so 检验口令，通过则回传成功
#2 用pam_unix.so来进行账户管理
auth        sufficient    pam_unix.so nullok try_first_pass
# 未通过则调用下面的pam_succees_if.so判断UID是否大于500，小于500则回传失败
#2 判断UID小于500则不记录登录信息
auth        requisite     pam_succeed_if.so uid >= 1000 quiet_success 
# 调用pam_deny.so拒绝联机
auth        required      pam_deny.so

account     required      pam_unix.so 
account     sufficient    pam_localuser.so
account     sufficient    pam_succeed_if.so uid < 1000 quiet
account     required      pam_permit.so #2 允许该用户登录

#3 此处是我的CentOS 7系统，鸟哥的简体教程上这里使用的是pam_cracklib.so
#3 繁体教程上是和我的系统环境相同
#3 这个模块的作用是，设定密码仅能尝试错误三次
password    requisite     pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type=
#3 以 pam_unix.so 通过sha512 和 shadow等功能进行密码检验，通过则返回程序
password    sufficient    pam_unix.so sha512 shadow nullok try_first_pass use_authtok
#3 若密码检验失败则拒绝登录
password    required      pam_deny.so

session     optional      pam_keyinit.so revoke
#4 用pam_limits.so 设置账户能够操作的系统资源
session     required      pam_limits.so
-session     optional      pam_systemd.so
session     [success=1 default=ignore] pam_succeed_if.so service in crond quiet use_uid
session     required      pam_unix.so
```

从上面的分析可以看到，验证的过程是：

- 根据type，使用不同的模组来验证，根据不同的返回结果决定下一步的验证
- 出现include 则转到后面的文件中去进行验证流程
- 完成所有type的验证，结束



因为远程连接会使用 /dev/pts# 的动态终端机名称，不在/etc/securetty中，所以不能在调用了login的 PAM模块的程序中登录



总结：

- /etc/securetty 影响root可登录的终端机
- /etc/nologin 影响到一般使用者是否能够登录
- PAM配置文件在 /etc/pam.d
- 说明文件在 /usr/share/doc/pam-(version)
- 模块在 /lib/security中



PAM常用配置文件：

- limits.conf

管理ulimit功能

文件结构

- 因为没有对我的Linux上用户（今天前只有root和captainxu）限制CPU和内存，所以下面是鸟哥机器的配置文件

```
vbird1	soft		fsize		 90000
vbird1	hard		fsize		100000
#账号   限制依据	限制项目 	限制值
# 第一字段为账号，或者是群组！若为群组则前面需要加上 @ ，例如 @projecta
# 第二字段为限制的依据，是严格(hard)，还是仅为警告(soft)；
# 第三字段为相关限制，此例中限制文件容量，
# 第四字段为限制的值，在此例中单位为 KB。
# 若以 vbird1 登陆后，进行如下的操作则会有相关的限制出现！
```

我的机器上其实也有示例，但未启用（带有#）

```
#*               soft    core            0
#*               hard    rss             10000
#@student        hard    nproc           20
#@faculty        soft    nproc           20
#@faculty        hard    nproc           50
#ftp             hard    nproc           0
#@student        -       maxlogins       4
```

输入`ulimit -a`可以列出所有的限制

添加限制项目：maxlogins 可以限制一个群组的登录用户数（只对初始群组有效，一个用户不能同时登录多个终端）

发生无法登录或是未知的错误时，PAM会把数据记录在 /var/log/secure中



**用户之间的信息传递**

`last`查看用户的登录时间

`w`or`who`可以查看目前已登录的用户

`lastlog`可以查看每个账户最近的登录时间。

`lastlog | grep -v "\*\*.*\*\*"`忽略从未登录的系统用户



用户聊天。。

`write username usertty`打开聊天会话，^D结束

![]({{ site.url }}/imgs/Vbird/12-6.1.png)

输入`mesg n` 就可以关闭聊天功能，将不接受write

但是如果是root的write会话，将无法拒绝

再次输入`mesg y`就可以打开

使用`wall ""`可以对所有用户广播

write和wall命令必须是用户在线的情况下才能收到信息



`mail username@localhost -s "title"`可以寄出邮件，即使用户不在线 也可以收到

本机的使用者可以不加@。。。

打出命令后，即可键入邮件内容，输入`.`表示内容结束

可以先用vim编辑好信件，再用`<`符号传输

`mail`命令可以查阅信件



**手动新增用户**（不使用系统默认设置）

检查工具

`pwck`用来检查/etc/passwd，对比和/etc/shadow是否一致，如果passwd文件中的字段错误，就会提示用户修订

- 用此命令会产生一些“正确的错误”，如：会提示系统用户的`~`目录不存在

群组检查可以使用`grpck`

`pwconv`对比/etc/passwd 和 /etc/shadow

- 若passwd存在的账号没有对应的/etc/shadow口令，pwconv会去/etc/login.defs取用口令数据，创建账号的shadow数据
- 若passwd存在加密的口令，则会被移动到shadow中，并将原来的passwd口令变成x

`pwunconv`会将shadow中的数据写会passwd，并删除shadow，最好不要使用

`chpasswd`可以用来修改口令，可以从stdin读入数据`echo "captainxu:123456" | chpasswd -m`就可以以MD5加密，并修改好口令

不建议使用纯数字账号，因为会与UID误解



手动创建账号的步骤：

1. 先创建所需群组（vim /etc/group）
2.  /etc/group与/etc/gshadow同步（grpconv）
3. 创建账号的各个属性( vim /etc/passwd)
4. 将 passwd与shadow同步（pwconv）
5. 创建该账号的口令（passwd username）
6. 创建`~`目录（cp -a /etc/skel /home/username）
7. 更改`~`目录的属性（chown -R username.group /home/username）



使用脚本大量建立用户：

```bash
#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
if [ ! -f accounts.txt ]; then
	echo "账号文件不存在，请在本目录创建账号文件，文件名为accounts.txt"
	exit 1
fi

usernames=$(cat accounts.txt)

for username in $usernames
do
	useradd $username
	echo $username | passwd --stdin $username
	chage -d 0 $username
done
```



---

### 2018-7-24

继续学习shell scripts

条件判断

if [ 条件 ]; then

elif [ 条件2 ]; then

else

fi

此处的条件判断式中

`[ "$HOME" == "MAIL" -o "fname" == "2" ]`可以写成`[ "HOME" == "MAIL" ] || [ "fname" == "2" ]`

`netstat`命令，可以查询到目前主机开启的网络服务端口

`netstat -tuln`查询目前主机启动的服务

格式为：`封包格式	本地IP:端口	远程IP：端口	是否监听`

常见端口和网络服务：

80：www

22：ssh

21：ftp

25：mail

111：RPC（远程程序呼叫）

631：CUPS（列印服务功能）

整数声明必须用：`declare -i`

复习

\`\` = $() 执行命令

$((1+1))表示执行计算



`case ... esac`判断，同时判断多个变量

```bash
case $var in
  "a") # 变量值为a时执行下面的指令
	指令
	;;
  "b") # 变量值为b时执行下面的指令
  	指令
  	;;
  *)   # 代表变量为剩下的所以值时执行下面的指令
  	指令
  	exit 1
  	;;
esac
```



重启`syslog`服务

`/etc/init.d/syslog restart`

bash函数

`function fname(){ 指令 }`

因为shell的执行顺序，函数必须放在最开头定义才能被使用

`echo -n ""`可以让之后的输出不换行

函数也拥有内建变量：

- \$0表示函数名称
- \$1 \$2 \$3 .... 表示函数的参数，和可执行文件的参数无关

**循环**

`while`循环，满足条件时循环

```bash
while [ 循环条件 ]
do
	commands
done	
```

`until`循环，满足条件时停止

```bash
until [ 循环条件 ]
do
	commands
done
```

`for`循环，已知循环次数

```bash
for var in con1 con2 con3
do
	commands
done
```

```bash
for var in $(seq 1 100)
do
	commands
done
```

`seq 1 100`表示列出1到100

for循环的数值处理

```bash
for ((origin;restriction;step))
do
	commands
done
```

eg:

```bash
for ((i=1;i<=100;i=i+1)) # 可以使用i++
do
	echo i
done
```

**Debug！**

使用bash的相关参数来Debug

`sh [-nvx] script.sh`

-n 不运行脚本，仅检查语法问题

-v  运行脚本前，先输出脚本的内容

-x   将使用到的 脚本内容显示到屏幕上（脚本运行的全过程）

`date --date=YYYYMMDD +%s`可以把当前时间转化成秒，但是一定要加年份

#### 第十三章 Linux账号管理与ACL权限设置

每个用户都至少有两个ID：UID（User ID）GID（Group ID），都是数字组成的

系统获取UID和GID后，在 `/etc/passwd` 和 `/etc/group` 中找到对应的用户名和组名，再进行显示

登录时，还会查询密码存储的文件`/etc/shadow`

`/etc/passwd`文件结构，权限：644

`账户名：密码（一般在/etc/shadow文件中，这里显示x）：UID：GID：用户信息说明：home目录：shell`

UID:

0：管理员，如果需要添加管理员，只要把UID改为0即可

1~499：系统保留ID

500~65535：一般使用者账号，2.6.x版以上的Linux核心已经支持到4294967295

GID：初始群组的ID，登录系统时就有的群组权限，不需要在`/etc/group`的第四栏添加

- `usermod -G users captainxu`管理员可以把captainxu加入users群组中

`/etc/shadow`文件结构，权限：000

`账户名：加密密码：最近密码修改日期：密码不可更改的天数：密码需要变更的天数：密码需要变更前警告天数：密码过期后账号宽限时间（登录时必须更改密码）：账号失效日期（过期后账号不能再被使用）：保留字段`

修改日期：到1970年1月1日的天数

使用`date --date="YYYYMMDD" +%s`所显示的秒数也是从1970年1月1日以来的总秒数

 ![]({{ site.url }}/imgs/Vbird/12-1.1.png)

忘记密码找回：

- 一般用户：使用root用户`passwd`即可
- root用户：
  - 重启进入单人维护模式，以`passwd`更改密码
  - 以Live CD启动后挂载根目录，修改/etc/shadow，清空root的密码，重启后root不需要密码也可以登录，但是记得即使设置密码

`/etc/group`目录结构

`组名：群组口令：GID：群组支持的账号名称（用,分隔，中间不要加空格）`

`groups`命令，用户可以输入此命令查看自己所在的群组，第一个输出的是有效群组

有效群组：创建文件时显示的群组

`newgrp [群组名]`切换有效群组

`/etc/gshadow`的目录结构

`组名：口令栏（为！表示无群组管理员）：群组管理员账号：群组所属账号（与/etc/passwd文件相同）`

- 此目录的作用在于创建群组管理员

看到 2.账号管理

---

### 2018-7-23

> 雪，
>
> 飘落在
>
> 世界上——

^the 代表以the开头

\\.$    代表以.结尾

搜索空白行：`'^$'`只有行首行尾，就代表空白行啦

.        代表绝对有任意一个字符

\*        代表重复前一个字节任意次（从0次开始）

\.\*        就可以代表有任意个任意字符

在shell中，因为{}有特殊用法，所以在正则表达式中要转义使用

o\\{2\\}表示有2个o

o\\{2,5\\}表示有2-5个o

o\\{2,\\}表示有2个以上的o

`sed`工具

- 管线命令

`sed [-nefr] [action]`

-n 使用安静模式

-e   直接在命令行模式进行sed动作编辑（有多个命令时需要用-e分开）

-f    将动作写入文件 -f filename可以运行filename里面的sed动作

-r    使sed动作支持延伸型正则表达式（默认支持基础）

-i     直接修改读取的文件内容

- 动作
- n1,n2function
- n1,n2选择进行动作的行数（非必要），[10,20[动作]]
  - $代表最后一行
- a 新增 +str，新增字串在下一行出现
- c 取代 +str，可以取代n1到n2之间的行
- d 删除
- i  插入 +str，新增字串会在上一行出现
- p 列印，将某个选择的数据印出，通常和安静模式-n一起使用
- s 取代，可以搭配正则表达式

使用 a，i动作也可以新增多行，就是在每一行的末尾用 \ 来换行输入，最后要带单引号 ’ 结尾

 `sed 's/str to be replaced/new str/g'`使用sed取代

延伸的正则表达式 grep -E or egrep

| 在正则表达式中表示or

\+ 重复一次及一次以上前一个字符

？重复0次或一次前一个字符

() 多个字符判断eg: 'g(la|oo)d' = glad | good

()+  表示有一个以上的()内的字符串

格式化输出：

`printf '格式' content`不是管线命令

\a 警告声音输出

\b  backspace

\f  清屏（form feed）

\n 换行

\r  回车

\t  Tab

\v  垂直Tab

\x[0-9]\[0-9]  转换数字为字节（从今以后数字字母等将全部用正则表达式表示）

%[0-9]*s  表示多少个字节长度（数字+s）

%[0-9]*i    表示多少个数字

%[0-9]\*\\.[0-9]\*f   表示浮点数，前一个数字表示共有多少位，后一个数字表示有多少位小数（小数点也占一个整数位）

`printf '%s\t %s\t %s\t %s\t %s\t \n' $(cat printf.txt)`

`printf '%10s %5i %5i %5i %8.2f \n ' $(cat printf.txt | grep -v Name)`

printf 也可以吧ASCII码输出为对应字符

`awk '条件1{动作1} 条件2{动作2}' filename`

`last -n 5 | awk '{print $1 "\t" $3}'`

- 使用了print动作
- 内容是由默认的空格或Tab分栏，每一栏都有对应的变量，\$1 \$2 \$3 \$4...
- \$0代表一整列
- 内建变量（不需要\$符号，使用大写直接引用）
  - NF 每行分出的栏数
  - NR 目前awk打印的是第几行
  - FS  目前的分栏字符，默认是空格



上面awk处理流程为：

1. 读入第一行，分栏，赋予变量\$0 \$1...
2. 根据条件1、条件2……判断是否需要进行后面的动作1、动作2……
3. 做完所有动作和条件
4. 读取下一行，重复步骤1-3

`cat /etc/passwd | awk 'BEGIN {FS=":"} $3 < 10 {print $1 "\t" $3}'`

- BEGIN表示预先配置FS变量（分隔符），以保证在读取第一行时就以”：“作为分隔符

`cat pay.txt |awk 'NR==1{printf "%10s %10s %10s %10s %10s\n",$1,$2,$3,$4,"Total" }NR>=2{total = $2 + $3 + $4; printf "%10s %10d %10d %10d %10.2f\n", $1, $2, $3, $4, total}'`

动作中有多个命令时要使用 ; 分隔或按回车分隔

`diff [-bBi] from-file to-file`文件对比（按行比较）（文件都可以用 - 取代，表示stdin）

from-file 原始比对文件名

to-file      目的比对文件名

-b 忽略多个空格差异

-B 忽略空行

-i   忽略大小写

output：

```
[root@www test]# diff passwd.old passwd.new
4d3    <==左边第四行被删除 (d) 掉了，基准是右边的第三行
< adm:x:3:4:adm:/var/adm:/sbin/nologin  <==这边列出左边(<)文件被删除的那一行内容
6c5    <==左边文件的第六行被取代 (c) 成右边文件的第五行
< sync:x:5:0:sync:/sbin:/bin/sync  <==左边(<)文件第六行内容
---
> no six line                      <==右边(>)文件第五行内容
```

diff也可以比较两个不同目录的区别

`cmp [-s] file1 file2`按位组比较，可用于二进制文件

-s  列出所有的不同位组（默认只输出第一个）

`patch -pN < patch_file`升级旧文件

`patch -R -pN < patch_file`还原文件

`diff -Naur passwd.old passwd.new > passwd.patch`使用diff制作的比较文件通常用patch作为后缀

使用patchfile升级旧文件：`patch -p0 < passwd.patch`

文件打印（print）准备：`pr`

`pr /etc/man_db.config`可以自动产生文件时间、文件名、页码

更多使用请man



获得IP

`ifconfig ens33 | grep -v 'inet6' | grep 'inet' | sed 's/^.*inet//g'| cut -d ' ' -f2`

#### 第十二章 学习Shell Scripts

服务启动界面在 /etc/init.d目录下

管理主机每日任务：

查询登录文件、追踪流量、监控使用者主机状态、主机各项硬件设备状态、主机软件升级查询

shell scripts注意事项：

1. 命令从上而下，从左而右地运行
2. 命令、选项、参数间的多个空白会被忽略
3. 空行被忽略，Tab也被视为空格键
4. 读到Enter符号：CR，就会尝试开始运行该行命令
5. 可以使用 \ 将命令延伸至下一行
6. 使用`#`来加注释

如何运行脚本：需要有至少rx权限

- 使用绝对路径eg: /home/shell.sh
- 相对路径eg: ./shell.sh
- 把目录加入PATH
- 使用bash来运行`bash shell.sh` `sh shell.sh`

开始写script：

第一行：`#!/bin/bash`宣告脚本使用的shell为bash，加载bash的环境配置

除了`#!`以外的以#开头的行都是注释

- 注释使用，注释应包含此脚本的以下信息
  - 内容与功能
  - 版本号
  - 作者和联系方式
  - 创建日期
  - 历史记录
  - 特殊的命令，使用绝对路径的方式下达
  - 运行时需要的环境变量

环境变量宣告：

- 主要声明 PATH 和 LANG 的值，可以直接下达外部指令

主要程序部分

运行结果：回传值定义

- 使用exit使程序中断（类似return？）

\$((计算式))可以进行数值运算

可用的运算符号：

- \+ \- \* / %（取余）

脚本运行方式造成不同结果：

- 使用bash或sh运行脚本时，是采用子程序bash来运行，因此在脚本中使用的变量不能在父程序中使用
- 使用`source`运行脚本，脚本将在父程序中运行，其中的配置都会在父程序中生效

`test`测试命令（与|| && 符号搭配输出信息）

1. 类型判断：

-e  测试是否存在，存在返回0

-f   测试是否存在且为文件

-d  测试是否存在且为目录

-b  测试是否存在且为block device

-c   …………………………character device

-S   …………………………socket 文件

-p   …………………………FIFO（pipe）文件

-L    …………………………link文件

2. 权限判断：

-r -w -x：测试是否存在，且具有可读、可写、可运行权限

-u -g -k ：…………………………SUID、SGID、SBIT属性

-s    ：………………………………是否为空白文件

3. 文件比较：

-nt：`test file1 -nt file2`1比2新？

-ot:  1比2旧？

4. 整数判断：

-eq `test n1 -eq n2`n1=n2？

-ne  n1!=n2?

-gt  n1>n2?

-lt   n1<n2?

-ge  n1>=n2?

-le    n1<=n2?

5. 测试字符串：

`test -z str`str为空则为true

`test -n str`str为空则为false（可省）

`test str1=str2`

`test str1!=str2`

6. 逻辑判断：

`test -r file -a -x file`and

`test -r file -o -x file`or

`test ! -x file`not



判断符号`[]`，可以使用`test`的参数

注意使用格式，中括号的两端都需要空格来隔开

`[ -z "$HOME" ]`

`[ "$HOME" == "MAIL" ]`

常用在条件判断式中`if ...; then ... fi`

可以使用 -a -o ! 表示and or not

shell script 默认变量

脚本名称 \$0

参数1  \$1

参数2  \$2

....

特殊：

$#：代表脚本后接的参数的个数

$@：代表["\$1""\$2""\$3"...]

$*：代表["\$1 \$2 \$3 ..."]，空格可以是其他的分隔字符，空格为默认

`shift`参数号码偏移

`shift`使所有参数向左移一位，第一个参数被取消

`shift 4`使。。。。。。4位，前4个参数被取消

看到 12.4 条件判断式

---

### 2018-7-21 

> Seize the day.
>
> Carpe Diem.

#### 第十一章 正则表达式和文件格式化处理

不同的编码顺序抓取的结果不同！

`LANG=C`的编码顺序是0-9...A-Z...a-z

`LANG=zh_TW.big5`的编码顺序是0-9...aAbBcC...zZ

使用[a-z]得到的结果就会不同

特殊符号：使用这些符号可以免除不同语系编码导致的问题

`[:alnum:]`英文大小写和数字

`[:alpha:]`英文大小写

`[:blank:]`空白字符：空格键和Tab键

`[:cntrl:]`控制按键

`[:digit:]`数字

`[:graph:]`除了空白字符以外的所以按键

`[:lower:]`小写字符

`[:upper:]`大写字符

`[:print:]`所以可以被打印的字符

`[:punct:]`标点符号

`[:space:]`所以可以产生空白的字符：空白字符，CR等

`[:xdigit:]`16进制的数字：0-9，a-f,A-F

`grep`进阶选项

`grep [-A][-B][--color=auto] 'strtofind' filename`

-A # 列出搜寻行和它后续（after）的#行

-B # 列出搜寻行和它之前（before）的#行

-n     标出行号

-v      反向选择（没有某个字符串）

-i       忽略大小写



- CentOS 7默认，alias grep=grep --color=auto



---

### 2018-7-20

> Man is born free and everywhere he is in chains.

Bash Shell

1. 命令记录位置~/.bash_history，记录上一次登录使用的命令
2. 命令别名设置`alias lm='ls -al'`
3. 可以后台执行命令
4. 程序化脚本，Shell script
5. 支持万能字符`*`

指令是否为Bash shell(内置指令还是后期添加的指令)：`type`

`type [-tpa] cmdname`

参数

-t  显示file表示是外部指令，显示alias表示是别名，显示builtin表示是bash内置指令

-p 显示外部指令的完整文件名

-a 在PATH的路径中，显示含有后面指令的目录

快速删除、移动光标

`^u  ^k`从光标向前删除指令，向后删除指令

`^a  ^e`移动光标到指令最前，最后



 变量通常以大写来区分

显示变量`echo`

`echo $variable`

`echo ${PATH}`

变量赋值：`变量=值`等号两边不能加空白字符

变量名称规则：

- 只能是英文和数字，只能英文开头
- 若有空白字符，可以把变量用双引号或单引号引用起来
  - 双引号内的特殊字符（如引用变量$PATH）会保留为特殊字符的特性
  - 单引号内的特殊字符会转化为字符串
- 空白字符还可以用反斜线转义
- 在指令中还可以用  \`指令   或   `$(指令)`的方式调用别的指令
- 可以使用`var=${var}content` 增加变量内容，如`PATH=${PATH}:/somepath`
-  大写字符通常是系统默认变量，自定变量可以用小写设置
- 取消变量`unset varname`(注意！此处不加$符号)
- `export var`可以把变量设置成环境变量，在子程序下也可以使用，比如bash下再开一个bash

可以在文件`~/.bashrc`中设置环境变量，每次开机后就可以直接使用

`env`可以观察所有的环境变量

`export`也可以观察所有的环境变量

常见环境变量

- HOME：代表使用者的主文件夹
- SHELL：代表目前环境是那个shell
- HISTSIZE：代表系统可以记录的指令历史数量
- MAIL：使用mail指令收信时，读取的信箱文件
- PATH：指令搜寻路径
- LANG：语系数据
- RANDOM：随机数，每次调用的值都不同，介于0-32767之间

`delcare -i number=${RANDOM}*10/32768`声明了number变量，是一个在0-9之间的随机数（-i参数表示在后面的声明中算术式子将会被执行）

用set观察所以环境变量

重要变量

`PS1`命令提示符

- \d 可以显示 星期 月 日 的时间格式
- \H 完整主机名称
- \h 主机名称第一个小数点前的名字
- \t 显示24小时格式时间“HH:MM:SS”
- \T 显示12小时格式时间“HH:MM:SS”
- \A 显示24小时格式时间"HH:MM"
- \@ 显示12小时时间"am/pm"
- \u  目前使用者的名称
- \v  BASH的版本信息
- \w  完整的工作目录名称
- \W  只显示最后一个目录的工作目录
- \ #  下达的第几个指令
- \ $   提示符，root为#，一般用户为 \$

`$`本shell的PID

代表目前这个shell的线程代号

`?`上一个指令的回传值

return 0代表正常，错误将显示错误代码

`OSTYPE HOSTTYPE MACHTYPE`主机硬件与核心的等级

子程序只继承父程序的环境变量

`locale -a`查询Linux到底支持多少语系

可以逐一设置语系有关的变量，但是如果其他语系变量都未设置，且LANG或LC_ALL被设置，那么其他语系变量都会被替代

在tty1-tty6的终端机中是无法显示中文的，所以会显示乱码

系统默认语系定义文件在：/etc/locale.conf



`read`命令，可以等待用户从键盘键入变量

`read [-pt] var`

- -p 连接提示字符
- -t  等待的秒数

`delare/typeset`声明变量的类型

`declare [-aixr] var`（将选项的-变成+就可以取消选项）

- -a 定义数组
- -i   定义整型数
- -x  将后面的变量声明为全局变量
- -r   将变量设置为静态变量，Read Only

bash默认类型为字符串

bash不存在浮点数

`var[index]=content`数组声明

`ulimit [-SHacdfltu] [配额]`设置内存和CPU的使用限制

-H 严格设置，不能超过这个

-S  警告设置，超过后会发出警告

-a  可列出所以限制额度

-c   当某些程序出错时，系统会将该程序在内存中的信息写成文件

-f    此shell可以创建的最大文件大小

-d   程序可使用的最大断裂内存容量（segment）

-l     可用于锁定内存量

删除变量内容

`${PATH#/*dir/bin:}`

var表示要删除的变量

\# 表示从变量的最前面开始向后删除，还是符合取代文字最短的那一个

\## 还是符合取代文字最长的那一个 

${var%:/*dir}

% 表示从变量的最后面开始向前删除，还是符合取代文字最短的那一个

%% 还是符合取代文字最长的那一个 

/*dir/bin 就是要删除的内容，\*表示任意字符

只保留文件名`${MAIL##/*/}`

去掉文件名 `${MAIL%/*}`

取代

`${var/old/new}`会取代从左往右的第一个old

`${var//old/new}`取代所有old

替换

`var=${var1-content}`如果var1存在，则var=$var1,如果var1不存在，则var=content

![]({{ site.url }}/imgs/Vbird/10-2.1.png)

`var=${var1:-content}`如果var1不存在或者为空字符串，则var=content

![]({{ site.url }}/imgs/Vbird/10-2.2.png)

命令别名设置

`alias lm='ls -al|more'`

查询历史命令

`history`

\# 列出最近的#行命令

-c 清除shell中所有的history

-a [filename] 将从今往后的命令写入filename命名的文件中（默认`~/.bash_history`）

-r [filename]将文件的内容读到目前shell的history中

-w [filename]将目前的history写入文件中

`![command]`搜寻最近的一个以[command]开头的指令

`![number]`执行history中第number个指令



系统欢迎信息 /etc/issue   /etc/motd /etc/issue.net(远程登录提示)

`man issue` `man agetty`

\d 本地时间的日期

\l   显示第几个终端机接口

\m 显示硬件的等级

\n  显示主机的网络名称

\O  显示domain name

\r    显示操作系统版本

\t    显示本地时间

\S    显示操作系统名称

\v    显示操作系统版本

/etc/motd 中的信息会在用户登录后显示



login shell：需要完整登录流程来取得bash

non-login shell：不需要登录过程，比如x Window中开启终端

login shell读取的文件：

1. /etc/profile
2. ~/.bash_profile 或 ~/.bash_login 或 ~/.profile

~/.bash_profile

- 读取./bashrc这个文件
- 将/home/bin加入PATH
- 将PATH声明为全局变量

login shell 读取过程：

- 读取/etc/profile
  - /etc/profile.d/*.sh
    - /etc/locale.conf
- 读取~/.bash_profile
  - ~/.bashrc
    - /etc/bashrc
- 开始操作bash

`source`读入环境配置文件的指令

因为login shell在登录时才会读取/etc/profile 和 ~/.bash_profile ，所以把偏好设置写入后，都要重新登录才能生效。

source指令可以直接读取配置文件而不用重新登录

用法`source [configfile]`

non-login shell 会读取~/.bashrc

~/.bash_logout记录了登出bash时做的事

`stty -a`可以列出终端机输入按键代表的意义

intr：给程序发送中断信号（以下有信号字样的列，省略 '给程序发送*'）

quit：quit信号

erase：向后删除字符

kill：删除目前命令行的文字

eof：结束输入

start：程序停止后，重新开始屏幕输出

stop：停止目前屏幕的输出

susp：stop信号

backspace = ^?

`set`设置指令环境

-u  启用后使用未声明变量会报错

-v   启用后在信息被输出前会显示信息的原始内容

-x   启用后指令在被执行前，会先显示指令内容，指令前有+

-h -H   历史命令相关

-m  工作管理相关

-B   括号相关

-C    启用后，文件存在时，不会被覆盖

显示目前set的设置值`echo $-`

可以使用+参数来取消设置`set +u`

Bash万用字符

\* 代表任意个任意字符

？代表有一个（不能没用）任意字符

[aswd] 代表有一个[]内的字符（不能没有）

[0-9] 代表有一个（不能没用）在编码顺序内的字符

[^asd] 代表一定没有^后的字符

\# 注释符号

\   转义字符

|   管线

；持续指令分隔

~  用户主文件夹

$  变量的前置字符

&  工作控制，使指令在后台工作

！非

/  目录

\> \>>  数据流输出导向，取代、累加

<  <<  输入导向

'  '  不能在内部调用变量

"  " 可以调用变量

\`  \` 可以优先执行的命令（命令嵌套时用）= $()

( )  子shell的起始和结束

{} 命令区块的组合



数据流导向：

1. 标准输入：代码为0 <  <<
2. 标准输出：代码为1 >  >>
3. 标准错误输出：代码为2  2>   2>>

垃圾桶：/dev/null，所有导向的信息都会消失

两股数据写入同一个文件：

`> list 2>&1`

`&> list`

使用`cat > file`可以创建一个文件，直接在命令行输入（^D结束创建）

可以使用文本文件代替键盘输入

`cat > catfile < ~/.bashrc`

<< 表示结束的输入字符

`cat catfile << "eof"`意思是：输入eof后结束输入

![]({{ site.url }}/imgs/Vbird/10-4.1.png)

依序执行命令`cmd1;cmd2;cmd3`

`$?`命令回传值

正确运行时，命令回传0

`cmd1 && cmd2`若1回传0则运行2，否则不运行2

`cmd1 || cmd2`若1回传0则不允许2，否则运行2

管线

必须是可以接受stdin和 stdout 的命令

`cmd1|cmd2|cmd3`1的数据通过stdout stdin传给2

截取命令

`cut`：逐行处理

`cut -d ':' -f 1-4`以 ：为分隔符，截取第一个到第四个并显示

`cut -d ':' -f 1,4`只显示第一个和第四个

`cut -c 5-`从第五个字符开始显示

`grep`：搜寻信息

`grep [-acinv] 'str' file `

-a 将二进制文件以txt文件的方式搜寻

-c  计算找到str的次数

-i   忽略大小写的不同

-n  输出行号

-v   搜寻没有str的行

排序命令

`sort [-fbMnrutk] [fileorstdin]`

-f  忽略大小写

-b  忽略开头空格

-M  以月份名排序

-n  使用纯数字排序

-r   反向排序

-u   相同数据只显示一次

-t    分隔符（默认tab）

-k    以哪个区间来排序

`uniq`重复的项目只显示一次

-c  显示重复的次数

`last | cut -d ' ' -f1 | sort | uniq -c`分割出第一块后，按字母排序，之后只不显示重复的，并显示出重复的次数

`wc`计算文件中有多少字符（word count）

-l  仅列出行

-w 仅列出多少字

-m 多少字符

`last | grep [a-zA-Z] | grep -v 'wtmp'| wc -l`

`tee`双向导向：将数据流另存为一个文件，同时把数据流继续以stdout传给下一个命令

`ls -l /home | tee ~/homefile | more`

`ls -l /home | tee -a ~/homefile | more`有了a参数，就不会覆盖文件，而是在文件后面添加

`tr [-ds] SET1`来删除或取代数据流的信息

`last | tr [a-z] [A-Z]`把数据流中的小写字母换成大写字母

-d 删除信息中SET1这个字符串

`tr -d '\r'`删除DOS文件行尾的^M

`col [-xb]`

-x  将tab键转换成空格键

-b  文字内有反斜杠时，仅保留反斜杠最后接的字符

`join [-til2] file1 file2`默认情况下以” “分隔符，比对第一个字段，相同则将数据连成一行

-t  分隔符（默认以空格分隔）

-i   忽略大小写

`-1`第一个文件用第几个字段来分析

`-2`第二个文件用第几个字段来分析

`paste [-d] file1 file2`

-d  后面加分隔字符，默认Tab

`paste /etc/passwd /etc/shadow`

`cat /etc/group | paste /etc/passwd - | head -n 3` **-** 表示从stdin读取数据

`expand`可以将Tab换成空格键

`expand -t # -` \# 从把Tab转换成#个字符，- 从stdin中读取数据

`split`分割

```
split [-bl] file PREFIX
-b  ：后面可接欲分割成的文件大小，可加单位，例如 b, k, m 等；
-l  ：以行数来进行分割。
PREFIX ：代表前导符的意思，可作为分割文件的前导文字。
```

`xargs`参数代换

`-`的用途

在使用到前一个命令的stdout来作为stdin时，可以使用 - 来替代

`tar -cvf - /home | tar -xvf -` 前一个命令把/home打包的数据传送到 - ，也就是stdout中，后一个命令，通过 - ，获得stdout

- 看完了第十章的内容，已经感觉到疲劳了，脖子和大脑都在抗议，今晚回去整理一下这一周的笔记，就不新开一章了。

---

### 2018-7-19

今天开始改变排版方式，每一行的行首不带 - 标记

`bzip2`

为了取代gzip并提供更好的压缩比而来，用法几乎和gzip相同

参数

- -c -d -v -# 与gzip相同
- -k 保留源文件
- -z 压缩（默认参数）

`bzip2`提供了更高的压缩比，但是在压缩大文件时速度比gzip要慢很多

可以使用`bzcat\bzless\bzmore`查看压缩包

`xz`

用法几乎也和gzip，bzip2相同

- -d -t -k -c -#与gzip/bzip2相同
- -l 列出压缩文件的相关信息

提供更高的压缩比，同时，耗时也更多



使用指令`time [gzip|bzip2|xz] -c services > services.[gz|bz2|xz]`测试执行时间

![]({{ site.url }}/imgs/Vbird/8-2.1.png)

看最后一个时间，可以看到三个指令的花费时间依次递增



`tar`打包

gzip\bzip2\xz虽然可以对目录进行压缩，但是他们指的是把目录中的所有文件**分别**压缩

用法

- 打包并压缩：`tar [-zjJ] [-cv] [-f + newfilename] filename `
  - -c 创建(create)打包文件，搭配-v可以查看被打包的文件名
  - -z -j -J 分别是用gzip  bzip2  xz压缩
  - -f  后面是新的文件名，注意用不同的压缩软件文件名不同，必须和文件名紧挨，中间的参数也会作为文件名
  - -p 保留源文件的权限和属性
  - -P 保留绝对路径（默认会去除根目录，如果保留绝对路径，解压缩时就会覆盖原来路径的数据）
- 查看`tar -[zjJ]tv -f filename.tar.*z[2]`
  - -t 查看
  - -v 显示详细信息，如果不加可以只列出文件名
- 解压缩`tar -[zjJ]xv  -f filename.tar.*z[2] -C [directry]`
  - -C 指定解压目录
  - -x 解压

 使用`rm -rf [directory]`删除目录

解压某个文件

- 先使用`tar -jtv -f [file]|grep 'filename2find'`寻找要找到文件
- 在使用`tar -jxv -f filename.tar.bz2 filenamefinded`解压文件，注意，压缩包中的文件名不带根目录

![]({{ site.url }}/imgs/Vbird/8-3.1.png)

打包目录，但不包含其中某些文件

`tar -jcv -f ~/system.tar.bz2 --exclude=/root/etc* --exclude=/root/system.tar.bz2 /etc /root`

* 过长的指令可以在中间使用反斜线 `\`来换行输入

打包更加新的文件：更新备份时可以使用，就不用覆盖没有变化的文件了

`tar -jcv -f newfile.tar.bz2 --newer-mtime[--newer]="time" file2bzip `

- --newer 表示后面输入的日期包含mtime和ctime
- --newer-mtime 仅包含mtime

`tar -jtv -f newfile.tar.bz2|grep -v '/$'`输出不是以 / 结尾的文件，也就是排除了目录

* 只进行了打包，以tar结尾的文件称为tarfile
* 打包并压缩为文件，以tar.gz\bz2\xz结尾的文件称为tarball

使用`tar`来备份/etc的数据，复原后无法正常登录系统，大部分是因为/etc/shadow这个密码文件的SELinux类型在复原时被更改了。

恢复方法三种

1. 通过救援方式登录系统，修改/etc/selinux/config文件，将SELinux改成permissive模式，重启
2. 复原系统后，不要立即重启，使用`restorecon -Rv /etc`自动修复一下SELinux类型即可
3. 登录系统，创建/.authorelabel文件，重启后就会自动修复SELinux，再次重启恢复正常



XFS filesystem备份和还原

`xfsdump`

第一次使用xfsdump备份后，就可以选择使用累计备份：新备份的数据只会记录差异文件

注意事项

- 只能备份挂载的文件系统
- 必须使用root权限
- 只能备份XFS文件系统（人家叫xfsdump嘛）
- 备份数据只能用`xfsrestore`解析
- 通过文件的UUID分辨，不能备份两个具有相同UUID的文件系统

用法

`xfsdump [-L S_label] [-M M_label] [-l #] [-f backupfile] filetobackup`

`xfsdump -I`

参数

- -L 可以填写对此文件系统的简要说明
- -M 记录储存媒体的简要说明
- `-l`  指定备份等级（默认0，完整备份）
- -f  后面接产生的文件，类似tar
- `-I`从 /var/lib/xfsdump/inventory 列出目前备份的信息状态

备份/boot`xfsdump -L boot_all -M boot_all -l 0 /srv/boot.dump /boot`

产生level 0文件系统

在/boot中创建一个新文件

备份差异文件`xfsdump -l 1 -L boot_2 -M boot_2 -f /srv/boot.dump1 .boot`

产生level 1 文件系统

`xfsrestore`

参数

- `-I`和xfsdump相同
- -f  后面接备份文件
- -L 接Label name
- -s [file or directory] 复原某一个特定文件或目录
- -r  一般不需要用，一个磁盘内有多个文件，需要使用
- -i  进入互动模式，一般不用

复原之前创建的备份`xfsrestore -f /sev/boot.dump -L boot_all /boot`

`xfsrestore -f /srv/boot.dump -L boot_all /tmp/boot`

`du -sm /boot /tmp/boot`

`diff -r /boot /tmp/boot`

复原的结果是：同名的文件被覆盖，新的文件被保留

`xfsrestore -f /srv/boot.dump -i /tmp/boot3`进入互动模式，进行少量复原



光盘写入

`mkisofs`创建镜像文件

使用`mkisofs [-o xxxx.iso] [-Jrv] [-V vol] [-m excludefile] filetoiso`

参数

- -o  输入你想产生的镜像名称
- -J   产生和Windows相容的文件名结构，增加文件名长度到64个Unicode字符
- -r   通过Rock Ridge 产生支持Unix/Linux 的文件数据，可记录更多信息
- -v   显示创建过程
- -V vol 创建Volume
- -m file 不备份进去的文件

光盘格式为`iso9660`

默认情况下，所以文件都会放在iso文件的根目录下，所以使用-graft-point选项

- 镜像文件中目录所在=时间Linux中目录所在
- eg:
- /movies/ = /srv/movies/
- /linux/etc/ = /etc/

`mkisofs -r -v -o /tmp/system.img /root /home /etc`

`mkisofs -r -V 'linux_file' -o /tmp/system.img -m /root/etc -graft-point /root=/root /home=/home /etc=/etc`设置ISO文件内的目录

`isoinfo -d -i` 查看iso文件的内容

`rsync -a source destination`可以完整地复制所有数据权限属性

`cdrecord`光盘烧录，也可以使用`wodim`

`wodim -v dev=/dev/sr0 speed-4 -dummy -eject /emp/system.img`



其他常见压缩和备份工具

`dd`

dd可以直接读取磁盘设备（直接读取扇区），然后将整个设备备份成一个文件

`dd if=/etc/passwd of=/tmp/passwd.back`

显示信息 4+1 records in 表示使用了4个完整的512B（默认） block，和一个未满的block

将img烧录到USB中`dd if=/tmp/system.iso of=/dev/sdb`

将/boot分区备份`dd if=/dev/sda2 of=/tmp/sda2.img`

dd 的好处是无论什么文件系统，只要在磁盘中记录，就可以备份

将分区拷贝到U盘：447页



`cpio`

```
cpio -ovcB > [file/device]
cpio -ivcdu < [file/device]
cpio -ivct < [file/device]
```

参数

- -o  output
- -B 让默认的block可以添加至5120B
- -i    将数据文件或设备copy到系统中
- -d   自动创建目录
- -u   自动将较新的文件覆盖较旧的文件
- -t     配合i参数，用以查看以cpio创建的文件或装置内容
- -v    --verbose
- -c    以一种新的 portable format 形式存储

`find /boot | cpio -ocvB > /tmp/boot.cpio`将/boot备份

`cpio -idvc < /tmp/boot.cpio`解压在/root/boot

`<`标志和`>`相反，可以把后面的文件传入前面

/home 分区必须直接登录root才能卸载，不能通过一般用户su - 登录root

#### 第九章 vim编辑器！

`vi`正规的文本编辑器

很多软件的编辑接口都会主动调用vi

`vim`既有程序编辑能力，可以以字体颜色辨别语法的正确性

- `vi`的使用

`vi`具有三种模式：

- 一般指令模式：移动光标，复制粘贴删除等
- 编辑模式：输入`iIoOaArR`中的一个字母之后进入编辑模式，左下角会出现INSERT，按下ESC退出编辑模式
- 命令行模式：输入`:/?`中的一个符号，可以将光标移动到最下面一列，可以搜索，读取，存盘，替代字符，离开，显示行号等，也可以按ESC离开，进入一般指令模式

`vi filename`打开新文件

最后一行是信息提示，上面的是文件内容

输入上面提到的任意英文字母进入编辑模式

按ESC退出

输入`:wq`保存退出，输入`:wq!`可以强制写入（账户能够改变权限的情况下）

一般指令模式的其他操作：

使用`hjkl`四个键可以分别向左下上右移动光标

`^f`向下翻一页

`^b`向上翻一页

`^d`向下翻半页

`^u`向上翻半页

`+`光标移动到下一列（忽略空行）

`-`光标移动到上一列（忽略空行）

`#<space>`#代表数字，光标向后移动#个距离

`0`移动到当前列开头

`$`移动到当前列末尾

`H`移动到屏幕最上一列开头

`M`移动到屏幕中间一列的开头

`L`移动到屏幕最下方一列的开头

`G`移动到文件的最后一页

`#G`移动到文件的第#列

`gg`移动到文件的第一列

`#<Enter>`光标向下移动#列

命令行模式基本操作

搜索和替代：

`/word`向下搜索word字串

`?word`向上搜索word字串

`n`重复上次搜索

`N`显示上一个搜索结果

`:#1,#2s/word1/word2/g`在#1列和#2列之间寻找word1字串并取代为word2字串

`:1,$s/word1/word2/g`从第一列到最后一列搜寻word1并替代为word2

`:1,$s/word1/word2/gc`从第一列到最后一列搜寻word1并需要确认是否替代为word2

`x`向后删除一个字符

`X`向前删除一个字符

`#x`向后删除#个字符

`dd`删除光标所在的一整列

`#dd`删除光标所在向下#列

`d1G`删除光标所在到第一列的所有数据

`dG`删除光标所在到最后一列的所有数据

`d$`删除光标所在到该列的最后一个字符

`d0`删除光标所在到该列的第一个字符

`yy`复制光标所的那一列

`nyy`复制光标所在的向下n列

`y1G`复制光标所在列到第一列的所有数据

`yG`复制光标所在列到最后一列的所有数据

`y0`复制光标所在的那个字符到该行行首的所有数据

`y$`复制光标所在的字符到改行行尾的所有数据

`p P`将已复制的数据粘贴在光标的下一列、上一列

`J`将光标所在列与下一列的数据结合成一列

`c`重复删除多个数据

`u`复原前一个动作

`^r`重做上一个动作

`.`重复前一个动作

进入编辑模式按钮

`i I`在光标处插入；在光标列第一个非空白字符处开始插入

`a A`在光标下一个字符处开始插入；从光标所在列最后一个字符处开始插入

`o O`在光标所在的下一列插入新的一列；在光标所在上一列插入新的一列

`r R`取代模式。只取代光标所在字符一次；一直取代光标所在字符，知道按下ESC

命令行界面

`:w`写入改动

`:w!`强制写入，没有文件的w权限时

`:q :q!`

`:wq :wq!`

`ZZ`：有更改则存储后离开，没有更改则不存储离开

`:w [filename]`存储为另一个文件

`:r [filename]`将filename的文件读入光标所在列的后面

`:#1,#2 w [filename]`将#1行到#2行的内容存储为filename文件

`!command`可以暂时离开vi到命令行去执行command。

`vim`环境

`:set nu`显示行号

`:set nonu`取消行号显示

练习：

6 -> a

7 -> 93

8 -> 13

9 -> u*13

10 -> 66G 6yy G p

11 -> :113,128 d

13 -> 15x t

14 ->  gg O I am a student... :wq

vim编辑时按下 ^z会进入后台执行

输入`ls -al`找到暂存盘

把swp文件删除即可（如果不想保存更改）

如果想继续之前的更改，进入vim，使用R模式

Vim的特殊性

输入`alias`可以显示命令别名，我们发现，执行vi的时候默认执行的是vim

**区块选择：**

在Vim中按下

`v`光标经过的字符会被选择

`V`光标经过的列会被选择

`^v`用长方形的方式选择数据

`y`复制

`d`删除

`p`粘贴

多文件编辑

`:n`下一个文件

`:N`上一个文件

`:files`列出所有打开的文件

`:sp [filename]`多窗口打开多个文件

- `^w + ↑/↓/j/k`切换文件
- 可以互相复制粘贴
- `^w + q`离开

vim的补齐功能

- `^x -> ^n`通过文件内容为关键字补齐
- `^x -> ^f`通过文件名做关键字补齐
- `^x -> ^o`通过扩展名作为语法补充

一定要注意文件的扩展名，有扩展名才能补齐

使用`~/.vimrc`设置vim配置文件

![]({{ site.url }}/imgs/Vbird/vim-commands.jpg)

只要源文件的编码和终端的编码相同，vim就不会乱码

设置系统编码：

`LANG=zh_CH.gbk`

`export LC_ALL=zh_CH.gbk`

就可以读取gbk编码的文件了

`shell script`的行尾问题

Windows系统的行尾是CRLF（^M\$），Linux系统的行尾是LF（\$）

执行script的时候会出问题

使用dos2unix指令来转换

安装，需要网络或everything版本的CentOS iso

`mount /dev/sr0 /mnt`

`rpm -ivh /mnt/Packages/dos2unix-*`

`umount /mnt`

`unix2dos -k man_db.conf`

`dos2unix -k -n man_db.conf man_db.conf.linux`

使用`iconv-f 原编码 -t 新编码 filename [-o newfile]`转换文件编码

正确读取鸟哥网页的方式：

![]({{ site.url }}/imgs/Vbird/8-5.1.png)

将繁体UTF8编码转换成简体UTF8编码：

`iconv -f utf8 -t big5 vi.utf8 | iconv -f big5 -t gb2312 | iconv -f gb2312 -t utf8 -o vi.gb.utf8`

#### 第十章 认识与学习BASH

shell与kernel核心沟通，调用硬件，只是提供给使用者操作系统的一个接口，可以通过shell来操作其他应用程序

Linux使用的shell称为："Bourne Again SHell"简称BASH

检查/etc/shells文件，可以看到有多少Linux可以使用的shell

看到10.1.4 Bash shell 的功能（水喝完了……出去买水）

---

### 2018-7-18

- 又是精力充沛的一天啊，珍惜这样的时日吧！
- **指令查找**
- `which -a command`
  - -a 将所有在**PATH目录**中可以找到的指令均列出，不止第一个指令
- 使用which寻找which的位置`which which`
- alias就是所谓的命令别名，如`ll` = `ls -l`
- **文件查找**
- `find`不常用，原因：慢，费硬盘
- 首先选择`whereis`或`locate`来查找，找不到才使用`find`
- `whereis`在一些特定目录中寻找文件名
- 用法`whereis [-bmsu] fileordirname`
  - -l 可以列出whereis会去查询的几个目录
  - -b 只查找二进制文件
  - -m 只在说明文档manual路径下查找
  - -s 只查找source 来源文件
  - -u 搜寻不在上述三个项目中的其他特殊文件
- 可以使用`whereis -l`列出whereis将查找的目录，主要是bin目录和man的目录
- `locate/updatedb`
- `locate [-ir] keyword`找出所有和keyword相关的文件名
  - -i 忽略大小写差异
  - -c 不输出文件名，仅输出数量
  - -l 仅输出几行，-l 5意思是输出5行
  - -S 输出locate所使用的数据库文件的相关信息，包括数据库记录的文件/目录数量
  - -r 后面可以接正则表达式
- 找出5个和passwd相关的文件名`locate -l passwd`

![]({{ site.url }}/imgs/Vbird/6-5.1.png)

- 列出locate查询所使用的数据库文件`locate -S`

![]({{ site.url }}/imgs/Vbird/6-5.2.png)

- locate搜寻的数据库mlocate.db，在CentOS系统中，将每天更新一次数据，只有在数据库中的文件才能找得到
- 手动更新数据库`updatedb`

![]({{ site.url }}/imgs/Vbird/6-5.3.png)

- 可以看到，我在用一般用户执行updatedb时，会产生错误，这是因为一般用户无法读取mlocate.db文件，在之前的实验中也看到了
- `find [PATH] [option] [action]`
- 与时间有关的选项，下方以mtime为例，也可以对atime和ctime使用
  - -mtime n ：n为数字，意义为，在n天之前的一天之内被更改过的文件
  - -mtime +n：列出n天之前（不含n天本身）被更改过的文件
  - -mtime -n：列出n天之内（不含n天本身）……
  - -newer file：file是一个已存在的文件名，列出比file还要新的文件名称
- 与使用者或群组名称有关的选项
  - -uid n：n为数字，是使用者账号的ID
  - -gid n：n为数字，是群组名称的ID
  - -user name：name 是使用者的名称
  - -group name：name是群组的名称
  - -nouser：寻找文件的拥有者不存在于/etc/passwd记录的人
  - -nogroup：寻找文件的拥有群组不存在与/etc/group
- 由源代码自行编译的软件也可能是nouser
- 与文件权限及名称有关的参数
  - -name filename：搜寻指定文件名称的文件
  - -size [+-]SIZE：搜寻比SIZE还要大或小的文件
  - -type TYPE：搜寻文件类型为TYPE的
    - f 一般正规文件
    - b，c设备文件
    - d目录
    - l（小写L）链接文件
    - s socket文件
    - p FIFO文件
  - -perm mode 搜寻权限为mode的文件
  - -perm -mode 搜寻权限包裹mode 的文件
  - -perm /mode 搜寻权限包含任一mode中的权限
- `find /usr -name "*passwd*"`寻找包含passwd的文件
- `find /run -type s`寻找类型为socket的文件
- `find / -perm /7000`寻找带有SUID SGID SBIT权限的文件
- 其他选项和参数
  - -exec command：command为其他指令，可以用其他指令来处理搜寻到的结果
  - -print：将结果打印在屏幕上，默认选项

![]({{ site.url }}/imgs/Vbird/6-5.4.png)

- `find / -perm /6000 -exec ls -l {} \;`找出带有SUID 和SGID的文件并用ls显示其具体属性
- {}代表find找到的内容，封号;代表-exec的结束，因为；在bash中有特殊含义，所以用\来转义
- 找出大小在50k到60k之间的文件`find / -size +50k -a -size -60k -exec ls -hl {} \;` ，这里-a表示and，`ls -h`显示文件大小单位
- 找出大于50k且所有人不是root的文件`find / -size +50k -a ! -user root -exec ls -lhd {} \;`，可以用！表示NOT的逻辑运算
- 找出容量大于50k和容量等于0的文件`find /etc -size +50k -o -size 0 -exec ls -lh {} \;`，-o 表示or

#### 第七章 Linux磁盘与文件系统管理

- Windows 98 以前的文件系统是FAT
- Windows 2000 以后的是NTFS
- Linux的文件系统是Ext2
- LVM可以将一个分区格式化为多个磁盘系统
- LVM RAID都可以把多个分区合成一个文件系统
- Linux文件系统会将权限和属性放在inode中，实际数据放在data block中，文件较大时会占用多个block
- superblock记录整个文件系统的整体信息
- inode中有文件数据放置的block号码
- 索引式文件系统
  - 根据inode中的号码查询block，然后读取数据
- FAT为链式读取，如果block过于离散，就会导致文件读取性能变差，就需要磁盘重组
- Ext2文件系统
- **data block**
  - 支持1K 2K 4K三种大小的block
  - 格式化时block大小固定，不能改变
  - 每个block只能存放一个文件的数据
  - 如果文件大小大于block，则会占用多个block来存储
  - 如果文件大小小于block，则剩余的容量不能继续使用（因此导致空间浪费）
  - 1kb大小block支持最大单一文件为16GB，最大文件系统容量为2TB
  - 2kb大小block  为    256GB 8TB
  - 4kb 大小block 为     2TB  16TB
- 所以选择block大小时要根据需要
- **inode table**
- 记录的数据
  - 文件的rwx属性（存取模式）
  - 文件的owner 和 group
  - 文件的容量
  - 文件创建或状态改变的实际（ctime）
  - 最近读取时间（atime）
  - 最近修改时间（mtime）
  - 定义文件特征的标志（flag）如SUID
  - 该文件内容的指向（pointer）
- inode的数量和大小也是在格式化时就已经固定了
  - 每个inode大小均为128字节（Ext4和xfs可以到256字节）
  - 每个文件都仅占用一个inode
  - 文件系统能够创建的文件数量与inode的数量有关
  - 系统读取文件时需要先找到inode，分析inode记录的权限与使用者是否符合，然后在开始读取block的内容

![]({{ site.url }}/imgs/Vbird/inode.jpg)

- inode的指定，12个直接指向，一个间接指向，一个双间接指向，一个三间接指向。
- 每笔block号码记录会花费4字节，1K的block用来做间接指向可以记录256个号码
- 多层间接指向每一层用来指定下一次的block可以指定256个下一层
- **Superblock**超级区块
- 记录整个filesystem的相关信息
  - 记录block与inode 的总量
  - 未使用与已使用的inode/block的数量
  - block与inode的大小（block：1k,2k,4k, inode: 128B, 256B）
  - filesystem的挂载时间，最近一次写入时间，最近一次检查磁盘时间
  - 一个valid bit 数值，若文件系统已挂载，valid bit 为0，未挂载valid bit为1
- 一般superblock的大小为1024B，可以用`dumpe2fs`指令查看信息
- 第一个superblock作为filesystem的superblock，如果其他block group中也有superblock，则作为第一个superblock的备份
  - Filesystem Description：描述每个block group的开始结束号码，以及每个group区段分别介于哪一个block号码之间
  - block bitmap：记录哪些block是空的
  - inode bitmap：记录未使用的inode号码
  - dumpe2fs：查询superblock的指令（xfs文件系统已经不能使用此命令）
- `blkid`可以调出系统中所以被格式化的设备



- 创建目录时，文件系统会分配一个inode与至少一块block给该目录
- inode记录该目录的权限和属性，以及那块block的号码
- block记录这个目录下的文件名，以及文件名占用的inode号码
- 想观察文件夹内文件占用的inode号码，可以用`ls -i`来显示

![]({{ site.url }}/imgs/Vbird/7-1.1.png)

- 当目录中文件过多时，会多一个block来记录
- 文件系统规划很大时，文件通常无法连续写，block号码通常是离散的
- 新建文件时，文件系统的行为：
  - 确定使用者对目录是否有wx权限
  - 根据inode bitmap找到没有使用的inode号码，写入新文件的权限/属性
  - 根据block bitmap找到没有使用的block号码，写入实际数据，并更新inode
  - 将刚刚写入inode和block数据同步更新inode bitmap和block bitmap，并更新superblock的内容
- 一般，将inode table 和 data block称为数据存放区域，而superblock、block bitmap、inode bitmap等区段称为metadata（中介数据），因为他们经常变动，每次新增，移除，编辑都会影响这三个部分的数据
- 数据的不一致（inconsistent）状态：
- metadata与实际数据存放区产生不一致（在未更新metadata前系统突然中断），Ext2系统会在重启时进行数据一致性检查。
- 日志式文件系统（journaling filesystem）
- 在filesystem中规划出专门记录写入和修订文件时的步骤
  - 预备：要写入文件时，先在日志记录区块中记录某个文件，准备要写入的信息
  - 实际写入：开始写入文件的权限和数据，开始更新metadata
  - 结束：在日志记录区块当中完成该文件的记录
- Linux文件系统的运行
- 异步处理：
  - 如果载入内存的数据是未变动过的，会被标志为clean，如果被更改了，则会被标志为dirty
  - 系统会不定时地把内存中标志为dirty的数据写入硬盘
  - 也可以通过`sync`指令手动把内存中的dirty数据写入硬盘
- 挂载点的意义：
- 将文件系统和目录树结合称为挂载（mount）
- 其他Linux支持的文件系统与VFS
  - 传统文件系统：Ext2/minix/MS-DOS/FAT/iso9660（光盘）
  - 日志式文件系统：Ext3/Ext4/ReiserFS/Windows' NTFS/IBM's JFS/SGI's XFS/ZFS
  - 网络文件系统：NFS/SMBFS
- 查看目录`ls -l /lib/modules/$(uname -r)/kernel/fs`来获取Linux支持的文件系统

![]({{ site.url }}/imgs/Vbird/7-1.2.png)

- 查看目前已载入到内存中支持的文件系统`cat /proc/filesystems`
- Linux VFS （Virtual Filesystem Switch）
- Linux通过这个核心来管理filesystem
- **参考相关链接[5]**
- XFS文件系统配置
- 数据分布上分为三个区：
  1. 数据区：整个文件系统的superblock、剩余空间的管理机制、inode的分配与追踪，inode和block都是在需要用时才动态产生。
     - XFS的block容量可由512B到64K调配，但是由于Linux环境下最高只能使用4K的block
     - inode的容量可由256B到2M，不过256B的默认值就足够了
  2. 文件系统活动登录区（log section）：记录文件的变化，直到变化完整写入数据区后才会结束。可以理解为日志区。
     - 可以指定外部磁盘为xfs的日志区，如果用SSD来做日志区，可以更快速的工作了
  3. 实时运行区（realtime section）：创建文件时，会在这个section中找数个extent区块，将文件放置在这个区块内，分配完毕后，再写入data section的 block和inode中
- 使用 `xfs_info`观察数据
- `df -T /boot`找出/boot挂载点下文件系统的superblock记录
- `xfs_info /dev/sda2`

![]({{ site.url }}/imgs/Vbird/7-1.3.png)

- isize = inode的大小	agcount = 储存区群组个数	agsize = 每个储存区群组的block个数
- sectsz = 逻辑扇区容量  
- bsize =block的容量 
- sunit、swidth 是有关磁盘阵列stripe的，因为没有用磁盘阵列，所以是0
- internal = 这个log section在filesystem内，而不是外部
- extsz = extent的容量



- 文件系统简单操作
- df：列出文件系统的整体磁盘使用量
  - `df [-ahikHTm] [dirorfilename]`，后面加上目录或者文件时，会自动分析目录所在partition的容量
  - -a 列出所有的文件系统，包括系统特有的/proc等文件系统
  - -k、-m 以KBytes、MBytes的容量单位显示各文件系统（默认KB）
  - -h 在结果处，以GB, MB, KB等格式自行显示大小
  - -H 以十进制的进位方式显示MB与KB的换算
  - -T 显示type
- 主要关心根目录`/`的容量，如果没有容量了的话Linux就问题很大了
- /dev/shm 是内存仿真出来的，存取很快，但不会存入硬盘
- du：评估文件系统的磁盘使用量
  - `du [-ahskm] fileordirname`
  - -a 列出所有的文件与目录容量（默认仅统计目录下的文件量）（列文件时用）
  - -h 加个单位：G/M
  - -s 列出总量，不列出每个个别的目录占用容量（列本目录时用，不显示子目录，但是数值是相加的）
  - -S 不包括子目录下的总计（子目录的数值也不会添加上去）
  - -k -m 以KB/MB作为容量显示（默认KB）
- 实体链接与符号链接
- Hard link（实体链接）
- 多个文件名链接到同一个inode号码，Hard link 和源文件inode号码相同
- 用`ln source destination`来创建Hard link
- 限制
  - 不能跨Filesystem
  - 不能链接到目录
- Symbolic Link（符号链接）
- 相当于Windows快捷方式
- 创建了一个独立的文件，让数据读取指向link的文件名
- 如果删除源文件会导致无法打开
- Symbolic link文件和源文件inode是不同的，因此建立Symbolic Link文件是会占用inode的
- Symbolic link文件大小和带绝对路径的源文件大小是相同的
- `ln [-sf] source destination`
  - -s 创建Symbolic Link，默认创建Hard Link
  - -f 如果destination存在，则主动移除Destination后再创建

![]({{ site.url }}/imgs/Vbird/7-1.4.png)

- `lsblk [-dfimpt] [device]`列出系统上所有的磁盘列表
  - -d 仅列出磁盘本身
  - -f  同时列出该磁盘内的文件系统名称
  - -i   使用ASCII的线段输出
  - -m 同时输出该设备在/dev 下面的权限数据
  - -p   列出完整的文件名
  - -t    列出详细数据，包括磁盘伫列机制
- 下达`lsblk`，显示数据

![]({{ site.url }}/imgs/Vbird/7-1.5.png)

- MAJ:MIN ：kernel识别设备代码，主要：次要 设备
- RM：是否为可卸载设备。
- RO：是否为只读设备。
- `blkid`列出设备的UUID等参数
- `parted`列出磁盘的分区表类型与分区信息
  - `parted [device_name] print`列出设备相关数据，可以看到MBR分区还是GPT分区
- MBR分区使用fdisk
- GPT分区使用gdisk
- `gdisk device_name`
- 分区步骤
  1. 通过lsblk或blkid找到磁盘
  2. 用`parted /dev/xxx print`找出内部分区表类型
  3. 用gdisk或fdisk来操作系统
- `gdisk`的选项
  - w 保存退出，q 不保存退出，所以只要退出时按下q就可以随便玩gdisk了
  - 用n添加分区
  - d删除分区
  - 可以输入？自行查看指令
- 文件系统ID：Linux：8300/8200(swap)/8e00
  - ​		Windows:0700
- 使用`cat /proc/partitions`查看分区情况
- 新分区之后不会立即看到新的分区，系统提示需要重启才能看到新的分区
- 也可以通过命令`partprobe`更新Linux核心的分区表信息
- `partprobe -s`可以显示信息
- **注意！不要处理正在使用的分区，如果要删除正在使用的分区，必须先将其卸载，直接删除的话核心会无法更新分区表信息**
- MBR分区表使用fdisk分区



- ......磁盘分区完成！

- 开始磁盘格式化！
- XFS文件系统`mkfs.xfs`
- 格式化 == 创建文件系统
- `mkfs.xfs [-bdfiLlr] device`
- 输入`mkfs.xfs --help`可以看到完整的参数介绍
- 直接加device名称使用默认设置
- CentOS 7默认值

![]({{ site.url }}/imgs/Vbird/7-3.1.png)

- agcount参数可以和CPU核心数设置相同
- `grep 'processor' /proc/cpuinfo`查看CPU编号
- 有两颗核心时，设置agcount`mkfs.xfs -f -d agcount=2 /dev/sda4` -f 参数强制格式化
- **7.3 XFS文件系统for RAID性能优化** 已跳过，可以看完14章后回来再看
- 可以使用`mkfs.ext4`来格式化出Ext4的分区
- 其他文件系统`mkfs`
- 输入`mkfs`然后双击Tab就可以看到支持的全部的文件系统
- 用法都与`mkfs.xfs`类似



- ......格式化完成！
- 开始检验文件系统！
- 当xfs文件系统错乱时！！！使用`xfs_repair`指令救援（为什么会错乱啊555555）
- `xfs_repair`参数们！
  - -f 后面的设备其实是文件而不是实体设备！
  - -n 就仅仅是检查一下而已啦（我就碰碰我不进去）
  - -d 针对根目录`/`进行检查和修复的动作！炒鸡危险哒！
- 检查方法`xfs_repair device`，有7个流程，可以通过man xfs_repair查看
- *使用xfs_repair时，被修复的硬盘不能已被挂载！*
- 如果根目录出现问题....
  - 你就需要进入单人维护模式或救援模式
  - 通过-d选项强制检验设备
  - 检验完毕重新开机
- 使用`fsck.ext4`来处理Ext4文件系统
- 参数们！
  - -p 萌萌的小P，自动帮您选择需要选择`y`的步骤哟！
  - -f   强制检查！当fsck没有发现任何标志时不会主动进入，此时就需要-f来强行进入！
- `dumpe2fs -h /dev/sda5|grep 'Blocks per group'`查看每个block群组有多少个block，然后因为block号码是从0开始的，所以第二个superblock就在这个数字的位置！

![]({{ site.url }}/imgs/Vbird/7-3.2.png)

- 那么就根据这个superblock来检测系统
- `fsck.ext4 -b 32768 /dev/sda5`
- **Attention!上述介绍的两个指令（fsck.ext4 xfs_repair）对系统有可能造成损害，所以只有在系统出现大问题（开机必须进入单人单击模式）时才使用**
- 此外，被检查的分区必须在卸载状态，不能挂载在系统上



- ......分区检测完毕！

- 开始文件系统挂载与卸载！！
- 前提条件：
  - 单一文件系统不应该被重复挂载在不同挂载点
  - 单一目录不应该重复挂载多个文件系统
  - 作为挂载点的目录理论上应该都是空目录（如果不是空的，文件会被隐藏，知道新分区卸载，才会再次出现！）
- `mount`指令！博大精深！
  - -a 依照配置文件 /etc/fstab 将所有未挂载的磁盘都挂载上来
  - -l 增加Label
  - -t 增加类型，不过Linux会自动检测文件系统的类型，检测顺序见 /etc/filesystems
  - -n 在默认情况下，系统会把实际挂载情况写入/etc/mtab，但在单人维护模式中，会刻意不写入，加入这个选项让他写入吧！
  - -o 接挂载时额外加上的参数
- Linux已经载入的文件系统类型：/proc/filesystems
- 查看Linux是否有相关文件系统类型的驱动程序：/lib/modules/$(uname -r)/kernel/fs/
- 用UUID来挂载新分出的sda4区
- `blkid /dev/sda4`查看UUID
- `mount UUID="" /data/xfs`会报错，非正规目录，先手动创建一个
- `mkdir -p /data/xfs`
- `mount UUID="" /data/xfs`
- `df /data/xfs`查看分区挂载情况



- 重新挂载根目录
- `mount -o remount,rw,auto /`如果不加后两个参数，根目录会被挂载为只读
- 也可以把一个目录挂载到另一个目录上去（不能添加symbolic Link的时候可以这么做）
- `mkdir /data/var`
- `mount --bind /var /data/var`
- 这样就挂载好了，看看结果
- `ls -ild /var /data/var`
- 发现内容是完全一样的



- `umount`卸载设备，学了挂载肯定也得学卸载喽
  - -f 强制！
  - -l 立即卸载！更加强制
  - -n 不更新 /etc/mtab 的情况下卸载
  - （好粗暴哟）
- 卸载之后可以使用df 或 mount 查看



- Linux下所有文的设备都是文件。文件通过major 和 minor两个数值来表示
- 由`mknod`来手动创建设备文件
- `mknod device [bcp] [major] [minor]`
  - b 设置设备为一个周边储存设备
  - c  设置设备为一个周边输入设备
  - p  设置设备为一个FIFO文件



- xfs_admin修改UUID和Label name
  - 如果格式化的时候忘记加上标头名称，就可以用这条指令来添加
- `xfs_admin [-lu] [-L label] [-U uuid] device`
  - -l -u ，列出device的label name ，UUID
  - -L，设置device的Label name
  - -U，设置device的UUID
- `uuidgen`生成新的UUID



- fstab的信息:
- `[设备/UUID等] [挂载点] [文件系统] [文件系统参数] [dump] [fsck]`

- 文件系统参数：

![]({{ site.url }}/imgs/Vbird/7-3.4.png)

- 将想要开机挂载的分区添加到fstab中就可以开机自动挂载了
- `nano /etc/fstab`编辑fstab
- `UUID="" /data/xfs xfs defaults 0 0`添加开机自动挂载/dev/sda4到/data/xfs上
- 测试语法是否正确
  - `df`先确定/dev/sda4还未挂载
  - `mount -a`按配置文件挂载
  - `df`如/dev/sda4被挂载上，则语法无误
- 如果语法有错误，将从单人维护模式进入，根目录是只读状态可以使用命令
- `mount -n -o remount,rw /`重新挂载根目录，修改/etc/fstab
- 直接挂载镜像文件
  - 创建挂载点`mkdir /data/dvd`
  - 挂载！`mount -o loop [.iso文件] /data/dvd`
  - 卸载`umount /data/dvd`
- 挂载大型文件
  - 创建空文件在/src/loopdev`dd if=/dev/zero of=/srv/loopdev bs=1M count=512`
    - if ：input file输入文件,/dev/zero是会一直输出0的设备
    - of：output file，将一堆0写在/srv/loopdev中
    - bs：每个block的大小
    - count：总共有多少个block
  - 格式化大型文件`mkfs.xfs -f /srv/loopdev`
  - 挂载`mount -o loop UUID="" /mnt`
  - 设置开机挂载
    - `nano /etc/fstab`
    - `/srv/loopdev /data/file xfs defaults,loop 0 0`（鸟哥教程上是defaults\*\*,loop\*\*，但我测试时，会报错）
- **swap之创建**
- 步骤：
- 分区 `gdisk`
  - `gdisk /dev/sda`
  - +512M
  - 8200
  - `partprobe`
- 格式化 `mkswap`
  - `mkswap /dev/sda6`
- 使用 `swapon device`
  - `swapon /dev/sda6`
- 观察 `free & swapon -s`
- 写入配置文件
  - `nano /etc/fstab`
  - `UUID="" swap swap dafaults 0 0`

![]({{ site.url }}/imgs/Vbird/7-5.1.png)

- 使用文件创建swap
- 创建一个128MB的swap
- 创建一个128MB的文件
  - `dd if=/dev/zero of=/tmp/swap bs=1M count=128`
- 格式化为swap格式
  - `mkswap /tmp/swap`
- 启动
  - `swapon /tmp/swap`
- 设置自动启用
  - `nano /etc/fstab`
  - `/tmp/swap swap swap defaults 0 0`
- 关闭swap file
  - `swapoff /tmp/swap /dev/sda6`
- 按照配置文件启动
  - `swapon -a`



- 文件系统的特殊观察与操作
- 使用`ls`时会有**总用量**或**total**标识，那就是目录使用的block的大小，可以看到，不足4k的文件依然占用了4k的存储空间

![]({{ site.url }}/imgs/Vbird/7-6.1.png)

- 使用`parted`创建分区
  - `parted /dev/sda print`找到下一个分区的起始点
  - `parted /dev/sda mkpart primary fat32 36.0Gb 36.5GB` 仅需要这一条指令就可以创建分区，不需要和用户互动。
  - `parted /dev/sda print`
- 鸟哥还是推荐尝试parted



- 删除分区`parted /dev/vda rm 号码（vda?）`
- 文件系统损毁会导致报错：发现磁盘有问题，只需要重建文件系统即可



#### 第八章 文件与文件系统的压缩、打包与备份

Linux常见压缩扩展名

- .z：compress压缩
- .zip：zip压缩
- .gz：gzip压缩
- .bz2：bzip2压缩
- .xz：xz压缩
- .tar：tar打包数据，还没有压缩
- .tar.gz：tar包经过gzip压缩
- .tar.bz2    .tar.xz同理

`tar`可以将多个文件打包成一个文件，目录也可以打包，其他软件都只能压缩一个文件

GNU计划中，将整个tar与压缩的功能结合在了一起

`gzip`：使用最广的压缩指令：可以解开compress，zip与gzip等软件所压缩的文件

用法：

- `gzip [-cdtv#] filename`
- -c 将压缩的数据输出到屏幕上
- -d 解压缩的参数
- -t  可以用来检验一个压缩文件的一致性
- -v  可以显示出源文件、压缩文件的压缩比等信息
- -#  #用数字代替，-1最快，压缩比最低，-9最慢，压缩比最高，默认-6

`ls -Sld /etc`找出目录中最大的文件/目录

使用`zcat/zless/zmore`能像用`cat/less/more`一样去查看.gz压缩包的内容（牛皮！）

使用`>`使原本要输出在屏幕上的文本存在>后面的文件中

`gzip -c -9 service > service.gz`将service压缩并保留源文件

`zgrep`用法相当于`grep`

`grep`

- 用法`grep [options] [pattern] filename`
- 在文件中寻找[pattern]类似的部分并打印在屏幕上
- [pattern]可以用正则表达式

看到8.2.2 bzip and his family

Typora 统计词数18101词

---

### 2018-7-17

- 搬家后第一次来嘉定图书馆，环境真棒啊，激起了满满学习的激情！
- 今天从FHS开始
- **目录配置**
- 第一部分：FHS要求必须存在的目录
  - /bin ：放置在单人维护模式下还能够被操作的指令，可以被root与一般账号所使用，主要有：cat, chmod, chown, date, mv, mkdir, cp, bash等常用命令
  - /boot：主要放置开机使用的文件，包括Kernel和开机菜单及配置文件。Kernel常用的文件名是：vmlinuz，如果使用grub2开机，还会存在/boot/grub2
  - /dev：所有设备和周边设备都以文件的形态存储在这个目录，重要文件/dev/null，/dev/zero，/dev/tty，/dev/loop，/dev/sd等
  - /etc：系统主要的配置文件。如账号密码，一般用户也可以查阅，但是只有root用户才能更改。重要文件：/etc/passwd, /etc/fstab, /etc/issue等
    - 不建议二进制文件存储在此目录
    - /etc/opt：必须存在于etc目录下的子目录，放置第三方支持软件
    - /etc/X11：建议，与X Window有关的配置文件都在这里，尤其是xorg.conf
    - /etc/sgml：建议，与SGML格式有关的各项配置文件
    - /etc/xml：建议，与XML格式有关的各项配置文件
  - /lib：开机时会使用到的函数库，以及/bin及/sbin下面指令会调用的函数库。
    - /lib/modules/：必须，放置可改变的驱动程序
  - /media：放置可移除的设备，包括光盘，DVD，软盘等，常见文件名：/meida/floppy, /media/cdrom
  - /mnt：暂时挂载某些额外设备，与/media用途相同
  - /opt：非原本distribution提供的额外软件，在以前的Linux系统中，习惯于放置在/usr/local目录下
  - /run：放置开机后所产生的各项信息，早期FHS规定放置于/var/run，新版规定为/run，性能有所提升
  - /sbin：许多用来设置系统环境的指令，只有root才能用来**设置**系统，而一般用户只能用来**查询**。此目录下为开机过程中所需要的，包括开机、修复、还原系统指令。
    - 某些服务器的软件程序，一般放置到/usr/sbin中
    - 本机自行安装的软件所产生的可执行文件，一般放置到/usr/local/sbin当中。常见指令包括：fdisk, fsck, ifconfig, mkfs
  - /srv：可以视为'service'的缩写，是一些网络服务启动后，这些服务所需要取用的数据目录。常见的WWW放置在/srv/www中。
    - 不过，系统不希望提供给网际网络任何人浏览的话，默认建议放置到/var/lib目录下
  - /tmp：让一般使用者或是正在执行的程序暂时放置文件的地方。任何人都能存取这个目录，需要定期清理，**重要数据不能放置在这里**。
    - FHS建议在开机时将/tmp下的数据全部删除
  - /usr
  - /var：主要放置变动性数据
- 第二部分：FHS建议可以存在的目录
  - /home：使用者的主文件夹，新增账户时，默认主文件夹规范都会放置到这里，主文件夹还可以用波浪号`~`表示，可以使用`cd ~`进入主文件夹
  - lib\<qual>：用来存放与/lib不同格式的二进制函数库，如/lib64
  - /root：系统管理员的主文件夹。
- 其他FHS标准以外的重要目录
  - /lost+found：使用ext2/ext3/ext4文件系统格式才会产生的目录，目的是文件系统发生错误时，将一些遗失的片段放置在这里。xfs文件系统不存在这个目录
  - /proc：虚拟文件系统，放置的数据都在内存当中，如系统核心、行程信息（process）、周边设备和网络状态等。该目录不占任何硬盘空间，因为文件都在内存当中
    - 重要文件：/proc/cpuinfo, /proc/dma, /proc/interrupts, /proc/ioports, /proc/net/*等
  - /sys：与/proc类似，记录kernel与系统硬件信息较相关的信息。包括目前已载入的核心模块与核心侦测到的硬件设备信息。不占硬盘
- /usr的意义和内容：
  - 内部数据是可分享，不可改变的。可以分享给局域网内的其他主机
  - Unix Software Resource的缩写。FHS建议开发者把自己的数据放在这个目录的子目录。
  - 所有系统默认软件都会放在此目录下
  - FHS要求必须存在的子目录
    - /usr/bin：所有一般用户能够使用的指令。此目录下不应该有子目录。/bin链接到此目录
    - /usr/lib：与/lib相同，/lib链接到此目录
    - /usr/local：自行下载的软件建议安装到此目录，和/usr的目录结构完全一样
    - /usr/sbin：非系统正常运行所需要的系统指令。常见的是网络服务器软件的服务指令（daemon）
    - /usr/share：主要放置只读架构的数据文件。几乎都是文本本件。
      - 常见子目录：/usr/share/man：man的文档，/usr/share/doc：软件杂项的文件说明，/usr/share/zoneinfo：时区文件
  - FHS建议可以存在的目录
    - /usr/games/：与游戏相关的数据
    - /usr/include/：c/c++等程序语言的头文件
    - /usr/libexec：某些不被一般使用者惯用的可执行文件或脚本。
    - /usr/lib\<qual>：与/lib\<qual>功能相同
    - /usr/src/：一般源代码建议放置在这里。kernel源代码建议放置在/usr/src/linux目录下
- /var的意义和内容
  - /var目录主要针对经常变动的文件，包括高速缓存cache，登陆文件log file，MySQL数据库文件等
  - 常见子目录
  - FHS要求必须存在的目录
    - /var/cache/：应用程序运行过程中会占用一些暂存盘
    - /var/lib/：程序执行的过程中，需要使用到的数据文件放置第目录。各自的软件应当有各自的目录
    - /var/lock/：某些设备或文件一次只能被一个应用程序所使用，否则可能出现错误。因此就要将此设备上锁（lock），以确保只会给单一软件使用。
    - /var/log/：非常重要，登录文件放置的目录，其中重要的信息包括/var/log/messages/, /var/log/wtmp等
    - /var/mail：记录电子邮件信箱的目录，也被放置到/var/spool/mail中，两者互为链接目录
    - /var/run：某些程序或服务启动后，会将他们的PID放置在这个目录下，和/run链接
    - /var/spool：放置队列中的数据，使用后通常被删除
- 完成基础篇的学习后，可以去看看FHS的官方英文文件
- 除了FHS中定义的最上层/和次层目录以外，其他次级目录内，开发者就可以自行配置了。
- CentOS 7中把许多应该在根目录`/`中的目录移动到了/usr中去，然后以链接的方式在根目录展示
  - 包括/bin -> /usr/bin
  - /sbin -> /usr/sbin
  - /lib -> /usr/lib
  - /lib64 -> /usr/lib64
  - /var/lock -> /run/lock
  - /var/run -> /run
- 目录树
  - 从根目录起始
  - 每个目录除了本地partition，也可以使用网络file system。如Network File System（NFS）服务器挂载特定目录
  - 每一个文件在整个目录数中的文件名都是独一无二的
- 使用`ls -al`查询根目录结构

![]({{ site.url }}/imgs/Vbird/5-3.1.png)

- 相对路径
  - ./ 代表当前目录
  - ../ 代表上一级目录
- 若可执行文件放在某目录，且本目录不是正规可以执行文件目录（/bin，/usr/bin）,此时执行文件就需要严格指定文件目录用 ./ 表示本目录，如`./run.sh`
- LSB：Linux Standard Base
- 可以使用`uname` `lsb_release`等指令查阅Kernel和LSB需求的几种重要标准
- `uname -r`查看核心版本
- `uname -m`查看操作系统的位数

![]({{ site.url }}/imgs/Vbird/5-3.2.png)

- 在有网络可以使用的情况下
- `yum install redhat-lsb`
- `lsb_release -a`

#### 第六章 Linux文件与目录管理

- 写shell script 时，务必使用绝对路径

- 目录的相关操作

- 特殊目录：

  - . 此层目录
  - .. 上一层目录
  - \- 前一个工作目录
  - `~`目前账户所在主文件夹
  - `~[account]`是[account]这个用户的主文件夹

- 常见指令

  - `cd`变换目录

  - `pwd`显示目前目录（print working dictionary）

    - -P 显示出确实的路径，而非链接路径

    ![]({{ site.url }}/imgs/Vbird/6-1.1.png)

  - `mkdir`创建一个新目录

    ![]({{ site.url }}/imgs/Vbird/6-1.2.png)

    - -m 设置创建目录权限，默认新建目录的权限可以看到是755，这个跟umask有关

    ![]({{ site.url }}/imgs/Vbird/6-1.4.png)

    - -p 将输入的不存在的父级目录同时创建出来

    ![]({{ site.url }}/imgs/Vbird/6-1.3.png)

  - `rmdir`删除一个空目录

    - -p 删除输入的所有空目录

    ![]({{ site.url }}/imgs/Vbird/6-1.5.png)

    - 成功删除test1/test2/test3

    ![]({{ site.url }}/imgs/Vbird/6-1.6.png)

    - 我之前因为没有加-p 所以之删除了test3目录下的test4目录

  - 使用`rm -r [directory]`可以删除目录下的所有东西，不过比较危险，rm 也可以增加-p参数来删除上层的目录

- 可以执行文件路径的变量：$PATH

  - 又称环境变量
  - 系统会按照PATH的设置 在每个PATH定义的目录下搜寻输入的指令
  - `echo $PATH`来看看有哪些目录被定义了（echo为显示指令）

  ![]({{ site.url }}/imgs/Vbird/6-1.7.png)

  - PATH变量由目录组成，每个目录中间用`：`隔开
  - `mv [file] [directory]`移动文件到另一个目录

  ![]({{ site.url }}/imgs/Vbird/6-1.8.png)

  - 直接输入`ls`无法执行命令，因为/root目录不再环境变量中，需要通过确定的路径来调用命令
  - 输入`PATH="${PATH}:/root"`把/root目录添加到环境变量，就又可以使用`ls`命令了

  ![]({{ site.url }}/imgs/Vbird/6-1.9.png)

  - 完成练习后把ls 搬回原位

  ![]({{ site.url }}/imgs/Vbird/6-1.10.png)

  - 发现还是不能使用`ls`命令，可能是指令参数被高速缓存的原因，只需要登出root再重新登录就可以再次使用`ls`了

- 文件与目录的检视

- `ls`（黑体为常用）

  - **-a 列出所有文件**
  - -A 列出除了. 和 .. 这两个文件以外的所有文件
  - **-d 目录中有文件时，仅列出目录本身，不列出目录中的文件**
  - -f 不进行排序
  - -F 给文件目录给予附加数据结构
    - \* 代表可执行文件
    - / 代表目录
    - = 代表socket文件
    - &#124；代表FIFO文件
  - -h 将文件大小以带单位的形式列出来
  - -i 列出inode号码
  - **-l 列出详细信息，权限，owner，group，size等**
  - -n 列出UID与GID而非使用者与群组的名称
  - -r 将排序结果反向输出
  - -R 连同子目录一起列出，也就是说该目录下所有文件都会显示出来
  - -S 以文件大小排序
  - -t 以时间排序
  - --color=never  不要依据文件特性给予颜色显示
  - --color=always 显示颜色
  - --color=auto  让系统自行依据设置来判断是否给予颜色
  - --full-time  以完整时间模式输出
  - --time={atime，ctime} ：输出access时间或改变权限属性时间（ctime），而不是修改时间（modification time）

- `cp [options] source destination`复制文件或目录

  - **-a 相当于-dr --preserve-all**
  - -d 若来源文件为链接文件，则复制链接文件属性而不是文件本身
  - -f 强制，若文件已经存在且无法打开，则移除后再试一次
  - **-i 若目标文件已经存在，在覆盖时会先询问是否覆盖**
  - -l 进行硬式链接的链接文件创建，而非复制文件本身
  - **-p 连同文件属性一起复制，而非默认属性（备份用）**
  - **-r 用于目录复制，递回地复制目录**
  - -s 复制成为符号链接文件，即快捷方式
  - -u destination比source旧，才更新destination，不存在则复制
  - --preserve=all 除了 -p 的相关属性外，还加入了SELinux的属性，links，xattr等也复制了。

- 如果来源文件有两个及以上，destination必须是目录才行

- 复制并更名`cp .bashrc /tmp/bashrc`

![]({{ site.url }}/imgs/Vbird/6-2.1.png)

- 加上 -i参数`cp -i .bashrc /tmp/bashrc`

![]({{ site.url }}/imgs/Vbird/6-2.2.png)

- `cp /var/log/wtmp .`使用 . 表示当前目录
- 查看权限情况`ls -l /var/log/wtmp wtmp`

![]({{ site.url }}/imgs/Vbird/6-2.3.png)

- 复制时加上选项 -a 把所以特性都复制过来

![]({{ site.url }}/imgs/Vbird/6-2.4.png)

- 因为在复制的过程中，owner和权限都会改变，所以在复制密码文件和配置文件时就需要使用`cp -a`来完整复制文件权限
- 在复制目录时加上 -r 选项才能复制

![]({{ site.url }}/imgs/Vbird/6-2.5.png)

- 使用`cp -l`创建一个硬式链接文件（涉及inode，在下一章讲）

- 使用`cp -s`创建一个快捷方式

![]({{ site.url }}/imgs/Vbird/6-2.6.png)

- 使用`cp -u`当源比目标新时才复制（常用于备份）
- 使用`cp -d`复制快捷方式

![]({{ site.url }}/imgs/Vbird/6-2.7.png)

- 复制多个文件到同一个目录`cp ~/.bashrc ~/.bash_history /tmp`

![]({{ site.url }}/imgs/Vbird/6-2.8.png)

- 使用一般用户复制`cp -a /var/log/wtmp /tmp/captainxu_wtmp`

![]({{ site.url }}/imgs/Vbird/6-2.9.png)

- 发现虽然能复制，但是文件的owner和group没有完全相同地移动过来，是因为一般用户不能随意地修改文件的拥有着和群组
- 在使用`cp`命令时，因为有文件类型和权限的特性，复制前必须了解
  - 是否需要完整的来源信息
  - 来源文件是否为链接文件
  - 来源文件是否为特殊文件：FIFO，socket等
  - 来源文件是否为目录



- `rm [options] 文件或目录`移除文件或目录
  - -f 忽略不存在的文件，不会出现警告信息
  - -i 删除前会询问是否删除
  - -r 递回删除，删除目录中所有东西，非常危险的操作！
- 使用`rm -i bashrc`删除刚才创建的文件bashrc
- 使用`rm -i bashrc*`删除所有以bashrc开头的文件

![]({{ site.url }}/imgs/Vbird/6-2.10.png)

- 将刚才创建的/tmp/etc目录删除`rm -r /tmp/etc`，因为用户是root，所以默认加入了`-i`选项，需要不断按y来确认删除，`\rm -r /tmp/etc`，在指令前增加反斜线忽略指定选项

![]({{ site.url }}/imgs/Vbird/6-2.11.png)

- 千万不要手残删掉了etc，系统会挂掉！
- 删除一个开头带`-`的文件`rm ./-sadwdaw` 或`rm -- -asdwadsda`

![]({{ site.url }}/imgs/Vbird/6-2.12.png)

- `mv [options] sources destination`移动文件与目录，或更名
  - -f 强制，不询问
  - -i 已存在时，询问是否覆盖
  - -u update，目标已存在且source比较新时才会更新
- 使用`mv mvtest mvtest2`来更名（还有一个叫做rename的更名指令，可以根据表达式来更名）

![]({{ site.url }}/imgs/Vbird/6-2.13.png)

- 使用`mv bashrc1 bashrc2 mvtest2`同时把两个文件移动到目标目录

![]({{ site.url }}/imgs/Vbird/6-2.14.png)

- 有多个源文件时，目标文件必须是目录
- 获取文件名`basename /etc/sysconfig/network`
- 获取目录名`dirname /etc/sysconfig/network`

![]({{ site.url }}/imgs/Vbird/6-2.15.png)

- 文件内容查询

  - `cat` 从第一行开始显示文件内容

    - -A 可列出一些特殊字符，而不是空白
    - -b 列出行号，空白行不标号
    - -E 将结尾的断行字符 $ 显示出来
    - -n 打印处行号，空白行也有行号
    - -T 将Tab键以 ^I 显示出来
    - -v 显示处一些看不出的字符

  - `tac `从最后一行显示文件内容

  - `nl`  显示的时候，同时输出行号

    - -b 指定行号标记的方式

      - -b a 空行也标号
      - -b t 空行不标号（默认值）

    - -n 行号的表示方法

      - -w + 数字    设置补0后的位数，默认6位
      - -n ln 在屏幕左端显示
      - -n rn 在自己字段的左端显示且不添加0
      - -n rz 在自己字段的左端显示且添加0

      ![]({{ site.url }}/imgs/Vbird/6-2.16.png)

  - `more` 一页一页的显示文件内容

    - 输入  `/`搜索内容

  - `less` 与`more`相同，可以向前翻页

    - 输入`?`可以向前搜索
    - 使用`pageup` `pagedown`向前后翻页
    - man 就是调用less来显示文档内容的

  - `head` 只看头几行

    - `head -n number`显示前面的number行，默认显示10行，number可以是负值，表示不显示后面的number行（包括第number行）

  - `tail `只看尾巴几行

    - `tail -n number`显示最后的number行，默认显示10行
    - `tail -n +100`表示显示100以后的内容（包括第100行）
    - -f 持续侦测文件内容，按 ^C停止

  - `od` 以二进制的方式读取文件内容

    - `od -t Type`
    - Type:
      - a 利用默认的字符来输出
      - c 使用ASCII字符来输出
      - d[size] 使用10进制来输出，每个整数占size个字节
      - f[size] 使用浮点数输出
      - o[size] 使用八进制输出
      - x[size] 使用十六进制输出
    - 输出文件内容8进制存储和ASCII存储的对照表

    ![]({{ site.url }}/imgs/Vbird/6-2.18.png)
    
    - 利用`echo someword|od -t oCc`可以输出任意字符的ASCII对照表

- 管线符号：`|`，意思是，前面指令所输出的信息，交给后续指令继续使用

- 输出某一文件的第11到第20行，且带行号

![]({{ site.url }}/imgs/Vbird/6-2.17.png)

- 修改文件时间和创建新文件：touch
- Linux下文件有三个时间参数：mtime(modification time), ctime(status time), atime(access time)，分别表示：文件内容修改时间，文件状态（权限等）修改时间，文件调用时间
- `ls -l /etc/man_db.conf ;ls -l --time=atime /etc/man_db.conf ;ls -l --time=ctime /etc/man_db.conf`查看文件的时间
- 使用`touch -acdmt file` 来修改文件的时间
  - -a 仅修改access time
  - -c 修改文件所有的时间，若文件不存在将不创建
  - -d 后面接欲修订的日期而不用当前日期，= `--date=`
  - -m 仅修改mtime
  - -t 后面可以接欲修改的时间而不是当前时间，格式`YYYYMMDDhhmm`
- `touch -d "2 days ago" bashrc`将日期调整到两天前，但ctime不变



- 文件与目录的默认权限和隐藏权限
- 文件目录的隐藏属性，用`chattr`来设置，`lsattr`来查看
- 最重要的属性是设置文件不可修改的属性，即使文件所有者也不能修改
- 文件默认权限：`umask`
- `umask -S`以符号表示显示默认权限设置
- `umask`以数字表示显示默认权限设置
  - 显示4位数字，第一位是隐藏权限，后三位是owner，group，others权限
  - 创建文件时，默认是不具有执行权限，也就是-rw-rw-rw-
  - 创建目录时，因为x权限十分重要，所以默认全部权限开启，也就是drwxrwxrwx
  - umask 显示的分数表示被拿走的权限的分数
    - 例如。umask 分数为0022，owner没有被拿走任何权限，group和others都被拿走了2分的权限，也就是-----w--w-，因此，新文件的权限默认为：-rw-r--r--，新目录的权限默认为：drwxr-xr-x
  - 设置`umask`，直接在后面输入数字即可，`umask 002`，输入三位时默认不含隐藏权限
- `chattr [+-=][ASacdistu]` 设置文件的隐藏属性
  - xfs文件系统仅支持AadiS五个属性
  - A：使有此属性的文件存取时间`atime`不会被修改
  - a：**重要**：有此属性的文件将只能增加数据，不能删除也不能修改数据，只有root可以设置此属性
  - d：dump程序被执行的时候，有此属性的文件不会吧dump备份
  - i：**重要：**使有此属性的文件**不能被删除、改名、设置链接也无法写入或新增数据（root账户也不能操作）**，也只有root可以设置
  - S：如果有此属性的文件被删除，他将被完全移出这个硬盘，无法恢复
- `lsattr [-adR] file or directory`显示文件的隐藏属性
  - -a：将隐藏文件的属性也显示出来
  - -d：如果后面连接的是目录，则列出目录本身的属性
  - -R：子目录的数据也列出来
- `chattr`和`lsattr`的使用要千万小心，如果发现不能修改或不能增加某个文件时，可以用`lsattr`来查看
- 文件的特殊权限：SUID，SGID，SBIT
- Set UID
  - 当s标志出现在owner的x权限上时，被称为`Set UID`，简称SUID
    - SUID仅对二进制程序有效
    - 执行者对于该程序需要有x权限
    - 本权限仅在执行该程序的过程中有效（run-time）
    - 执行者将具有该程序的owner权限
- /etc/shadow 中存储了用户名和密码，权限是---------- owner是root，只有root可以读取和修改
- 普通用户为什么能够通过调用程序passwd修改自己的密码？

![]({{ site.url }}/imgs/Vbird/6-4.1.png)



- 可以看到/usr/bin/passwd拥有SUID，所以在调用passwd时，普通用户就临时拥有了root权限
- Set GID
- 当s标志出现在group的x权限上时，称为`Set GID`简称`SGID`。
  - SGID对二进制程序有用
  - 程序执行者需具备x权限
  - 执行者在执行过程中得到group的支持

![]({{ site.url }}/imgs/Vbird/6-4.2.png)

![]({{ site.url }}/imgs/Vbird/6-4.3.png)

- SGID设置在目录上时：
  - 使用者对于此目录具有rx权限时，可以进入此目录
  - 使用者在此目录下的有效群组（effective group）将变成该目录的群组
  - 用途：若使用者在该目录下有**w**权限，则使用者在此目录下**创建**的新文件**群组**与此目录相同
- Sticky BIT
- SBIT目前只对目录有效
  - 当使用者对此目录具有w，x权限时
  - 该使用者在此目录中创建的文件或目录，仅自己和root有权力删除文件
- 作用：使一个目录中的文件只有他们各自的创建者才有权移动、改名和删除。
- /tmp目录就有这样的权限

![]({{ site.url }}/imgs/Vbird/6-4.4.png)

- 设置文件/目录具有SUID/SGID/SBIT权限
  - SUID = 4
  - SGID = 2
  - SBIT = 1
- 用`chmod`更改权限时，在原先 的三位数字前再加一位就是这三种新的权限啦
- `chmod 4755 filename` = `-rwsr-xr-x` SUID
- `chmod 6755 filename` = `-rwsr-sr-x` SUID & SGID
- `chmod 1755 filename` = `-rwxr-xr-t` SBIT
- `chmod 7666 filename` = `-rwSrwSrwT` 空的SUID和SGID权限
- 大写的S T标志代表owner group others 都没有x权限
- 符号法也可以处理：SUID=u+s，SGID=g+s，SBIT=o+t
- `chmod u=rwxs,go=x test` = `-rws--x--x`
- 在上一指令的基础上`chmod g+s,o+t test` = `-rws--s--t`
- 观察文件类型：**file**
- `file filename`
- 看到6.5 指令与文件的搜寻
- typora记录词数11901词

---

### 2018-7-16

- 文件权限的含义
  - r（read）：可以读取此文件的内容
  - w（write）：可以编辑（新增或修改）此文件的内容（**不能删除**）
  - x（execute）：该文件有被系统执行的权限
- Windows中可执行文件是由扩展名exe来判断的，但是Linux中可执行文件与文件名是没有关系的，是由文件是否具有x权限来决定的
- 目录权限的含义
  - 目录的主要内容是记录文件名清单
  - r（read contents in directory）：表示具有读取目录结构清单的权限，可以查询该目录下文件名数据，拥有此权限才能使用Tab进行文件名补齐
  - w（modify contents of directory）：表示有目录修改权限1、创建新的文件与目录；2、删除已存在的文件与目录；3、将已存在的文件或目录更名；4、移动该目录内的文件、目录位置
  - x（access directory）：表示是否能进入该目录（`cd`），即：将此目录作为工作目录
- 拥有目录w权限，但没有文件权限时，是可以删除该文件的，就像盒子打不开不妨碍你把他扔进垃圾桶

![]({{ site.url }}/imgs/Vbird/5-2.1.png)

- 练习：

  - 切换到root账户`su -`
  - 进入tmp目录`cd /tmp`
  - 创建目录testing`mkdir testing`
  - 修改目录权限为744`chmod 744 testing`
  - 在testing目录中创建文件testing`touch testing/testing`
  - 修改文件权限为600`chmod 600 testing/testing`
  - ls查询目录结构和权限`ls -ald testing testing/testing`
  - 使用另一个用户登录，查询目录结构

  ![]({{ site.url }}/imgs/Vbird/5-2.2.png)

- 可见，只有目录r权限是可以读取文件名的，但是不能读取文件详细信息

  - 使用root更改目录的owner使用户可以进入`chown captainxu testing`

  ![]({{ site.url }}/imgs/Vbird/5-2.3.png)

  - 尝试删除文件`rm testing`

  ![]({{ site.url }}/imgs/Vbird/5-2.4.png)

  - 成功删除

- Linux文件类型

  - 正规文件（-）
    - 纯文本文件（ASCII）：最多的文件类型，是人类可以直接读取的数据，如文字数字等，包括配置文件，可以使用`cat`读取
    - 二进制文件（binary）：可执行文件（scripts），可以运行
    - 数据格式文件（data）：某些特定格式的文件，可以使用`last`读取
  - 目录（d）
  - 链接文件（L）：类似于Windows快捷方式
  - 设备与设备文件（）：通常都集中在/dev中
    - 区块设备文件（b）lock：存储数据的设备，如硬盘
    - 字符设备文件（c）haracter：一次性读取，不能截断输出的设备，如键盘，鼠标
  - 数据接口文件（s）ockets：通常用于网络连接，启动一个程序来监听用户的要求，用户端就可以使用这个socket进行数据沟通，通常在/run /tmp这些目录中
  - 数据传送档（FIFO，(p)ipe）：FIFO是一种特殊的文件类型，first in first out（队列），用于解决多个程序同时存取一个文件所造成的错误问题

- Linux文件扩展名：

  - Linux文件通常没有扩展名
  - 文件能否执行看的是是否具有x权限，但是一个文件有能够执行的权限不代表它可以执行成功，因为只有有能够执行的数据的文件才可以执行成功
  - 但是扩展名也可以帮助我们了解该文件是什么东西，通常还是会有适当的扩展名表示文件的种类
    - *.sh：脚本或批处理文件（scripts），批处理文件用shell写成。简写为sh
    - Z, .tar, .tar.gz, .zip, *.tgz：压缩文件，压缩软件分别为gunzip, tar等，不同的软件有不同的扩展名
    - .html, .php：网页文件，可以在用户端浏览器浏览
  - Linux的扩展名只起到提示文件可能的用途的作用，是否能够执行还是需要查看是否有相关的权限

- Linux文件长度限制

  - 单一文件或目录的最大允许文件名为255字节，即255ASCII英文字符，128中文字符

- Linux文件名称的限制

  - 设置文件名时最好避免特殊字符：`·?<>;$&![]|\'""(){}`
  - 文件名开头为`.`代表该文件是隐藏文件

- 睡前再看看鸟哥助眠~

- Linux目录配置

- 目录配置的依据：FHS（Filesystem Hierarchy Standard）

  - 主要目的是希望使用者了解已安装的文件通常放在哪个目录下
  - 这样就使Linux在**既有的面貌**（目录结构不变）下发展出开发者想要的风格
  - FHS的文件定义方法
    - 不变的（不会经常变动的，函数库、文件说明文档等）
      - 可分享的
        - /usr 软件放置处
        - /opt 第三方协力软件
      - 不可分享的
        - /etc 配置文件
        - /boot 开机和核心档
    - 可变的（经常改变的数据，登录文件、一般用户可自行收受的新闻群组等）
      - 可分享的（能够分享给网络上其他主机挂载的目录）
        - /var/mail 使用者邮件信箱
        - /var/spool/news 新闻群组
      - 不可分享的（仅与自身机器有关）
        - /var/run 程序相关
        - /var/lock 程序相关
  - FHS根据目录树架构仅定义了以下三层目录
    - / 与开机系统有关
    - /usr （unix software resource）与软件安装/执行有关
    - /var 与系统运行过程有关

- 根目录的重要地位

  - 是所有目录的基础
  - 与开机/还原/系统修复有关
  - 所以根目录所在分区越小越好，且应用程序最好不要和根目录放在同一分区

- 看到281页。FHS

- Typora记录词数：6170词

---

### 2018-7-15

- 嘉定的第二个晚上，居然失眠了，我也会不习惯新的床吗？
- 进行Linux学习机的安装，版本CentOS-7-x86_64-Everything-1804
- MSI GP62不支持安装Linux（Linux对笔记本的支持http://www.linux-laptop.net/ ）
- 使用VMware Workstation 14创建虚拟机，选择custom选项
  - 处理器数量：1
  - 处理器内核数量：2
  - 虚拟机内存：1200MB
  - 使用桥接网络
  - IO控制器、虚拟磁盘类型：默认选项
  - 最大磁盘大小：40GB
  - 生成MAC地址
- 打开虚拟机后将光标放置在Install CentOS 7 上，按下Tab键，输入下方参数，以进行GPT相关的练习

```
vmlinuz initrd=initrd.img inst.stage2=hd:LABEL=CentOS\x207\x20x86_64 rd.live.check quiet inst.gpt 
笔记本安装还要添加：nofb apm=off acpi=off pci=noacpi
```

- 键盘菜单中设置切换热键
- 软件选择中选择：GUI服务器
- 安装位置：勾选“我要配置分区”
- 添加挂载点
  - 单击+，在下拉菜单中选择标准分区，选择BIOS boot，容量输入2M
  - /boot 1G
  - /          10G
    - /、/home、swap希望使用LVM管理方式，新增后在详细设置中更改
    - / 在详细设置中的Volume Group中选择修改
    - 大小策略改为固定大小 30G
  - /home 5G
  - swap    1G
  - 点击完成后注意会显示`创建格式 分区表（GPT）`，点击接受更改
- LVM：可弹性增减的文件系统容量的设备设置
- 网络和主机，选择网络，点击右上角按钮，变为蓝色`开`状态，点击右下角的配置
- 在配置中
  - 常规，点选`可用时自动连接到这个网络`
  - IPV4设置：改为手动，设置一个局域网IP地址
- 修改主机名称：VbirdLinux-2018-7
- 完成网络配置
- 开始安装！
- 在安装的过程中设置root密码，并创建一个用户（勾选管理员选项）
- 安装完成后接受协议书，完成
- /root/anaconda-ks.cfg 中记录了之前所选的全部项目
- 输入locale或echo $LANG查看终端机支持的语系数据
- 3.3.1记录了安装 CentOS 7.x + Windows 7 规划

#### 第四章 首次登录与线上求助

- 以小数点开头的文件在Linux中为隐藏文件
- tty1 - tty6 是用户可用的留个终端编号
- 通过 ctrl + alt + F1-F6切换终端
- 输入xstart进入GUI
- 命令行中：命令太长时可以使用反斜杠换行
- 一般账号是以$为提示输入字符
- root账号以#为提示输入字符
- 基础指令
  - `date`显示时间和日期
  - `cal`显示日历，`cal [month] [year]`
  - `bc`计算器
    - 默认输出整数，要输入小数，使用`scale=number`指定小数位数
  - 在指令、文件名、参数后按两次Tab键，可以显示所有以已输入的字符开头的指令、文件、参数
  - CTRL + C 终止当前命令
  - CTRL + D 离开命令行 = exit
  - shift + PageUp/PageDown 终端翻页
  - `--help`选项可以查看简易帮助
- **man page**
  - `man`+指令查看操作手册，按q退出
    - 输入`/`+关键字在man Page 中向下搜索
    - 输入`?`+关键字在man page 中向上搜索
    - 搜素后按`n`向下查询，`N`向上查询
    - 指令名括号中数字的含义`man man`
      - 1：在shell环境中可以操作的指令或可执行文件 重要
      - 2：系统核心可调用的函数与工具
      - 3：常用函数与函数库
      - 4：设备文件的说明，通常为/dev下的文件
      - 5：配置文件或某些文件的格式 重要
      - 6：游戏
      - 7：惯例与协定等，例如文件系统，网络协定，ASCII码等
      - 8：管理员可用的管理指令 重要
      - 9：kernel有关的文件
    - `man`的数据位于 /usr/share/man中，可以通过修改/etc/man_db.conf修改man page 的搜索路径
    - `man`的选项 `-f`显示和后面参数相关的文件或指令 = `whatis`
    - `man 7 man`显示man的说明文档
    - `man -k man`=`apropos man`在系统说明文档中，只要存在`-k`后面关键字的，就列出
    - 使用`whatis`需要建立`whatis`数据库，使用`sudo mandb`或`sudo makewhatis`建立
- **Info Page**
  - 将说明文档拆成一个个段落，用分开的页面来写，每个页面称为一个节点（node），是Linux额外提供的求助方法（man来自Unix）
  - 使用方法
    - `info info`查看info的说明
    - 按N进入下一个节点
    - 按P进入上一个节点
    - 按U进入上一层节点
    - 按e把光标移到当前页面底端
    - 按b把光标移到当前页面顶端
    - 按s或/可以在info page中搜索
    - 按下h可以进入按键功能提示
    - 按Tab键可以快速光标到页面内标注的节点（有*的文字前）
    - 在Menu中，把光标移动到前面带有`*`的部分，按Enter键，可以快速移动到那一节点
  - info page的数据存储在/usr/share/info中
- **说明文档（documents）**
  - 位置：/usr/share/doc/
- 帮助的使用

  - 知道了指令，不知道参数或者选项，使用`--help`来查询参数
  - 有不知道的指令或者文件格式，用`man 或者 info`来查询
  - 想使用一整组软件来达成功能时，可以看一看有没有相关的documents
- 文本编辑器：nano

  - [ctrl]-G：取得线上说明（help）
  - [ctrl]-X：离开naon软件，若有修改过文件会提示是否需要储存 
  - [ctrl]-O：储存盘案，若你有权限的话就能够储存盘案了
  - [ctrl]-R：从其他文件读入数据，可以将某个文件的内容贴在本文件中
  - [ctrl]-W：搜寻字串，这个也是很有帮助的指令喔！
  - [ctrl]-C：说明目前光标所在处的行数与列数等信息
  - [ctrl]-_：可以直接输入行号，让光标快速移动到该行
  - [alt]-Y：校正语法功能打开或关闭（按一下开、再按一下关）
  - [alt]-M：可以支持鼠标来移动光标的功能
- ^G = CTRL + G, M - G = ALT + G
- 关机

  - 关机前：
    - 下达`who`命令，可以查看已登录的用户
    - 下达`netstat -a`，查看网络的连线状态
    - 下达`ps -aux`,查看主机当前的使用状态
  - 将内存中的数据同步写入硬盘：`sync`
    - 防止不正常关机丢失数据
  - 关机指令：`shutdown`
    - 参数
    - -k 不关机，只发送警告信息
    - -r 将系统的服务停止后就重启（常用）
    - -h 将系统服务停止后关机（常用）
    - -c 取消已经下达的shutdown命令
  - 重启，关机：`reboot、halt、poweroff`
  - 使用管理工具systemctl关机
    - 使用init命令可以切换不同的执行等级（0~6）
    - CentOS7可以使用`init 0`来关机
    - 其实使用halt、poweroff、reboot、shutdown都是在调用systemctl指令
- 反斜杠`\`的英文是“escape”



#### 第五章 Linux的文件权限与目录配置


- Linux文件管理权限
  - 文件可存取身份分为三个类别`owners/group/others`
  - 三种身份都有`read/write/execute`三种权限
- 输入命令`ls -al`，显示出当前目录所有文件
  - 第一部分为文件类型和权限
    - 第一个字符代表文件类型
      - d 代表目录
      - \- 代表文件
      - L 代表链接文件
      - b 代表设备文件里可供存储的周边设备（可随机存取设备）
      - c 代表设备文件里序列设备，例如：键盘、鼠标
    - 接下来的九个字符三个一组，均为rwx的组合
      - r 代表可读
      - w 代表可写
      - x 代表可执行
      - 上述三个权限如果显示 \- 则代表没有这个权限
      - 三组中，第一组为owner的权限，第二组为group中用户的权限，第三组为other的权限
  - 第二部分表示有多少文件名链接到此节点
    - 每个文件会把权限与属性记录到文件系统i-node中
    - 此数字表示有多少不同的文件名链接到同一个i-node
  - 第三部分表示这个文件的拥有者 owner
  - 第四部分表示这个文件所属群组 group
  - 第五部分表示这个文件的容量大小，默认单位为字节
  - 第六部分表示文件创捷日期或最后修改日期
    - 使用`ls -l --full-time`可以显示完整的时间
  - 第七部分表示文件名
    - 如果是隐藏文件，文件名会以`.`开头，使用`ls -a`显示隐藏文件
- 文件权限的重要性：主要是安全需要
- 如何改变文件属性与权限：
  - chgrp：改变文件所属群组
    - 使用方法：`chgrp [options] dirname filename`
      - dirname：表示群组名
      - filename：表示文件名
    - -R：进行递回（recursive）的持续变更，表示连同此目录下的所有文件、目录都更新成为这个群组
  - chown：改变文件拥有者
    - 使用方法：`chown [options] username filename`
      - username表示要改为的用户名
    - 存在的账号才能更改，账号记录文件：/etc/passwd
    - -R：对目录下所有文件使用
    - chown可以同时改变用户和群组`chown [options] user.group filename`
    - chown也可以只改变群组`chown [options] .group filename`
  - chgrp, chown的作用
    - 在使用`cp 源文件 目标文件`给别的用户复制文件时，也会复制执行者的属性和权限
    - 此时别的用户可能无法使用你的权限文件
    - 因此需要改变文件的owner和group
  - chmod：改变文件的权限，SUID，SGID，SBIT等
  - 数字类型改变权限
    - 九个权限，三个一组
    - r = 4, w = 2, x = 1, - = 0
    - 相加某一族的三个权限数值，得到一个数字，用来代表这一身份的权限
    - 例：`-rwxr-x---`的权限数字就是4+2+1, 4+0+1, 0+0+0：`750`
    - 使用方法：`chmod [options] 权限数字 filename`
    - 也有-R选项
  - 符号类型改变权限
    - (u)ser=rwx, (g)roup=rwx,(o)ther=rwx, (a)ll
    - 使用方法：`chmod u=rwx,go=rx filename`
    - 如果不知道原先的文件权限情况，只想给某个文件增加一种权限或减少一种权限，可以使用`chmod a(ugo)+w(-w(rx)) filename`
- 看到5.2.3 目录与文件权限的意义
- Typora记录词数：4726词

---

### 2018-7-14

- 各硬件设备在Linux中的文件名
  - SATA硬盘、U盘（SCSI模块驱动） /dev/sd[a-p]
  - 打印机 /dev/lp[0-2]
  - 鼠标 /dev/input/mouse[0-15] /dev/psaux /dev/mouse(当前鼠标)
  - CDROM /dev/scd[0-1]
- 磁盘分区
  - MSDOS (MBR 446B)：
    - 主要开机记录区：安装开机管理程序
    - 分区表：记录硬盘分区状态
    - 分区后的文件名：/dev/sda1 - /dev/sda4
    - 延伸分区（Extended）只有一个，持续切割处逻辑分区（Logical）
    - 逻辑分区的文件名：/dev/sda5 - /dev/sda?
    - 能够被格式化后存储数据的分区为主要分区（Primary）和逻辑分区
    - 逻辑分区的数量依据操作系统而不同
  - GUID partition table, GPT磁盘分区表
    - 用逻辑区块位址（LBA）处理扇区的划分（默认大小512B），从LBA0开始标号
    - 使用34个LBA区块来记录分区信息，用磁盘最后33个LBA区块来备份
    - LBA0（MBR相容模块）
      - 储存开机管理程序
      - 存储代表GPT磁盘的标志
    - LBA1，GPT表头记录
      - 记录分区表的位置与大小
      - 记录备份用的GPT分区（最后34个LBA）
      - 记录了分区表的检验机制码（CRC32），操作系统通过这个检验码来判断GPT是否正确，若不正确，则读取备份区的GPT，来恢复GPT的正常运行
    - LBA2 - LBA33，记录实际分区信息
      - 每个LBA记录4笔分区记录
      - 每笔记录用到128B空间，其中64B用来记载开始/结束的扇区号码
      - 单一分区最大容量限制为8ZB
      - 不再有主、延伸、逻辑分区概念，每笔记录都可以格式化使用
- 开机检测程序：BIOS, UEFI
  - CMOS：存储器，记录各项硬件参数
  - BIOS：写入主板的固件（写入硬件的程序称固件）
  - BIOS + MBR/GPT 开机流程
    - 开机
    - 计算机系统执行BIOS
    - BIOS分析计算机中有哪些存储设备
    - BIOS根据使用者的设置取得能够开机的硬盘
    - 在该硬盘读取第一个扇区的MBR位置
    - 运行MBR中的开机管理程序（boot loader, 由操作系统提供）
      - 如果是GPT，会读取LBA0中的boot loader
    - BIOS任务完成！
  - 用grub等开机管理程序，需要另外分出BIOS boot分区，CentOS中通常占用2MB
  - 每个分区都有自己的开机扇区（boot sector）
  -  双系统开机总结：
    - 每个分区都有自己的开机扇区
    - 实际可开机的核心文件分置与各个分区
    - loader只能识别系统盘内的可开机核心文件和其他loader
    - loader可以直接指向或间接将管理权交给另一个开机管理程序
    - Linux安装时可以设置把开机管理程序安装在MBR或者别的开机扇区
    - Windows安装时会主动覆盖MBR
  - UEFI（UEFI BIOS）：使用C编写
    - 比BIOS效率稍低
    - 类似于简易的操作系统
    - 有安全启动功能，会检查操作系统
- Linux安装模式下，磁盘分区的选择
  - 目录树结构
    - 根目录：“/”
    - 结合目录树与磁盘内数据的方式：挂载（mount）
  - 挂载
    - 定义：利用一个目录作为进入点，将磁盘分区的数据放于该目录下
      - 即进入该目录就可以读取分区
    - 根目录一定需要挂载到某个分区，其他目录可以根据需要挂载到不同分区
    - Linux光驱挂载目录：/media/cdrom

#### 第三章 安装CentOS 7.x

- 安装规划
  - 使用CentOS-7.1.1503来安装
  - 服务器常用服务
    - NAT：IP分享器，可以加装分析软件，分析用户端的连线或者控制带宽和流量
    - SAMBA：Windows系统文件分享服务，没有用户连接数的限制，适合作为文件服务器
    - MAIL：邮件服务器，具有商业机密或隐私性的邮件需要用Mail Server
    - Web：www服务器，CentOS使用Apache达成WWW服务器功能
    - DHCP：用户端自动取得IP的功能
    - FTP：需要硬盘和网卡较好
  - 硬盘规划
    - 分区
      - /boot
      - /
      - /home
      - /var
      - Swap
      - /usr  2-5GB
- 练习机的规划
  - 虚拟机硬件配备
    - CPU：i7 7700HQ
    - 内存：1.2GB左右
    - 硬盘：40GB的 Virtl/O 芯片组的硬盘
    - 网卡：桥接模式
    - 显卡：intel HD Graphics 630
  - 2TB以上Linux会默认以GPT管理，以下会以MBR模式处理，所以在安装时添加参数，使系统用GPT分区表来配置磁盘
  - CentOS 默认使用LVM的方式来管理文件系统
  - boot loader：CentOS 7.x 默认使用grub2来管理
  - 软件模式：使用含有X接口的服务器软件来安装
- 看到3.2 开始安装CentOS 7

---

### 2018-7-13

- 结果下一次直到搬来了嘉定才重新开始，好好利用这个暑假吧！
- 操作系统
  - 前置技能：汇编语言
  - System Call : 操作系统提供的接口
  - 核心功能
    - 系统调用接口
    - 程序管理
    - 内存管理
    - 文件管理系统
    - 硬件驱动
- 应用程序
- 软件移植：将操作系统修改以在其他架构的CPU上面运行

#### 第一章 Linux是什么与如何学习

- Linux是基于x86 CPU开发的，可以在所以x86计算机上运行，稳定而功能强大

- 相容分时系统，让大型主机提供数个终端机以连线进入主机，使用主机的资源进行工作

- Unix文件系统的两个重要概念
  - 所有的程序或系统设备都是文件
  - 不管建构编辑器还是附属文件，所写的程序只有一个目的，且要有效的完成目标。
  - BSD Sun公司发展的Unix版本
  - System V 第七版，第一次可以在x86架构计算机上运行Unix

- **`GNU计划 Richard Mathew Stallman`**
  - 创建一个自由、开放的Unix操作系统
  - GNU C Compiler（gcc）
  - GNU C library
  - BASH shell
  - 通用公共许可证PGL（General Public License）：防止自由软件被别人利用成为专利软件
  - 开源软件
     - 可以取得软件和源代码
     - 可以自由地复制该软件
     - 可以自由地修改源代码
     - 可以将修改后的源代码再次发行
     - 你应该将你修改的程序码回馈社群
        - 不能将GPL授权的自由软件，修改后取消GPL授权
        - 不能单纯地贩卖自由软件

- Linux核心版本号

- ```
  3.10.0-123.e17.x86_64
  主版本.次版本.释出版本-修改版本
  ```

  `uname -r`查阅Linux核心版本

- RPM软件管理：Red Hat, Fedora, SuSE

- dpkg软件管理：Debian, Ubuntu, B2D

- X window system ：Linux窗口套件

- Tarball ：源代码

```
计算机基础（http://www.study-area.org/compu/compu.htm）
网络基础（http://www.study-area.org/network/network.htm）
请推荐有关网络的:(看完私房菜之后)http://linux.vbird.org/linux_basic/0120howtolinux/0120howtolinux_1.php
```
- Linux FAQ:
- Linux的文件数据位置`/usr/share/doc`

```
CLDP中文文件计划 http://www.linux.org.tw/CLDP/ 
The	Linux Documentation Project:http://www.tldp.org/
```

- log文件位置`/var/log/`

```
Red Hat的硬件支持：https://hardware.redhat.com/?pagename=hcl
Open SuSE的硬件支持:http://en.opensuse.org/Hardware?LANG=en_UK Linux
对笔记本电脑的支持：http://www.linux-laptop.net/
Linux对打印机的支持：http://www.openprinting.org/
Linux硬件支持的中文 HowTo：http://www.linux.org.tw/CLDP/HOWTO/hardware.html#hardware
```

#### 第二章 主机规划与磁盘分区

- 磁盘阵列（RAID）：通过硬件方法把多个磁盘整合成一个磁盘
- 看到 2.1.3 各硬件设备在Linux中的文件名

---

### 2018-5-7

- 第二次看，开始吧！

- CPU的架构：

  - 精简指令集 RISC : ARM
  - 复杂指令集 CISC : x86

- 可以用 GiB MiB 表示二进制的数据单位

- 不同的CPU使用不同的脚位 如 LGA1155 FCLGA1150

- CPU主频不能决定CPU的运算效率，还有微指令集、架构、cache、算法的影响

- DMI 2.0 ：CPU与南桥的沟通管道

- 如果CPU和南桥沟通速度较慢（4GT/s = 2GByte/s），插卡时要把卡尽量插在和CPU直连的插槽上

- CMOS：记录主板重要参数，使用主板电池的电力

- 电源转换率越高，表示电源使用的电力越少

- 看到[*0.4.2作业系统*](http://linux.vbird.org/linux_basic/0105computers.php#computer)，回去洗个澡看看番放松一下吧。。下次安排在星期天！
  

---

### 2018-4-26

- 终于开了头
#### 第零章，计算机概论。
- 翻译成简中看舒服多了
- 缩放比例125%
