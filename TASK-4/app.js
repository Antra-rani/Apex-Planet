// Application Data
const portfolioData = {
  "about": {
    "name": "Antra Rani",
    "title": "Computer Science Student & Web Developer",
    "description": "Passionate computer science student from Ranchi, Jharkhand, specializing in web development and software engineering. Currently building modern web applications using HTML, CSS, JavaScript, and Node.js.",
    "skills": ["JavaScript", "HTML/CSS", "Node.js", "Git/GitHub", "Responsive Design", "Java", "Information Security"],
    "education": "Computer Science Student",
    "location": "Ranchi, Jharkhand"
  },
  "projects": [
    {
      "name": "Spotify Clone",
      "description": "A responsive music player interface built with HTML, CSS, and JavaScript",
      "technologies": ["HTML", "CSS", "JavaScript"],
      "status": "Completed"
    },
    {
      "name": "Personal Portfolio",
      "description": "Multi-page responsive portfolio website showcasing projects and skills",
      "technologies": ["HTML", "CSS", "JavaScript", "Responsive Design"],
      "status": "In Progress"
    },
    {
      "name": "Universal Dictionary",
      "description": "Web-based dictionary application with search and definition features",
      "technologies": ["HTML", "CSS", "JavaScript", "API Integration"],
      "status": "Completed"
    },
    {
      "name": "Animal Blog Website",
      "description": "Minimal blog website featuring animal content and responsive design",
      "technologies": ["HTML", "CSS", "JavaScript"],
      "status": "Completed"
    }
  ]
};

const todoCategories = ["Work", "Personal", "Shopping", "Health", "Education", "Entertainment"];

let sampleTasks = [
  {"id": 1, "text": "Complete Node.js tutorial", "category": "Education", "priority": "High", "completed": false},
  {"id": 2, "text": "Update GitHub repositories", "category": "Work", "priority": "Medium", "completed": false},
  {"id": 3, "text": "Prepare for CoThon interview", "category": "Work", "priority": "High", "completed": true},
  {"id": 4, "text": "Buy groceries", "category": "Shopping", "priority": "Low", "completed": false}
];

const products = [
  {
    "id": 1,
    "name": "Gaming Laptop",
    "category": "Electronics",
    "price": 75000,
    "rating": 4.5,
    "description": "High-performance gaming laptop with RTX graphics"
  },
  {
    "id": 2,
    "name": "Wireless Headphones",
    "category": "Electronics",
    "price": 8000,
    "rating": 4.3,
    "description": "Premium noise-cancelling wireless headphones"
  },
  {
    "id": 3,
    "name": "Programming Book",
    "category": "Books",
    "price": 1200,
    "rating": 4.7,
    "description": "Complete guide to JavaScript programming"
  },
  {
    "id": 4,
    "name": "Casual T-Shirt",
    "category": "Clothing",
    "price": 800,
    "rating": 4.1,
    "description": "Comfortable cotton t-shirt for everyday wear"
  },
  {
    "id": 5,
    "name": "Smart Watch",
    "category": "Electronics",
    "price": 15000,
    "rating": 4.4,
    "description": "Feature-rich smartwatch with health tracking"
  },
  {
    "id": 6,
    "name": "Desk Lamp",
    "category": "Home",
    "price": 2500,
    "rating": 4.2,
    "description": "LED desk lamp with adjustable brightness"
  },
  {
    "id": 7,
    "name": "Running Shoes",
    "category": "Clothing",
    "price": 4500,
    "rating": 4.6,
    "description": "Lightweight running shoes with superior comfort"
  },
  {
    "id": 8,
    "name": "Web Design Book",
    "category": "Books",
    "price": 1800,
    "rating": 4.5,
    "description": "Modern web design principles and practices"
  }
];

const categories = ["All", "Electronics", "Clothing", "Books", "Home"];

// Global state
let currentSection = 'home';
let currentPortfolioSection = 'about';
let tasks = [...sampleTasks];
let taskIdCounter = 5;
let filteredProducts = [...products];
let cart = [];
let currentFilters = {
  category: 'All',
  priceRange: 100000,
  search: ''
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  
  // Small delay to ensure all elements are rendered
  setTimeout(() => {
    initializeApp();
  }, 100);
});

function initializeApp() {
  console.log('Starting app initialization...');
  
  initializeNavigation();
  initializePortfolio();
  initializeTodo();
  initializeProducts();
  initializeModals();
  
  console.log('App initialization complete');
}

// Navigation System
function initializeNavigation() {
  console.log('Setting up navigation...');
  
  // Main navigation links
  const navLinks = document.querySelectorAll('.navbar__link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      console.log('Nav link clicked:', section);
      showSection(section);
    });
  });
  
  // Project tiles
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', function() {
      const section = this.getAttribute('data-section');
      console.log('Tile clicked:', section);
      showSection(section);
    });
  });
  
  // Project tile buttons
  const tileButtons = document.querySelectorAll('.tile__button');
  tileButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const tile = this.closest('.tile');
      const section = tile.getAttribute('data-section');
      console.log('Tile button clicked:', section);
      showSection(section);
    });
  });
  
  // Portfolio sub-navigation
  const portfolioNavBtns = document.querySelectorAll('.portfolio-nav__btn');
  portfolioNavBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const section = this.getAttribute('data-portfolio');
      console.log('Portfolio nav clicked:', section);
      showPortfolioSection(section);
    });
  });
}

function showSection(sectionName) {
  console.log('Showing section:', sectionName);
  
  // Update navigation active states
  const navLinks = document.querySelectorAll('.navbar__link');
  navLinks.forEach(link => {
    if (link.getAttribute('data-section') === sectionName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Show/hide sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    if (section.id === sectionName) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });

  currentSection = sectionName;

  // Reset portfolio to about when entering portfolio section
  if (sectionName === 'portfolio') {
    showPortfolioSection('about');
  }
}

function showPortfolioSection(sectionName) {
  console.log('Showing portfolio section:', sectionName);
  
  // Update portfolio navigation
  const portfolioNavBtns = document.querySelectorAll('.portfolio-nav__btn');
  portfolioNavBtns.forEach(btn => {
    if (btn.getAttribute('data-portfolio') === sectionName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Show/hide portfolio content
  const portfolioContents = document.querySelectorAll('.portfolio-content');
  portfolioContents.forEach(content => {
    if (content.id === sectionName) {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  });

  currentPortfolioSection = sectionName;
}

// Portfolio Section
function initializePortfolio() {
  console.log('Initializing portfolio...');
  
  loadAboutData();
  loadProjectsData();
  setupContactForm();
}

function loadAboutData() {
  const about = portfolioData.about;
  
  const elements = {
    title: document.getElementById('about-title'),
    description: document.getElementById('about-description'),
    education: document.getElementById('about-education'),
    location: document.getElementById('about-location'),
    skillsList: document.getElementById('skills-list')
  };

  if (elements.title) elements.title.textContent = about.title;
  if (elements.description) elements.description.textContent = about.description;
  if (elements.education) elements.education.textContent = about.education;
  if (elements.location) elements.location.textContent = about.location;

  if (elements.skillsList) {
    elements.skillsList.innerHTML = '';
    about.skills.forEach(skill => {
      const skillTag = document.createElement('span');
      skillTag.className = 'skill-tag';
      skillTag.textContent = skill;
      elements.skillsList.appendChild(skillTag);
    });
  }
}

function loadProjectsData() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;
  
  projectsGrid.innerHTML = '';

  portfolioData.projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';

    const statusClass = project.status === 'Completed' ? 'project-status--completed' : 'project-status--progress';
    
    projectCard.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="project-tech">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
      <span class="project-status ${statusClass}">${project.status}</span>
    `;

    projectsGrid.appendChild(projectCard);
  });
}

function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Contact form submitted');
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
      showToast('Message sent successfully!', 'success');
      contactForm.reset();
    } else {
      showToast('Please fill in all fields', 'error');
    }
  });
}

// To-Do Section
function initializeTodo() {
  console.log('Initializing todo...');
  
  setupTodoControls();
  loadTodoCategories();
  renderTasks();
  updateTaskStats();
}

function setupTodoControls() {
  const addTaskBtn = document.getElementById('addTaskBtn');
  const newTaskInput = document.getElementById('newTaskInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const searchTasks = document.getElementById('searchTasks');

  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', addTask);
  }
  
  if (newTaskInput) {
    newTaskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTask();
      }
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterTasks);
  }
  
  if (searchTasks) {
    searchTasks.addEventListener('input', filterTasks);
  }
}

function loadTodoCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const taskCategory = document.getElementById('taskCategory');

  if (categoryFilter) {
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    todoCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }

  if (taskCategory) {
    taskCategory.innerHTML = '';
    todoCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      taskCategory.appendChild(option);
    });
  }
}

function addTask() {
  console.log('Adding task...');
  
  const input = document.getElementById('newTaskInput');
  const categorySelect = document.getElementById('taskCategory');
  const prioritySelect = document.getElementById('taskPriority');

  if (!input || !categorySelect || !prioritySelect) {
    console.error('Task input elements not found');
    return;
  }

  const text = input.value.trim();
  if (!text) {
    showToast('Please enter a task', 'error');
    return;
  }

  const newTask = {
    id: taskIdCounter++,
    text: text,
    category: categorySelect.value,
    priority: prioritySelect.value,
    completed: false
  };

  tasks.unshift(newTask);
  input.value = '';
  
  renderTasks();
  updateTaskStats();
  showToast('Task added successfully!', 'success');
}

function filterTasks() {
  const categoryFilter = document.getElementById('categoryFilter');
  const searchTasks = document.getElementById('searchTasks');
  
  if (!categoryFilter || !searchTasks) return;
  
  const categoryValue = categoryFilter.value;
  const searchText = searchTasks.value.toLowerCase();

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = !categoryValue || task.category === categoryValue;
    const matchesSearch = !searchText || task.text.toLowerCase().includes(searchText);
    return matchesCategory && matchesSearch;
  });

  renderFilteredTasks(filteredTasks);
}

function renderTasks() {
  renderFilteredTasks(tasks);
}

function renderFilteredTasks(tasksToRender) {
  const tasksList = document.getElementById('tasksList');
  if (!tasksList) return;
  
  tasksList.innerHTML = '';

  if (tasksToRender.length === 0) {
    tasksList.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: 2rem;">No tasks found</p>';
    return;
  }

  tasksToRender.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    taskItem.innerHTML = `
      <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
      <div class="task-content">
        <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
        <div class="task-meta">
          <span class="task-category">${task.category}</span>
          <span class="task-priority task-priority--${task.priority.toLowerCase()}">${task.priority}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="task-action" onclick="editTask(${task.id})" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="task-action task-action--delete" onclick="deleteTask(${task.id})" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    tasksList.appendChild(taskItem);
  });
}

function toggleTask(taskId) {
  console.log('Toggling task:', taskId);
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
    updateTaskStats();
    showToast(`Task ${task.completed ? 'completed' : 'reopened'}!`, 'info');
  }
}

function deleteTask(taskId) {
  console.log('Deleting task:', taskId);
  tasks = tasks.filter(t => t.id !== taskId);
  renderTasks();
  updateTaskStats();
  showToast('Task deleted!', 'error');
}

function editTask(taskId) {
  console.log('Editing task:', taskId);
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    const newText = prompt('Edit task:', task.text);
    if (newText && newText.trim()) {
      task.text = newText.trim();
      renderTasks();
      showToast('Task updated!', 'success');
    }
  }
}

function updateTaskStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  const elements = {
    total: document.getElementById('totalTasks'),
    completed: document.getElementById('completedTasks'),
    pending: document.getElementById('pendingTasks')
  };

  if (elements.total) elements.total.textContent = total;
  if (elements.completed) elements.completed.textContent = completed;
  if (elements.pending) elements.pending.textContent = pending;
}

// Products Section
function initializeProducts() {
  console.log('Initializing products...');
  
  setupProductControls();
  loadCategoryFilters();
  renderProducts();
  updateCartDisplay();
}

function setupProductControls() {
  const productSearch = document.getElementById('productSearch');
  const sortProducts = document.getElementById('sortProducts');
  const priceRange = document.getElementById('priceRange');
  const cartBtn = document.getElementById('cartBtn');

  if (productSearch) {
    productSearch.addEventListener('input', function() {
      console.log('Product search:', this.value);
      applyFilters();
    });
  }
  
  if (sortProducts) {
    sortProducts.addEventListener('change', function() {
      console.log('Sort changed:', this.value);
      applyFilters();
    });
  }
  
  if (priceRange) {
    priceRange.addEventListener('input', function() {
      const priceValue = document.getElementById('priceValue');
      if (priceValue) {
        priceValue.textContent = this.value;
      }
      applyFilters();
    });
  }

  if (cartBtn) {
    cartBtn.addEventListener('click', function() {
      console.log('Cart button clicked');
      const cartModal = document.getElementById('cartModal');
      if (cartModal) {
        cartModal.classList.remove('hidden');
        renderCartModal();
      }
    });
  }
}

function loadCategoryFilters() {
  const categoryFilters = document.getElementById('categoryFilters');
  if (!categoryFilters) return;
  
  categoryFilters.innerHTML = '';

  categories.forEach(category => {
    const filterDiv = document.createElement('div');
    filterDiv.className = 'category-filter';
    filterDiv.innerHTML = `
      <input type="radio" name="category" value="${category}" id="cat-${category}" ${category === 'All' ? 'checked' : ''}>
      <label for="cat-${category}">${category}</label>
    `;

    filterDiv.addEventListener('click', function() {
      const input = this.querySelector('input');
      input.checked = true;
      currentFilters.category = category;
      console.log('Category filter clicked:', category);
      applyFilters();
    });

    categoryFilters.appendChild(filterDiv);
  });
}

function applyFilters() {
  const productSearch = document.getElementById('productSearch');
  const sortProducts = document.getElementById('sortProducts');
  const priceRange = document.getElementById('priceRange');
  
  const search = productSearch ? productSearch.value.toLowerCase() : '';
  const sort = sortProducts ? sortProducts.value : 'name';
  const maxPrice = priceRange ? parseInt(priceRange.value) : 100000;

  console.log('Applying filters:', { search, sort, maxPrice, category: currentFilters.category });

  // Filter products
  filteredProducts = products.filter(product => {
    const matchesCategory = currentFilters.category === 'All' || product.category === currentFilters.category;
    const matchesSearch = product.name.toLowerCase().includes(search);
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (sort) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  renderProducts();
}

function renderProducts() {
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;
  
  productsGrid.innerHTML = '';

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-secondary); padding: 2rem;">No products found</p>';
    return;
  }

  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
      <div class="product-image">
        <i class="fas fa-cube"></i>
      </div>
      <div class="product-content">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">₹${product.price.toLocaleString()}</div>
        <div class="product-rating">
          ${generateStars(product.rating)}
          <span>(${product.rating})</span>
        </div>
        <p class="product-description">${product.description}</p>
        <div class="product-actions">
          <button class="btn btn--outline btn--sm view-details-btn">View Details</button>
          <button class="btn btn--primary btn--sm add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    `;

    // Add event listeners
    const viewDetailsBtn = productCard.querySelector('.view-details-btn');
    const addToCartBtn = productCard.querySelector('.add-to-cart-btn');

    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener('click', function() {
        console.log('View details clicked for product:', product.id);
        showProductModal(product.id);
      });
    }

    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', function() {
        console.log('Add to cart clicked for product:', product.id);
        addToCart(product.id);
      });
    }

    productsGrid.appendChild(productCard);
  });
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = '';

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

function addToCart(productId) {
  console.log('Adding to cart:', productId);
  const product = products.find(p => p.id === productId);
  if (product) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
    showToast(`${product.name} added to cart!`, 'success');
  }
}

function updateCartDisplay() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) {
    cartCountEl.textContent = cartCount;
  }
}

function showProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const modalBody = document.getElementById('modalBody');
  if (modalBody) {
    modalBody.innerHTML = `
      <div style="display: grid; grid-template-columns: 200px 1fr; gap: 2rem; align-items: start;">
        <div class="product-image" style="height: 200px;">
          <i class="fas fa-cube"></i>  
        </div>
        <div>
          <h2>${product.name}</h2>
          <div class="product-price" style="font-size: 1.5rem; margin: 1rem 0;">₹${product.price.toLocaleString()}</div>
          <div class="product-rating" style="margin-bottom: 1rem;">
            ${generateStars(product.rating)}
            <span>(${product.rating})</span>
          </div>
          <p style="margin-bottom: 1.5rem;">${product.description}</p>
          <div style="display: flex; gap: 1rem;">
            <button class="btn btn--primary modal-add-to-cart-btn">Add to Cart</button>
            <button class="btn btn--outline modal-close-btn">Close</button>
          </div>
        </div>
      </div>
    `;

    // Add event listeners for modal buttons
    const modalAddBtn = modalBody.querySelector('.modal-add-to-cart-btn');
    const modalCloseBtn = modalBody.querySelector('.modal-close-btn');

    if (modalAddBtn) {
      modalAddBtn.addEventListener('click', function() {
        addToCart(productId);
        closeModal();
      });
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }
  }

  const productModal = document.getElementById('productModal');
  if (productModal) {
    productModal.classList.remove('hidden');
  }
}

function renderCartModal() {
  const cartModalBody = document.getElementById('cartModalBody');
  if (!cartModalBody) return;
  
  if (cart.length === 0) {
    cartModalBody.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: 2rem;">Your cart is empty</p>';
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  cartModalBody.innerHTML = `
    <div class="cart-items">
      ${cart.map(item => `
        <div class="cart-item" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid var(--color-border);">
          <div class="product-image" style="width: 60px; height: 60px; flex-shrink: 0;">
            <i class="fas fa-cube"></i>
          </div>
          <div style="flex: 1;">
            <h4 style="margin: 0 0 0.5rem 0;">${item.name}</h4>
            <div style="color: var(--color-text-secondary);">₹${item.price.toLocaleString()}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button class="btn btn--outline btn--sm decrease-btn" data-product-id="${item.id}">-</button>
            <span style="padding: 0 0.5rem;">${item.quantity}</span>
            <button class="btn btn--outline btn--sm increase-btn" data-product-id="${item.id}">+</button>
          </div>
          <button class="btn btn--outline btn--sm remove-btn" data-product-id="${item.id}" style="color: var(--color-error);">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `).join('')}
    </div>
    <div style="padding: 1rem; border-top: 2px solid var(--color-border); text-align: right;">
      <h3>Total: ₹${total.toLocaleString()}</h3>
      <button class="btn btn--primary checkout-btn" style="margin-top: 1rem;">Checkout</button>
    </div>
  `;

  // Add event listeners for cart item actions
  const decreaseBtns = cartModalBody.querySelectorAll('.decrease-btn');
  const increaseBtns = cartModalBody.querySelectorAll('.increase-btn');
  const removeBtns = cartModalBody.querySelectorAll('.remove-btn');
  const checkoutBtn = cartModalBody.querySelector('.checkout-btn');

  decreaseBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = parseInt(this.dataset.productId);
      updateCartQuantity(productId, -1);
    });
  });

  increaseBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = parseInt(this.dataset.productId);
      updateCartQuantity(productId, 1);
    });
  });

  removeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = parseInt(this.dataset.productId);
      removeFromCart(productId);
    });
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', checkout);
  }
}

function updateCartQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartDisplay();
      renderCartModal();
    }
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartDisplay();
  renderCartModal();
  showToast('Item removed from cart!', 'error');
}

function checkout() {
  showToast('Checkout successful! Thank you for your purchase.', 'success');
  cart = [];
  updateCartDisplay();
  closeCartModal();
}

// Modal functionality
function initializeModals() {
  console.log('Initializing modals...');
  
  // Product modal close
  const closeModalBtn = document.getElementById('closeModal');
  const productModal = document.getElementById('productModal');
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  if (productModal) {
    productModal.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal__overlay')) {
        closeModal();
      }
    });
  }

  // Cart modal close
  const closeCartModalBtn = document.getElementById('closeCartModal');
  const cartModal = document.getElementById('cartModal');
  
  if (closeCartModalBtn) {
    closeCartModalBtn.addEventListener('click', closeCartModal);
  }
  
  if (cartModal) {
    cartModal.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal__overlay')) {
        closeCartModal();
      }
    });
  }
}

function closeModal() {
  const productModal = document.getElementById('productModal');
  if (productModal) {
    productModal.classList.add('hidden');
  }
}

function closeCartModal() {
  const cartModal = document.getElementById('cartModal');
  if (cartModal) {
    cartModal.classList.add('hidden');
  }
}

// Toast notifications
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 3000);
}

// Global functions for onclick handlers in HTML
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
window.editTask = editTask;