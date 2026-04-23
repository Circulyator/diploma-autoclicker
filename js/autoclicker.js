class DiplomaAutoclicker {
    constructor() {
        this.isRunning = false;
        this.mode = 'normal';
        this.charCount = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.typeInterval = null;
        this.currentText = '';
        
        this.phrases = [
            'В данной работе рассматривается... ',
            'Актуальность темы обусловлена... ',
            'Следует отметить, что... ',
            'Таким образом, можно сделать вывод... ',
            'В ходе исследования было выявлено... ',
            'Необходимо подчеркнуть важность... ',
            'Анализируя полученные данные... ',
            'Результаты исследования показывают... ',
            'Сравнительный анализ демонстрирует... ',
            'Практическая значимость работы... ',
            'Теоретическая основа исследования... ',
            'Хочется верить, что научрук поверит... ',
            'Согласно последним исследованиям... ',
            'Вопреки распространённому мнению... ',
            'Данная гипотеза подтверждается... ',
        ];
        
        this.actions = [
            'Печатаю...',
            'Думаю...',
            'Исправляю ошибки...',
            'Пью кофе ☕',
            'Смотрю в окно 🤔',
            'Форматирую текст...',
            'Ищу источники...',
            'Паникую...',
            'Звоню научруку...',
            'Гуглю "как написать диплом за ночь"',
        ];
        
        this.speeds = {
            slow: { min: 300, max: 800, deleteChance: 0.1 },
            normal: { min: 100, max: 300, deleteChance: 0.2 },
            panic: { min: 20, max: 80, deleteChance: 0.4 },
        };
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.startTimer();
        this.typeText();
        this.updateStatus();
    }
    
    stop() {
        this.isRunning = false;
        clearTimeout(this.typeInterval);
        clearInterval(this.timerInterval);
        this.updateStatus();
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            document.getElementById('timer').textContent = this.formatTime(this.timer);
            this.updateProgress();
        }, 1000);
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    typeText() {
        if (!this.isRunning) return;
        
        const speed = this.speeds[this.mode];
        const delay = Math.random() * (speed.max - speed.min) + speed.min;
        
        this.typeInterval = setTimeout(() => {
            if (Math.random() < speed.deleteChance) {
                this.deleteText();
            } else {
                this.addText();
            }
            
            this.updateStats();
            this.typeText();
        }, delay);
    }
    
    addText() {
        const phrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        const words = phrase.split(' ');
        const word = words[Math.floor(Math.random() * words.length)];
        
        this.currentText += word + ' ';
        this.charCount += word.length + 1;
        
        document.getElementById('textContent').textContent = this.currentText;
        document.getElementById('currentAction').textContent = this.getRandomAction();
        
        // Автоскролл
        const editor = document.getElementById('editor');
        editor.scrollTop = editor.scrollHeight;
    }
    
    deleteText() {
        if (this.currentText.length > 0) {
            this.currentText = this.currentText.slice(0, -1);
            this.charCount = Math.max(0, this.charCount - 1);
            document.getElementById('textContent').textContent = this.currentText;
            document.getElementById('currentAction').textContent = 'Исправляю ошибки...';
        }
    }
    
    getRandomAction() {
        return this.actions[Math.floor(Math.random() * this.actions.length)];
    }
    
    updateStats() {
        document.getElementById('charCount').textContent = this.charCount;
        document.getElementById('pageCount').textContent = Math.floor(this.charCount / 2500);
    }
    
    updateProgress() {
        const progress = Math.min(100, Math.floor((this.timer / 3600) * 100));
        document.getElementById('progress').textContent = `${progress}% готовности`;
    }
    
    updateStatus() {
        document.getElementById('currentAction').textContent = this.isRunning ? this.getRandomAction() : 'Остановлено';
    }
    
    reset() {
        this.stop();
        this.currentText = '';
        this.charCount = 0;
        this.timer = 0;
        this.updateStats();
        document.getElementById('textContent').textContent = '';
        document.getElementById('timer').textContent = '00:00';
        document.getElementById('progress').textContent = '0% готовности';
    }
    
    getState() {
        return {
            text: this.currentText,
            charCount: this.charCount,
            timer: this.timer,
            mode: this.mode,
        };
    }
    
    loadState(state) {
        this.currentText = state.text || '';
        this.charCount = state.charCount || 0;
        this.timer = state.timer || 0;
        this.mode = state.mode || 'normal';
        
        document.getElementById('textContent').textContent = this.currentText;
        document.getElementById('timer').textContent = this.formatTime(this.timer);
        this.updateStats();
        this.updateProgress();
    }
}