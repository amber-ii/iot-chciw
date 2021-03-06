# IOT 電控網

## 功能
##### 物聯網 MQTT & Arduino
1. 訂閱(subscribe)、接收廠內各設備的溫度、壓力、噸數等即時資訊，以及修改、發布(publish)數值

2. 查詢廠內各設備數據歷史資料

3. Export excel

4. 即時資料、歷史資料曲線圖

5. 員工體溫異常，即時發Line Notify通知主管

## 技術
#### 前端
- JavaScript
- Tailwinds CSS
- jQuery

#### 後端
- Express.js (4.17.1)

#### 資料庫
- SQL Server(Arduino資料) (7.1.3)
- MongoDB(使用者資訊 && 設備斷線紀錄) (5.13.7)

### 使用流程
- Download ZIP->npm install
- 帳號:client
- 密碼:111
- 因公司機密資料，故無法提供報表/曲線圖的資料庫查詢(MSSQL)，但可以查詢Modbus斷線以及使用者登入紀錄(MongoDB)
- MQTT連線配置在公司內網，故無法讀取動態數據
