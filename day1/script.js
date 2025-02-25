// Add interactivity for the sign-up buttons
document.addEventListener('DOMContentLoaded', function() {
    const signupButtons = document.querySelectorAll('.signup-button-group, .newsletter-button-group');
    
    signupButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to newsletter form
            const newsletterSection = document.querySelector('.newsletter-group');
            newsletterSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
