---
layout:	post
title:	C++ Concurrency
date:   2022-02-10 11:27:12 +0800
categories: note 
---

[TOC]

# C++ 并发编程

## 2. 线程管控

### 2.1 基本线程管控

#### 2.1.1 发起线程

#### 2.1.2 等待线程完成

#### 2.1.3 出现异常的情况下等待

#### 2.1.4 在后台运行线程

### 2.2 向线程传递参数

### 2.3 移交线程归属权

### 2.4 在运行时选择线程数量

### 2.5 识别线程



## 3. 在线程间共享数据

### 3.1 线程间共享数据的问题

不变量：针对某一特定数据的断言，需要保持为真实值的一个量。例如链表元素的个数就是一个不变量。

#### 3.1.1 条件竞争

`定义`：在并发编程中，操作由两个或多个线程负责，他们争先让线程执行各自的操作，而结果取决于它们执行的次序。

良性条件竞争：即使改变的线程的执行次序，结果也能够被接收；

恶性条件竞争：典型场景：完成一项操作需要改动两份或多份数据。

#### 3.1.2 防止恶性条件竞争

方法：

1. 不变量加锁：采取保护措施包装数据结构，确保不变量被破坏时，中间状态只对执行改动的线程可见。

2. 无锁编程：修改数据结构设计及其不变量，由一连串不可拆分的改动完成数据变更，每个改动都维持不变量不被破坏。无锁编程较为复杂，需要了解内存模型和线程可以看到的数据集。

3. 将修改数据结构当作事务（transaction）来处理。软件事务内存（Software Transaction Memory）

   类似于数据库在一个事务内完成更新：把需要执行的数据读写任务视为一个完整的序列，先用事务日志存储记录，再把序列当成单一步骤提交执行。

   若别的线程改动了数据，导致提交无法完整执行，则事务重新开始。

### 3.2 用互斥保护共享数据

互斥（mutex: mutual exclusion）：标记访问受保护数据结构的代码，令各线程在其上相互排斥，只要由线程在运行标记的代码，任何别的线程想要访问同一块数据就必须等待。

#### 3.2.1 在C++中使用互斥

在c++中使用`std::mutex`类来创建互斥，调用成员函数`lock`来对代码加锁，调用`unlock`来解锁：

```c++
#include <mutex>
#include <list>
std::list<int> some_list;
std::mutex some_mutex;

int AddToList(int value) {
    some_mutex.lock();			// 加锁
    some_list.push_back(value);	// 操作链表
    some_mutex.unlock();		// 解锁
}
```

这样就必须在函数以外的每条代码路径上都调用`unlock`（如果有分支），包括异常处理中。取而代之，C++提供了类模板`std::lock_guard<>`，使用RAII来进行加锁解锁：构造时加锁，析构时解锁，从而保证互斥被正确解锁：

```c++
int AddToList(int value) {
    std::lock_guard<std::mutex> guard(some_mutex);	// 构造lock_guard，加锁
    some_list.push_back(value);						// 操作链表
}	// guard析构，解锁
```

一般互斥和受保护的数据会一起组成一个类，可以清楚的表明它们互相联系。但是如果类的成员函数返回了数据的指针或是引用，就会导致数据能够随时被其他函数访问，这样就不能保证数据的访问时在互斥的保护下进行的。

因此在使用互斥时，要注意：**谨慎设计接口，保证受保护的数据是在互斥锁定后才被访问**

下面是`lock_guard`在GCC 9的实现，非常的简洁，在构造函数中对互斥进行加锁，在析构函数对互斥进行解锁，实现RAII。同时删除了拷贝构造函数和拷贝赋值操作符，使`lock_guard`只能进行引用。

```C++
template<typename _Mutex>
class lock_guard
{
    public:
    typedef _Mutex mutex_type;

    explicit lock_guard(mutex_type& __m) : _M_device(__m)
    { _M_device.lock(); }

    lock_guard(mutex_type& __m, adopt_lock_t) noexcept : _M_device(__m)
    { } // calling thread owns mutex

    ~lock_guard()
    { _M_device.unlock(); }

    lock_guard(const lock_guard&) = delete;
    lock_guard& operator=(const lock_guard&) = delete;

    private:
    mutex_type&  _M_device;
};
```



#### 3.2.2 组织和编排代码以保护共享数据

使用互斥并不能完美的保护共享数据，如果有一个成员函数返回了共享数据的引用或者指针，并且在解锁后再使用数据，这就会导致共享数据失去保护。

```c++
class SomeData {
 private:
    int a;
    std::string b;
 public:
    explicit SomeData(int a, std::string b): a(a), b(b) {}

    void Print() {
        std::cout << a << " " << b << std::endl;
    }
};

class DataWrapper {
 private:
    SomeData data;
    std::mutex m;
 public:
    explicit DataWrapper(SomeData d) :data(d) {}

    template<typename FuncT_>
    void ProcessData(FuncT_ func) {
        std::lock_guard<std::mutex> lock(m);
        func(data);
    }

    void GetDataAddr() {
        std::cout << &data << std::endl;
    }
};

SomeData *unprotected = nullptr;
void MaliciousFunc(SomeData &protected_data) {
    unprotected = &protected_data;
}

void MaliciousThread(SomeData *data_ptr) {
    std::cout << "Get protected data outside the mutex:\n";
    data_ptr->Print();
}
```

上面代码中的`MaliciousFunc`就是一个例子，它通过引用传参获取了受保护数据的指针，然后在`lock_guard`的范围之外使用保护数据。

这是使用互斥保护共享数据的常见错误，在代码中：

- 不得向锁所在的作用域之外传递指针和引用，指向受保护的共享数据。

#### 3.2.3 发现接口固有的条件竞争

有时即使使用互斥保护了所有访问共享数据的代码，依然会产生条件竞争，这就可能是数据结构的接口导致的。

以`std::stack`作为例子，它的成员函数支持以下三个操作：`push top pop`，分别用于将数据压入栈中、取得栈顶的元素和将栈顶元素弹出。还可以通过成员函数：`empty size`，判断栈是否为空、获得栈中的数据量。

```c++
stack<int> s;
if (!s.empty()) {
    const int value = s.top();
    s.pop();
    do_something(value);
}
```

上面的代码在多线程中存在两处条件竞争：

##### 1. empty判断失效

假设栈中只含有一个元素：

| 线程1                          | 线程2                          |
| ------------------------------ | ------------------------------ |
| s.empty() == false，进入if语句 |                                |
|                                | s.empty() == false，进入if语句 |
|                                | const int value = s.top();     |
|                                | s.pop();                       |
| const int value = s.top();     |                                |

线程1和线程2同时通过了判断语句，但是因为栈中仅有一个元素，线程2在调用`s.pop`时就弹出了该元素，在线程1调用`s.top`获取栈顶元素时，就会因为栈空产生段错误。

##### 2. top与pop的条件竞争

| 线程1                      | 线程2                      |
| -------------------------- | -------------------------- |
| const int value = s.top(); |                            |
|                            | const int value = s.top(); |
|                            | s.pop()                    |
| s.pop()                    |                            |

上面两个线程同时取了栈顶的同一个元素，并且分别调用了`pop`方法两次，这就会导致栈顶以下的元素还未被访问就被弹出。

那是不是把`pop`和`top`合并成同一个函数就可以解决问题了呢？

> Tom Cargill提出的异常安全问题：
>
> 假设pop函数返回栈顶元素的值，同时将其从栈上移除。隐患是：只有在栈被改动后，弹出的元素才返回给调用者。
>
> 如果在返回后的拷贝过程中，元素类型的构造函数抛出异常，就会导致数据既未被拷贝到目标变量中，在栈上也不复存在。

有以下几种方法可以消除条件竞争：

1. 传入引用
   - Detail: TODO
2. 提供不抛出异常的拷贝构造函数，或不抛出异常的移动构造函数
   - Detail: TODO
3. 返回指针，指向弹出的元素
   - Detail: TODO
4. 结合方法1、2，或结合方法1、3
   - Detail: TODO

下面的代码实现了一个线程安全的栈容器：

```c++
template<typename T>
class threadsafe_stack {
 private:
    std::stack<T> data;
    mutable std::mutex m;

 public:
    threadsafe_stack() {}
    threadsafe_stack(const threadsafe_stack& other) {
        std::lock_guard<std::mutex> m_lock(other.m);
        data = other.data;
    }
    threadsafe_stack& operator=(const threadsafe_stack& other) = delete;

    void push(T new_value) {
        std::lock_guard<std::mutex> m_lock(m);
        data.push(std::move(new_value));
    }

    std::shared_ptr<T> pop() {
        std::scoped_lock m_lock(m);     // try C++17 scoped_lock
        if (data.empty()) throw empty_stack();
        std::shared_ptr<T> const res(std::make_shared<T>(data.top()));
        data.pop();
        return res;
    }

    void pop(T &value) {
        std::scoped_lock m_lock(m);
        if (data.empty()) throw empty_stack();
        value = data.top();
        data.pop();
    }

    bool empty() const {
        std::scoped_lock m_lock(m);
        return data.empty();
    }
};
```



#### 3.2.4 死锁：问题和解决方法

死锁：两个线程都需要同时锁定两个互斥才能进行某些操作，但它们分别锁住了一个互斥，都等着给另一个互斥加锁。双方都在阻塞等待对方释放锁，导致后面的程序无法运行。

防范死锁的一般建议：按固定顺序对多个互斥加锁。

- 棘手场景：`swap(T a, T b)`用于交换两个对象，如果在`swap`函数内率先对第一个参数加锁，再对第二个参数加锁，虽然看似是按固定顺序加锁，但在下面的情况就会导致死锁：
- 线程1调用了`swap(a, b);`并对对象a加了锁，此时线程2调用`swap(b, a)`并对b加了锁，这就导致了死锁。

此时就可以使用标准库函数`std::lock`，同时对两个互斥加锁：

```c++
void swap(T& a, T& b) {
    if (a == b) return;
    std::lock(a.m, b.m); // 假定 m 是T类型的互斥量
    std::lock_guard<std::mutex> lock_a(a.m, std::adopt_lock);
    std::lock_guard<std::mutex> lock_b(b.m, std::adopt_lock);
    swap_data_(a, b);
}
```

`std::adopt_lock`是`std::lock_guard`和`std::unique_lock`的构造函数选项。意为不在构造lock对象时对互斥进行加锁，同时假定互斥已经被当前线程加锁。

`std::defer_lock`是另一个选项，它表示不在构造lock对象时对互斥进行加锁，同时假定互斥没有被加锁。

`std::lock`能够保证互斥量同时被全部锁定，或者在抛出异常时同时被解锁。

如果使用C++17，则可以利用`std::scoped_lock`来对多个互斥加锁

```c++
void swap(T& a, T& b) {
    if (a == b) return;
    // 模板参数推导，等同于：std::scoped_lock<std::mutex, std::mutex> s_lock(a.m, b.m);
    std::scoped_lock s_lock(a.m, b.m); 
    swap_data_(a, b);
}
```



#### 3.2.5 防范死锁的补充准则

1. 避免嵌套锁
   - TODO
2. 一旦持锁，就避免调用用户提供的程序接口
   - TODO
3. 依从固定顺序获取锁
   - TODO
4. 按层级加锁
   - TODO
5. 将以上四个准则推广到锁之外
   - 死锁并不一定是加锁操作导致的，创建线程时也可能导致死锁。

下面是一个简单的层级互斥实现：

```c++ 
namespace locklock {

class hierarchy_violated_exception : public std::exception {
    const char* what() const noexcept(true) override {
        return "mutex hierarchy violated";
    }
};

class hierarchical_mutex {
 private:
    std::mutex internal_mutex_;
    const uint32_t hierarchy_value;
    uint32_t previous_hierarchy_value;
    static thread_local uint32_t this_thread_hierarchy_value;

    void CheckForHierarchyViolation() noexcept(true) {
        if (this_thread_hierarchy_value <= hierarchy_value) {
            throw hierarchy_violated_exception();
        }
    }

    void UpdateHierarchyValue() {
        previous_hierarchy_value = this_thread_hierarchy_value;
        this_thread_hierarchy_value = hierarchy_value;
    }

 public:
    explicit hierarchical_mutex(uint32_t value) :
            hierarchy_value(value),
            previous_hierarchy_value(0) {}

    void lock() {
        CheckForHierarchyViolation();
        internal_mutex_.lock();
        UpdateHierarchyValue();
    }

    void unlock() {
        if (this_thread_hierarchy_value != hierarchy_value) {
             throw hierarchy_violated_exception();
        }
        this_thread_hierarchy_value = previous_hierarchy_value;
        internal_mutex_.unlock();
    }

    bool try_lock() {
        CheckForHierarchyViolation();
        if (!internal_mutex_.try_lock()) {
            return false;
        }
        UpdateHierarchyValue();
        return true;
    }
};

thread_local uint32_t 
    hierarchical_mutex::this_thread_hierarchy_value(
        std::numeric_limits<uint32_t>::max());
    
} // namespace locklock
```

上面的层级互斥实现了`lock unlock try_lock`接口，所以可以和`std::lock_guard`结合使用。

`try_lock`：当互斥已经被其他线程持有，则直接返回false，表示加锁失败，不进入阻塞。

#### 3.2.6 运用std::unique_lock<>灵活加锁

`std::unique_lock<>`对象并不一定占有与之关联的互斥，同时可以提前对关联的互斥进行解锁，而不是像`lock_guard`只能在析构时解锁。

它的构造函数除了传入互斥外，还可以传入一个额外的参数用于指示是否锁住互斥，它有以下可能取值：

- `std::adopt_lock`：表示将互斥交给这个锁来管理，锁会假定互斥已经被锁定，因此不会在构造锁的时候对互斥进行加锁，但可以利用锁的RAII特性帮助解锁互斥；
- `std::defer_lock`：表示在构造`unique_lock`时不对互斥进行加锁，在未来通过`unique_lock`的`lock()`或`try_lock()`方法进行加锁。
- `std::try_to_lock`：表示在构造锁时调用互斥的`try_lock()`方法对其进行加锁。
- 如果不传入第二个参数，互斥会在锁构造完成后被锁定。

由于需要存储锁管理的互斥当前的状态，所以`unique_lock`占用的内存比`lock_guard`稍大（多一个bool）。因此在`lock_guard`满足需求的情况下优先使用它进行加锁，在需要更高的灵活性时再使用`unique_lock`。

#### 3.2.7 在不同作用域之间转移互斥归属权

当程序需要：

1. 根据当前保存的某种状态对互斥加锁；
2. 对互斥加锁的时机由传入的参数决定；

这两种情况下需要锁能够转移，而`unique_lock`就是一种可以移动不可复制的锁，十分适合此类场景。

转移锁的归属权可以让函数在加锁后进行一些操作，再将锁返回给调用者，在同一个锁的保护下进行后面的操作。

#### 3.2.8 按适合的粒度加锁



### 3.3 保护共享数据的其他工具

#### 3.3.1 在初始化过程中保护共享数据

#### 3.3.2 保护较少更新的数据结构

#### 3.3.3 递归加锁





## 4. 并发操作的同步

### 4.4 运用同步操作简化代码

#### 4.4.1 利用future进行函数式编程

##### 1. 函数式编程风格的快速排序

记录几个以前不常用的stl函数：

1. 分割函数：`std::partition`，接收两个迭代器，表示要进行分割的区域，第三个参数为一个可调用对象，用于在分割时将列表元素与分割点元素进行比较。返回值是分割成两部分的数组的后一部分的首个元素。

    函数定义
    
    ```c++
    template <class BidirectionalIterator, class UnaryPredicate>
      BidirectionalIterator partition (BidirectionalIterator first,
                                       BidirectionalIterator last,
                                       UnaryPredicate pred) {
      while (first!=last) {
        while (pred(*first)) {
          ++first;
          if (first==last) return first;
        }
        do {
          --last;
          if (first==last) return first;
        } while (!pred(*last));
        swap (*first,*last);
        ++first;
      }
      return first;
    }
    ```
    
    ```c++
    #include <algorithm>
    std::partition(x.begin(), x.end(), [&](const T& t){ return t < pivot; })
    ```
    
2. list间进行元素交换：`splice`

    函数签名：

    ```c++
    // entire list (1)	
    void splice (const_iterator position, list& x);
    void splice (const_iterator position, list&& x);
    // single element (2)	
    void splice (const_iterator position, list& x, const_iterator i);
    void splice (const_iterator position, list&& x, const_iterator i);
    // element range (3)	
    void splice (const_iterator position, list& x,
                 const_iterator first, const_iterator last);
    void splice (const_iterator position, list&& x,
                 const_iterator first, const_iterator last);
    ```

    (1)将list x的所有元素都转移到调用`splice`的链表的position迭代器之前的位置，插入后`position`迭代器会指向插入元素的后一个。

3. lambda表达式

   标准格式：
   
   ```c++
   [ captures ] ( params ) specs_requires(optional) { body }
   ```
   
   `captures`表示lambda表达式如何获取当前生命周期内的变量：
   
   - `=`表示通过拷贝的方式获取所有变量；
   - `&`表示通过引用的方式获取所有变量；
   - `x`表示通过拷贝的方式获取变量x；
   - `&x`表示通过引用的方式获取变量x；
   
   ```c++
   A a; // A is constructed
   {
       auto print_a = [=]() {	// A is copied
           cout << a << endl;	// print a
       };
       print_a();
   }	// A is destructed
   {
       auto print_a= [&]() {	// get a by ref
           cout << a << endl; 	// print a
       };
       print_a();
   }
   {
       auto print_a = [a]() {	// A is copied
           cout << a << endl;	// print a
       };
       print_a();
   }
   {
       auto print_a = [&a]() {	// get a by ref
           cout << a << endl;	// print a
       };
       print_a();
   }
   ```

函数式编程的快速排序：

```c++
```



​    





