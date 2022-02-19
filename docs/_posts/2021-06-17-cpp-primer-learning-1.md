---
layout: post
title: C++ Primer 1
date: 21-06-17 13:00:41 +0800
categories: CPP
---

## C++ Primer 第五版复习

### 1 开始 Startup

#### 要点

1. C++源码不同编译器使用不同文件名约定，常用：.cc, .cpp, .cxx, .C；
2. Unix系统下，使用命令`echo $?`查看刚才运行程序的返回值；
3. 编译语句：`g++ -o test [FILENAME] -std=c++11 -g -Wall`，在`.vimrc`中添加`autocmd FileType cpp nnoremap <buffer> <F2> :!g++ -o test % -std=c++11 -g -Wall && ./test <CR>`，将F2绑定为编译运行键，可以在vim中一键编译运行；（不如直接上IDE）
4. 读取数量不定的输入：`while (std::cin >> value) {...}`；
5. 文件结束符（EOF）：Unix，mac OS：Ctrl + D；
6. 程序格式：不存在唯一正确的风格，但保持一致性是非常重要的；

----



#### 练习

1.2 linux mint下，令程序返回-1，用`echo $?`查看，输出255；再测试一点别的返回值：返回300，输出44；返回-127，输出129，说明Linux mint系统下，程序的返回值用一个字节存放，超出256的部分会被截断，负值会取补码。

```c++
#include <iostream>

int main() {
    cout << "test return value\n";
    return -1;
}
```

返回-1：

![]({{'/imgs/cpp_primer/chp1/return_-1.png' | prepend: site.baseurl}})

返回300：

![]({{'/imgs/cpp_primer/chp1/return300.png' | prepend: site.baseurl}})

返回-127：

![]({{'/imgs/cpp_primer/chp1/return-127.png' | prepend: site.baseurl}})



1.11 输出任意输入的两个数之间的所有数。

```c++
int main() { 
    int a, b;
    cout << "input two integer as a range: \n";
    cin >> a >> b;
    int bigger = a > b ? a : b;
    int smaller = a < b ? a : b;
    for (; smaller <= bigger; ++smaller) {
        cout << smaller << " ";
    }
    cout << endl;
    return 0;
}
```



1.14 for和while循环的优缺点：

循环次数已知时，for循环更加简洁；循环次数无法预知时，while更适合，用特定的循环条件控制循环。



1.16 输入任意个数，求和。

```c++
int main() { 
    freopen("../../tests/chp1/1.16.txt", "r", stdin);
    int v, sum = 0;
    while (cin >> v) {
        sum += v;
    }
    cout << "Sum: " << sum << endl;
    return 0;
}
```

`1.16.txt`：

```
12 84 25 16 3 18 9 4 1 5 2 6 4 8 6 12 51 32 7

```

输出：

![]({{'/imgs/cpp_primer/chp1/sum.png' | prepend: site.baseurl}})



