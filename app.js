/**
 * PREPE EDUCATIONAL PLATFORM - PERFECT CONTENT RENDERING
 * Enhanced path bar navigation and iframe-based content viewer
 */

// =============================================================================
// APPLICATION DATA
// =============================================================================

const examData = {
    ssc: {
        name: "SSC",
        icon: "📋",
        description: "Staff Selection Commission",
        color: "#3b82f6",
        examTypes: {
            cgl: {
                name: "Combined Graduate Level",
                subjects: {
                    mathematics: {
                        name: "Mathematics",
                        icon: "🔢",
                        chapters: [
                            "Number System", "Percentage", "Profit & Loss", "Simple Interest", 
                            "Compound Interest", "Ratio & Proportion", "Average", "Time & Work",
                            "Speed Distance Time", "Algebra", "Geometry", "Trigonometry", 
                            "Statistics", "Probability", "Mensuration"
                        ]
                    },
                    reasoning: {
                        name: "Reasoning",
                        icon: "🧠",
                        chapters: [
                            "Verbal Reasoning", "Non-Verbal Reasoning", "Logical Reasoning",
                            "Analytical Reasoning", "Number Series", "Letter Series",
                            "Coding-Decoding", "Blood Relations", "Direction & Distance",
                            "Seating Arrangement", "Puzzles", "Statement & Assumptions"
                        ]
                    },
                    english: {
                        name: "English",
                        icon: "📖",
                        chapters: [
                            "Grammar Basics", "Vocabulary", "Reading Comprehension",
                            "Sentence Correction", "Fill in the Blanks", "Synonyms & Antonyms", 
                            "Idioms & Phrases", "One Word Substitution", "Error Detection", "Para Jumbles"
                        ]
                    },
                    gk: {
                        name: "General Knowledge",
                        icon: "🌍",
                        chapters: [
                            "Indian History", "Geography", "Polity", "Economics", "Science & Technology",
                            "Current Affairs", "Sports", "Awards & Honours", "Books & Authors",
                            "Important Days", "Indian Culture", "Environment", "Computer Awareness",
                            "Banking Awareness", "Static GK"
                        ]
                    }
                }
            },
            chsl: {
                name: "Combined Higher Secondary Level",
                subjects: {
                    mathematics: { name: "Mathematics", icon: "🔢", chapters: 8 },
                    reasoning: { name: "Reasoning", icon: "🧠", chapters: 6 },
                    english: { name: "English", icon: "📖", chapters: 6 },
                    gk: { name: "General Knowledge", icon: "🌍", chapters: 8 }
                }
            },
            mts: {
                name: "Multi Tasking Staff",
                subjects: {
                    mathematics: { name: "Mathematics", icon: "🔢", chapters: 5 },
                    reasoning: { name: "Reasoning", icon: "🧠", chapters: 4 },
                    english: { name: "English", icon: "📖", chapters: 4 },
                    gk: { name: "General Knowledge", icon: "🌍", chapters: 5 }
                }
            },
            gd: {
                name: "Group D",
                subjects: {
                    mathematics: { name: "Mathematics", icon: "🔢", chapters: 5 },
                    reasoning: { name: "Reasoning", icon: "🧠", chapters: 4 },
                    english: { name: "English", icon: "📖", chapters: 4 },
                    gk: { name: "General Knowledge", icon: "🌍", chapters: 5 }
                }
            }
        }
    },
    banking: {
        name: "Banking",
        icon: "🏦",
        description: "Banking & Financial Services",
        color: "#10b981",
        examTypes: {
            po: { name: "Probationary Officer" },
            clerk: { name: "Bank Clerk" },
            so: { name: "Specialist Officer" }
        }
    },
    railway: {
        name: "Railway",
        icon: "🚂",
        description: "Railway Recruitment Board",
        color: "#f59e0b",
        examTypes: {
            ntpc: { name: "RRB NTPC" },
            groupd: { name: "Group D" },
            je: { name: "Junior Engineer" }
        }
    },
    upsc: {
        name: "UPSC",
        icon: "🎯",
        description: "Union Public Service Commission",
        color: "#8b5cf6",
        examTypes: {
            prelims: { name: "Civil Services Prelims" },
            mains: { name: "Civil Services Mains" }
        }
    },
    neet: {
        name: "NEET",
        icon: "🩺",
        description: "National Eligibility Entrance Test",
        color: "#ef4444",
        examTypes: {
            physics: { name: "Physics" },
            chemistry: { name: "Chemistry" },
            biology: { name: "Biology" }
        }
    },
    jee: {
        name: "JEE",
        icon: "⚙️",
        description: "Joint Entrance Examination",
        color: "#06b6d4",
        examTypes: {
            main: { name: "JEE Main" },
            advanced: { name: "JEE Advanced" }
        }
    }
};

const contentTypes = [
    {
        id: "mindmaps",
        name: "Mind Maps",
        icon: "🧠",
        filename: "mindmaps.html",
        description: "Interactive visual diagrams"
    },
    {
        id: "handwritten-notes",
        name: "Handwritten Notes",
        icon: "✍️",
        filename: "handwritten-notes.pdf",
        description: "PDF handwritten study material"
    },
    {
        id: "short-notes",
        name: "Short Notes",
        icon: "📝",
        filename: "short-notes.html",
        description: "Concise study notes"
    },
    {
        id: "quiz",
        name: "Quiz",
        icon: "❓",
        filename: "quiz.html",
        description: "Interactive practice questions"
    },
    {
        id: "one-page-notes",
        name: "One Page Notes",
        icon: "📄",
        filename: "one-page-notes.html",
        description: "Summary in single page"
    }
];

// =============================================================================
// APPLICATION STATE
// =============================================================================

const appState = {
    currentView: 'dashboard',
    currentExam: null,
    currentExamType: null,
    currentSubject: null,
    currentChapter: null,
    currentContentType: null,
    navigationHistory: [],
    theme: 'light',
    user: null
};

// =============================================================================
// THEME MANAGEMENT
// =============================================================================

class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        this.detectSystemTheme();
        this.loadSavedTheme();
        this.setupThemeToggle();
        this.watchSystemTheme();
    }

    detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            appState.systemTheme = 'dark';
        } else {
            appState.systemTheme = 'light';
        }
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('prepe-theme');
        if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
            appState.theme = savedTheme;
        } else {
            appState.theme = 'auto';
        }
        this.applyTheme();
    }

    applyTheme() {
        let themeToApply = appState.theme;
        if (appState.theme === 'auto') {
            themeToApply = appState.systemTheme;
        }

        document.documentElement.setAttribute('data-theme', themeToApply);
        this.updateThemeIcon(themeToApply);
    }

    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    toggleTheme() {
        if (appState.theme === 'light') {
            appState.theme = 'dark';
        } else if (appState.theme === 'dark') {
            appState.theme = 'auto';
        } else {
            appState.theme = 'light';
        }

        localStorage.setItem('prepe-theme', appState.theme);
        this.applyTheme();
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    watchSystemTheme() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                appState.systemTheme = e.matches ? 'dark' : 'light';
                if (appState.theme === 'auto') {
                    this.applyTheme();
                }
            });
        }
    }
}

// =============================================================================
// NAVIGATION MANAGEMENT WITH ENHANCED PATH BAR
// =============================================================================

class NavigationManager {
    constructor() {
        this.views = {
            dashboard: document.getElementById('dashboardView'),
            exam: document.getElementById('examView'),
            subject: document.getElementById('subjectView'),
            chapter: document.getElementById('chapterView'),
            content: document.getElementById('contentView'),
            contentDisplay: document.getElementById('contentDisplayView')
        };
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Logo click
        const logoBtn = document.getElementById('logoBtn');
        if (logoBtn) {
            logoBtn.addEventListener('click', () => this.navigateTo('dashboard'));
        }

        // Nav links
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                if (page === 'dashboard') {
                    this.navigateTo('dashboard');
                }

                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                link.classList.add('active');
            });
        });

        // Enhanced back and home buttons
        const backBtn = document.getElementById('backBtn');
        const homeBtn = document.getElementById('homeBtn');

        if (backBtn) {
            backBtn.addEventListener('click', () => this.goBack());
        }

        if (homeBtn) {
            homeBtn.addEventListener('click', () => this.navigateTo('dashboard'));
        }
    }

    navigateTo(view, data = {}) {
        console.log('Navigating to:', view, data);

        // Update state
        Object.assign(appState, data);
        appState.currentView = view;

        // Hide all views
        Object.values(this.views).forEach(viewElement => {
            if (viewElement) {
                viewElement.classList.remove('active');
            }
        });

        // Show target view
        if (this.views[view]) {
            this.views[view].classList.add('active');
        }

        // Update UI based on view
        this.updateUI(view, data);

        // Update enhanced path bar
        this.updatePathBar();
    }

    updateUI(view, data) {
        switch (view) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'exam':
                this.renderExamTypes(data.exam);
                break;
            case 'subject':
                this.renderSubjects(data.exam, data.examType);
                break;
            case 'chapter':
                this.renderChapters(data.exam, data.examType, data.subject);
                break;
            case 'content':
                this.renderContentTypes(data.exam, data.examType, data.subject, data.chapter);
                break;
            case 'contentDisplay':
                this.renderContentWithIframe(data.exam, data.examType, data.subject, data.chapter, data.contentType);
                break;
        }
    }

    renderDashboard() {
        const examGrid = document.getElementById('examGrid');
        if (!examGrid) return;

        examGrid.innerHTML = '';

        Object.entries(examData).forEach(([examId, exam]) => {
            const examCard = document.createElement('div');
            examCard.className = 'exam-card';
            examCard.innerHTML = `
                <div class="card-icon">${exam.icon}</div>
                <h3 class="card-title">${exam.name}</h3>
                <p class="card-description">${exam.description}</p>
                <div class="card-meta">
                    <span>${Object.keys(exam.examTypes || {}).length} Exams</span>
                    <span class="card-badge">मुफ्त</span>
                </div>
            `;

            examCard.addEventListener('click', () => {
                this.navigateTo('exam', { exam: examId });
            });

            examGrid.appendChild(examCard);
        });
    }

    renderExamTypes(examId) {
        const exam = examData[examId];
        if (!exam) return;

        const examTitle = document.getElementById('examTitle');
        const examSubtitle = document.getElementById('examSubtitle');
        const examTypeGrid = document.getElementById('examTypeGrid');

        if (examTitle) examTitle.textContent = exam.name;
        if (examSubtitle) examSubtitle.textContent = 'अपनी परीक्षा चुनें';

        if (!examTypeGrid) return;
        examTypeGrid.innerHTML = '';

        Object.entries(exam.examTypes || {}).forEach(([examTypeId, examType]) => {
            const typeCard = document.createElement('div');
            typeCard.className = 'content-card';
            typeCard.innerHTML = `
                <div class="card-icon">📚</div>
                <h3 class="card-title">${examType.name}</h3>
                <p class="card-description">विषयों की तैयारी शुरू करें</p>
                <div class="card-meta">
                    <span>${Object.keys(examType.subjects || {}).length} Subjects</span>
                </div>
            `;

            typeCard.addEventListener('click', () => {
                this.navigateTo('subject', { exam: examId, examType: examTypeId });
            });

            examTypeGrid.appendChild(typeCard);
        });
    }

    renderSubjects(examId, examTypeId) {
        const exam = examData[examId];
        const examType = exam?.examTypes?.[examTypeId];
        if (!examType) return;

        const subjectTitle = document.getElementById('subjectTitle');
        const subjectSubtitle = document.getElementById('subjectSubtitle');
        const subjectGrid = document.getElementById('subjectGrid');

        if (subjectTitle) subjectTitle.textContent = examType.name;
        if (subjectSubtitle) subjectSubtitle.textContent = 'अपना विषय चुनें';

        if (!subjectGrid) return;
        subjectGrid.innerHTML = '';

        Object.entries(examType.subjects || {}).forEach(([subjectId, subject]) => {
            const subjectCard = document.createElement('div');
            subjectCard.className = 'content-card';

            const chapterCount = Array.isArray(subject.chapters) ? 
                subject.chapters.length : 
                (typeof subject.chapters === 'number' ? subject.chapters : 0);

            subjectCard.innerHTML = `
                <div class="card-icon">${subject.icon || '📚'}</div>
                <h3 class="card-title">${subject.name}</h3>
                <p class="card-description">${chapterCount} चैप्टर उपलब्ध</p>
                <div class="card-meta">
                    <span>शुरू करें</span>
                </div>
            `;

            subjectCard.addEventListener('click', () => {
                this.navigateTo('chapter', { 
                    exam: examId, 
                    examType: examTypeId, 
                    subject: subjectId 
                });
            });

            subjectGrid.appendChild(subjectCard);
        });
    }

    renderChapters(examId, examTypeId, subjectId) {
        const exam = examData[examId];
        const subject = exam?.examTypes?.[examTypeId]?.subjects?.[subjectId];
        if (!subject) return;

        const chapterTitle = document.getElementById('chapterTitle');
        const chapterSubtitle = document.getElementById('chapterSubtitle');
        const chapterList = document.getElementById('chapterList');

        if (chapterTitle) chapterTitle.textContent = subject.name;
        if (chapterSubtitle) chapterSubtitle.textContent = 'अपना चैप्टर चुनें';

        if (!chapterList) return;
        chapterList.innerHTML = '';

        const chapters = Array.isArray(subject.chapters) ? subject.chapters : [];

        chapters.forEach((chapter, index) => {
            const chapterItem = document.createElement('div');
            chapterItem.className = 'chapter-item';
            chapterItem.innerHTML = `
                <div class="chapter-number">${index + 1}</div>
                <div class="chapter-info">
                    <h4 class="chapter-name">${chapter}</h4>
                    <p class="chapter-description">5 कंटेंट टाइप उपलब्ध</p>
                </div>
                <div class="chapter-status">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.random() * 100}%"></div>
                    </div>
                    <span class="card-badge">शुरू करें</span>
                </div>
            `;

            chapterItem.addEventListener('click', () => {
                this.navigateTo('content', {
                    exam: examId,
                    examType: examTypeId,
                    subject: subjectId,
                    chapter: index
                });
            });

            chapterList.appendChild(chapterItem);
        });
    }

    renderContentTypes(examId, examTypeId, subjectId, chapterIndex) {
        const exam = examData[examId];
        const subject = exam?.examTypes?.[examTypeId]?.subjects?.[subjectId];
        const chapters = Array.isArray(subject?.chapters) ? subject.chapters : [];
        const chapter = chapters[chapterIndex];

        if (!chapter) return;

        const contentTitle = document.getElementById('contentTitle');
        const contentSubtitle = document.getElementById('contentSubtitle');
        const contentTypesGrid = document.getElementById('contentTypesGrid');

        if (contentTitle) contentTitle.textContent = chapter;
        if (contentSubtitle) contentSubtitle.textContent = 'कंटेंट टाइप चुनें';

        if (!contentTypesGrid) return;
        contentTypesGrid.innerHTML = '';

        contentTypes.forEach(contentType => {
            const typeCard = document.createElement('div');
            typeCard.className = 'content-type-card';
            typeCard.innerHTML = `
                <div class="card-icon">${contentType.icon}</div>
                <h4 class="card-title">${contentType.name}</h4>
                <p class="card-description">${contentType.description}</p>
            `;

            typeCard.addEventListener('click', () => {
                this.navigateTo('contentDisplay', {
                    exam: examId,
                    examType: examTypeId,
                    subject: subjectId,
                    chapter: chapterIndex,
                    contentType: contentType.id
                });
            });

            contentTypesGrid.appendChild(typeCard);
        });
    }

    // IFRAME-BASED CONTENT RENDERING FOR PERFECT DISPLAY
    renderContentWithIframe(examId, examTypeId, subjectId, chapterIndex, contentTypeId) {
        const contentViewerWrapper = document.getElementById('contentViewerWrapper');
        if (!contentViewerWrapper) return;

        const exam = examData[examId];
        const subject = exam?.examTypes?.[examTypeId]?.subjects?.[subjectId];
        const chapters = Array.isArray(subject?.chapters) ? subject.chapters : [];
        const chapter = chapters[chapterIndex];
        const contentType = contentTypes.find(ct => ct.id === contentTypeId);

        if (!chapter || !contentType) {
            contentViewerWrapper.innerHTML = `
                <div class="content-placeholder">
                    <h3>कंटेंट नहीं मिला</h3>
                    <p>यह कंटेंट अभी उपलब्ध नहीं है।</p>
                </div>
            `;
            return;
        }

        // Generate expected file path
        const chapterSlug = this.generateSlug(chapter);
        const filePath = `content/${examId}/${examTypeId}/${subjectId}/${chapterSlug}/${contentType.filename}`;

        // Show loading state
        contentViewerWrapper.innerHTML = `
            <div class="content-loading">
                <div class="spinner"></div>
                <p>Loading ${contentType.name}...</p>
            </div>
        `;

        // Try to load content with iframe for perfect rendering
        this.loadContentWithIframe(filePath, contentType, contentViewerWrapper, {
            exam: examData[examId],
            examType: exam?.examTypes?.[examTypeId],
            subject,
            chapter,
            contentType
        });
    }

    async loadContentWithIframe(filePath, contentType, container, metadata) {
        try {
            const response = await fetch(filePath);

            if (response.ok) {
                if (filePath.endsWith('.html')) {
                    // Use iframe for perfect HTML rendering
                    container.innerHTML = `
                        <iframe 
                            src="${filePath}" 
                            class="content-iframe"
                            title="${contentType.name} - ${metadata.chapter}"
                            frameborder="0"
                            scrolling="auto"
                            sandbox="allow-scripts allow-same-origin"
                        ></iframe>
                    `;

                    // Add iframe load event handler
                    const iframe = container.querySelector('.content-iframe');
                    iframe.addEventListener('load', () => {
                        console.log('Content loaded successfully in iframe');

                        try {
                            // Try to apply theme to iframe content if same origin
                            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                            const currentTheme = document.documentElement.getAttribute('data-theme');

                            if (iframeDoc && currentTheme) {
                                iframeDoc.documentElement.setAttribute('data-theme', currentTheme);
                            }
                        } catch (e) {
                            // Cross-origin restrictions, ignore
                            console.log('Cross-origin iframe, theme sync not possible');
                        }
                    });

                    iframe.addEventListener('error', () => {
                        this.showContentPlaceholder(container, filePath, contentType, metadata);
                    });

                } else if (filePath.endsWith('.pdf')) {
                    // PDF viewer
                    container.innerHTML = `
                        <iframe 
                            src="${filePath}" 
                            class="content-iframe"
                            title="PDF Viewer - ${metadata.chapter}"
                            frameborder="0"
                            scrolling="auto"
                        ></iframe>
                    `;
                }
            } else {
                // File not found, show placeholder
                this.showContentPlaceholder(container, filePath, contentType, metadata);
            }
        } catch (error) {
            console.log('Content not found:', filePath);
            this.showContentPlaceholder(container, filePath, contentType, metadata);
        }
    }

    showContentPlaceholder(container, filePath, contentType, metadata) {
        container.innerHTML = `
            <div class="content-placeholder">
                <h3>${contentType.icon} ${contentType.name}</h3>
                <p><strong>चैप्टर:</strong> ${metadata.chapter}</p>
                <p><strong>विषय:</strong> ${metadata.subject.name}</p>
                <p><strong>फाइल पाथ:</strong> <code>${filePath}</code></p>

                <div class="upload-instructions">
                    <h4>📁 कंटेंट अपलोड करने के निर्देश:</h4>
                    <ol>
                        <li><strong>फाइल तैयार करें:</strong> अपना ${contentType.name} तैयार करें</li>
                        <li><strong>सही नाम रखें:</strong> फाइल का नाम <code>${contentType.filename}</code> रखें</li>
                        <li><strong>सही फोल्डर में डालें:</strong> <code>${filePath.split('/').slice(0, -1).join('/')}/</code></li>
                        <li><strong>रीफ्रेश करें:</strong> पेज को रीफ्रेश करें</li>
                    </ol>
                    <p><strong>नोट:</strong> यह iframe-based viewer आपके content को बिल्कुल वैसा ही render करेगा जैसा आपने बनाया है। कोई formatting change नहीं होगी।</p>
                </div>

                <div style="margin-top: 2rem;">
                    <button class="btn btn-primary" onclick="history.back()">
                        ← वापस जाएं
                    </button>
                </div>
            </div>
        `;
    }

    generateSlug(text) {
        return text.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // ENHANCED PATH BAR UPDATE
    updatePathBar() {
        const pathBarContainer = document.getElementById('pathBarContainer');
        const currentLocation = document.getElementById('currentLocation');
        const breadcrumb = document.getElementById('breadcrumb');

        if (!currentLocation || !breadcrumb) return;

        const items = [];
        let currentLocationText = 'Dashboard';

        // Build breadcrumb items
        items.push({
            text: '🏠 Dashboard',
            icon: '🏠',
            action: () => this.navigateTo('dashboard')
        });

        if (appState.currentExam) {
            const exam = examData[appState.currentExam];
            if (exam) {
                items.push({
                    text: exam.name,
                    icon: exam.icon,
                    action: () => this.navigateTo('exam', { exam: appState.currentExam })
                });
                currentLocationText = exam.name;
            }
        }

        if (appState.currentExamType) {
            const examType = examData[appState.currentExam]?.examTypes?.[appState.currentExamType];
            if (examType) {
                items.push({
                    text: examType.name,
                    icon: '📚',
                    action: () => this.navigateTo('subject', { 
                        exam: appState.currentExam, 
                        examType: appState.currentExamType 
                    })
                });
                currentLocationText = examType.name;
            }
        }

        if (appState.currentSubject) {
            const subject = examData[appState.currentExam]?.examTypes?.[appState.currentExamType]?.subjects?.[appState.currentSubject];
            if (subject) {
                items.push({
                    text: subject.name,
                    icon: subject.icon,
                    action: () => this.navigateTo('chapter', { 
                        exam: appState.currentExam, 
                        examType: appState.currentExamType, 
                        subject: appState.currentSubject 
                    })
                });
                currentLocationText = subject.name;
            }
        }

        if (appState.currentChapter !== null) {
            const subject = examData[appState.currentExam]?.examTypes?.[appState.currentExamType]?.subjects?.[appState.currentSubject];
            const chapters = Array.isArray(subject?.chapters) ? subject.chapters : [];
            const chapter = chapters[appState.currentChapter];
            if (chapter) {
                items.push({
                    text: chapter,
                    icon: '📖',
                    action: () => this.navigateTo('content', { 
                        exam: appState.currentExam, 
                        examType: appState.currentExamType, 
                        subject: appState.currentSubject, 
                        chapter: appState.currentChapter 
                    })
                });
                currentLocationText = chapter;
            }
        }

        if (appState.currentContentType) {
            const contentType = contentTypes.find(ct => ct.id === appState.currentContentType);
            if (contentType) {
                items.push({
                    text: contentType.name,
                    icon: contentType.icon,
                    action: null // Current page
                });
                currentLocationText = contentType.name;
            }
        }

        // Update current location
        currentLocation.innerHTML = `
            <span class="location-icon">📍</span>
            <span class="location-text">${currentLocationText}</span>
        `;

        // Update breadcrumb
        breadcrumb.innerHTML = items.map((item, index) => {
            const isLast = index === items.length - 1;
            const itemClass = item.action ? 'breadcrumb-item' : 'breadcrumb-item active';

            return `
                <span class="${itemClass}" ${item.action ? 'style="cursor: pointer;"' : ''}>${item.text}</span>
                ${!isLast ? '<span class="breadcrumb-separator">›</span>' : ''}
            `;
        }).join('');

        // Add click listeners
        breadcrumb.querySelectorAll('.breadcrumb-item').forEach((item, index) => {
            if (items[index].action) {
                item.addEventListener('click', items[index].action);
            }
        });

        // Show/hide path bar
        if (items.length > 1) {
            pathBarContainer?.classList.remove('hidden');
        } else {
            pathBarContainer?.classList.add('hidden');
        }
    }

    goBack() {
        switch (appState.currentView) {
            case 'contentDisplay':
                this.navigateTo('content', {
                    exam: appState.currentExam,
                    examType: appState.currentExamType,
                    subject: appState.currentSubject,
                    chapter: appState.currentChapter
                });
                break;
            case 'content':
                this.navigateTo('chapter', {
                    exam: appState.currentExam,
                    examType: appState.currentExamType,
                    subject: appState.currentSubject
                });
                break;
            case 'chapter':
                this.navigateTo('subject', {
                    exam: appState.currentExam,
                    examType: appState.currentExamType
                });
                break;
            case 'subject':
                this.navigateTo('exam', {
                    exam: appState.currentExam
                });
                break;
            case 'exam':
                this.navigateTo('dashboard');
                break;
            default:
                this.navigateTo('dashboard');
        }
    }
}

// =============================================================================
// MODAL MANAGEMENT
// =============================================================================

class ModalManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Login modal
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const loginModalClose = document.getElementById('loginModalClose');
        const loginModalOverlay = document.getElementById('loginModalOverlay');

        if (loginBtn && loginModal) {
            loginBtn.addEventListener('click', () => this.showModal('loginModal'));
        }

        if (loginModalClose) {
            loginModalClose.addEventListener('click', () => this.hideModal('loginModal'));
        }

        if (loginModalOverlay) {
            loginModalOverlay.addEventListener('click', () => this.hideModal('loginModal'));
        }

        // Signup modal
        const signupBtn = document.getElementById('signupBtn');
        const signupModal = document.getElementById('signupModal');
        const signupModalClose = document.getElementById('signupModalClose');
        const signupModalOverlay = document.getElementById('signupModalOverlay');

        if (signupBtn && signupModal) {
            signupBtn.addEventListener('click', () => this.showModal('signupModal'));
        }

        if (signupModalClose) {
            signupModalClose.addEventListener('click', () => this.hideModal('signupModal'));
        }

        if (signupModalOverlay) {
            signupModalOverlay.addEventListener('click', () => this.hideModal('signupModal'));
        }

        // Switch between login and signup
        const switchToSignup = document.getElementById('switchToSignup');
        const switchToLogin = document.getElementById('switchToLogin');

        if (switchToSignup) {
            switchToSignup.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideModal('loginModal');
                this.showModal('signupModal');
            });
        }

        if (switchToLogin) {
            switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideModal('signupModal');
                this.showModal('loginModal');
            });
        }

        // Form submissions
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAllModals();
            }
        });
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    hideAllModals() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Simulate login
        console.log('Login attempt:', { email, password });

        // For demo purposes
        appState.user = { email, name: 'User' };
        this.updateAuthUI();
        this.hideModal('loginModal');

        // Show success message
        alert('लॉगिन सफल रहा!');
    }

    handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        // Simulate signup
        console.log('Signup attempt:', { name, email, password });

        // For demo purposes
        appState.user = { email, name };
        this.updateAuthUI();
        this.hideModal('signupModal');

        // Show success message
        alert('अकाउंट सफलतापूर्वक बन गया!');
    }

    updateAuthUI() {
        const authButtons = document.querySelector('.auth-buttons');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');

        if (appState.user) {
            if (authButtons) authButtons.classList.add('hidden');
            if (userMenu) userMenu.classList.remove('hidden');
            if (userName) userName.textContent = appState.user.name;
        } else {
            if (authButtons) authButtons.classList.remove('hidden');
            if (userMenu) userMenu.classList.add('hidden');
        }
    }
}

// =============================================================================
// APPLICATION INITIALIZATION
// =============================================================================

class PrepeApp {
    constructor() {
        this.themeManager = null;
        this.navigationManager = null;
        this.modalManager = null;
        this.init();
    }

    async init() {
        console.log('Initializing Prepe Platform with Perfect Content Rendering...');

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    start() {
        try {
            console.log('Starting Prepe Platform...');

            // Initialize managers
            this.themeManager = new ThemeManager();
            this.navigationManager = new NavigationManager();
            this.modalManager = new ModalManager();

            // Initialize dashboard immediately
            setTimeout(() => {
                this.navigationManager.renderDashboard();
                this.navigationManager.updatePathBar();
            }, 100);

            // Hide loading screen
            this.hideLoadingScreen();

            console.log('Prepe Platform initialized with perfect content rendering!');
        } catch (error) {
            console.error('Error initializing Prepe Platform:', error);
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Remove from DOM after animation
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        loadingScreen.parentNode.removeChild(loadingScreen);
                    }
                }, 500);
            }, 1000);
        }
    }
}

// =============================================================================
// START APPLICATION
// =============================================================================

// Initialize the application
window.prepeApp = new PrepeApp();

// Export for debugging
window.appState = appState;
window.examData = examData;

console.log('Prepe Educational Platform - Perfect Rendering Version Loaded!');
console.log('Features: Enhanced Path Bar + Iframe Content Viewer');
console.log('Version: 3.0.0 (Perfect Rendering)');
console.log('Build Date: September 2025');