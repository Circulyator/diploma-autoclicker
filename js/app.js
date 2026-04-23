let autoclicker;

document.addEventListener('DOMContentLoaded', () => {
    autoclicker = new DiplomaAutoclicker();
    
    loadFromSupabase().then(state => {
        if (state) {
            autoclicker.loadState(state);
        }
    });
});

function toggleAutoclicker() {
    const btn = document.getElementById('btnToggle');
    
    if (autoclicker.isRunning) {
        autoclicker.stop();
        btn.textContent = '▶️ Запустить';
        btn.style.background = '#4ec9b0';
    } else {
        autoclicker.start();
        btn.textContent = '⏸️ Пауза';
        btn.style.background = '#ff6b6b';
    }
}

function setMode(mode) {
    const modes = ['slow', 'normal', 'panic'];
    modes.forEach(m => {
        const btn = document.getElementById(`btn-${m}`);
        btn.classList.remove('active');
    });
    
    document.getElementById(`btn-${mode}`).classList.add('active');
    autoclicker.mode = mode;
    
    const modeNames = { slow: '🐢 Режим черепахи', normal: '🏃 Нормальный режим', panic: '🔥 РЕЖИМ ПАНИКИ' };
    showNotification(modeNames[mode]);
}

async function saveProgress() {
    const state = autoclicker.getState();
    await saveToSupabase(state);
}

async function resetProgress() {
    if (confirm('Точно сбросить весь прогресс? Диплом будет безвозвратно утерян!')) {
        autoclicker.reset();
        await saveToSupabase({ text: '', charCount: 0, timer: 0, mode: 'normal' });
        showNotification('🔄 Прогресс сброшен. Начинаем заново!');
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Автосохранение каждые 30 секунд
setInterval(() => {
    if (autoclicker && autoclicker.isRunning) {
        saveProgress();
    }
}, 30000);