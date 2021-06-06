---
layout: post
title:  'tmux usage'
date:   2021-06-05 19:30:00 +0800
categories: notes
---

### tmux usage

#### 常用命令

1. 终端常用

```shell
tmux new -s [session name]	# 新建session
tmux ls			# 显示session列表
tmux a			# 连接上一个会话
tmux a -t [session name]	# 连接指定session
tmux rename -t [session name 1] [session name 2]	# 重命名session
tmux kill-session -t [session name]		# 关闭指定session
tmux kill-session -a -t [session name]	# 关闭除了指定session以外的其他session
tmux kill-server	# 关闭所有会话
```

2. session常用(prefix = C-b)

```shell
prefix s	# 列出session
prefix $	# 重命名session
prefix d	# 与当前session分离
prefix D	# 分离指定session

# 窗口管理
prefix c　　# 创建一个新窗口
prefix ,　　# 重命名当前窗口
prefix w　　# 列出所有窗口，可进行切换
prefix n　　# 进入下一个窗口
prefix p　　# 进入上一个窗口
prefix l　　进入之前操作的窗口
prefix 0~9　　选择编号0~9对应的窗口
prefix .　　修改当前窗口索引编号
prefix '　　切换至指定编号（可大于9）的窗口
prefix f　　根据显示的内容搜索窗格
prefix &　　关闭当前窗口

# 窗格管理
prefix %　　水平方向创建窗格
prefix "　　垂直方向创建窗格
prefix Up|Down|Left|Right　　根据箭头方向切换窗格
prefix q　　显示窗格编号
prefix o　　顺时针切换窗格
prefix }　　与下一个窗格交换位置
prefix {　　与上一个窗格交换位置
prefix x　　关闭当前窗格
prefix space(空格键)　　重新排列当前窗口下的所有窗格
prefix !　　将当前窗格置于新窗口
prefix Ctrl+o　　逆时针旋转当前窗口的窗格
prefix t　　在当前窗格显示时间
prefix z　　放大当前窗格(再次按下将还原)
prefix i　　显示当前窗格信息

# 其他命令
tmux list-key　　列出所有绑定的键，等同于prefix ?
tmux list-command　　列出所有命令
```

