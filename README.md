# RC-FINDER 手機 GPS 定位網頁

Android Chrome / iPhone Safari 通用的 HTTPS 手機定位頁。取得 GPS 需使用者授權。

## GitHub Pages 部署
1. 開啟儲存庫 Settings → Pages。
2. Build and deployment 選擇 Deploy from a branch。
3. 選擇 main 與 /(root)，按 Save。
4. 等待部署完成後，開啟 https://isaymore-rgb.github.io/isaymore/ 。
5. 按「取得一次目前位置」或「啟動 GPS 持續定位」，允許手機定位。

## 功能
- 緯度、經度、定位精度和時間
- 前景 GPS 持續定位與單次定位
- Google Maps 開啟目前位置
- 複製經緯度

## 重要限制
- GPS 僅在手機本地顯示；**目前沒有 MQTT，亦不會將座標上傳至 ESP32-C3**。
- 定位仍需使用者授權；背景或鎖屏可能停止更新。
- 連接無網際網路的 RC-FINDER Wi-Fi 時，GitHub Pages 可能無法載入。
- 不建議將即時私人 GPS 發布到公開、無認證 MQTT Broker。
