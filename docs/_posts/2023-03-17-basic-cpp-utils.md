---
layout: post
title:  'Basic C++ Utils'
date:   2023-03-10 19:30:00 +0800
categories: notes
---

# Basic C++ Utils

## 1. Multithread

### 1.1 Thread Pool

Simple thread pool

> https://stackoverflow.com/a/32593825

```c++
class ThreadPool {
public:
    void Start();
    void QueueJob(const std::function<void()>& job);
    void Stop();
    void busy();

private:
    void ThreadLoop();

    bool should_terminate = false;           // Tells threads to stop looking for jobs
    std::mutex queue_mutex;                  // Prevents data races to the job queue
    std::condition_variable mutex_condition; // Allows threads to wait on new jobs or termination 
    std::vector<std::thread> threads;
    std::queue<std::function<void()>> jobs;
};

void ThreadPool::Start() {
    const uint32_t num_threads = std::thread::hardware_concurrency(); // Max # of threads the system supports
    threads.resize(num_threads);
    for (uint32_t i = 0; i < num_threads; i++) {
        threads.at(i) = std::thread(ThreadLoop);
    }
}

void ThreadPool::ThreadLoop() {
    while (true) {
        std::function<void()> job;
        {
            std::unique_lock<std::mutex> lock(queue_mutex);
            mutex_condition.wait(lock, [this] {
                return !jobs.empty() || should_terminate;
            });
            if (should_terminate) {
                return;
            }
            job = jobs.front();
            jobs.pop();
        }
        job();
    }
}

void ThreadPool::QueueJob(const std::function<void()>& job) {
    {
        std::unique_lock<std::mutex> lock(queue_mutex);
        jobs.push(job);
    }
    mutex_condition.notify_one();
}

void ThreadPool::busy() {
    bool poolbusy;
    {
        std::unique_lock<std::mutex> lock(queue_mutex);
        poolbusy = jobs.empty();
    }
    return poolbusy;
}

void ThreadPool::Stop() {
    {
        std::unique_lock<std::mutex> lock(queue_mutex);
        should_terminate = true;
    }
    mutex_condition.notify_all();
    for (std::thread& active_thread : threads) {
        active_thread.join();
    }
    threads.clear();
}

```

### 1.2 LRU Cache

This LRU Cache can be tested on https://leetcode.cn/problems/OrIXps/

```c++
class LRUCache {
private:
    using Item = pair<int, int>;
    unordered_map<int, list<Item>::iterator> map_;
    list<Item> cont_;
    int cap_;

    void moveToFront(int key) {
        auto it = map_[key];
        cont_.push_front({it->first, it->second});
        cont_.erase(it);
        map_[key] = cont_.begin();
    }

public:
    LRUCache(int capacity): cap_(capacity) {}
    
    int get(int key) {
        if (map_.count(key) > 0) {
            moveToFront(key);
            return cont_.front().second;
        } else {
            return -1;
        }
    }
    
    void put(int key, int value) {
        if (map_.count(key) > 0) {
            moveToFront(key);
            cont_.front().second = value;
        } else {
            cont_.push_front({key, value});
            map_[key] = cont_.begin();
        }
        if (cont_.size() > cap_) {
            auto item = cont_.back();
            map_.erase(item.first);
            cont_.pop_back();
        }
    }
};
```

### 1.3 Print 1-N with Multi-thread

```c++
#include <iostream>
#include <vector>
#include <mutex>
#include <thread>
#include <chrono>

using namespace std::chrono_literals;

constexpr const int kValMax = 1'000;

void PrintVal() {
    static int val_ = 0;
    static std::mutex mut;
    while (val_ < kValMax) {
        {
            std::lock_guard<std::mutex> lock(mut);
            if (val_ >= kValMax) break;
            std::cout << val_++ << " ";
        }
        std::cout.flush();
        std::this_thread::sleep_for(10ms);
    }
}

int main() {
    std::vector<std::thread> th_vec;
    int cores = std::thread::hardware_concurrency();
    for (int i = 0; i < cores; ++i) {
        th_vec.emplace_back(PrintVal);
    }
    for (int i = 0; i < cores; ++i) {
        th_vec[i].join();
    }
    return 0;
}
```

## 2. Design Patterns

### 2.1 Singleton

All the implementations are thread safe.

- Lazy-evaluated

```c++
class Singleton {
public:
    static Singleton& getInstance() {
        static Singleton instance;  // Thread safe in c++11
        return instance;
    }

    Singleton(Singleton const&) = delete;
    Singleton& operator=(Singleton const&) = delete;

private:
    Singleton() {}

};
```

- Double check lock

```c++
class Singleton {
public:
    static Singleton& GetInstance() {
        if (!instance_) {
            std::lock_guard<std::mutex> lg(mut_);
            if (!instance_) {
                instance_ = new Singleton();
            }
        }
        return instance_;
    }

    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;

private:
    std::mutex mut_;

    Singleton() {}
    static Singleton* instance_;
};
```

## 3. C++ STLs

### 3.1 unique_ptr

```c++
#include <memory>

template<typename T, typename Deleter = std::default_delete<T>>
class MyUniquePtr {
private:
    using element_type = T;
    using deleter_type = Deleter;
    using pointer = T*;

    pointer ptr_;

public:
    // Constructor
    MyUniquePtr() noexcept : ptr_(nullptr) {}

    explicit MyUniquePtr(pointer p) noexcept : ptr_(p) {}

    // If a class has user declared move constructor
    // its copy constructor/assignment is deleted on default
    MyUniquePtr(MyUniquePtr&& u) noexcept {
        ptr_ = u.release();
    }

    // make Derived class can be automatically converted to Base class
    template<typename U, typename E>
    MyUniquePtr(MyUniquePtr<U, E>&& u) noexcept {
        ptr_ = u.release();
    }

    // Destructor
    ~MyUniquePtr() noexcept {
        delete ptr_;
    }

    // Operators
    MyUniquePtr& operator= (MyUniquePtr&& rhs) noexcept {
        ptr_ = rhs.release();
    }

    T& operator*() const noexcept { return *ptr_; }
    T* operator->() const noexcept { return ptr_; }

    // Modifiers
    pointer release() noexcept {
        pointer ptr = ptr_;
        ptr_ = nullptr;
        return ptr;
    }

    void reset(pointer ptr = pointer()) noexcept {
        if (ptr_) delete ptr_;
        ptr_ = ptr;
    }

    void swap(MyUniquePtr& other) noexcept {
        using std::swap;
        swap(this->ptr_, other.ptr_);
    }

    // Observers
    pointer get() const noexcept { return ptr_; }
    explicit operator bool() const noexcept { return ptr_; }
};
```

### 3.2 shared_ptr

```c++
template<typename T, typename Deleter = std::default_delete<T>>
class MySharedPtr {
private:
    struct SharedCount {
        SharedCount(): count_(1) {}
        void AddCount() { ++count_; }
        long ReduceCount() { return --count_; }
        long GetCount() const { return count_; }

    private:
        long count_;
    };

    using element_type = T;
    using deleter_type = Deleter;
    using pointer = T*;

    pointer ptr_;
    SharedCount* shared_count_;

public:
    template <typename U, typename E>
    friend class MySharedPtr;

    // Default Constructor
    MySharedPtr() noexcept : ptr_(nullptr) {}
    // Constructor
    explicit MySharedPtr(pointer p) noexcept : ptr_(p) {
        if (ptr_) {
            shared_count_ = new SharedCount();
        }
    }
    // Copy Constructor
    MySharedPtr(MySharedPtr& u) noexcept {
        ptr_ = u.ptr_;
        if (ptr_) {
            u.shared_count_->AddCount();    // increase counter
            shared_count_ = u.shared_count_;// copy counter
        }
    }
    // Move Constructor
    MySharedPtr(MySharedPtr&& u) noexcept {
        ptr_ = u.ptr_;
        if (ptr_) {
            shared_count_ = u.shared_count_;
            u.ptr_ = nullptr;
        }
    }
    // Template Copy Constructor
    template<typename U, typename E>
    MySharedPtr(MySharedPtr<U, E>& u) noexcept {
        ptr_ = u.ptr_;
        if (ptr_) {
            u.shared_count_->AddCount();
            shared_count_ = u.shared_count_();
        }
    }
    // make Derived class can be automatically converted to Base class
    template<typename U, typename E>
    MySharedPtr(MySharedPtr<U, E>&& u) noexcept {
        ptr_ = u.ptr_;
        if (ptr_) {
            shared_count_ = u.shared_count_;
            u.ptr_ = nullptr;
        }
    }

    // Destructor
    ~MySharedPtr() noexcept {
        if (ptr_ && !shared_count_->ReduceCount()) {
            delete ptr_;
            delete shared_count_;
        }
    }

    // Operators
    MySharedPtr& operator= (MySharedPtr u) noexcept {
        u.swap(*this);
        return *this;
    }

    T& operator*() const noexcept { return *ptr_; }
    T* operator->() const noexcept { return ptr_; }

    // Modifiers
    long use_count() const {
        if (ptr_) {
            return shared_count_->GetCount();
        } else {
            return 0;
        }
    }

    void reset(pointer ptr = pointer()) noexcept {
        if (ptr_) delete ptr_;
        ptr_ = ptr;
    }

    void swap(MySharedPtr& other) noexcept {
        using std::swap;
        swap(ptr_, other.ptr_);
        swap(shared_count_, other.shared_count_);
    }

    // Observers
    pointer get() const noexcept { return ptr_; }
    explicit operator bool() const noexcept { return ptr_; }
};
```
