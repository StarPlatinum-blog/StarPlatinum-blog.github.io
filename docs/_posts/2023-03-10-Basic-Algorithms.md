---
layout: post
title:  'Basic Algorithms && Data Structures'
date:   2023-03-10 19:30:00 +0800
categories: notes
---

# Basic Algorithms && Data Structures

## 1. Algorithms

### 1.1 Sorting

#### 1.1.1 Bubble Sort

```c++
void BubbleSort(vector<int>& vec) {
    int n = vec.size();
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            if (vec[i] > vec[j]) {
                swap(vec[i], vec[j]);
            }
        }
    }
}
```

#### 1.1.2 Quick Sort

```c++
void QuickSort(vector<int>& vec, int start, int end) {
    if (end - start <= 1) return;
    int pivot = start + rand() % (end - start);
    int left = start + 1;
    int right = end - 1;
    swap(vec[start], vec[pivot]);
    while (left <= right) {
        while (left < end && vec[left] <= vec[start]) left++;
        while (right > start && vec[right] >= vec[start]) right--;
        if (left >= right) break;
        swap(vec[left], vec[right]);
    }
    swap(vec[start], vec[right]);
    QuickSort(vec, start, right);
    QuickSort(vec, right+1, end);
}
```

#### 1.1.3 Merge Sort

```c++
void MergeSort(vector<int>& vec, int start, int end) {
    if (end - start <= 1) return;
    int mid = (end - start) / 2 + start;
    merge_sort(vec, start, mid);
    merge_sort(vec, mid, end);
    vector<int> tmp(end - start, 0);
    int v1 = start, v2 = mid;
    int tmp_i = 0;
    while (v1 < mid && v2 < end) {
        tmp[tmp_i] = vec[v1] < vec[v2] ? vec[v1++] : vec[v2++];
        tmp_i++;
    }
    while (v1 < mid) {
        tmp[tmp_i++] = vec[v1++];
    }
    while (v2 < end) {
        tmp[tmp_i++] = vec[v2++];
    }
    for (int i = start; i < end; ++i) {
        vec[i] = tmp[i-start];
    }
}
```

#### 1.1.4 Heap Sort

```c++
void Adjust(vector<int>& vec, int len, int index) {
    int left = index*2 + 1;
    int right = index*2 + 2;
    int max_idx = index;
    if (left < len && vec[max_idx] < vec[left]) max_idx = left;
    if (right < len && vec[max_idx] < vec[right]) max_idx = right;
    if (max_idx != index) {
        swap(vec[max_idx], vec[index]);
        Adjust(vec, len, max_idx);
    }
}

void HeapSort(vector<int>& vec) {
    int n = vec.size();
    for (int i = n / 2 - 1; i >= 0; --i) {
        Adjust(vec, n, i);
    }
    for (int i = n - 1; i >= 1; --i) {
        swap(vec[0], vec[i]);
        Adjust(vec, i, 0);
    }
}
```

### 1.2 Searching

#### 1.2.1 Binary Search

```c++
int binarySearch(vector<int> arr, int x) {
    int left = 0;
    int right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == x) {
            return mid;
        } else if (arr[mid] > x) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}
```

### 1.3 Hash Functions

#### 1.3.1 Hash for vector/array

```c++
auto arrayHash = [fn = hash<int>{}] (const array<int, 26>& arr) -> size_t {
	return accumulate(
        arr.begin(), arr.end(), 0u, [&](size_t acc, int num) {
            return (acc << 1) ^ fn(num);
        });
};

auto vectorHash = [fn = hash<int>{}] (const vector<int>& arr) -> size_t {
	return accumulate(
        arr.begin(), arr.end(), 0u, [&](size_t acc, int num) {
            return (acc << 1) ^ fn(num);
        });
};

// Use in unordered container:
unordered_map<vector<int>, int, decltype(vectorHash)> mp(0, vectorHash);
unordered_set<array<int, 26>, decltype(arrayHash)> st(0, arrayHash);
```

## 2. Data Structures

### 2.1 Trees

#### 2.1.y Heap

```c++
#include <iostream>
#include <vector>
using namespace std;

template<typename T>
class Heap {
private:
    vector<T> data;
    void heapify_up(int idx) {
        if (idx == 0) return;
        int parent_idx = (idx-1) / 2;
        if (data[idx] > data[parent_idx]) {
            swap(data[idx], data[parent_idx]);
            heapify_up(parent_idx);
        }
    }

    void heapify_down(int idx) {
        int left_idx = idx*2 + 1, right_idx = idx*2 + 2;
        int max_idx = idx;
        if (left_idx < data.size() && data[left_idx] > data[max_idx])
            max_idx = left_idx;
        if (right_idx < data.size() && data[right_idx] > data[max_idx])
            max_idx = right_idx;
        if (max_idx != idx) {
            swap(data[idx], data[max_idx]);
            heapify_down(max_idx);
        }
    }
public:
    Heap() {}
    void push(T val) {
        data.push_back(val);
        heapify_up(data.size()-1);
    }
    void pop() {
        if (data.empty()) return;
        swap(data[0], data[data.size()-1]);
        data.pop_back();
        heapify_down(0);
    }
    T top() const {
        if (data.empty()) throw runtime_error("Heap is empty");
        return data[0];
    }
    bool empty() const {
        return data.empty();
    }
};

```

### 2.1.x Trie

Leetcode question for test: [139](https://leetcode.cn/problems/word-break/)

```c++
class TrieNode {
    bool is_end;
    TrieNode* next[26];
public:
    TrieNode(): is_end(false) {
        memset(next, 0, sizeof(TrieNode*) * 26);
    }

    inline void AddCh(char ch) {
        next[ch - 'a'] = new TrieNode();
    }

    inline bool HasCh(char ch) {
        return next[ch - 'a'] != nullptr;
    }

    inline TrieNode* GetNext(char ch) {
        return next[ch - 'a'];
    }

    inline void SetEnd() {
        is_end = true;
    }

    inline bool IsEnd() {
        return is_end;
    }
};

class TrieTree {
private:
    TrieNode* head;
public:
    TrieTree() {
        head = new TrieNode();
    }
    void AddWord(const string& w) {
        int w_len = w.size();
        int idx = 0;
        TrieNode* cur = head;
        for (int i = 0; i < w_len; ++i) {
            if (!cur->HasCh(w[i])) {
                cur->AddCh(w[i]);
            }
            cur = cur->GetNext(w[i]);
            if (i == w_len - 1) {
                cur->SetEnd();
            }
        }
    }

    bool HasWord(const string& w) {
        TrieNode* cur = head;
        function<bool(int)> find_w = [&] (int i) -> bool {
            if (i >= w.size()) return cur->IsEnd();
            if (cur->GetNext(w[i])) {
                cur = cur->GetNext(w[i]);
                return find_w(i + 1);
            } else {
                return false;
            }
        };
        return find_w(0);
    }

    friend ostream& operator<<(ostream& os, const TrieTree& tree) {
        TrieNode* cur = tree.head;
        function<void(TrieNode*)> print_tree = [&] (TrieNode* node) {
            if (node->IsEnd()) {
                os << endl;
            }
            for (int i = 0; i < 26; ++i) {
                char w = static_cast<char>(i + 'a');
                if (node->GetNext(w)) {
                    os << w;
                    print_tree(node->GetNext(w));
                }
            }
        };
        print_tree(cur);
        return os;
    }
};
```
