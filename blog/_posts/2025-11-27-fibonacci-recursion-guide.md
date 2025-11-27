---
layout: post
title: "Fibonacci Numbers with Recursion: A Complete Guide in 7 Languages"
date: 2025-11-28
tags: [programming, recursion, fibonacci, algorithms]
---

If you've ever wondered how to implement Fibonacci numbers using recursion, you're in the right place. This classic programming problem is a perfect way to understand recursive functions, and I'll show you how to solve it in seven popular programming languages: C, C++, Java, Python, PHP, Go, and Ruby.

## What Are Fibonacci Numbers?

The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones. It starts with 0 and 1, so the sequence goes: 0, 1, 1, 2, 3, 5, 8, 13, 21, and so on. This pattern appears everywhere in nature, from flower petals to spiral galaxies.

The mathematical formula is simple: F(n) = F(n-1) + F(n-2), with base cases F(0) = 0 and F(1) = 1. Recursion is a natural fit for this problem because each Fibonacci number depends on previous ones.

## Implementation in C

Let's start with C, one of the most fundamental programming languages. Here's how you can implement Fibonacci recursion in C:

```c
#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int num = 10;
    printf("Fibonacci of %d is %d\n", num, fibonacci(num));
    return 0;
}
```

The function checks if n is 0 or 1 (base cases), then returns n. Otherwise, it recursively calls itself with n-1 and n-2, adding the results together.

## Implementation in C++

C++ is similar to C but with object-oriented features. Here's the recursive Fibonacci in C++:

```cpp
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int num = 10;
    cout << "Fibonacci of " << num << " is " << fibonacci(num) << endl;
    return 0;
}
```

The logic is identical to C, but we use cout for output instead of printf. The recursive structure remains the same, making it easy to transition between these languages.

![Fibonacci recursion visualization](/images/blog/fibonacci-recursion-guide-1.jpg)

## Implementation in Java

Java brings strong typing and object-oriented programming to the table. Here's the Fibonacci implementation:

```java
public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        int num = 10;
        System.out.println("Fibonacci of " + num + " is " + fibonacci(num));
    }
}
```

In Java, we define the function as static so it can be called from the main method without creating an instance. The recursive logic stays consistent across all languages.

## Implementation in Python

Python's clean syntax makes recursive functions incredibly readable. Here's the Fibonacci implementation:

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

num = 10
print(f"Fibonacci of {num} is {fibonacci(num)}")
```

Python doesn't need semicolons or curly braces, which makes the code look cleaner. The function definition uses def, and the rest follows the same recursive pattern.

## Implementation in PHP

PHP is widely used for web development, and it handles recursion just as well. Here's how:

```php
<?php
function fibonacci($n) {
    if ($n <= 1) {
        return $n;
    }
    return fibonacci($n - 1) + fibonacci($n - 2);
}

$num = 10;
echo "Fibonacci of $num is " . fibonacci($num) . "\n";
?>
```

PHP requires the dollar sign ($) before variable names, and functions are defined with the function keyword. The recursive structure is identical to other languages.

## Implementation in Go

Go (Golang) is known for its simplicity and performance. Here's the recursive Fibonacci:

```go
package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    num := 10
    fmt.Printf("Fibonacci of %d is %d\n", num, fibonacci(num))
}
```

Go uses explicit type declarations (int) and the := operator for variable initialization. The package and import statements are required for Go programs.

## Implementation in Ruby

Ruby is elegant and expressive, perfect for recursive functions. Here's the Fibonacci code:

```ruby
def fibonacci(n)
    if n <= 1
        return n
    end
    return fibonacci(n - 1) + fibonacci(n - 2)
end

num = 10
puts "Fibonacci of #{num} is #{fibonacci(num)}"
```

Ruby uses end to close function definitions and if statements. The #{} syntax allows string interpolation, making output statements cleaner.

## Understanding the Performance Trade-off

While recursion is elegant, it's not the most efficient approach for Fibonacci numbers. The recursive solution has exponential time complexity O(2^n) because it recalculates the same values multiple times. For example, calculating F(5) requires calculating F(4) and F(3), but F(4) also calculates F(3) again.

For larger numbers, you'll want to use dynamic programming or memoization to cache results. However, for learning recursion and understanding how it works, this implementation is perfect.

## Conclusion

Recursion is a powerful programming technique, and Fibonacci numbers provide an excellent example of how it works. We've explored implementations in C, C++, Java, Python, PHP, Go, and Ruby, and while the syntax differs, the core logic remains the same: define base cases and let the function call itself with smaller inputs.

Try running these examples in your preferred language, experiment with different input values, and see how recursion unfolds. Understanding recursion deeply will make you a better programmer, even if you don't always use it in production code.

<!-- bn -->

আপনি যদি কখনও ভেবে থাকেন কীভাবে রিকার্শন ব্যবহার করে ফিবোনাচি সংখ্যা বাস্তবায়ন করতে হয়, তাহলে আপনি সঠিক জায়গায় আছেন। এই ক্লাসিক প্রোগ্রামিং সমস্যাটি রিকার্সিভ ফাংশন বোঝার জন্য একটি নিখুঁত উপায়, এবং আমি আপনাকে দেখাব কীভাবে সাতটি জনপ্রিয় প্রোগ্রামিং ভাষায় এটি সমাধান করতে হয়: C, C++, Java, Python, PHP, Go এবং Ruby।

## ফিবোনাচি সংখ্যা কী?

ফিবোনাচি ক্রম হল এমন একটি সংখ্যার সিরিজ যেখানে প্রতিটি সংখ্যা তার আগের দুটি সংখ্যার যোগফল। এটি ০ এবং ১ দিয়ে শুরু হয়, তাই ক্রমটি হয়: ০, ১, ১, ২, ৩, ৫, ৮, ১৩, ২১, এবং এভাবে চলতে থাকে। এই প্যাটার্নটি প্রকৃতিতে সর্বত্র দেখা যায়, ফুলের পাপড়ি থেকে শুরু করে সর্পিল গ্যালাক্সি পর্যন্ত।

গাণিতিক সূত্রটি সহজ: F(n) = F(n-1) + F(n-2), বেস কেস F(0) = 0 এবং F(1) = 1 সহ। রিকার্শন এই সমস্যার জন্য একটি স্বাভাবিক ফিট কারণ প্রতিটি ফিবোনাচি সংখ্যা পূর্ববর্তী সংখ্যাগুলির উপর নির্ভর করে।

## C-তে বাস্তবায়ন

চলুন C দিয়ে শুরু করি, যা সবচেয়ে মৌলিক প্রোগ্রামিং ভাষাগুলির একটি। এখানে C-তে ফিবোনাচি রিকার্শন কীভাবে বাস্তবায়ন করবেন:

```c
#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int num = 10;
    printf("Fibonacci of %d is %d\n", num, fibonacci(num));
    return 0;
}
```

ফাংশনটি পরীক্ষা করে n যদি ০ বা ১ হয় (বেস কেস), তাহলে n রিটার্ন করে। অন্যথায়, এটি n-1 এবং n-2 দিয়ে নিজেকে রিকার্সিভভাবে কল করে এবং ফলাফল যোগ করে।

## C++-এ বাস্তবায়ন

C++ C-র মতোই কিন্তু অবজেক্ট-ওরিয়েন্টেড বৈশিষ্ট্য সহ। এখানে C++-এ রিকার্সিভ ফিবোনাচি:

```cpp
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int num = 10;
    cout << "Fibonacci of " << num << " is " << fibonacci(num) << endl;
    return 0;
}
```

লজিকটি C-র মতোই, কিন্তু আমরা printf-এর পরিবর্তে cout ব্যবহার করি আউটপুটের জন্য। রিকার্সিভ স্ট্রাকচার একই থাকে, যা এই ভাষাগুলির মধ্যে রূপান্তর সহজ করে তোলে।

![ফিবোনাচি রিকার্শন ভিজুয়ালাইজেশন](/images/blog/fibonacci-recursion-guide-1.jpg)

## Java-তে বাস্তবায়ন

Java শক্তিশালী টাইপিং এবং অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং নিয়ে আসে। এখানে ফিবোনাচি বাস্তবায়ন:

```java
public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        int num = 10;
        System.out.println("Fibonacci of " + num + " is " + fibonacci(num));
    }
}
```

Java-তে, আমরা ফাংশনটিকে static হিসেবে ডিফাইন করি যাতে এটি main মেথড থেকে ইনস্ট্যান্স তৈরি না করে কল করা যায়। রিকার্সিভ লজিক সব ভাষায় সামঞ্জস্যপূর্ণ থাকে।

## Python-এ বাস্তবায়ন

Python-এর পরিষ্কার সিনট্যাক্স রিকার্সিভ ফাংশনগুলিকে অবিশ্বাস্যভাবে পাঠযোগ্য করে তোলে। এখানে ফিবোনাচি বাস্তবায়ন:

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

num = 10
print(f"Fibonacci of {num} is {fibonacci(num)}")
```

Python-এ সেমিকোলন বা কার্লি ব্রেসের প্রয়োজন নেই, যা কোডকে আরও পরিষ্কার দেখায়। ফাংশন ডেফিনিশনে def ব্যবহার করা হয় এবং বাকিটা একই রিকার্সিভ প্যাটার্ন অনুসরণ করে।

## PHP-তে বাস্তবায়ন

PHP ওয়েব ডেভেলপমেন্টের জন্য ব্যাপকভাবে ব্যবহৃত হয়, এবং এটি রিকার্শনও ভালোভাবে পরিচালনা করে। এখানে কীভাবে:

```php
<?php
function fibonacci($n) {
    if ($n <= 1) {
        return $n;
    }
    return fibonacci($n - 1) + fibonacci($n - 2);
}

$num = 10;
echo "Fibonacci of $num is " . fibonacci($num) . "\n";
?>
```

PHP-তে ভেরিয়েবল নামের আগে ডলার চিহ্ন ($) প্রয়োজন, এবং ফাংশন function কীওয়ার্ড দিয়ে ডিফাইন করা হয়। রিকার্সিভ স্ট্রাকচার অন্য ভাষার মতোই।

## Go-তে বাস্তবায়ন

Go (Golang) তার সরলতা এবং পারফরম্যান্সের জন্য পরিচিত। এখানে রিকার্সিভ ফিবোনাচি:

```go
package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    num := 10
    fmt.Printf("Fibonacci of %d is %d\n", num, fibonacci(num))
}
```

Go স্পষ্ট টাইপ ডিক্লেয়ারেশন (int) এবং := অপারেটর ব্যবহার করে ভেরিয়েবল ইনিশিয়ালাইজেশনের জন্য। package এবং import স্টেটমেন্ট Go প্রোগ্রামের জন্য প্রয়োজনীয়।

## Ruby-তে বাস্তবায়ন

Ruby মার্জিত এবং প্রকাশক, রিকার্সিভ ফাংশনের জন্য নিখুঁত। এখানে ফিবোনাচি কোড:

```ruby
def fibonacci(n)
    if n <= 1
        return n
    end
    return fibonacci(n - 1) + fibonacci(n - 2)
end

num = 10
puts "Fibonacci of #{num} is #{fibonacci(num)}"
```

Ruby ফাংশন ডেফিনিশন এবং if স্টেটমেন্ট বন্ধ করতে end ব্যবহার করে। #{} সিনট্যাক্স স্ট্রিং ইন্টারপোলেশন অনুমতি দেয়, যা আউটপুট স্টেটমেন্ট পরিষ্কার করে।

## পারফরম্যান্স ট্রেড-অফ বোঝা

যদিও রিকার্শন মার্জিত, এটি ফিবোনাচি সংখ্যার জন্য সবচেয়ে দক্ষ পদ্ধতি নয়। রিকার্সিভ সমাধানের এক্সপোনেনশিয়াল টাইম কমপ্লেক্সিটি O(2^n) আছে কারণ এটি একই মান বারবার পুনরায় গণনা করে। উদাহরণস্বরূপ, F(5) গণনা করতে F(4) এবং F(3) গণনা করতে হয়, কিন্তু F(4) আবার F(3) গণনা করে।

বড় সংখ্যার জন্য, আপনি ফলাফল ক্যাশ করতে ডায়নামিক প্রোগ্রামিং বা মেমোইজেশন ব্যবহার করতে চাইবেন। তবে, রিকার্শন শেখার এবং এটি কীভাবে কাজ করে তা বোঝার জন্য, এই বাস্তবায়নটি নিখুঁত।

## উপসংহার

রিকার্শন একটি শক্তিশালী প্রোগ্রামিং কৌশল, এবং ফিবোনাচি সংখ্যা এটি কীভাবে কাজ করে তার একটি চমৎকার উদাহরণ প্রদান করে। আমরা C, C++, Java, Python, PHP, Go এবং Ruby-তে বাস্তবায়ন অন্বেষণ করেছি, এবং যদিও সিনট্যাক্স ভিন্ন, মূল লজিক একই থাকে: বেস কেস ডিফাইন করুন এবং ফাংশনটিকে ছোট ইনপুট দিয়ে নিজেকে কল করতে দিন।

আপনার পছন্দের ভাষায় এই উদাহরণগুলি চালানোর চেষ্টা করুন, বিভিন্ন ইনপুট মান নিয়ে পরীক্ষা করুন এবং দেখুন কীভাবে রিকার্শন উন্মোচিত হয়। রিকার্শন গভীরভাবে বোঝা আপনাকে একজন ভালো প্রোগ্রামার বানাবে, এমনকি আপনি সবসময় প্রোডাকশন কোডে এটি ব্যবহার না করলেও।
