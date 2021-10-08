---
layout: post
title: Perf Usage
date: 21-09-27 20:58:32 +0800
categories: notes
---

# Perf Usage

perf是Linux原生的性能分析工具，可以返回CPU正在执行的函数名以及调用栈，配合火焰图可以对Linux程序进行性能分析。



## 1. 安装perf

```sh
sudo apt-get install linux-tools-common
sudo apt-get install linux-tools-"$(uname -r)"
sudo apt-get install linux-cloud-tools-"$(uname -r)"
sudo apt-get install linux-tools-generic
sudo apt-get install linux-cloud-tools-generic
```

然后就安装好了`perf`

```sh
$ perf --version
perf version 5.4.133
```

写一个快速排序来测试一下`perf`：

```c++
#include <iostream>
#include <vector>
#include <random>
#include <unordered_set>
#include <ctime>

using namespace std;

uint32_t RandomPivot(const uint32_t start, const uint32_t end);

void QuickSort(std::vector<int32_t>& vec,
               const int32_t start, const int32_t end) {
    if (start < end) {
        uint32_t pivot_idx = RandomPivot(start, end);
        uint32_t pivot = vec[RandomPivot(start, end)];
        uint32_t tem_s = start, tem_e = end - 1;
        while (tem_s < tem_e) {
            for (; vec[tem_s] < pivot; ++tem_s);
            for (; vec[tem_e] > pivot; --tem_e);
            std::swap(vec[tem_s], vec[tem_e]);
        }

        pivot_idx = tem_s;
        QuickSort(vec, start, pivot_idx);
        QuickSort(vec, pivot_idx + 1, end);
    }
}

uint32_t RandomPivot(const uint32_t start, const uint32_t end) {
    return rand() % (end - start) + start;
}


int main()
{
    srand(unsigned(time(NULL)));
    uint32_t l_size = 1000000;
    std::unordered_set<int32_t> idx_pool;
    for (int i = 0; i < l_size; ++i) {
        idx_pool.insert(i);
    }
    std::vector<int32_t> l(l_size);
    for (int i = 0; i < l_size; ++i) {
        uint32_t idx = RandomPivot(0, l_size);
        while (idx_pool.find(idx) == idx_pool.end()) {
            idx = RandomPivot(0, l_size);
        }
        l[idx] = i;
        idx_pool.erase(idx);
    }
    QuickSort(l, 0, l_size);
    return 0;
}
```

算法还是得经常练练，好久没写快排，Debug了半天。。。

```sh
sudo perf stat ./a.out
```

```sh
$ sudo perf stat ./TestPerf
[sudo] password for bw:       

 Performance counter stats for './TestPerf':

          2,698.09 msec task-clock                #    0.999 CPUs utilized          
                36      context-switches          #    0.013 K/sec                  
                 1      cpu-migrations            #    0.000 K/sec                  
            14,449      page-faults               #    0.005 M/sec                  
     8,497,144,311      cycles                    #    3.149 GHz                    
    10,061,242,398      instructions              #    1.18  insn per cycle         
     1,656,453,713      branches                  #  613.935 M/sec                  
        12,918,915      branch-misses             #    0.78% of all branches        

       2.700081896 seconds time elapsed

       2.674380000 seconds user
       0.023985000 seconds sys


```



## 2. 绘制火焰图

### 2.1 从GitHub获取脚本

```sh
git clone https://github.com/brendangregg/FlameGraph.git
cd FlameGraph
```

把目录添加到PATH。



### 2.2 记录并生成进程调用信息

先运行程序，然后`ps -ef`获取`pid`，然后记录。

```sh
sudo perf record -F 99 -p 101503 -m 4 -g -a -- sleep 60
sudo perf script > out.perf
```

```sh 
./stackcollapse-perf.pl out.perf > out.folded

./flamegraph.pl out.folded > pmCount.svg
```

![]({{ site.url }}/imgs/Perf/01_quicksort.svg)

