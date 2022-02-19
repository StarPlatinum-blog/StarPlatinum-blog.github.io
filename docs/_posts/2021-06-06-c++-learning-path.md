---
layout: post
title:  'C++ Learning Path'
date:   2021-06-06 19:30:00 +0800
categories: notes
---

[TOC]

<a name="Top"></a>

## C++ Learning Path

### 1. 基础

《Computer Networking: A Top-down Approach》

《The C Programming Language》 B. Kernighan and D. Ritchie

《CSAPP》

《编译原理》

《现代操作系统》MIT 6.828

 《The C++ Standard Library》

《C++ Primer》CS 106A, CS 106B

- 写一个复数类或大整数类，实现基本的加减乘运算，熟悉封装与数据抽象；
- 写一个字符串类，熟悉内存管理与拷贝控制；
- 写一个简化的vector\<T\>类模板，熟悉基本的模板编程；
- 写一个表达式计算器，实现一个节点类的集成体系，体会面向对象编程。
  - 把四则运算式解析为表达式树，对根节点调用calculate虚函数就能算出表达式的值；
  - 可以略微尝试GP
- 写一个json解析器
- 写一个markdown解析器
- 写一个HTTP服务器
- 写一个git管理器
- 优秀C++开源代码
  - Google: Protobuf, leveldb, PCRE
  - muduo

[侯捷老师网课](https://github.com/19PDP/Bilibili-plus)



---

### 2. 进阶

《泛型编程与STL》 / 《C++编程规范》

《TCP/IP 详解》TCPv1

《Effective TCP/IP Programming》

《Effective C++》

《APUE》

《UNP》《Unix网络编程》杨继张译，据（陈硕）说翻译的非常好

《Head First 设计模式》

《研磨设计模式》



---

### 3. 实践





---

#### Q&A

Q: 关于造轮子？

A: 强调不要重复发明轮子，但是要有自制轮子的能力，非不能也，是不为也。



---

### Notes:

#### C++

##### vector\<bool\>

`vector<bool>`：

- bool的存储不一定是一个bool数组，而会优化成一个bit存储一个bool；
- 元素不是由`allocator`构造的，而是会直接被设置在内存中恰当的bit中；
- 拥有一个新的成员函数`flip`，可以翻转所有bool的值；(and a new signature for member [swap](http://www.cplusplus.com/vector::swap).??)
- A special member type, [reference](http://www.cplusplus.com/vector::reference), a class that accesses individual bits in the container's internal storage with an interface that emulates a `bool` reference. Conversely, member type `const_reference` is a plain `bool`.
- The pointer and iterator types used by the container are not necessarily neither pointers nor conforming iterators, although they shall simulate most of their expected behavior.

```
            for (size_t i = 0; i < queNext.size(); ++i) {
                if (queNext[i] == nextVertex) {
                    break;
                }
            }
            if (i != queNext.size()) {
                queNext.push_back(nexzz)
            }
```

- vector::erase返回值
  - 返回的是删除之后的第一个元素的iterator，可以用于在迭代中更新迭代器。



##### 初始化列表，初始化一个类的对象

初始化列表如果初始化的是一个类，会调用这个类的构造函数：

```c++
class test {
private:

public:
    vector<int> children;
    test() : children(26, 1) {} // this act like vector<int>(26, 1);
};
```

##### 宏 高级

宏 ##，可以把两个宏参数连接成一个

do {} while(0) 的作用： 在宏中使用，保证{}内部的代码能够正确执行

##### 聪明的数组遍历

for(int i = 0; s[i]; i++)：遍历一个未知大小的c数组

##### 虚析构函数

虚析构函数的作用：为了避免内存泄漏，而且是当子类中会有指针成员变量时才会使用到。即虚析构函数使得在删除指向子类对象的基类指针时，可以调用子类的析构函数来实现释放子类中堆内存的目的，从而防止内存泄漏。

##### non-POD

什么是non-POD？ Firstly, 什么是POD？

> A **POD type** is a C++ **type** that has an equivalent in C, and that uses the same rules as C uses for initialization, copying, layout, and addressing. ... To make sure the other rules match, the C++ version must not have virtual functions, base classes, non-static members that are private or protected , or a destructor.

POD(Plain Old Data)是在C++中有着和在C相同作用的类型，POD有着和在C中一样的运行方式，比如初始化、拷贝、内存布局、寻址方式……为了保证此类型的所有的其他运行方式都一样，在C++不能对这些类型添加虚函数、基类、私有或保护的非静态成员以及析构函数。

>A POD (plain old data) object has one of these data types--a fundamental type, pointer, union, struct, array, or class--with no constructor, destructor and virtual function. Conversely, a non-POD object **is one for which a constructor exists**.

##### unique_ptr赋值

`std::unique_ptr`的正确赋值方法：

`std::unique_ptr<type> a(new type);`

用另一个`unique_ptr`初始化：

`std::unique_ptr<type> a = std::move(b);`

想声明一个多态的`unique_ptr`时

`std::unique_ptr<BaseClass> ptr(new ChildClass);`

##### unique_ptr所指对象做为bind的参数

和普通指针一样，用`*`来获取对象。

```c++
unique_ptr<A> a(new A);
auto test = std::bind(&A::test, *a)
```

##### std::bind与虚函数

`std::bind`在绑定一个类的成员函数时，需要将类的一个对象绑定在第一个参数位置(std::placeholder::\_1)。

不能将一个抽象类指针所指的对象绑定在其成员函数（任意成员函数，而不仅仅是纯虚函数）上。

会导致报错：`invalid abstract parameter type ‘Base’`（抽象父类）

当bind绑定一个父类的成员函数`Base::test`和一个子类的对象`A`时，如果

1. 父类的成员函数是一个虚函数，在子类`A `中对这个虚函数进行了重写，则会调用子类实现的函数`test`。（具有多态性）
2. 父类的成员函数是一个普通函数，在子类`A`中对这个函数进行重写，则会调用父类实现的函数`test`。

如果想要绑定指向子类对象的抽象基类指针，则需要使用`std::ref`

```c++
Base* b_ptr = new A(10);
auto fn = bind(&Base::test, std::ref(b_ptr));
```

##### C++11 随机数

产生均匀分布的随机数：

```c++
#include<iostream>
#include<random>
#include<time.h>
  
using std::cout;
using std::endl;
using std::cin;
  
  
int main()
{
    std::default_random_engine random(time(NULL));
    std::uniform_int_distribution<int> dis1(0, 100);
    std::uniform_real_distribution<double> dis2(0.0, 1.0);
  
    for(int i = 0; i < 10; ++i)
        cout<<dis1(random)<<' ';
    cout<<endl;
  
    for(int i = 0; i < 10; ++i)
        cout<<dis2(random)<<' ';
    cout<<endl;
  
    return 0;
}
```

##### C++11 时间库

`chrono`库是C++11中的时间库，里面有一系列有关时间操作的函数和类可以使用，可以在[C++ reference](https://en.cppreference.com/w/cpp/chrono)中查看。下面记录几个常用的代码：

1.   获取当前时间戳（微秒）

     ```c++
     #include <chrono>
     using std::chrono::steady_clock;
     using std::chrono::microseconds;
     using std::chrono::time_point_cast;
     
     int main() {
         auto t = time_point_cast<microseconds>(steady_clock::now());
         long long timestamp = t.time_since_epoch().count();
         return 0;
     }
     ```
     
2.   计时（秒）

     ```c++
     #include <chrono>
      
     long fibonacci(unsigned n)
     {
         if (n < 2) return n;
         return fibonacci(n-1) + fibonacci(n-2);
     }
      
     int main()
     {
         auto start = std::chrono::steady_clock::now();
         fibonacci(42);
         auto end = std::chrono::steady_clock::now();
         std::chrono::duration<double> elapsed_seconds = end-start;
         double elapse_time = elapsed_seconds.count();
         return 0;
     }
     ```

3.   计时（微秒）

     ```c++
     #include <chrono>
      
     long fibonacci(unsigned n)
     {
         if (n < 2) return n;
         return fibonacci(n-1) + fibonacci(n-2);
     }
      
     int main()
     {
         auto start = std::chrono::steady_clock::now();
         fibonacci(42);
         auto end = std::chrono::steady_clock::now();
         auto elapsed_seconds = std::chrono::duration_cast<std::chrono::microseconds>(end-start);
         double elapse_time = elapsed_seconds.count();
         return 0;
     }
     ```
     

##### 右值引用

[番茄汁汁的博客](https://www.cnblogs.com/likaiming/p/9045642.html)感觉讲的很不错。

C++11新增的特性。

左值：能够获取地址，能够出现在赋值语句左边对其赋值。但是`const int& i = 10`这样的常引用无法赋值。

右值：无法获取地址的对象。如字面值、函数返回值、lambda表达式等。但不代表它不可改变，当定义了右值的右值引用时即可改变右值。

左值引用是一个变量的别名，右值引用可以看做是一个临时变量的别名。临时变量在内存中存储的情况和一个具名的变量（局部）是类似的，都是存在栈上。

###### 二者的一些特性：

-   一个普通的左值引用无法对一个右值进行引用，同时它也无法绑定到一个右值引用上

    ```c++
    int &i = 10;	// 错误 10是一个字面值，无法绑定
    // ---
    int a = 10;
    int &i = a;		// 正确 左值引用绑定在一个左值上
    int &&ii = i;	// 错误 右值引用无法绑定一个左值
    int &&ii = 10;	// 正确 右值引用绑定在一个右值上
    ```

-   const左值引用可以绑定一个右值

    ```cpp
    const int &i = 10;	// 正确 const引用绑定一个右值
    int &&ii = i;		// 错误 const引用仍然是一个左值引用
    ```

-   右值引用可以赋值给左值引用

    ```cpp
    int &&ii = 10;
    int &i = ii;	// 正确 左值引用可以绑定任何值
    ```

-   可以通过`std::move`来将一个左值转换成右值，但是转换后，必须保证除了复制和销毁以外，不能进行其他任何操作。

    ```cpp
    #include <utility>
    ...
    int a = 10;
    int &i = a;
    int &&ii = std::move(i);
    ```

###### 右值引用模板类型推断

引用折叠：用于处理产生引用的引用时发生的问题，右值引用的右值引用`X&& &&`会折叠成一个右值引用，其他所有的引用的引用的类型都会折叠为一个左值引用



## CPP Errors

1. c++ class does not name a type，可能原因：
   1. 未包含引用的类命名空间；
   2. 未包含引用的类头文件；
   3. 类名写错；
   4. 循环引用头文件。
   
2. passing ‘const xxx’ as ‘this’ argument discards qualifiers，可能原因：
   1. 使用`const`对象或对象指针调用了类的非`const`方法

3. 一个很奇怪的BUG，记录一下：

   1. 声明基类A，用`#ifndef #define #endif`进行保护；
   2. 声明子类B，同样用`#define`保护，`#include`基类A，并继承A；
   3. 声明子类C，同B；
   4. 建立`main.cpp`函数，`#include`子类B，C，则只有先包含进来的头文件中的类有效。

   解决方法，全部头文件使用`#pragma once`进行限定，应该是编译器预处理文件展开的问题，之后有空了再研究。

4. 在子类中都实现了基类的纯虚函数，且子类基类都实现了虚函数，出现undefined reference to `vtable for [ClassName]'

   1. 可能是因为连接时没有将`.cpp`文件编译生成的`.o`文件链接进来，如果使用`QtCreator`，可以尝试重新保存一下`CMakeLists.txt`，让`IDE`刷新`Cmake`选项。
   
5. invalid new-expression of [abstract class type]

   1. 这条报错的意思是new了一个抽象类，可能造成这条报错的原因有：

      1. 子类内未实现抽象父类的纯虚函数，然后对子类使用new操作符就会产生这种问题。

      2. 使用C++14，make_unique\<Parent\>(new Child)，当Parent是一个抽象基类时，也会导致此问题的出现。查看make_unique源码发现原因是因为make_unique会对父类使用new操作符。

         ```c++
           /// std::make_unique for single objects
           template<typename _Tp, typename... _Args>
             inline typename _MakeUniq<_Tp>::__single_object
             make_unique(_Args&&... __args)
             { return unique_ptr<_Tp>(new _Tp(std::forward<_Args>(__args)...)); }
         
         ```

6. 写模版时，声明和实现分别写在两个文件里，报错：undefined reference

   1. 把声明和实现都写在`.h`文件就解决了。

7. 一个非常怪的BUG……，头文件写了`#include <Eigen/Dense>`，在代码中可以声明`Eigen::Matrix4d ...`，但无法使用任何`Eigen::Matrix`的成员方法，包括用`<<`操作符进行赋值。

   1. 报错：`error: invalid operands to binary expression ('Eigen::Matrix4d' (aka 'Matrix<double, 4, 4>') and 'int')
      IO.h:241:16: note: candidate template ignored: could not match 'DenseBase<type-parameter-0-0>' against 'int'`
   2. 解决：`Ctrl+左键`点了一下之前能用的文件里面的`Eigen::Matrix4d`，跳转到`Eigen`头文件，然后再回来，就好了。（？？？？？？）
   
8. g++ 的神秘报错：

    1. 情况是这样的：实现了一个基类A如下：

        ```c++
        class A {
        public:
            A() {}
            virtual ~A() {}
            virtual void Foo();
        }
        ```

        然后继承它实现子类B：

        ```c++
        class B {
        public:
            B() {}
            virtual ~B() {}
            virtual void Foo() override final;
        }
        ```

    2. 导致问题出现的原因是实现了子类的`Foo`函数，而没有实现父类的`Foo`函数，`g++`报了一个很奇怪的错误：

        ```
        in function `A::~A()':
        undefined reference to `vtable for A'
        undefined reference to `typeinfo for A'
        collect2: error: ld returned 1 exit status
        ```

        大概是说编译器找不到基类的`type_info`，而虚析构函数又实现了。

    3. 需要将`Foo`声明为纯虚函数或者对基类的`Foo`进行实现才能解决这个错误。
    
9. ROS1，roscpp编译的一个坑：

    1. 最近想给一个老项目增加ros收发功能，按照tutorial写了一个不需要引入catkin以及catkin workspace的编译环境，talker listener的tutorial能够顺利编译，但是转换到自己的项目上就一直在`ros::init`就报错，报错是`undefined reference to ros::init`；
    
    2. 根据报错信息可以看出是一个`ros`库的链接错误，但是在`CMakeLists.txt`里也已经添加了`target_link_libraries(${target_name} ${catkin_LIBRARIES})`，同时用`message`打印`${catkin_LIBRARIES}`也能正确打印出库的路径；
    
    3. 最后发现是旧的CMakeLists里面有一句`add_definitions(-D_GLIBCXX_USE_CXX11_ABI=0)`，把这句注释掉就能正常编译了。
    
    3. >   TODO: 搞清楚上面这句的用途
    
10. Muduo Reactor模式与自己写TCP Server的坑：

    1. 这次是想在一个使用Muduo EventLoop和Channel实现了Reactor模式的一个项目中添加一个简单的TCP Server，用来接收数据；
    2. 这个项目之前使用的是UDP，只需要用UDP socket产生的File Descriptor放进一个Channel，绑定在EventLoop上，注册好ReadCallback，启动EventLoop之后就可以Reactor式地接收UDP数据包了；
    3. 但是TCP是保持连接的协议，需要一个用来监听的fd和一个用来在连接上接收数据的fd，如果想按上面的UDP一样的逻辑来Reactor式地接收TCP数据包，就需要用这个接收数据的fd来生成Channel，但是**坑就在这里出现了**：当连接到TCP Server的客户端出现断连时，会自动将这个fd关闭，就导致这个Channel无法从它的EventLoop上移除，因为移除需要调用`epoll_ctl`函数来删除fd，而这里会导致报错。
    4. 而如果想进行断线重连的话就不得不移除这个Channel，然后用新的fd来创建Channel，这种情况下有两种解决方法:
        1. 放弃Reactor模式，再开一个线程，在里面处理TCP；
        2. 把`muduo/base/Poller.cpp`里面`Poller::update`函数中的`LDIE << "epoll_ctl error";`改成`assert(errno == 2)`，既忽略fd找不到这个错误，其他错误还是可以正常捕获，这种方法不推荐，但是在你走投无路的时候或许能用？
    
11. std::function导致的段错误：

     1. 今天调试时发生的一个段错误，用gdb打印调用栈时发现是`std::function(void ...) operator()`导致的段错误，初步推断是因为某些原因产生了对这个函数对象的悬空指针/引用。
    
12. 用运算符`[]`访问`std::unordered_map`中不存在的元素导致的错误：

     1. 当使用运算符`[]`访问不存在元素时，会直接用`second`元素的默认构造函数来创建一个新的元素插入`unordered_map`，所以在用`[]`访问`unordered_map`的元素前应当先用`find`方法判断元素是否存在。
    
13. 记录一个知乎上看到的Debug技巧：

     1. Debug `memory corruption`：利用Google address sanitizer（GAS），可以探查以下问题：
         -   [Use after free](https://github.com/google/sanitizers/wiki/AddressSanitizerExampleUseAfterFree) (dangling pointer dereference)
         -   [Heap buffer overflow](https://github.com/google/sanitizers/wiki/AddressSanitizerExampleHeapOutOfBounds)
         -   [Stack buffer overflow](https://github.com/google/sanitizers/wiki/AddressSanitizerExampleStackOutOfBounds)
         -   [Global buffer overflow](https://github.com/google/sanitizers/wiki/AddressSanitizerExampleGlobalOutOfBounds)
         -   [Use after return](https://github.com/google/sanitizers/wiki/AddressSanitizerExampleUseAfterReturn)
         -   [Use after scope](https://github.com/google/sanitizers/wiki/AddressSanitizerExampleUseAfterScope)
         -   [Initialization order bugs](https://github.com/google/sanitizers/wiki/AddressSanitizerInitializationOrderFiasco)
         -   [Memory leaks](https://github.com/google/sanitizers/wiki/AddressSanitizerLeakSanitizer)
     2. 解决`core dump`：利用`Core Analyzer`工具。
    
14. 遇到一个`boost`编译无法通过的问题，程序使用`CMake`编译，`boost`安装正确且`cmake`没有报错，`make`时遇到下面的问题：

     ```sh
     /usr/bin/ld: /tmp/ccoF821Q.o: in function `__static_initialization_and_destruction_0(int, int)':
     test.cc:(.text+0x2ce): undefined reference to `boost::system::generic_category()'
     /usr/bin/ld: test.cc:(.text+0x2da): undefined reference to `boost::system::generic_category()'
     /usr/bin/ld: test.cc:(.text+0x2e6): undefined reference to `boost::system::system_category()'
     collect2: error: ld returned 1 exit status
     ```

     搜了很多答案都说在`ld.so.conf`添加了`boost`的路径或者添加编译选项`-lboost_system`，但是我实际上已经添加了这个路径，仍然不能编译通过。最终在stackoverflow上面搜到了问题的解决方法[[Vadim Berman的答案](https://stackoverflow.com/questions/9723793/undefined-reference-to-boostsystemsystem-category-when-compiling/50146757#50146757)]：

     ```cmake
     # 添加编译选项
     -DBOOST_ERROR_CODE_HEADER_ONLY
     # 或者在CMakeLists.txt里面添加
     add_definitions(-DBOOST_ERROR_CODE_HEADER_ONLY)
     ```

     `原因分析`：根据[Marc Glisse]()的回答：

     >   Linking with a library that defines the missing symbol (`-lboost_system`) is the obvious solution,but in the particular case of Boost.System, a misfeature in the original design makes it use `boost::system::generic_category()` and `boost::system::system_category()` needlessly.
     >
     >   ...
     >
     >   Starting from Boost 1.66 and [this commit](https://github.com/boostorg/system/commit/829a1320a7bef3ade74d6691fdcfe72e0b6917e9), this behavior is now the default, so hopefully fewer and fewer users should need this answe

     可见，在`boost`版本1.66以后，不使用上面两个函数的行为就是一个默认的宏定义了。由于使用了一些旧版本的软件，我的电脑上还配置了旧版本的`boost 1.60`动态库，可以看出这个问题就是由旧版本的`boost`动态库和新版本的头文件导致的。




----

[Return To Top](#Top)
