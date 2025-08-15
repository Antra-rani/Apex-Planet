const articles = {
    1: {
        title: "The Gentle Giants: Understanding African Elephants",
        content: `
            <h1>The Gentle Giants: Understanding African Elephants</h1>
            <img src="Elephant.png">
            <p>African elephants are among the most magnificent creatures on Earth. These gentle giants possess remarkable intelligence, complex social structures, and emotional depth that continues to amaze researchers worldwide.</p>
            <h3>Social Structure</h3>
            <p>Elephants live in matriarchal societies led by the oldest female. These family groups, called herds, can include up to 12 related females and their offspring. The matriarch's experience and memory are crucial for the herd's survival, especially during droughts when she remembers distant water sources.</p>
            <h3>Intelligence and Memory</h3>
            <p>The saying "an elephant never forgets" has scientific backing. Elephants have exceptional memory capabilities, recognizing hundreds of individuals and remembering locations of food and water sources across vast territories. They can even distinguish between different human languages and voices.</p>
            <h3>Conservation Status</h3>
            <p>Unfortunately, African elephants face numerous threats including habitat loss and poaching for ivory. Conservation efforts are crucial to ensure these magnificent creatures continue to roam the African landscapes for future generations.</p>
        `
    },
    2: {
        title: "Arctic Puffins: Masters of Sea and Sky",
        content: `
            <h1>Arctic Puffins: Masters of Sea and Sky</h1>
            <img src="Puffins.png">
            <p>Atlantic puffins are one of nature's most charming seabirds, known for their distinctive colorful beaks and remarkable diving abilities.</p>
            <h3>Unique Adaptations</h3>
            <p>Puffins are perfectly adapted for life both in the air and underwater. Their wings function as flippers when diving, allowing them to "fly" underwater at speeds up to 25 mph while chasing fish.</p>
            <h3>Seasonal Changes</h3>
            <p>During breeding season, puffins develop their famous colorful orange, red, and yellow beaks. Outside of breeding season, their beaks become smaller and duller in color - a dramatic transformation that helps them adapt to different seasonal needs.</p>
            <h3>Nesting Habits</h3>
            <p>Puffins nest in burrows they dig into clifftop soil using their strong beaks and claws. These burrows can be up to 3 feet deep and provide safe haven for their single egg and chick.</p>
        `
    },
    3: {
        title: "Sea Turtles: Ancient Mariners of the Ocean",
        content: `
            <h1>Sea Turtles: Ancient Mariners of the Ocean</h1>
            <img src="Sea-turtles.png">
            <p>Sea turtles have been navigating Earth's oceans for over 100 million years, surviving since the time of dinosaurs. These ancient mariners continue to fascinate scientists with their incredible abilities.</p>
            <h3>Navigation Abilities</h3>
            <p>Sea turtles possess an extraordinary ability to navigate across vast ocean distances. They use Earth's magnetic field as a compass, allowing them to return to the exact beaches where they were born to lay their own eggs - sometimes after traveling thousands of miles.</p>
            <h3>Life Cycle</h3>
            <p>The life cycle of sea turtles is a remarkable journey. After hatching on sandy beaches, baby turtles embark on a perilous journey to the ocean. Those that survive may not return to land for 20-30 years when they reach sexual maturity.</p>
            <h3>Conservation Challenges</h3>
            <p>All seven species of sea turtles face threats from human activities including plastic pollution, fishing nets, coastal development, and climate change affecting nesting beaches. Conservation efforts worldwide are working to protect these ancient creatures.</p>
        `
    },
    4: {
        title: "The Cunning Red Fox: Nature's Adaptable Hunter",
        content: `
            <h1>The Cunning Red Fox: Nature's Adaptable Hunter</h1>
            <img src="Fox.png">
            <p>Red foxes are among the most successful and adaptable mammals on Earth, found across the Northern Hemisphere in diverse habitats from arctic tundra to urban environments.</p>
            <h3>Hunting Techniques</h3>
            <p>Red foxes are renowned for their hunting prowess. They use a technique called "mousing" where they listen for prey under snow, then leap high and dive headfirst to catch rodents. Their hearing is so acute they can detect a mouse moving under 3 feet of snow.</p>
            <h3>Adaptability</h3>
            <p>What makes red foxes so successful is their incredible adaptability. They've learned to thrive in cities, adjusting their behavior to urban life while maintaining their wild instincts. Urban foxes have been observed using human schedules to optimize their foraging.</p>
            <h3>Social Behavior</h3>
            <p>While often solitary, red foxes form family groups during breeding season. Parents work together to raise their kits, teaching them essential survival skills through play and example.</p>
        `
    },
    5: {
        title: "Chameleons: The Color-Changing Marvels",
        content: `
            <h1>Chameleons: The Color-Changing Marvels</h1>
            <img src="Chameleons.png">
            <p>Chameleons are among nature's most specialized reptiles, equipped with unique adaptations that make them perfectly suited for their arboreal lifestyle.</p>
            <h3>Color-Changing Mystery</h3>
            <p>Contrary to popular belief, chameleons don't change color primarily for camouflage. Instead, they use color changes to communicate emotions, regulate body temperature, and establish social dominance. Their color changes are controlled by specialized cells called chromatophores.</p>
            <h3>Unique Eyes</h3>
            <p>Chameleons possess the most distinctive eyes in the animal kingdom. Each eye can move independently, allowing them to look in two different directions simultaneously. This gives them nearly 360-degree vision, crucial for spotting both prey and predators.</p>
            <h3>Projectile Tongue</h3>
            <p>A chameleon's tongue is a marvel of engineering. It can extend to twice the length of their body and accelerate at 2,590 meters per second squared - faster than a fighter jet! The sticky tip ensures prey cannot escape once caught.</p>
        `
    },
    6: {
        title: "Bald Eagles: Symbol of Freedom and Power",
        content: `
            <h1>Bald Eagles: Symbol of Freedom and Power</h1>
            <img src="Eagles.png">
            <p>The bald eagle, America's national bird, represents one of conservation's greatest success stories. From near extinction to population recovery, these magnificent raptors continue to inspire awe.</p>
            <h3>Physical Prowess</h3>
            <p>Bald eagles are formidable hunters with incredible eyesight - up to 8 times sharper than human vision. Their powerful talons can exert pressure of up to 750 pounds per square inch, and their wingspan can reach 8 feet across.</p>
            <h3>Conservation Success</h3>
            <p>In the 1960s, bald eagle populations plummeted to just 417 breeding pairs due to DDT pesticide use. Thanks to the ban on DDT and intensive conservation efforts, their numbers have recovered to over 70,000 breeding pairs today.</p>
            <h3>Nesting Behavior</h3>
            <p>Bald eagles build some of the largest nests in North America, with some reaching 13 feet deep and 8 feet wide. They often return to the same nest year after year, continuously adding materials and making improvements.</p>
        `
    }
};

// DOM elements
const searchInput = document.getElementById('searchInput');
const blogGrid = document.getElementById('blogGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const navLinks = document.querySelectorAll('.nav-link');
const modal = document.getElementById('articleModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close');
const blogPosts = document.querySelectorAll('.blog-post');

// Search functionality
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const posts = document.querySelectorAll('.blog-post');
    posts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
        const category = post.dataset.category.toLowerCase();
                
        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
            post.style.display = 'block';
            post.classList.add('fade-in');
        } else {
            post.style.display = 'none';
            post.classList.remove('fade-in');
        }
    });
});

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        // Update nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.category === filter || (filter === 'all' && link.dataset.category === 'all')) {
                link.classList.add('active');
            }
        });
        // Filter posts
        filterPosts(filter);
    });
});

// Navigation functionality
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.dataset.category;
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        // Update filter buttons
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === category || (category === 'all' && btn.dataset.filter === 'all')) {
                btn.classList.add('active');
            }
        });
        // Filter posts
        filterPosts(category);
    });
});

function filterPosts(category) {
    const posts = document.querySelectorAll('.blog-post');
    posts.forEach(post => {
        if (category === 'all' || post.dataset.category === category) {
            post.style.display = 'block';
            post.classList.add('fade-in');
        } else {
            post.style.display = 'none';
            post.classList.remove('fade-in');
        }
    });
}

// Modal functionality
blogPosts.forEach(post => {
    post.addEventListener('click', function() {
        const articleId = this.dataset.id;
        const article = articles[articleId];
                
        if (article) {
            modalBody.innerHTML = article.content;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Add smooth scroll behavior for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
            
    img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.alt = 'Image failed to load';
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to all posts on page load
    setTimeout(() => {
        blogPosts.forEach(post => {
            post.classList.add('fade-in');
        });
    }, 100);
});