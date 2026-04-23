class DiplomaAutoclicker {
    constructor() {
        this.isRunning = false;
        this.mode = 'normal';
        this.charCount = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.currentText = '';
        this.totalClicks = 0;
        
        this.phrases = [
            'В данной работе рассматривается ',
            'Актуальность темы обусловлена ',
            'Следует отметить, что ',
            'Таким образом, можно сделать вывод ',
            'В ходе исследования было выявлено ',
            'Необходимо подчеркнуть важность ',
            'Анализируя полученные данные ',
            'Результаты исследования показывают ',
            'Сравнительный анализ демонстрирует ',
            'Практическая значимость работы ',
            'Теоретическая основа исследования ',
            'Хочется верить, что научрук поверит ',
            'Согласно последним исследованиям ',
            'Вопреки распространённому мнению ',
            'Данная гипотеза подтверждается ',
            'Ключевые слова: диплом, дедлайн, кофе ',
            'Список литературы включает ',
            'Объектом исследования является ',
            'Предмет исследования — ',
            'Методология основана на ',
            'Глава 1. Теоретическая часть. ',
            'Глава 2. Практическая часть. ',
            'В заключении хотелось бы отметить ',
            'Особую благодарность выражаю ',
            'Степень разработанности проблемы ',
            'Научная новизна заключается в ',
            'Положения, выносимые на защиту: ',
            'Структура работы обусловлена ',
            'Эмпирическая база исследования ',
            'В приложении представлены ',
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
    }
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.startTimer();
        this.updateStatus();
    }
    
    stop() {
        this.isRunning = false;
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
    
    addWordManually() {
        if (!this.isRunning) return;
        
        this.totalClicks++;
        
        if (Math.random() < 0.2 && this.currentText.length > 0) {
            this.deleteText();
        } else {
            this.addText();
        }
        
        this.updateStats();
        document.getElementById('totalClicks').textContent = this.totalClicks;
    }
    
    addText() {
        const phrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        const words = phrase.split(' ');
        const word = words[Math.floor(Math.random() * words.length)];
        
        this.currentText += word + ' ';
        this.charCount += word.length + 1;
        
        document.getElementById('textContent').textContent = this.currentText;
        document.getElementById('currentAction').textContent = this.getRandomAction();
        
        const editor = document.getElementById('editor');
        editor.scrollTop = editor.scrollHeight;
    }
    
    deleteText() {
        if (this.currentText.length > 0) {
            const lastSpace = this.currentText.trimEnd().lastIndexOf(' ');
            if (lastSpace > 0) {
                this.currentText = this.currentText.substring(0, lastSpace + 1);
            } else {
                this.currentText = '';
            }
            this.charCount = this.currentText.length;
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
        document.getElementById('currentAction').textContent = this.isRunning ? 'Жду кликов...' : 'Остановлено';
    }
    
    reset() {
        this.stop();
        this.currentText = '';
        this.charCount = 0;
        this.timer = 0;
        this.totalClicks = 0;
        this.updateStats();
        document.getElementById('textContent').textContent = '';
        document.getElementById('timer').textContent = '00:00';
        document.getElementById('progress').textContent = '0% готовности';
        document.getElementById('totalClicks').textContent = '0';
    }
    
    getState() {
        return {
            text: this.currentText,
            charCount: this.charCount,
            timer: this.timer,
            mode: this.mode,
            totalClicks: this.totalClicks,
        };
    }
    
    loadState(state) {
        this.currentText = state.text || '';
        this.charCount = state.charCount || 0;
        this.timer = state.timer || 0;
        this.mode = state.mode || 'normal';
        this.totalClicks = state.totalClicks || 0;
        
        document.getElementById('textContent').textContent = this.currentText;
        document.getElementById('timer').textContent = this.formatTime(this.timer);
        document.getElementById('totalClicks').textContent = this.totalClicks;
        this.updateStats();
        this.updateProgress();
    }
}