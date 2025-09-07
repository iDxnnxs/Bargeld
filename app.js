// Enhanced Creative Digital Euro Presentation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initProgressBar();
    initNavigation();
    initMoneyBackground();
    initAnimatedCounters();
    initInteractiveTimeline();
    initFeeCalculator();
    initRiskToggles();
    initCountryCards();
    initPoll();
    initScrollAnimations();
    initEnhancedEffects();
    initKeyboardNavigation();
    initParticleEffects();
});

// Enhanced Progress Bar with glow effect
function initProgressBar() {
    const progressBar = document.querySelector('.progress-fill');
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.max(0, Math.min(100, (scrollTop / docHeight) * 100));
        progressBar.style.width = scrollPercent + '%';
        
        // Add glow effect based on progress
        if (scrollPercent > 50) {
            progressBar.style.boxShadow = `0 0 ${scrollPercent / 5}px rgba(var(--color-teal-500-rgb), 0.8)`;
        }
    }
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

// Enhanced Navigation with smooth transitions
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight - 20;
                
                // Add loading animation to clicked link
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced active navigation highlighting
    function highlightActiveNav() {
        let current = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionHeight = section.clientHeight;
            const scrollPos = window.pageYOffset;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveNav);
    highlightActiveNav();
}

// Money Background Animation System
function initMoneyBackground() {
    const moneyBackground = document.querySelector('.money-background');
    if (!moneyBackground) return;
    
    // Create additional money particles dynamically
    function createMoneyParticle() {
        const moneyTypes = ['💶', '💵', '💷', '🪙', '€', '$', '£', '¥', '₿', '💳'];
        const particle = document.createElement('div');
        particle.className = 'money-item currency';
        particle.textContent = moneyTypes[Math.floor(Math.random() * moneyTypes.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.fontSize = (Math.random() * 20 + 20) + 'px';
        
        document.querySelector('.floating-money').appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 20000);
    }
    
    // Create new particles periodically
    setInterval(createMoneyParticle, 3000);
    
    // Initialize with some extra particles
    for (let i = 0; i < 5; i++) {
        setTimeout(createMoneyParticle, i * 1000);
    }
}

// Enhanced Animated Counters with Particle Effects
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            width: 4px;
            height: 4px;
            background: var(--color-primary);
            border-radius: 50%;
            animation: particleFloat 2s ease-out forwards;
            pointer-events: none;
            z-index: 1;
        `;
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
    
    function animateCounters() {
        if (hasAnimated) return;
        
        const heroSection = document.getElementById('hero');
        const rect = heroSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            hasAnimated = true;
            
            counters.forEach((counter, index) => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2500;
                const startTime = performance.now();
                const container = counter.parentElement;
                
                // Start particle effects
                const particleInterval = setInterval(() => {
                    createParticle(container);
                }, 200);
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Enhanced easing function
                    const easeOutBounce = progress < 0.5 
                        ? 2 * progress * progress 
                        : -1 + (4 - 2 * progress) * progress;
                    
                    const currentValue = Math.round(target * easeOutBounce);
                    counter.textContent = currentValue;
                    
                    // Add glowing effect as number increases
                    if (progress > 0.5) {
                        counter.style.textShadow = `0 0 ${progress * 20}px rgba(var(--color-primary-rgb), 0.8)`;
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        clearInterval(particleInterval);
                        // Final celebration effect
                        for (let i = 0; i < 10; i++) {
                            setTimeout(() => createParticle(container), i * 100);
                        }
                    }
                }
                
                // Stagger animation start
                setTimeout(() => {
                    requestAnimationFrame(updateCounter);
                }, index * 300);
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    animateCounters();
}

// Fixed Interactive Timeline System
function initInteractiveTimeline() {
    const timelinePoints = document.querySelectorAll('.timeline-point');
    const detailsContent = document.querySelector('.details-content');
    const progressLine = document.querySelector('.timeline-progress');
    
    if (!timelinePoints.length || !detailsContent) return;
    
    // Fixed Timeline data - directly using the data attributes from HTML
    function getTimelineData(point) {
        return {
            icon: point.getAttribute('data-icon') || '🏛️',
            title: point.getAttribute('data-title') || 'Digitaler Euro',
            year: point.getAttribute('data-year') || '2025',
            description: point.getAttribute('data-description') || 'Zentralbank-Digital-Währungen als staatliche Alternative',
            color: point.getAttribute('data-color') || '#1E40AF'
        };
    }
    
    function updateTimelineDetails(point, index) {
        const data = getTimelineData(point);
        
        // Animate out current content
        detailsContent.style.opacity = '0';
        detailsContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // Update content
            const iconElement = detailsContent.querySelector('.details-icon');
            const titleElement = detailsContent.querySelector('.details-text h3');
            const yearElement = detailsContent.querySelector('.details-year');
            const descriptionElement = detailsContent.querySelector('.details-description');
            
            if (iconElement) {
                iconElement.textContent = data.icon;
                iconElement.style.color = data.color;
            }
            if (titleElement) {
                titleElement.textContent = data.title;
                titleElement.style.color = data.color;
            }
            if (yearElement) {
                yearElement.textContent = data.year;
                yearElement.style.color = data.color;
            }
            if (descriptionElement) {
                descriptionElement.textContent = data.description;
            }
            
            // Set color theme for the details container
            const timelineDetails = document.querySelector('.timeline-details');
            if (timelineDetails) {
                timelineDetails.style.borderColor = data.color;
                timelineDetails.style.boxShadow = `0 4px 20px rgba(${hexToRgb(data.color)}, 0.2)`;
            }
            
            // Animate in new content
            detailsContent.style.opacity = '1';
            detailsContent.style.transform = 'translateY(0)';
        }, 300);
        
        // Update progress line
        const progressPercent = ((index + 1) / timelinePoints.length) * 90;
        if (progressLine) {
            progressLine.style.width = progressPercent + '%';
            progressLine.style.background = `linear-gradient(90deg, var(--color-primary), ${data.color})`;
        }
    }
    
    // Helper function to convert hex to rgb
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
            '33, 128, 141';
    }
    
    // Add click handlers to timeline points
    timelinePoints.forEach((point, index) => {
        // Ensure the point has the necessary data attributes
        if (!point.getAttribute('data-title')) {
            // Fallback data for missing attributes
            const fallbackData = [
                { icon: '🔄', title: 'Tauschhandel', year: '3000 v. Chr.', description: 'Menschen tauschten Waren direkt - Getreide gegen Vieh, Werkzeuge gegen Nahrung', color: '#8B5A3C' },
                { icon: '🐚', title: 'Warengeld', year: '3000 v. Chr.', description: 'Muscheln, Vieh und andere wertvolle Güter als erste Zahlungsmittel', color: '#D97706' },
                { icon: '🪙', title: 'Metallmünzen', year: '700 v. Chr.', description: 'Erste geprägte Münzen aus Gold und Silber im antiken Griechenland', color: '#F59E0B' },
                { icon: '📜', title: 'Papiergeld', year: '1000 n. Chr.', description: 'China führt die ersten Banknoten aus Papier ein', color: '#10B981' },
                { icon: '💷', title: 'Banknoten', year: '1600', description: 'Europäische Banken geben die ersten modernen Geldscheine aus', color: '#3B82F6' },
                { icon: '💳', title: 'Kreditkarten', year: '1950', description: 'Erste Kreditkarten revolutionieren den bargeldlosen Zahlungsverkehr', color: '#8B5CF6' },
                { icon: '🏧', title: 'Electronic Banking', year: '1970', description: 'Erste elektronische Überweisungen und Geldautomaten', color: '#06B6D4' },
                { icon: '💻', title: 'Online Banking', year: '1990', description: 'Internet ermöglicht Bankgeschäfte von zu Hause', color: '#EC4899' },
                { icon: '📱', title: 'Mobile Payments', year: '2000', description: 'Smartphone-basierte Zahlungssysteme wie Apple Pay', color: '#F97316' },
                { icon: '₿', title: 'Kryptowährungen', year: '2009', description: 'Bitcoin als erste dezentrale digitale Währung', color: '#EAB308' },
                { icon: '🏛️', title: 'Digitaler Euro', year: '2025', description: 'Zentralbank-Digital-Währungen als staatliche Alternative', color: '#1E40AF' }
            ];
            
            const data = fallbackData[index] || fallbackData[fallbackData.length - 1];
            point.setAttribute('data-icon', data.icon);
            point.setAttribute('data-title', data.title);
            point.setAttribute('data-year', data.year);
            point.setAttribute('data-description', data.description);
            point.setAttribute('data-color', data.color);
        }
        
        point.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove active class from all points
            timelinePoints.forEach(p => {
                p.classList.remove('active');
                const marker = p.querySelector('.point-marker');
                if (marker) {
                    marker.style.transform = 'translateX(-50%) scale(1)';
                    marker.style.animation = '';
                }
            });
            
            // Add active class to clicked point
            this.classList.add('active');
            const activeMarker = this.querySelector('.point-marker');
            if (activeMarker) {
                activeMarker.style.transform = 'translateX(-50%) scale(1.2)';
                activeMarker.style.animation = 'pulse 2s infinite';
            }
            
            // Update details with enhanced visual feedback
            updateTimelineDetails(this, index);
            
            // Create celebration particles
            createTimelineParticles(this);
            
            // Scroll timeline into view if needed
            setTimeout(() => {
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        });
        
        // Enhanced hover effects
        point.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                const marker = this.querySelector('.point-marker');
                if (marker) {
                    marker.style.transform = 'translateX(-50%) scale(1.1)';
                }
                const year = this.querySelector('.point-year');
                if (year) {
                    year.style.opacity = '1';
                    year.style.transform = 'translateX(-50%) translateY(-10px)';
                }
            }
        });
        
        point.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                const marker = this.querySelector('.point-marker');
                if (marker) {
                    marker.style.transform = 'translateX(-50%) scale(1)';
                }
                const year = this.querySelector('.point-year');
                if (year) {
                    year.style.opacity = '0';
                    year.style.transform = 'translateX(-50%) translateY(0)';
                }
            }
        });
    });
    
    // Create particle effects for timeline interactions
    function createTimelineParticles(point) {
        const rect = point.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 6px;
                height: 6px;
                background: var(--color-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: timelineParticle 1.2s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1200);
        }
    }
    
    // Initialize with the last timeline point (current era) active
    const lastPoint = timelinePoints[timelinePoints.length - 1];
    if (lastPoint) {
        // Delay initial activation to allow for page load
        setTimeout(() => {
            lastPoint.click();
        }, 1000);
    }
    
    // Auto-play timeline demo (optional - can be disabled)
    let autoPlayIndex = 0;
    const autoPlayInterval = setInterval(() => {
        if (autoPlayIndex < timelinePoints.length && autoPlayIndex < 3) { // Only show first 3 automatically
            timelinePoints[autoPlayIndex].click();
            autoPlayIndex++;
        } else {
            clearInterval(autoPlayInterval);
            // Return to current era
            if (lastPoint) {
                setTimeout(() => lastPoint.click(), 2000);
            }
        }
    }, 3000);
    
    // Stop auto-play when user interacts
    timelinePoints.forEach(point => {
        point.addEventListener('click', () => {
            clearInterval(autoPlayInterval);
        });
    });
}

// Enhanced Fee Calculator with Visual Effects
function initFeeCalculator() {
    const amountInput = document.getElementById('amount');
    const feeCards = document.querySelectorAll('.animated-fee-card');
    const inputAnimation = document.querySelector('.input-animation');
    const flowParticles = document.querySelectorAll('.flow-particle');
    
    if (!amountInput || !feeCards.length) return;
    
    // Ensure input is properly interactive
    amountInput.style.cursor = 'text';
    amountInput.setAttribute('tabindex', '0');
    
    function createFeeAnimation(card, feeAmount) {
        // Create floating fee indicator
        const feeIndicator = document.createElement('div');
        feeIndicator.textContent = `+${feeAmount.toFixed(2)}€`;
        feeIndicator.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--color-error);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
            animation: feeFloat 2s ease-out forwards;
            z-index: 10;
        `;
        card.appendChild(feeIndicator);
        
        setTimeout(() => {
            if (feeIndicator.parentNode) {
                feeIndicator.parentNode.removeChild(feeIndicator);
            }
        }, 2000);
    }
    
    function animateFlowParticles() {
        flowParticles.forEach((particle, index) => {
            particle.style.animation = 'none';
            setTimeout(() => {
                particle.style.animation = `flow 3s infinite ${index * 0.5}s`;
            }, 100);
        });
    }
    
    function updateFees() {
        const amount = parseFloat(amountInput.value) || 0;
        
        // Show input loading animation
        if (inputAnimation) {
            inputAnimation.style.opacity = '1';
            setTimeout(() => {
                inputAnimation.style.opacity = '0';
            }, 800);
        }
        
        feeCards.forEach(card => {
            const feePercent = parseFloat(card.getAttribute('data-fee'));
            const feeAmount = (amount * feePercent) / 100;
            const feeAmountElement = card.querySelector('.fee-amount');
            const feeFillElement = card.querySelector('.fee-fill');
            
            if (feeAmountElement) {
                feeAmountElement.textContent = feeAmount.toFixed(2) + ' €';
                
                // Update progress bar
                if (feeFillElement && amount > 0) {
                    const maxFee = 3.0;
                    const fillPercent = Math.min((feePercent / maxFee) * 100, 100);
                    feeFillElement.style.width = fillPercent + '%';
                    
                    // Color coding based on fee amount
                    if (feePercent === 0) {
                        feeFillElement.style.background = 'var(--color-success)';
                    } else if (feePercent <= 1) {
                        feeFillElement.style.background = 'var(--color-warning)';
                    } else {
                        feeFillElement.style.background = 'var(--color-error)';
                    }
                }
                
                // Enhanced card animation
                if (amount > 0) {
                    card.style.transform = 'scale(1.02)';
                    card.style.borderColor = 'var(--color-primary)';
                    
                    // Show fee animation for non-zero fees
                    if (feeAmount > 0) {
                        createFeeAnimation(card, feeAmount);
                    }
                    
                    setTimeout(() => {
                        card.style.transform = '';
                        card.style.borderColor = '';
                    }, 500);
                }
            }
        });
        
        // Animate flow particles
        if (amount > 0) {
            animateFlowParticles();
        }
    }
    
    // Enhanced input event handling
    amountInput.addEventListener('input', updateFees);
    amountInput.addEventListener('change', updateFees);
    amountInput.addEventListener('focus', function() {
        this.style.borderColor = 'var(--color-primary)';
        this.style.transform = 'scale(1.05)';
    });
    
    amountInput.addEventListener('blur', function() {
        this.style.borderColor = '';
        this.style.transform = '';
    });
    
    // Initialize with default value
    updateFees();
}

// Enhanced Risk Card Toggles with Animations
function initRiskToggles() {
    const riskCards = document.querySelectorAll('.animated-risk-card');
    
    riskCards.forEach(card => {
        const header = card.querySelector('.risk-header');
        const details = card.querySelector('.risk-details');
        const toggleBtn = card.querySelector('.toggle-btn');
        const riskIcon = card.querySelector('.risk-icon');
        
        if (header && details && toggleBtn) {
            header.addEventListener('click', function() {
                const isActive = details.classList.contains('active');
                
                // Close all other cards with animation
                riskCards.forEach(otherCard => {
                    const otherDetails = otherCard.querySelector('.risk-details');
                    const otherBtn = otherCard.querySelector('.toggle-btn');
                    const otherIcon = otherCard.querySelector('.risk-icon');
                    
                    if (otherDetails && otherBtn && otherCard !== card) {
                        otherDetails.classList.remove('active');
                        otherBtn.classList.remove('active');
                        otherBtn.textContent = '+';
                        if (otherIcon) {
                            otherIcon.style.animation = '';
                        }
                    }
                });
                
                // Toggle current card with enhanced animation
                if (!isActive) {
                    details.classList.add('active');
                    toggleBtn.classList.add('active');
                    toggleBtn.textContent = '−';
                    
                    // Enhanced icon animations
                    if (riskIcon) {
                        if (riskIcon.classList.contains('danger-pulse')) {
                            riskIcon.style.animation = 'dangerPulse 0.5s infinite';
                        } else if (riskIcon.classList.contains('eye-blink')) {
                            riskIcon.style.animation = 'eyeBlink 1s infinite';
                        } else if (riskIcon.classList.contains('chart-fall')) {
                            riskIcon.style.animation = 'chartFall 0.8s infinite';
                        } else if (riskIcon.classList.contains('barrier-shake')) {
                            riskIcon.style.animation = 'barrierShake 0.5s infinite';
                        }
                    }
                    
                    // Scroll to show content
                    setTimeout(() => {
                        card.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300);
                } else {
                    details.classList.remove('active');
                    toggleBtn.classList.remove('active');
                    toggleBtn.textContent = '+';
                    if (riskIcon) {
                        riskIcon.style.animation = '';
                    }
                }
            });
        }
    });
}

// Enhanced Country Card Interactions
function initCountryCards() {
    const countryCards = document.querySelectorAll('.pulsing-card');
    
    countryCards.forEach(card => {
        const limitIndicator = card.querySelector('.limit-indicator');
        
        // Set indicator color based on limit amount
        const limitAmount = card.querySelector('.limit-amount');
        if (limitAmount) {
            const amount = parseInt(limitAmount.textContent.replace(/[^\d]/g, ''));
            if (amount <= 500) {
                limitIndicator.style.background = 'var(--color-error)';
            } else if (amount <= 1500) {
                limitIndicator.style.background = 'var(--color-warning)';
            } else {
                limitIndicator.style.background = 'var(--color-success)';
            }
        }
        
        card.addEventListener('click', function() {
            const country = this.getAttribute('data-country');
            const limitElement = this.querySelector('.limit-amount');
            const limit = limitElement ? limitElement.textContent : 'N/A';
            const flag = this.querySelector('.country-flag').textContent;
            
            // Enhanced notification system
            showNotification(`${flag} ${country}: Bargeldobergrenze von ${limit}`, 'info');
            
            // Card interaction animation
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
            
            // Pulse the limit indicator
            if (limitIndicator) {
                limitIndicator.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    limitIndicator.style.animation = '';
                }, 500);
            }
        });
    });
}

// Enhanced Poll Functionality with Animations
function initPoll() {
    const pollButtons = document.querySelectorAll('.animated-poll-btn');
    const totalVotesElement = document.getElementById('total-votes');
    
    if (!pollButtons.length || !totalVotesElement) return;
    
    // Initialize poll data
    let pollData = {
        ja: 0,
        nein: 0,
        teilweise: 0,
        total: 0,
        hasVoted: false
    };
    
    function createVoteParticles(button) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.textContent = '✨';
            particle.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                font-size: 12px;
                pointer-events: none;
                animation: voteParticle 1s ease-out forwards;
                animation-delay: ${i * 0.1}s;
                z-index: 100;
            `;
            button.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
    }
    
    function updatePollDisplay() {
        pollButtons.forEach(btn => {
            const option = btn.getAttribute('data-option');
            const percentage = pollData.total > 0 ? 
                Math.round((pollData[option] / pollData.total) * 100) : 0;
            
            const percentageElement = btn.querySelector('.poll-percentage');
            if (percentageElement) {
                percentageElement.textContent = percentage + '%';
            }
            
            // Enhanced visual feedback with animated background
            if (percentage > 0) {
                btn.style.background = `linear-gradient(to right, 
                    var(--color-primary) 0%, 
                    var(--color-primary) ${percentage}%, 
                    var(--color-background) ${percentage}%, 
                    var(--color-background) 100%)`;
                btn.style.color = percentage > 50 ? 'var(--color-btn-primary-text)' : 'var(--color-text)';
                
                // Add animation to percentage text
                percentageElement.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    percentageElement.style.animation = '';
                }, 500);
            }
        });
        
        totalVotesElement.textContent = pollData.total;
        totalVotesElement.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            totalVotesElement.style.animation = '';
        }, 500);
    }
    
    pollButtons.forEach(btn => {
        const pollAnimation = btn.querySelector('.poll-animation');
        
        btn.addEventListener('click', function() {
            if (pollData.hasVoted) return;
            
            const option = this.getAttribute('data-option');
            if (pollData.hasOwnProperty(option)) {
                // Show loading animation
                if (pollAnimation) {
                    pollAnimation.style.opacity = '1';
                }
                
                setTimeout(() => {
                    pollData[option]++;
                    pollData.total++;
                    pollData.hasVoted = true;
                    
                    // Hide loading animation
                    if (pollAnimation) {
                        pollAnimation.style.opacity = '0';
                    }
                    
                    // Mark this button as voted
                    this.classList.add('voted');
                    createVoteParticles(this);
                    
                    // Disable all buttons with animation
                    pollButtons.forEach(button => {
                        button.style.cursor = 'default';
                        button.style.opacity = button === this ? '1' : '0.7';
                    });
                    
                    // Update display with delay for effect
                    setTimeout(() => {
                        updatePollDisplay();
                    }, 500);
                    
                    // Show success message
                    setTimeout(() => {
                        showNotification('✓ Vielen Dank für Ihre Teilnahme!', 'success');
                        
                        const resultsElement = document.querySelector('.poll-results');
                        if (resultsElement) {
                            resultsElement.innerHTML = `
                                <p>Vielen Dank für Ihre Teilnahme! Insgesamt <span id="total-votes">${pollData.total}</span> Stimmen abgegeben</p>
                                <p style="color: var(--color-success); margin-top: 8px; animation: fadeIn 0.5s ease;">✓ Ihre Stimme wurde erfasst</p>
                            `;
                        }
                    }, 1000);
                }, 800);
            }
        });
    });
    
    // Simulate initial votes with animation
    setTimeout(() => {
        pollData.ja = Math.floor(Math.random() * 25) + 20;
        pollData.nein = Math.floor(Math.random() * 15) + 10;
        pollData.teilweise = Math.floor(Math.random() * 30) + 25;
        pollData.total = pollData.ja + pollData.nein + pollData.teilweise;
        updatePollDisplay();
    }, 3000);
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special effects for different element types
                if (entry.target.classList.contains('morphing-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                } else if (entry.target.classList.contains('pulsing-card')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                } else if (entry.target.classList.contains('glowing-point')) {
                    entry.target.style.animation = 'slideInRight 0.6s ease forwards';
                }
            }
        });
    }, observerOptions);
    
    // Animate various elements on scroll
    const animatedElements = document.querySelectorAll(`
        .morphing-card,
        .pulsing-card,
        .animated-risk-card,
        .glowing-point,
        .animated-discussion,
        .enhanced-calculator,
        .morphing-comparison
    `);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Enhanced Interactive Effects
function initEnhancedEffects() {
    // Logo pulse animation
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.addEventListener('click', () => {
            logoIcon.style.animation = 'bounce 0.6s ease';
            setTimeout(() => {
                logoIcon.style.animation = '';
            }, 600);
        });
    }
    
    // Section icons interaction
    const sectionIcons = document.querySelectorAll('.section-icon');
    sectionIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'bounce 0.5s ease';
        });
        icon.addEventListener('animationend', () => {
            icon.style.animation = '';
        });
    });
    
    // Enhanced hover effects for stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            const icon = this.querySelector('.stat-icon');
            if (icon) {
                icon.style.animation = 'pulse 0.5s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const icon = this.querySelector('.stat-icon');
            if (icon) {
                setTimeout(() => {
                    icon.style.animation = '';
                }, 500);
            }
        });
    });
}

// Particle Effects System
function initParticleEffects() {
    // Add particle effects to key interactions
    function createParticleExplosion(x, y, color = 'var(--color-primary)') {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: particleExplosion 1s ease-out forwards;
                animation-delay: ${i * 0.05}s;
            `;
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
    }
    
    // Add click particle effects to buttons
    const interactiveElements = document.querySelectorAll('button, .nav-link, .timeline-point');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createParticleExplosion(x, y);
        });
    });
}

// Enhanced Keyboard Navigation
function initKeyboardNavigation() {
    const sections = ['hero', 'source', 'introduction', 'history', 'current', 'legal', 'economic', 'risks', 'conclusion', 'discussion'];
    
    document.addEventListener('keydown', function(e) {
        const currentSection = document.querySelector('.nav-link.active');
        let currentIndex = 0;
        
        if (currentSection) {
            const currentId = currentSection.getAttribute('href').substring(1);
            currentIndex = sections.indexOf(currentId);
        }
        
        if (e.key === 'ArrowDown' || (e.key === 'j' && e.ctrlKey)) {
            e.preventDefault();
            const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
            scrollToSection(sections[nextIndex]);
        } else if (e.key === 'ArrowUp' || (e.key === 'k' && e.ctrlKey)) {
            e.preventDefault();
            const prevIndex = Math.max(currentIndex - 1, 0);
            scrollToSection(sections[prevIndex]);
        } else if (e.key === 'Home' && e.ctrlKey) {
            e.preventDefault();
            scrollToSection(sections[0]);
        } else if (e.key === 'End' && e.ctrlKey) {
            e.preventDefault();
            scrollToSection(sections[sections.length - 1]);
        }
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const offsetTop = section.offsetTop - navbarHeight - 20;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const colors = {
        info: 'var(--color-primary)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: var(--color-btn-primary-text);
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.4s ease, fadeOut 0.4s ease 2.6s forwards;
        max-width: 300px;
        font-weight: var(--font-weight-medium);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Add additional CSS animations dynamically
const additionalAnimations = document.createElement('style');
additionalAnimations.textContent = `
    @keyframes particleFloat {
        0% { opacity: 1; transform: translate(0, 0) scale(1); }
        100% { opacity: 0; transform: translate(${Math.random() * 100 - 50}px, -50px) scale(0); }
    }
    
    @keyframes feeFloat {
        0% { opacity: 0; transform: translateY(10px); }
        50% { opacity: 1; transform: translateY(-5px); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
    
    @keyframes particleExplosion {
        0% { 
            opacity: 1; 
            transform: translate(0, 0) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0); 
        }
    }
    
    @keyframes voteParticle {
        0% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0); 
        }
    }
    
    @keyframes timelineParticle {
        0% { 
            opacity: 1; 
            transform: translate(0, 0) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.2); 
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;

document.head.appendChild(additionalAnimations);

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Apply throttling to scroll-heavy functions
const throttledProgressUpdate = throttle(() => {
    // Re-bind progress bar update with throttling
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.max(0, Math.min(100, (scrollTop / docHeight) * 100));
        progressBar.style.width = scrollPercent + '%';
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledProgressUpdate);