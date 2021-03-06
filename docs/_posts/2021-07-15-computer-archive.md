---
layout: post
title: Computer Archive -- Data link
date: 21-07-15 20:40:48 +0800
categories: dive in
---

What CPU does in IDLE time?

>  Modern processors use idle time to save power. Common methods are reducing the clock speed along with the CPU voltage and sending parts of the processor into a sleep state. On processors that have a halt instruction that stops the CPU until an interrupt occurs, such as [x86](https://en.wikipedia.org/wiki/X86)'s [HLT](https://en.wikipedia.org/wiki/HLT_(x86_instruction)) instruction, it may save significant amounts of power and heat if the idle task consists of a loop which repeatedly executes HLT instructions.
>
> From [Wikipedia](https://en.wikipedia.org/wiki/Idle_(CPU))

Translation:

现代处理器使用idle time来降低功耗。 一般方法是通过降低时钟频率、CPU电压并且使一部分处理器进入休眠状态。在有HALT指令（HALT指令能够使CPU停止工作直到发生中断）的处理器上，例如x86 CPU的`HLT`指令。Idle任务一般由一个重复执行`HLT`指令的循环组成，能够节省大量功耗和发热。





### 2. 当CPU得到一个虚拟地址之后发生了什么

1.   CPU将虚拟地址vaddr发送给MMU，MMU通过页表转换后得到物理地址paddr；
2.   CPU先在一到三缓存中寻址，如果缓存未命中则进行下一步；
3.   MMU将物理地址paddr发送到地址总线上，主存收到paddr后在内存中定位该地址对应的存储单元，然后通过数据总线返回给CPU。

![]({{ site.url }}/imgs/cpu_archive/MMU-operation.png)

![]({{ site.url }}/imgs/cpu_archive/addressing.png)
