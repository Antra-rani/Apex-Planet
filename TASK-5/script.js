document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initHero();
    initSearch();
    initItinerary();
    initBooking();
    initBudgetTracker();
    initCommunity();
    initUtilities();
    initSmoothScrolling();
    initAnimations();
});

// ==================== NAVIGATION ====================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const menuItems = document.querySelectorAll('.menu-item');

    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Active menu item highlighting
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && !e.target.closest('.hamburger')) {
            menu?.classList.remove('active');
            hamburger?.classList.remove('active');
        }
    });
}

// ==================== HERO SECTION ====================
function initHero() {
    const heroBtn = document.querySelector('.hero .btn');

    heroBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#explore')?.scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// ==================== SEARCH & EXPLORE ====================
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const categoryCards = document.querySelectorAll('.category-card');

    // Search functionality
    searchBtn?.addEventListener('click', () => {
        const query = searchInput?.value.trim();
        if (query) {
            performSearch(query);
        }
    });

    // Search on Enter key
    searchInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        }
    });

    // Category card interactions
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.querySelector('h3')?.textContent;
            if (category) {
                searchInput.value = category;
                performSearch(category);
            }
        });

        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

function performSearch(query) {
    console.log(`Searching for: ${query}`);
    showNotification(`Searching for "${query}"...`);

    // Simulate search results
    setTimeout(() => {
        showNotification(`Found results for "${query}"!`);
    }, 1500);
}

// ==================== ITINERARY PLANNER ====================
function initItinerary() {
    const addDayBtn = document.querySelector('.add-day-btn');
    const itineraryContainer = document.querySelector('.itinerary-container');
    let dayCounter = 5; // Starting after existing days

    addDayBtn?.addEventListener('click', () => {
        addNewDay(dayCounter++);
    });

    // Initialize existing days
    initializeExistingDays();
}

function initializeExistingDays() {
    const dayCards = document.querySelectorAll('.day-card');

    dayCards.forEach(card => {
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'btn btn-outline edit-day-btn';
        editBtn.addEventListener('click', () => editDay(card));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn btn-accent delete-day-btn';
        deleteBtn.addEventListener('click', () => deleteDay(card));

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'day-actions';
        actionsDiv.style.marginTop = '10px';
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        card.appendChild(actionsDiv);
    });
}

function addNewDay(dayNum) {
    const itineraryContainer = document.querySelector('.itinerary-container');

    const newDayCard = document.createElement('div');
    newDayCard.className = 'day-card card';
    newDayCard.innerHTML = `
        <h4>Day ${dayNum}</h4>
        <div class="day-activities">
            <div class="activity">
                <strong>Morning:</strong> New activity
            </div>
            <div class="activity">
                <strong>Afternoon:</strong> Another activity
            </div>
        </div>
        <div class="day-actions" style="margin-top: 10px;">
            <button class="btn btn-outline edit-day-btn">Edit</button>
            <button class="btn btn-accent delete-day-btn">Delete</button>
        </div>
    `;

    // Add event listeners to new buttons
    const editBtn = newDayCard.querySelector('.edit-day-btn');
    const deleteBtn = newDayCard.querySelector('.delete-day-btn');

    editBtn.addEventListener('click', () => editDay(newDayCard));
    deleteBtn.addEventListener('click', () => deleteDay(newDayCard));

    itineraryContainer.appendChild(newDayCard);

    // Animate in
    newDayCard.style.opacity = '0';
    newDayCard.style.transform = 'translateY(20px)';
    setTimeout(() => {
        newDayCard.style.transition = 'all 0.3s ease';
        newDayCard.style.opacity = '1';
        newDayCard.style.transform = 'translateY(0)';
    }, 10);

    showNotification('New day added to itinerary!');
}

function editDay(dayCard) {
    const dayTitle = dayCard.querySelector('h4').textContent;
    const activities = Array.from(dayCard.querySelectorAll('.activity')).map(a => a.innerHTML);

    // Simple edit functionality - you can expand this with a proper form
    const newActivity = prompt(`Edit activity for ${dayTitle}:`, activities[0]?.replace(/<[^>]*>/g, ''));
    if (newActivity) {
        dayCard.querySelector('.activity').innerHTML = `<strong>Morning:</strong> ${newActivity}`;
        showNotification(`${dayTitle} updated!`);
    }
}

function deleteDay(dayCard) {
    if (confirm('Are you sure you want to delete this day?')) {
        dayCard.style.transition = 'all 0.3s ease';
        dayCard.style.opacity = '0';
        dayCard.style.transform = 'translateX(-100%)';
        setTimeout(() => {
            dayCard.remove();
            showNotification('Day removed from itinerary');
        }, 300);
    }
}

// ==================== BOOKING SYSTEM ====================
function initBooking() {
    const bookingCards = document.querySelectorAll('.booking-card');

    bookingCards.forEach(card => {
        const bookBtn = card.querySelector('.btn');
        bookBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceType = card.querySelector('h3')?.textContent;
            bookService(serviceType);
        });
    });
}

function bookService(serviceType) {
    showModal(`Book ${serviceType}`, `
        <form class="booking-form">
            <div class="form-group">
                <label>Destination:</label>
                <input type="text" name="destination" required>
            </div>
            <div class="form-group">
                <label>Check-in Date:</label>
                <input type="date" name="checkin" required>
            </div>
            <div class="form-group">
                <label>Check-out Date:</label>
                <input type="date" name="checkout" required>
            </div>
            <div class="form-group">
                <label>Guests:</label>
                <select name="guests">
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests</option>
                </select>
            </div>
            <button type="submit" class="btn">Complete Booking</button>
        </form>
    `);

    // Handle booking form submission
    setTimeout(() => {
        const bookingForm = document.querySelector('.booking-form');
        bookingForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            const destination = formData.get('destination');
            closeModal();
            showNotification(`${serviceType} booked for ${destination}!`);
        });
    }, 100);
}

// ==================== BUDGET TRACKER ====================
function initBudgetTracker() {
    const addExpenseBtn = document.querySelector('.add-expense-btn');

    // Create add expense button if it doesn't exist
    if (!addExpenseBtn) {
        const budgetSection = document.querySelector('.budget-section');
        const newBtn = document.createElement('button');
        newBtn.className = 'btn add-expense-btn';
        newBtn.textContent = 'Add Expense';
        newBtn.style.marginTop = '20px';
        budgetSection?.appendChild(newBtn);

        newBtn.addEventListener('click', showAddExpenseForm);
    } else {
        addExpenseBtn.addEventListener('click', showAddExpenseForm);
    }

    calculateTotalBudget();
}

function showAddExpenseForm() {
    showModal('Add New Expense', `
        <form class="expense-form">
            <div class="form-group">
                <label>Date:</label>
                <input type="date" name="date" required>
            </div>
            <div class="form-group">
                <label>Expense Type:</label>
                <select name="type" required>
                    <option value="">Select type</option>
                    <option value="Flight">Flight</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Meals">Meals</option>
                    <option value="Activities">Activities</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label>Amount:</label>
                <input type="number" name="amount" step="0.01" required>
            </div>
            <div class="form-group">
                <label>Notes:</label>
                <input type="text" name="notes">
            </div>
            <button type="submit" class="btn">Add Expense</button>
        </form>
    `);

    setTimeout(() => {
        const expenseForm = document.querySelector('.expense-form');
        expenseForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            addExpenseToTable(new FormData(expenseForm));
        });
    }, 100);
}

function addExpenseToTable(formData) {
    const table = document.querySelector('.budget-table tbody');
    if (!table) return;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${formatDate(formData.get('date'))}</td>
        <td>${formData.get('type')}</td>
        <td>$${parseFloat(formData.get('amount')).toFixed(2)}</td>
        <td>${formData.get('notes') || '-'}</td>
        <td><button class="btn btn-accent remove-expense">Remove</button></td>
    `;

    table.appendChild(newRow);

    // Add remove functionality
    const removeBtn = newRow.querySelector('.remove-expense');
    removeBtn.addEventListener('click', () => {
        newRow.remove();
        calculateTotalBudget();
        showNotification('Expense removed');
    });

    closeModal();
    calculateTotalBudget();
    showNotification('Expense added successfully!');
}

function calculateTotalBudget() {
    const amounts = Array.from(document.querySelectorAll('.budget-table tbody td:nth-child(3)'))
        .map(cell => parseFloat(cell.textContent.replace('$', '')) || 0);

    const total = amounts.reduce((sum, amount) => sum + amount, 0);

    let totalElement = document.querySelector('.budget-total');
    if (!totalElement) {
        totalElement = document.createElement('div');
        totalElement.className = 'budget-total';
        totalElement.style.cssText = 'margin-top: 20px; font-size: 1.2em; font-weight: bold; text-align: right;';
        document.querySelector('.budget-table')?.parentNode.appendChild(totalElement);
    }

    totalElement.textContent = `Total Budget: $${total.toFixed(2)}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });
}

// ==================== COMMUNITY FEATURES ====================
function initCommunity() {
    const testimonials = document.querySelectorAll('.testimonial');
    const itineraryCards = document.querySelectorAll('.shared-itinerary');

    // Testimonial interactions
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('click', () => {
            testimonial.style.transform = 'scale(1.05)';
            setTimeout(() => {
                testimonial.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Shared itinerary interactions
    itineraryCards.forEach(card => {
        const viewBtn = document.createElement('button');
        viewBtn.className = 'btn btn-outline';
        viewBtn.textContent = 'View Details';
        viewBtn.style.marginTop = '10px';

        viewBtn.addEventListener('click', () => {
            const title = card.querySelector('h4')?.textContent;
            showItineraryDetails(title);
        });

        card.appendChild(viewBtn);
    });

    // Add new testimonial functionality
    addTestimonialButton();
}

function showItineraryDetails(title) {
    const sampleDetails = {
        '7-day itinerary exploring the Amalfi Coast': 'Day 1: Arrive in Naples, explore historic center\nDay 2: Positano - beach and shopping\nDay 3: Amalfi - cathedral and lemon groves\nDay 4: Ravello - gardens and views\nDay 5: Capri day trip\nDay 6: Sorrento - limoncello tasting\nDay 7: Return to Naples',
        '10-day cultural immersion in Tokyo and Kyoto': 'Tokyo (5 days): Shibuya, Harajuku, temples, food tours\nKyoto (5 days): Traditional districts, bamboo forest, tea ceremonies\nIncluded: JR Pass, cultural workshops, guided tours',
        '14-day road trip through 5 national parks': 'Yellowstone → Grand Teton → Arches → Canyonlands → Zion\nIncludes camping spots, hiking trails, and photo locations'
    };

    const details = sampleDetails[title] || 'Detailed itinerary coming soon...';

    showModal(title, `
        <div class="itinerary-details">
            <p>${details.replace(/\n/g, '<br>')}</p>
            <button class="btn" onclick="copyItinerary('${title}')">Copy to My Itinerary</button>
        </div>
    `);
}

function copyItinerary(title) {
    showNotification(`"${title}" copied to your itinerary!`);
    closeModal();
}

function addTestimonialButton() {
    const communitySection = document.querySelector('.community-section');
    const addBtn = document.createElement('button');
    addBtn.className = 'btn add-testimonial-btn';
    addBtn.textContent = 'Share Your Experience';
    addBtn.style.marginTop = '20px';

    addBtn.addEventListener('click', () => {
        showModal('Share Your Experience', `
            <form class="testimonial-form">
                <div class="form-group">
                    <label>Your Name:</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Your Experience:</label>
                    <textarea name="testimonial" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label>Rating:</label>
                    <select name="rating">
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>
                <button type="submit" class="btn">Submit Testimonial</button>
            </form>
        `);

        setTimeout(() => {
            const form = document.querySelector('.testimonial-form');
            form?.addEventListener('submit', (e) => {
                e.preventDefault();
                closeModal();
                showNotification('Thank you for sharing your experience!');
            });
        }, 100);
    });

    communitySection?.appendChild(addBtn);
}

// ==================== UTILITIES ====================
function initUtilities() {
    // Weather widget click
    const weatherWidget = document.querySelector('.weather-info');
    weatherWidget?.addEventListener('click', () => {
        showNotification('Weather details: Sunny, 75°F. Perfect for outdoor activities!');
    });

    // Travel advisory click
    const advisory = document.querySelector('.travel-advisory');
    advisory?.addEventListener('click', () => {
        showNotification('All travel advisories up to date. Safe travels!');
    });
}

// ==================== MODAL SYSTEM ====================
function showModal(title, content) {
    // Remove existing modal
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add modal styles
    const modalStyles = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal {
            background: white;
            padding: 0;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
        }
        .modal-header {
            padding: 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-content {
            padding: 20px;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    `;

    // Add styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }

    // Close modal events
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 200);
    }
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4a90e2;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    `;

    if (type === 'error') {
        notification.style.background = '#ff6b6b';
    } else if (type === 'success') {
        notification.style.background = '#51cf66';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== SMOOTH SCROLLING ====================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                const menu = document.querySelector('.menu');
                const hamburger = document.querySelector('.hamburger');
                menu?.classList.remove('active');
                hamburger?.classList.remove('active');
            }
        });
    });
}

// ==================== ANIMATIONS ====================
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply to cards and sections
    const animatedElements = document.querySelectorAll('.card, .category-card, .booking-card, .testimonial');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ==================== UTILITY FUNCTIONS ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for external use (if needed)
window.GoGlobeJS = {
    showNotification,
    showModal,
    closeModal,
    performSearch,
    copyItinerary
};

console.log('GoGlobe Travel Website JavaScript loaded successfully!');
