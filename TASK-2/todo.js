// Task Manager Application
class TaskManager {
    constructor() {
        // Data from provided JSON
        this.categories = [
            { id: "work", name: "Work", color: "#FF8F00", icon: "💼" },
            { id: "personal", name: "Personal", color: "#FFA000", icon: "🏠" },
            { id: "shopping", name: "Shopping", color: "#FFB300", icon: "🛒" },
            { id: "health", name: "Health", color: "#FFC107", icon: "💪" },
            { id: "study", name: "Study", color: "#FFD54F", icon: "📚" },
            { id: "hobby", name: "Hobby", color: "#FFEB3B", icon: "🎨" }
        ];

        this.priorities = [
            { id: "high", name: "High", color: "#FF5722", badge: "🔥" },
            { id: "medium", name: "Medium", color: "#FF9800", badge: "⚡" },
            { id: "low", name: "Low", color: "#4CAF50", badge: "🌿" }
        ];

        // Sample tasks
        this.tasks = [
            {
                id: 1,
                name: "Complete project proposal",
                category: "work",
                priority: "high",
                deadline: "2025-08-22",
                completed: false,
                createdAt: "2025-08-19"
            },
            {
                id: 2,
                name: "Buy groceries for dinner",
                category: "shopping",
                priority: "medium",
                deadline: "2025-08-20",
                completed: false,
                createdAt: "2025-08-19"
            }
        ];

        this.currentFilter = { status: 'all', category: 'all' };
        this.currentSort = 'created';
        this.editingTaskId = null;
        this.deletingTaskId = null;

        this.init();
    }

    init() {
        this.populateCategories();
        this.renderCategoryFilters();
        this.bindEvents();
        this.renderTasks();
        this.updateStats();
        this.setMinDate();
    }

    bindEvents() {
        // Add task form
        const addForm = document.getElementById('add-task-form');
        if (addForm) {
            addForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addTask();
            });
        }

        // Sort dropdown
        const sortSelect = document.getElementById('sort-tasks');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.setSortOption(e.target.value);
            });
        }

        // Modal events
        const closeModal = document.getElementById('close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.closeEditModal();
            });
        }

        const cancelEdit = document.getElementById('cancel-edit');
        if (cancelEdit) {
            cancelEdit.addEventListener('click', () => {
                this.closeEditModal();
            });
        }

        const editForm = document.getElementById('edit-task-form');
        if (editForm) {
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveEditedTask();
            });
        }

        // Confirmation modal
        const cancelDelete = document.getElementById('cancel-delete');
        if (cancelDelete) {
            cancelDelete.addEventListener('click', () => {
                this.closeConfirmModal();
            });
        }

        const confirmDelete = document.getElementById('confirm-delete');
        if (confirmDelete) {
            confirmDelete.addEventListener('click', () => {
                this.confirmDeleteTask();
            });
        }

        // Close modals when clicking outside
        const editModal = document.getElementById('edit-modal');
        if (editModal) {
            editModal.addEventListener('click', (e) => {
                if (e.target.id === 'edit-modal') {
                    this.closeEditModal();
                }
            });
        }

        const confirmModal = document.getElementById('confirm-modal');
        if (confirmModal) {
            confirmModal.addEventListener('click', (e) => {
                if (e.target.id === 'confirm-modal') {
                    this.closeConfirmModal();
                }
            });
        }

        // Status filter buttons
        const statusFilterBtns = document.querySelectorAll('.filter-btn');
        statusFilterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.setStatusFilter(e.target.dataset.filter);
            });
        });
    }

    populateCategories() {
        const selects = [
            document.getElementById('task-category'),
            document.getElementById('edit-task-category')
        ];

        selects.forEach(select => {
            if (select) {
                select.innerHTML = '<option value="">Choose a category...</option>';
                this.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = `${category.icon} ${category.name}`;
                    select.appendChild(option);
                });
            }
        });
    }

    renderCategoryFilters() {
        const container = document.getElementById('category-filters');
        if (!container) return;

        container.innerHTML = '<button class="category-btn active" data-category="all">All</button>';

        this.categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.dataset.category = category.id;
            btn.innerHTML = `${category.icon} ${category.name}`;
            container.appendChild(btn);
        });

        // Add event listeners to category buttons
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                e.preventDefault();
                this.setCategoryFilter(e.target.dataset.category);
            }
        });
    }

    setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        const deadlineInput = document.getElementById('task-deadline');
        const editDeadlineInput = document.getElementById('edit-task-deadline');
        
        if (deadlineInput) deadlineInput.setAttribute('min', today);
        if (editDeadlineInput) editDeadlineInput.setAttribute('min', today);
    }

    addTask() {
        // Get form values
        const nameInput = document.getElementById('task-name');
        const categorySelect = document.getElementById('task-category');
        const prioritySelect = document.getElementById('task-priority');
        const deadlineInput = document.getElementById('task-deadline');

        if (!nameInput || !categorySelect || !prioritySelect || !deadlineInput) {
            console.error('Form elements not found');
            return;
        }

        const name = nameInput.value.trim();
        const category = categorySelect.value;
        const priority = prioritySelect.value;
        const deadline = deadlineInput.value;

        // Clear previous errors
        this.clearErrors();

        // Validate
        let hasErrors = false;

        if (name.length < 3) {
            this.showError('task-name-error', 'Task name must be at least 3 characters long');
            hasErrors = true;
        }

        if (name.length > 100) {
            this.showError('task-name-error', 'Task name must be less than 100 characters');
            hasErrors = true;
        }

        if (!category) {
            this.showError('task-category-error', 'Please select a category');
            hasErrors = true;
        }

        if (deadline && new Date(deadline) < new Date()) {
            this.showError('task-deadline-error', 'Deadline cannot be in the past');
            hasErrors = true;
        }

        if (hasErrors) return;

        // Create new task
        const newTask = {
            id: Date.now(),
            name: name,
            category: category,
            priority: priority,
            deadline: deadline,
            completed: false,
            createdAt: new Date().toISOString().split('T')[0]
        };

        this.tasks.unshift(newTask);
        this.renderTasks();
        this.updateStats();

        // Reset form
        document.getElementById('add-task-form').reset();

        // Show success message
        this.showSuccessMessage('Task added successfully! ✨');
    }

    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        this.editingTaskId = taskId;

        // Populate modal form
        const editName = document.getElementById('edit-task-name');
        const editCategory = document.getElementById('edit-task-category');
        const editPriority = document.getElementById('edit-task-priority');
        const editDeadline = document.getElementById('edit-task-deadline');

        if (editName) editName.value = task.name;
        if (editCategory) editCategory.value = task.category;
        if (editPriority) editPriority.value = task.priority;
        if (editDeadline) editDeadline.value = task.deadline;

        // Show modal
        const modal = document.getElementById('edit-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    saveEditedTask() {
        const editName = document.getElementById('edit-task-name');
        const editCategory = document.getElementById('edit-task-category');
        const editPriority = document.getElementById('edit-task-priority');
        const editDeadline = document.getElementById('edit-task-deadline');

        if (!editName || !editCategory || !editPriority || !editDeadline) return;

        const name = editName.value.trim();
        const category = editCategory.value;
        const priority = editPriority.value;
        const deadline = editDeadline.value;

        // Clear previous errors
        const nameError = document.getElementById('edit-task-name-error');
        const deadlineError = document.getElementById('edit-task-deadline-error');
        if (nameError) nameError.textContent = '';
        if (deadlineError) deadlineError.textContent = '';

        // Validate
        let hasErrors = false;

        if (name.length < 3) {
            if (nameError) nameError.textContent = 'Task name must be at least 3 characters long';
            hasErrors = true;
        }

        if (name.length > 100) {
            if (nameError) nameError.textContent = 'Task name must be less than 100 characters';
            hasErrors = true;
        }

        if (deadline && new Date(deadline) < new Date()) {
            if (deadlineError) deadlineError.textContent = 'Deadline cannot be in the past';
            hasErrors = true;
        }

        if (hasErrors) return;

        // Update task
        const taskIndex = this.tasks.findIndex(t => t.id === this.editingTaskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = {
                ...this.tasks[taskIndex],
                name: name,
                category: category,
                priority: priority,
                deadline: deadline
            };

            this.renderTasks();
            this.updateStats();
            this.closeEditModal();
            this.showSuccessMessage('Task updated successfully! 💫');
        }
    }

    deleteTask(taskId) {
        this.deletingTaskId = taskId;
        const modal = document.getElementById('confirm-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    confirmDeleteTask() {
        const taskIndex = this.tasks.findIndex(t => t.id === this.deletingTaskId);
        if (taskIndex !== -1) {
            const taskElement = document.querySelector(`[data-task-id="${this.deletingTaskId}"]`);
            if (taskElement) {
                taskElement.classList.add('removing');
                setTimeout(() => {
                    this.tasks.splice(taskIndex, 1);
                    this.renderTasks();
                    this.updateStats();
                    this.showSuccessMessage('Task deleted successfully! 🗑️');
                }, 250);
            }
        }
        this.closeConfirmModal();
    }

    toggleTaskComplete(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.renderTasks();
            this.updateStats();
            
            if (task.completed) {
                this.showSuccessMessage('Great job! Task completed! 🎉');
            }
        }
    }

    setStatusFilter(status) {
        this.currentFilter.status = status;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-filter="${status}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        this.renderTasks();
    }

    setCategoryFilter(category) {
        this.currentFilter.category = category;
        
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-category="${category}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        this.renderTasks();
    }

    setSortOption(sortBy) {
        this.currentSort = sortBy;
        this.renderTasks();
    }

    getFilteredAndSortedTasks() {
        let filteredTasks = [...this.tasks];

        // Filter by status
        if (this.currentFilter.status === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.completed);
        } else if (this.currentFilter.status === 'pending') {
            filteredTasks = filteredTasks.filter(task => !task.completed);
        }

        // Filter by category
        if (this.currentFilter.category !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.category === this.currentFilter.category);
        }

        // Sort tasks
        filteredTasks.sort((a, b) => {
            switch (this.currentSort) {
                case 'deadline':
                    if (!a.deadline && !b.deadline) return 0;
                    if (!a.deadline) return 1;
                    if (!b.deadline) return -1;
                    return new Date(a.deadline) - new Date(b.deadline);
                case 'priority':
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                case 'created':
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

        return filteredTasks;
    }

    renderTasks() {
        const container = document.getElementById('tasks-grid');
        if (!container) return;

        const tasks = this.getFilteredAndSortedTasks();

        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🌟</div>
                    <h3>No tasks found!</h3>
                    <p>Try adjusting your filters or add a new task to get started!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = tasks.map(task => this.createTaskHTML(task)).join('');

        // Add event listeners to task elements
        tasks.forEach(task => {
            const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
            if (taskElement) {
                // Add animation class
                if (!taskElement.classList.contains('new')) {
                    taskElement.classList.add('new');
                    setTimeout(() => taskElement.classList.remove('new'), 500);
                }

                // Checkbox event
                const checkbox = taskElement.querySelector('.task-checkbox input');
                if (checkbox) {
                    // Remove existing event listeners
                    const newCheckbox = checkbox.cloneNode(true);
                    checkbox.parentNode.replaceChild(newCheckbox, checkbox);
                    
                    newCheckbox.addEventListener('change', (e) => {
                        e.stopPropagation();
                        this.toggleTaskComplete(task.id);
                    });
                }

                // Edit button
                const editBtn = taskElement.querySelector('.edit-btn');
                if (editBtn) {
                    editBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.editTask(task.id);
                    });
                }

                // Delete button
                const deleteBtn = taskElement.querySelector('.delete-btn');
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.deleteTask(task.id);
                    });
                }
            }
        });
    }

    createTaskHTML(task) {
        const category = this.categories.find(c => c.id === task.category);
        const priority = this.priorities.find(p => p.id === task.priority);
        
        const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed;
        const deadlineText = task.deadline ? this.formatDate(task.deadline) : 'No deadline';

        return `
            <div class="task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}" data-task-id="${task.id}">
                <div class="task-header">
                    <h4 class="task-title ${task.completed ? 'completed' : ''}">${task.name}</h4>
                    <div class="task-actions">
                        <button class="task-btn edit-btn" title="Edit task" type="button">✏️</button>
                        <button class="task-btn delete-btn" title="Delete task" type="button">🗑️</button>
                    </div>
                </div>
                
                <div class="task-details">
                    <div class="task-meta">
                        <div class="task-category">
                            ${category ? category.icon : '📋'} ${category ? category.name : 'Unknown'}
                        </div>
                        <div class="task-priority ${task.priority}">
                            ${priority ? priority.badge : '⚡'} ${priority ? priority.name : 'Medium'}
                        </div>
                    </div>
                    
                    <div class="task-deadline ${isOverdue ? 'overdue' : ''}">
                        🗓️ ${deadlineText} ${isOverdue ? '(Overdue!)' : ''}
                    </div>
                    
                    <div class="task-checkbox">
                        <input type="checkbox" ${task.completed ? 'checked' : ''}>
                        <label>${task.completed ? 'Completed! 🎉' : 'Mark as complete'}</label>
                    </div>
                </div>
            </div>
        `;
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;

        const totalElement = document.getElementById('total-tasks');
        const pendingElement = document.getElementById('pending-tasks');
        const completedElement = document.getElementById('completed-tasks');

        if (totalElement) totalElement.textContent = total;
        if (pendingElement) pendingElement.textContent = pending;
        if (completedElement) completedElement.textContent = completed;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }

    closeEditModal() {
        const modal = document.getElementById('edit-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.editingTaskId = null;
    }

    closeConfirmModal() {
        const modal = document.getElementById('confirm-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.deletingTaskId = null;
    }

    clearErrors() {
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
    }

    showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
        }
    }

    showSuccessMessage(message) {
        // Create and show a temporary success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                font-weight: 500;
                animation: slideIn 0.3s ease-out;
            ">
                ${message}
            </div>
        `;

        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (document.body.contains(successDiv)) {
                    document.body.removeChild(successDiv);
                }
            }, 300);
        }, 2000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to close modals
    if (e.key === 'Escape') {
        const editModal = document.getElementById('edit-modal');
        const confirmModal = document.getElementById('confirm-modal');
        
        if (editModal && !editModal.classList.contains('hidden')) {
            editModal.classList.add('hidden');
        }
        
        if (confirmModal && !confirmModal.classList.contains('hidden')) {
            confirmModal.classList.add('hidden');
        }
    }
    
    // Ctrl/Cmd + Enter to submit add task form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const addForm = document.getElementById('add-task-form');
        const taskNameInput = document.getElementById('task-name');
        
        if (taskNameInput && (document.activeElement === taskNameInput || (addForm && addForm.contains(document.activeElement)))) {
            e.preventDefault();
            if (addForm) {
                addForm.dispatchEvent(new Event('submit'));
            }
        }
    }
});