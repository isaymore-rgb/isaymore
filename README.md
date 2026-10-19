# RC-FINDER 手機 GPS 定位網頁（V4.0）

[開啟 HTTPS GPS 網頁](https://isaymore-rgb.github.io/isaymore/)

Android Chrome 和 iPhone Safari 均可在使用者同意後由 GitHub Pages HTTPS 網頁取得手機 GPS 座標、精度與時間。

## V4.0：一鍵傳給完全離線的 RC-FINDER 地面站

1. 手機用行動數據載入本網站，允許 GPS 定位。
2. 接入地面站的 Wi-Fi `RC-FINDER`；地面站本身不需要上網。
3. 在地面站 `http://192.168.4.1` 按 START，確認飛機直達訊號。
4. 切回本 HTTPS 網頁，按「**重新定位並傳送到 RC-FINDER**」。
5. 網頁會重新取得一次 GPS，並嘗試整頁導覽到 `http://192.168.4.1/gps/update?lat=...&lon=...&acc=...&src=github`。
6. 地面站收到座標後會顯示確認頁，按「返回 RC-FINDER 尋機網頁」。

**重要**：必須燒錄 V4.0 地面站程式，舊版路由不會回傳此確認頁。手機必須同時能透過行動數據開啟 HTTPS 網頁並透過 RC-FINDER Wi-Fi 連接本地 HTTP IP。Android/iPhone 實際分流可能因裝置設定而異，請分別實測。

## 技術說明

- 使用頂層瀏覽器導覽，不是跨網域 `fetch`；不需要 CORS、MQTT、HTTPS ESP32 伺服器或 Chrome flags。
- 純網頁按鈕每次只傳送一筆 GPS，**不提供背景自動上傳**。
- 地面站只將當時新鮮的「飛機→地面」RSSI 與 GPS 配對，精度太差的 GPS 不進入最強位置紀錄。
- 若手機顯示 GPS 精度大於 ±50m，地面站會收取座標，但不會把它用於最強 RSSI 定位紀錄。
- 公網 GitHub Pages 不能直接讀取三端 ESP32 資料；地面站需要有可用的本地 Wi-Fi 連線。
- 此網址使用 HTTP GET 帶入 GPS，瀏覽器歷史紀錄可能保留座標；不要分享含座標的完整 URL。
- Wi-Fi RC-FINDER 是開放 AP，沒有 GPS 上傳 PIN；任何能連入 AP 的設備都可能提交座標。此方案不提供發送者真實身分驗證。
- 網頁可以一鍵用 Google Maps 開啟手機自身位置；地面站另有最強 GPS 配對點的 Google Maps 按鈕。

## GitHub Pages 發布

前往 Repository Settings → Pages → Deploy from branch → `main` → `/(root)`。

此專案網頁位置：https://isaymore-rgb.github.io/isaymore/
