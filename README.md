# RC-FINDER V4.0 手機 GPS — 離線 PWA

線上網站：https://isaymore-rgb.github.io/isaymore/

已升級為 **離線可啟動的 PWA**，保留：
- HTTPS 定位 / GPS 精度與時間顯示
- GPS 持續定位及單次定位（需使用者授權；背景、鎖屏不保證執行）
- 「重新定位並傳送到 RC-FINDER」整頁跳轉至 `http://192.168.4.1/gps/update`
- 複製座標及 Google Maps 開啟功能（地圖需要手機上網）
- 三塊 ESP32-C3 維持**完全不使用網際網路**

## 首次安裝：必須在線上

**Android Chrome**
1. 手機先不要連 RC-FINDER 無網際網路的 Wi-Fi，以 4G／5G 開啟網站。
2. 等待頁面顯示「✓ 離線網頁已快取完成」。
3. 按「安裝到手機主畫面」。若未跳出系統安裝視窗，使用 Chrome 選單的「安裝應用程式／加入主畫面」。
4. 從主畫面點開 RC-FINDER GPS，確認可取得手機 GPS（需允許定位）。

**iPhone Safari**
1. 使用 Safari、4G／5G 開啟網站，等待「✓ 離線網頁已快取完成」。
2. 點 Safari 的「分享」→「加入主畫面」（若有「作為網頁 App 開啟」請啟用）。
3. 從主畫面打開圖示，允許 GPS 定位。

## 真正離線使用與現場驗收

1. 首先完成一次 **在線上安裝與離線快取**，不能只在 Wi-Fi 登入視窗看過網頁。
2. 手機改連 `RC-FINDER` Wi-Fi，確認 `http://192.168.4.1` 可連上地面站。
3. 即使 GitHub 網站連不上，仍應可由 **手機主畫面圖示**啟動已安裝的 PWA。
4. 點「取得一次目前位置」，等待衛星定位。定位本身不依賴 GitHub；手機系統仍可能使用輔助網路定位。
5. 點「重新定位並傳送到 RC-FINDER」，PWA 使用 HTTP 頂層頁面跳轉將 `lat`、`lon`、`acc`、`fix_age_ms` 傳到地面站。
6. 在地面站 GPS 確認頁確認資料，再回尋機頁檢查「最強有定位直達 RSSI」。若精度超過 ±50m，地面站可能接受座標但不配對最強 RSSI。

## 限制與注意事項
- PWA 解決 **離線載入定位頁**，但不能強制 Android / iOS 在所有機型都回傳 GPS，也不能保證背景持續定位。
- 網站必須在「有網路」時完成一次 Service Worker 安裝；各平台首次離線可用性應以實測為準。
- PWA 不會讓三塊 ESP32 自行上網；手機須連 RC-FINDER Wi-Fi 才可開啟 `192.168.4.1`。
- 不必同時依賴 5G 和 Wi-Fi；GitHub 頁面已安裝快取後，可離線運作。
- GitHub Pages PWA 不使用 MQTT、CORS 轉發或 Chrome Flags，也不會在雲端儲存個人 GPS。
- GPS 傳送 URL 含經緯度，可能留在瀏覽器歷史紀錄；請勿分享該 URL。
- 開放 AP 且不使用 PIN，GPS HTTP 端點沒有發送者身分驗證，附近連接者可能提交假座標。
- Google Maps 必須可用網際網路方能載入圖資。
- 如果需要讓手機自動且持續回傳 GPS，需要原生 App；此版仍採「按一次才傳一次」。

## 開發檔案
- `index.html`：HTTPS GPS 網頁、PWA 安裝介面、HTTP 頂層跳轉
- `manifest.webmanifest`：安裝資訊、圖示與範圍
- `sw.js`：離線 App Shell 的版本化快取
- `icons/icon-192.png` 及 `icons/icon-512.png`：PWA 圖示

更新快取：下次有網路時開啟網站，瀏覽器檢查新的 Service Worker 版本；新版本可用後重新載入。請勿在離線時直接清除網站資料，否則會失去快取。
