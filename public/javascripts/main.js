// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
});

// Delete confirmation
function confirmDelete(event) {
    if (!confirm('Are you sure you want to delete this word?')) {
        event.preventDefault();
    }
}

// Add event listeners to all delete buttons
document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', confirmDelete);
    });
});

// Flashcard functionality
function toggleFlashcard(card) {
    card.classList.toggle('flipped');
}

// Add event listeners to flashcard elements
document.addEventListener('DOMContentLoaded', function() {
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(card => {
        card.addEventListener('click', () => toggleFlashcard(card));
    });
});

// Search functionality
function filterWords() {
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.word-card');
    const filter = searchInput.value.toLowerCase();

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(filter) ? '' : 'none';
    });
}

// Add event listener for search input
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterWords);
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}); 