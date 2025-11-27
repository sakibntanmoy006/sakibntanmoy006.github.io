---
layout: post
title: "Call by Value and Call by Reference in C Programming Language"
date: 2025-11-27
tags: [c programming, pointers, functions, beginners guide]
---

Understanding how data is passed to functions is one of the most important concepts in C programming. When you work with functions, you often need to control whether the original data changes or stays the same. This is where call by value and call by reference come in. Knowing the difference makes your code safer, more predictable, and easier to debug.

## What is Call by Value

In call by value, C sends a copy of the actual variable into the function. The original variable stays unchanged no matter what you do inside the function. Many new programmers find this helpful because it prevents accidental changes. However, it also means that if you want a function to modify real data, call by value will not work.

## How Call by Value Works

When you pass an integer into a function, C creates a new memory location that stores the same value. Any change inside the function affects only that copy. For example, if you try to update a number inside a function, the main variable will remain the same. This is why call by value is often used for safety.

## What is Call by Reference

Call by reference is used when you want a function to modify the original variable. C does not directly support call by reference like some other languages. Instead, you must use pointers. By passing the address of a variable, you allow the function to access and change the real value stored in memory.

## How Call by Reference Works

When you pass a pointer, the function receives the memory address of the variable. So any change made through the pointer affects the actual variable. This is useful when you want to update multiple values from a single function or return more than one result.

![Call by value vs call by reference](/blog/images/c-call-by-value-reference-1.jpg)

## Conclusion

Call by value and call by reference are simple ideas, but they shape how your program behaves. Call by value protects your original data by using copies. Call by reference gives you more control by allowing direct changes. Once you understand both, you can choose the right method depending on the needs of your program.

<!-- bn -->

ফাংশনে ডেটা কীভাবে পাঠানো হয়, সেটি C প্রোগ্রামিংয়ের একটি খুব গুরুত্বপূর্ণ অংশ। যখন আপনি ফাংশন ব্যবহার করেন, তখন অনেক সময় ঠিক করতে হয় আসল ভেরিয়েবলটি পরিবর্তন হবে কিনা। এই বিষয়টি বুঝতেই call by value এবং call by reference ব্যবহার করা হয়। এগুলো ঠিকভাবে জানলে কোড কম ভুল করে, আরও সহজে বোঝা যায়।

## Call by Value কী

Call by value হল এমন একটি পদ্ধতি যেখানে ভেরিয়েবলের একটি কপি ফাংশনে পাঠানো হয়। মূল ভেরিয়েবল অপরিবর্তিত থাকে, যতই ফাংশনের ভিতরে পরিবর্তন করুন না কেন। নতুন প্রোগ্রামারদের জন্য এটি নিরাপদ, কারণ ভুল করে ডেটা নষ্ট হওয়ার সম্ভাবনা থাকে না। তবে, যদি আপনি চান ফাংশন আসল ডেটা পরিবর্তন করুক, তাহলে call by value কাজ করবে না।

## Call by Value কীভাবে কাজ করে

আপনি যখন একটি ইন্টিজার ফাংশনে পাঠান, C তার একটি আলাদা কপি তৈরি করে। ফাংশনের ভিতরে যত পরিবর্তন করবেন, তা শুধু কপিতে হবে। মূল ভেরিয়েবল একই থাকে। তাই সাধারণ কাজের জন্য বা ডেটা নিরাপদ রাখতে এটি ব্যবহার করা হয়।

## Call by Reference কী

Call by reference ব্যবহার করা হয় যখন আপনি চান ফাংশন আসল ভেরিয়েবলটি পরিবর্তন করুক। C ভাষায় সরাসরি call by reference নেই, কিন্তু পয়েন্টারের মাধ্যমে এটি করা যায়। আপনি ভেরিয়েবলের ঠিকানা পাঠালে ফাংশন সরাসরি সেই মেমরির মান পরিবর্তন করতে পারে।

## Call by Reference কীভাবে কাজ করে

পয়েন্টার পাঠানোর সময় ফাংশন ভেরিয়েবলের অ্যাড্রেস পায়। তাই পয়েন্টারের মাধ্যমে যত পরিবর্তন করবেন, তা আসল ভেরিয়েবলেই প্রভাব ফেলবে। এটি বিশেষভাবে দরকার হয় যখন আপনি একটি ফাংশন থেকে একাধিক মান পরিবর্তন করতে চান।

![Call by value vs call by reference](/blog/images/c-call-by-value-reference-1.jpg)

## উপসংহার

Call by value এবং call by reference খুব সাধারণ ধারণা মনে হলেও প্রোগ্রামের আচরণকে অনেক প্রভাবিত করে। Call by value ডেটা নিরাপদ রাখে কপি ব্যবহার করে, আর call by reference আপনাকে আরও নিয়ন্ত্রণ দেয় আসল ডেটা পরিবর্তন করার। কোন ক্ষেত্রে কোনটি ব্যবহার করবেন, সেটি বুঝে নিতে পারলে প্রোগ্রামিং আরও সহজ হয়ে যায়।
