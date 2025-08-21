// Advanced Cybersecurity SOC Dashboard - JavaScript (Fixed)
// Sarvesh Kumar - Security Analyst Workstation

class CybersecurityDashboard {
    constructor() {
        this.isBooted = false;
        this.currentSection = 'profile';
        this.securityFeeds = [];
        this.commandHistory = [];
        this.commands = {
            'help': 'Available commands: help, clear, status, scan, profile, ops, tools, contact, uptime, whoami',
            'clear': 'clear_screen',
            'status': 'System Status: OPERATIONAL | Threat Level: GREEN | Uptime: 99.9%',
            'scan': 'Initiating network scan... 65535 ports analyzed. 3 services detected.',
            'profile': 'switch_section_profile',
            'ops': 'switch_section_operations', 
            'operations': 'switch_section_operations',
            'tools': 'switch_section_tools',
            'arsenal': 'switch_section_arsenal',
            'intel': 'switch_section_intel',
            'contact': 'switch_section_contact',
            'uptime': 'System uptime: 365 days, 23 hours, 59 minutes',
            'whoami': 'sarvesh@cybersec-workstation: Security Analyst | OSINT Specialist',
            'matrix': 'matrix_mode'
        };
        
        this.init();
    }

    async init() {
        console.log('[SYSTEM] Initializing dashboard...');
        this.setupEventListeners();
        await this.bootSequence();
        this.initializeDashboard();
        this.startSystemMonitoring();
        this.setupCommandLine();
        this.animateCounters();
        this.setupFormHandling();
        this.setupCopyButtons();
        console.log('%c[SYSTEM] Cybersecurity Dashboard Initialized', 'color: #00FF41; font-weight: bold;');
    }

    // Boot Sequence Animation
    async bootSequence() {
        const bootScreen = document.getElementById('boot-sequence');
        const mainDashboard = document.getElementById('main-dashboard');
        
        if (!bootScreen || !mainDashboard) return;

        // Animate boot messages
        const bootLines = document.querySelectorAll('.boot-line');
        bootLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                this.typewriterEffect(line);
            }, index * 500 + 500);
        });

        // Wait for boot messages to complete
        await new Promise(resolve => setTimeout(resolve, 4000));

        // Start progress bar
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = '100%';
        }

        // Wait for progress bar to complete
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Fade out boot screen and show dashboard
        bootScreen.style.opacity = '0';
        bootScreen.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            bootScreen.style.display = 'none';
            mainDashboard.classList.add('loaded');
            this.isBooted = true;
            this.playBootSound();
        }, 1000);
    }

    typewriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(timer);
            }
        }, 30);
    }

    playBootSound() {
        // Create audio context for boot sound effects
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            try {
                const audioContext = new (AudioContext || webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
            } catch (e) {
                console.log('Audio not supported');
            }
        }
    }

    // Dashboard Initialization
    initializeDashboard() {
        console.log('[SYSTEM] Dashboard initializing...');
        this.updateSystemTime();
        this.initializeSecurityFeed();
        this.setupNavigation();
        this.animateSkillBars();
        
        // Set initial active section
        setTimeout(() => {
            this.switchSection('profile');
        }, 100);
    }

    // Navigation System (FIXED)
    setupNavigation() {
        console.log('[NAVIGATION] Setting up navigation system...');
        const navItems = document.querySelectorAll('.nav-item');
        console.log(`[NAVIGATION] Found ${navItems.length} navigation items`);
        
        navItems.forEach((item, index) => {
            const sectionId = item.getAttribute('data-section');
            console.log(`[NAVIGATION] Setting up nav item ${index}: ${sectionId}`);
            
            item.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`[NAVIGATION] Clicked on: ${sectionId}`);
                if (sectionId) {
                    this.switchSection(sectionId);
                }
            });
        });
    }

    switchSection(sectionId) {
        console.log(`[NAVIGATION] Switching to section: ${sectionId}`);
        
        // Update navigation active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
            console.log(`[NAVIGATION] Set active nav item: ${sectionId}`);
        }

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
            this.currentSection = sectionId;
            console.log(`[NAVIGATION] Activated section: ${sectionId}`);
            
            // Trigger section-specific animations
            setTimeout(() => {
                this.triggerSectionAnimations(sectionId);
            }, 100);
        } else {
            console.error(`[NAVIGATION] Section not found: ${sectionId}`);
        }
    }

    triggerSectionAnimations(sectionId) {
        console.log(`[ANIMATION] Triggering animations for: ${sectionId}`);
        switch(sectionId) {
            case 'profile':
                this.animateProfileScan();
                break;
            case 'arsenal':
                setTimeout(() => this.animateSkillBars(), 300);
                break;
            case 'tools':
                this.animateToolCards();
                break;
        }
    }

    // System Monitoring
    startSystemMonitoring() {
        // Update system time every second
        setInterval(() => {
            this.updateSystemTime();
        }, 1000);

        // Update security feed every 5-15 seconds
        setInterval(() => {
            this.addSecurityFeedItem();
        }, Math.random() * 10000 + 5000);

        // Animate LED indicators
        this.animateLEDIndicators();
    }

    updateSystemTime() {
        const timeElement = document.getElementById('system-time');
        if (timeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            timeElement.textContent = timeString;
        }
    }

    animateLEDIndicators() {
        const leds = document.querySelectorAll('.led-indicator');
        leds.forEach(led => {
            if (led.classList.contains('active') || led.classList.contains('warning')) {
                setInterval(() => {
                    led.style.opacity = led.style.opacity === '0.5' ? '1' : '0.5';
                }, Math.random() * 2000 + 1000);
            }
        });
    }

    // Security Feed Simulation
    initializeSecurityFeed() {
        const feedContainer = document.getElementById('security-feed');
        if (!feedContainer) return;

        const initialFeeds = [
            {
                timestamp: new Date(),
                source: 'IDS-MONITOR',
                message: 'Network baseline established. Monitoring 1,247 endpoints.',
                severity: 'info'
            },
            {
                timestamp: new Date(Date.now() - 60000),
                source: 'FIREWALL',
                message: 'Blocked 15 malicious IP addresses in last hour.',
                severity: 'medium'
            },
            {
                timestamp: new Date(Date.now() - 120000),
                source: 'OSINT-BOT',
                message: 'Threat intelligence database updated: 2,847 new IOCs.',
                severity: 'info'
            }
        ];

        initialFeeds.forEach(feed => {
            this.addFeedToDOM(feed);
        });
    }

    addSecurityFeedItem() {
        const messages = [
            { source: 'PORT-SCAN', message: 'TCP scan completed on 192.168.1.0/24 subnet', severity: 'info' },
            { source: 'VULN-SCAN', message: 'CVE-2024-' + Math.floor(Math.random() * 9999) + ' detected in Apache server', severity: 'high' },
            { source: 'HONEYPOT', message: 'SSH brute force attempt from unknown IP', severity: 'medium' },
            { source: 'MALWARE-DET', message: 'Suspicious file hash detected: ' + this.generateHash(8), severity: 'high' },
            { source: 'NETWORK-MON', message: 'Unusual traffic pattern detected on port ' + Math.floor(Math.random() * 65535), severity: 'medium' },
            { source: 'OSINT-INTEL', message: 'New threat actor profile added to database', severity: 'info' },
            { source: 'ENDPOINT-SEC', message: 'Real-time protection active on ' + Math.floor(Math.random() * 100 + 50) + ' devices', severity: 'info' }
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const feedItem = {
            timestamp: new Date(),
            source: randomMessage.source,
            message: randomMessage.message,
            severity: randomMessage.severity
        };

        this.addFeedToDOM(feedItem);
        this.limitFeedItems();
    }

    addFeedToDOM(feedItem) {
        const feedContainer = document.getElementById('security-feed');
        if (!feedContainer) return;

        const feedElement = document.createElement('div');
        feedElement.className = 'feed-item';
        feedElement.innerHTML = `
            <div class="feed-timestamp">[${this.formatTimestamp(feedItem.timestamp)}]</div>
            <div class="feed-source">[${feedItem.source}]</div>
            <div class="feed-message">${feedItem.message}</div>
            <div class="feed-severity ${feedItem.severity}">SEVERITY: ${feedItem.severity.toUpperCase()}</div>
        `;

        feedContainer.insertBefore(feedElement, feedContainer.firstChild);
    }

    limitFeedItems() {
        const feedContainer = document.getElementById('security-feed');
        if (feedContainer) {
            const items = feedContainer.querySelectorAll('.feed-item');
            if (items.length > 10) {
                for (let i = 10; i < items.length; i++) {
                    items[i].remove();
                }
            }
        }
    }

    formatTimestamp(date) {
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    generateHash(length) {
        const chars = '0123456789abcdef';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Counter Animations
    animateCounters() {
        const counters = document.querySelectorAll('.metric-value[data-counter]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toString().padStart(3, '0');
            }, 16);
        });
    }

    // Skill Bar Animations
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress[data-width]');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                
                // Add scanning effect
                setTimeout(() => {
                    bar.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.5)';
                    setTimeout(() => {
                        bar.style.boxShadow = '';
                    }, 500);
                }, 1000);
            }, index * 200);
        });
    }

    // Profile Section Animations
    animateProfileScan() {
        const scanners = document.querySelectorAll('.scanner-line');
        scanners.forEach(scanner => {
            scanner.style.animation = 'none';
            setTimeout(() => {
                scanner.style.animation = 'scanLine 4s infinite linear';
            }, 100);
        });
    }

    // Tool Cards Animation
    animateToolCards() {
        const toolCards = document.querySelectorAll('.tool-card');
        toolCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(-4px)';
                card.style.boxShadow = '0 0 25px rgba(0, 255, 65, 0.3)';
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 1000);
            }, index * 300);
        });
    }

    // Command Line Interface (FIXED)
    setupCommandLine() {
        console.log('[CLI] Setting up command line interface...');
        const commandInput = document.getElementById('command-input');
        if (!commandInput) {
            console.error('[CLI] Command input not found');
            return;
        }

        console.log('[CLI] Command input found, setting up listeners...');

        commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const command = commandInput.value.trim().toLowerCase();
                console.log(`[CLI] Command entered: "${command}"`);
                if (command) {
                    this.executeCommand(command);
                    commandInput.value = '';
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.commandHistory.length > 0) {
                    commandInput.value = this.commandHistory[this.commandHistory.length - 1];
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autocompleteCommand(commandInput);
            }
        });

        // Add blinking cursor effect
        this.addBlinkingCursor(commandInput);
        console.log('[CLI] Command line setup complete');
    }

    executeCommand(command) {
        console.log(`[CLI] Executing command: ${command}`);
        this.commandHistory.push(command);
        
        if (this.commands.hasOwnProperty(command)) {
            const response = this.commands[command];
            console.log(`[CLI] Command found, response: ${response}`);
            
            if (response === 'clear_screen') {
                this.clearSecurityFeed();
                this.showCommandResponse('Security feed cleared.');
            } else if (response === 'matrix_mode') {
                this.activateMatrixMode();
            } else if (response.startsWith('switch_section_')) {
                const section = response.replace('switch_section_', '');
                this.switchSection(section);
                this.showCommandResponse(`Switching to ${section.toUpperCase()} module...`);
            } else {
                this.showCommandResponse(response);
            }
        } else {
            const errorMsg = `Command not found: ${command}. Type 'help' for available commands.`;
            console.log(`[CLI] ${errorMsg}`);
            this.showCommandResponse(errorMsg);
        }

        // Add to security feed
        this.addFeedToDOM({
            timestamp: new Date(),
            source: 'TERMINAL',
            message: `Command executed: ${command}`,
            severity: 'info'
        });
    }

    showCommandResponse(response) {
        console.log(`[CLI] Response: ${response}`);
        
        // Flash the command line briefly to show response
        const commandLine = document.querySelector('.command-line');
        if (commandLine) {
            const originalBorder = commandLine.style.borderColor;
            commandLine.style.borderColor = '#00FFFF';
            commandLine.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.5)';
            
            setTimeout(() => {
                commandLine.style.borderColor = originalBorder;
                commandLine.style.boxShadow = '';
            }, 500);
        }

        // Also add response to security feed for visibility
        this.addFeedToDOM({
            timestamp: new Date(),
            source: 'SYSTEM',
            message: response,
            severity: 'info'
        });

        console.log(`%c[TERMINAL] ${response}`, 'color: #00FFFF; font-weight: bold;');
    }

    clearSecurityFeed() {
        const feedContainer = document.getElementById('security-feed');
        if (feedContainer) {
            feedContainer.innerHTML = '';
        }
    }

    activateMatrixMode() {
        console.log('%cMATRIX MODE ACTIVATED', 'color: #00FF41; font-size: 20px; font-weight: bold;');
        
        // Create matrix rain effect
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
            opacity: 0.1;
        `;
        
        document.body.appendChild(canvas);
        this.matrixRain(canvas);

        setTimeout(() => {
            canvas.remove();
        }, 10000);
    }

    matrixRain(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00FF41';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 35);
        setTimeout(() => clearInterval(interval), 10000);
    }

    autocompleteCommand(input) {
        const currentValue = input.value.toLowerCase();
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(currentValue));
        
        if (matches.length === 1) {
            input.value = matches[0];
        } else if (matches.length > 1) {
            console.log(`%cAvailable commands: ${matches.join(', ')}`, 'color: #00FF41;');
        }
    }

    addBlinkingCursor(input) {
        setInterval(() => {
            if (document.activeElement === input) {
                const cursor = input.style.borderRight;
                input.style.borderRight = cursor === '2px solid #00FF41' ? 'none' : '2px solid #00FF41';
            }
        }, 500);
    }

    // Form Handling
    setupFormHandling() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmission(contactForm);
        });

        // Add real-time validation
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
        });
    }

    async handleFormSubmission(form) {
        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'TRANSMITTING...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate encryption process
        await this.simulateEncryption();

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showFormSuccess('Message transmitted successfully. Encrypted with AES-256.');
            form.reset();
            
            // Add to security feed
            this.addFeedToDOM({
                timestamp: new Date(),
                source: 'COMM-SEC',
                message: 'Secure message transmitted via encrypted channel',
                severity: 'info'
            });
            
        } catch (error) {
            this.showFormError('Transmission failed. Check secure connection.');
        } finally {
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 1000);
        }
    }

    async simulateEncryption() {
        const steps = [
            'Generating RSA key pair...',
            'Encrypting message with AES-256...',
            'Creating digital signature...',
            'Establishing secure channel...'
        ];

        for (let step of steps) {
            console.log(`%c[ENCRYPTION] ${step}`, 'color: #00FFFF; font-weight: bold;');
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        
        if (input.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        
        input.style.borderColor = isValid ? '' : '#FF0844';
        input.style.boxShadow = isValid ? '' : '0 0 10px rgba(255, 8, 68, 0.3)';
    }

    showFormSuccess(message) {
        this.showFormMessage(message, 'success');
    }

    showFormError(message) {
        this.showFormMessage(message, 'error');
    }

    showFormMessage(message, type) {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Remove existing messages
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 12px;
            margin-bottom: 16px;
            border-radius: 4px;
            font-weight: 600;
            animation: feedSlideIn 0.5s ease;
            ${type === 'success' ? `
                background: rgba(0, 255, 65, 0.1);
                color: #00FF41;
                border: 1px solid #00FF41;
            ` : `
                background: rgba(255, 8, 68, 0.1);
                color: #FF0844;
                border: 1px solid #FF0844;
            `}
        `;

        form.insertBefore(messageDiv, form.firstChild);

        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Copy to Clipboard
    setupCopyButtons() {
        const copyButtons = document.querySelectorAll('.copy-btn[data-copy]');
        console.log(`[CLIPBOARD] Found ${copyButtons.length} copy buttons`);
        
        copyButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                const textToCopy = button.getAttribute('data-copy');
                console.log(`[CLIPBOARD] Copying: ${textToCopy}`);
                
                try {
                    if (navigator.clipboard) {
                        await navigator.clipboard.writeText(textToCopy);
                    } else {
                        this.fallbackCopy(textToCopy);
                    }
                    
                    this.showCopySuccess(button);
                    
                    // Add to security feed
                    this.addFeedToDOM({
                        timestamp: new Date(),
                        source: 'CLIPBOARD',
                        message: `Data copied to secure clipboard`,
                        severity: 'info'
                    });
                    
                } catch (error) {
                    console.error('[CLIPBOARD] Copy failed:', error);
                    this.showCopyError(button);
                }
            });
        });
    }

    fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.cssText = 'position:fixed;left:-999999px;top:-999999px;opacity:0;';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } finally {
            document.body.removeChild(textArea);
        }
    }

    showCopySuccess(button) {
        const originalText = button.textContent;
        button.textContent = 'COPIED';
        button.style.cssText = `
            background: #00FF41 !important;
            color: #000000 !important;
            box-shadow: 0 0 15px #00FF41 !important;
        `;

        setTimeout(() => {
            button.textContent = originalText;
            button.style.cssText = '';
        }, 2000);
    }

    showCopyError(button) {
        const originalText = button.textContent;
        button.textContent = 'ERROR';
        button.style.cssText = `
            background: #FF0844 !important;
            color: #FFFFFF !important;
        `;

        setTimeout(() => {
            button.textContent = originalText;
            button.style.cssText = '';
        }, 2000);
    }

    // Event Listeners
    setupEventListeners() {
        // Handle tool buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tool-btn')) {
                this.handleToolAction(e.target);
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    handleToolAction(button) {
        const action = button.textContent.toLowerCase();
        const toolCard = button.closest('.tool-card');
        const toolName = toolCard.querySelector('.tool-name').textContent;

        // Simulate tool execution
        button.style.transform = 'scale(0.95)';
        button.style.opacity = '0.7';

        setTimeout(() => {
            button.style.transform = '';
            button.style.opacity = '';
        }, 200);

        // Add to security feed
        this.addFeedToDOM({
            timestamp: new Date(),
            source: 'TOOL-EXEC',
            message: `${action.toUpperCase()} action performed on ${toolName}`,
            severity: 'info'
        });

        console.log(`%c[TOOL] ${action} - ${toolName}`, 'color: #00FFFF; font-weight: bold;');
    }

    handleResize() {
        // Adjust layout for different screen sizes
        const dashboard = document.querySelector('.dashboard-grid');
        if (dashboard && window.innerWidth < 1024) {
            dashboard.style.gridTemplateColumns = '1fr';
        }
    }

    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }

    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }

    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    this.switchSection('profile');
                    break;
                case '2':
                    e.preventDefault();
                    this.switchSection('operations');
                    break;
                case '3':
                    e.preventDefault();
                    this.switchSection('arsenal');
                    break;
                case '4':
                    e.preventDefault();
                    this.switchSection('tools');
                    break;
                case '5':
                    e.preventDefault();
                    this.switchSection('intel');
                    break;
                case '6':
                    e.preventDefault();
                    this.switchSection('contact');
                    break;
            }
        }

        if (e.key === 'F1') {
            e.preventDefault();
            console.log('%cKeyboard Shortcuts:\nCtrl+1-6: Switch sections\nF1: Help\nF12: Command line focus', 'color: #00FF41;');
        }

        if (e.key === 'F12') {
            e.preventDefault();
            const commandInput = document.getElementById('command-input');
            if (commandInput) {
                commandInput.focus();
            }
        }
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('[SYSTEM] DOM loaded, initializing...');
    const dashboard = new CybersecurityDashboard();
    
    // Store references globally for debugging
    window.cybersecDashboard = dashboard;
    
    // Add console welcome message
    console.log('%c' + 
        '╔═══════════════════════════════════════╗\n' +
        '║    CYBERSEC ANALYST WORKSTATION      ║\n' +
        '║        SARVESH KUMAR - 2024          ║\n' +
        '║     SECURITY OPERATIONS CENTER       ║\n' +
        '╚═══════════════════════════════════════╝', 
        'color: #00FF41; font-family: monospace; font-weight: bold;'
    );
    
    console.log('%cSystem Status: OPERATIONAL | Threat Level: GREEN | Access: GRANTED', 
        'color: #00FFFF; font-weight: bold;'
    );
    
    console.log('%cTry typing commands in the terminal below! Type "help" to get started.', 
        'color: #888888;'
    );
});