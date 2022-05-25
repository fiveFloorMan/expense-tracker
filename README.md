# expense-tracker

## What is this?
一個家庭花費紀錄，可以在這裡記錄生活上的花費，並且支援多個家庭成員。

![index](https://upload.cc/i1/2022/05/25/piJIX3.png)

## 功能
* 註冊帳號
* 登入後可以在首頁一次瀏覽所有支出
* 在首頁看見支出的總金額
* 新增、編輯或是刪除支出項目
* 根據類別在篩選支出

## 環境設置
1. 安裝node.js & npm 
2. 將專案clone到local

    ```
    https://github.com/fiveFloorMan/expense-tracker.git
    ```
3. 安裝相關套件
    ```
    npm install
    ```
4. 安裝完畢, 輸入以下指令, 運行專案
    ```
    npm run dev
    ```
5. 出現以下網址代表運行順利
    ```
    Running on localhost:3000
    ```
6. 建立種子資料
    ```
    npm run seed
    ```
    種子資料的帳密是
    ```
    Name: tester1, Password: 01
    ```
## 開發工具
* @handlebars/allow-prototype-access 1.0.5 
* connect-flash 0.1.1
* dotenv 8.2.0
* express 4.18.1
* express-handlebars 4.0.6
* express-session 1.17.1
* handlebars 4.5.3
* method-override 3.0.0
* mongoose 5.13.4
* passport 0.4.1
* passport-local 1.0.0
