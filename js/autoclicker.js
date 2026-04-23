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
            // Вводные фразы
            'В данной работе рассматривается ',
            'Актуальность темы обусловлена ',
            'Следует отметить, что ',
            'Необходимо подчеркнуть, что ',
            'Важно понимать, что ',
            'Как показывает практика, ',
            'По мнению экспертов, ',
            'Согласно статистике, ',
            'Вопреки распространённому мнению, ',
            'Принимая во внимание вышесказанное, ',
            
            // Научные штампы
            'Таким образом, можно сделать вывод о том, что ',
            'В ходе исследования было выявлено, что ',
            'Анализируя полученные данные, можно утверждать, что ',
            'Результаты исследования показывают, что ',
            'Сравнительный анализ демонстрирует, что ',
            'Практическая значимость работы заключается в том, что ',
            'Теоретическая основа исследования базируется на ',
            'Данная гипотеза подтверждается многочисленными ',
            'Научная новизна заключается в ',
            'Эмпирическая база исследования включает ',
            
            // Структура диплома
            'Глава 1 посвящена теоретическим аспектам ',
            'Глава 2 раскрывает практическую часть ',
            'Глава 3 содержит анализ и рекомендации по ',
            'В заключении хотелось бы отметить, что ',
            'В приложении представлены графики, таблицы и ',
            'Список литературы включает источники по ',
            
            // Объект и предмет
            'Объектом исследования является ',
            'Предмет исследования представляет собой ',
            'Цель данной работы состоит в ',
            'Для достижения цели необходимо решить следующие задачи: ',
            'Положения, выносимые на защиту: ',
            'Методология исследования основана на ',
            'Структура работы обусловлена логикой ',
            
            // Смешные и жизненные
            'Хочется верить, что научный руководитель поверит в ',
            'Особую благодарность хочется выразить кофе и ',
            'Ключевые слова: диплом, дедлайн, паника, кофе, ',
            'Данная проблема требует дальнейшего изучения, но не сегодня ',
            'Можно предположить, что после дедлайна будет легче, но ',
            'На защите хотелось бы сказать, что ',
            'Если научрук спросит про этот абзац, я скажу что ',
            'К сожалению, объём работы не позволяет раскрыть ',
            'В рамках данной работы невозможно охватить ',
            'Тема раскрыта недостаточно полно ввиду ',
            
            // Вода
            'Безусловно, данная тема является крайне актуальной в современных условиях ',
            'Не вызывает сомнений тот факт, что ',
            'Общеизвестно, что ',
            'Многие учёные сходятся во мнении, что ',
            'Трудно переоценить значение ',
            'На сегодняшний день проблема стоит особенно остро ',
            'В эпоху цифровизации и глобализации ',
            'Современные реалии диктуют необходимость ',
            'В условиях нестабильной экономической ситуации ',
            'Учитывая современные тенденции развития ',
        ];
        
        this.smartWords = [
            'безусловно', 'очевидно', 'вероятно', 'несомненно',
            'целесообразно', 'правомерно', 'закономерно', 'существенно',
            'принципиально', 'фундаментально', 'методологически',
            'гипотетически', 'эмпирически', 'теоретически',
            'парадигма', 'концепция', 'методология', 'систематизация',
            'оптимизация', 'модернизация', 'трансформация', 'интеграция',
            'дифференциация', 'верификация', 'валидация', 'апробация',
            'экстраполяция', 'интерполяция', 'корреляция', 'детерминация',
            'идентификация', 'классификация', 'структуризация', 'алгоритмизация',
            'автоматизация', 'роботизация', 'цифровизация', 'глобализация',
            'стандартизация', 'унификация', 'гармонизация', 'синхронизация',
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
            'Смотрю лекции на 2x скорости...',
            'Завидую тем, кто уже сдал...',
            'Считаю сколько страниц осталось...',
            'Придумываю отмазки для научрука...',
            'Листаю мемы про диплом...',
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
        
        // 20% шанс удаления текста
        if (Math.random() < 0.2 && this.currentText.length > 0) {
            this.deleteText();
        } else {
            this.addText();
        }
        
        this.updateStats();
        document.getElementById('totalClicks').textContent = this.totalClicks;
    }
    
    addText() {
        let word = '';
        
        // 30% шанс вставить "умное" слово
        if (Math.random() < 0.3) {
            word = this.smartWords[Math.floor(Math.random() * this.smartWords.length)];
        } else {
            // Берём случайную фразу и случайное слово из неё
            const phrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
            const words = phrase.split(' ');
            word = words[Math.floor(Math.random() * words.length)];
        }
        
        // Определяем знаки препинания
        let punctuation = '';
        
        // 5% шанс добавить точку
        if (Math.random() < 0.05 && word.length > 3) {
            punctuation = '.';
        }
        // 15% шанс добавить запятую (если нет точки)
        else if (Math.random() < 0.15) {
            punctuation = ',';
        }
        
        // Проверяем, нужно ли начинать новый абзац
        let isNewParagraph = false;
        
        // Если это самое первое слово
        if (this.currentText.length === 0) {
            isNewParagraph = true;
        }
        // Если предыдущий текст заканчивается на \n\n (уже есть новый абзац)
        else if (this.currentText.endsWith('\n\n')) {
            isNewParagraph = true;
        }
        // 5% шанс начать новый абзац (если текста уже накопилось)
        else if (Math.random() < 0.05 && this.currentText.length > 100) {
            // Завершаем предыдущий абзац
            this.currentText = this.currentText.trimEnd();
            // Если нет точки в конце, добавляем
            if (!this.currentText.endsWith('.')) {
                this.currentText += '.';
            }
            this.currentText += '\n\n';
            isNewParagraph = true;
            document.getElementById('currentAction').textContent = 'Начинаю новый абзац...';
        }
        
        if (isNewParagraph) {
            // Красная строка (4 пробела) + слово с большой буквы
            word = word.charAt(0).toUpperCase() + word.slice(1);
            this.currentText += '    ' + word + punctuation + ' ';
        } else {
            // Обычное добавление слова
            this.currentText += word + punctuation + ' ';
        }
        
        if (!isNewParagraph) {
            document.getElementById('currentAction').textContent = this.getRandomAction();
        }
        
        this.charCount = this.currentText.length;
        document.getElementById('textContent').textContent = this.currentText;
        
        // Автоскролл
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