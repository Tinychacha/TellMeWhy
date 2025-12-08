/* ========================================
   TELL ME WHY - マツエの携帯
   Main Entry Point
   ======================================== */

import { PhoneController } from './phone.js';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const phone = new PhoneController();
    phone.init();

    // 更新状态栏时间
    updateStatusTime();
    setInterval(updateStatusTime, 1000);
});

// 状态栏时间更新
function updateStatusTime() {
    const timeEl = document.getElementById('status-time');
    if (timeEl) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeEl.textContent = `${hours}:${minutes}`;
    }
}
