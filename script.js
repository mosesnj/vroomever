$(document).ready(function() {
    
    // Toggle favorite icon color on click
    $('.fav-btn').on('click', function(e) {
        e.stopPropagation(); // Prevent card click propagation if added later
        let icon = $(this).find('i');
        if (icon.hasClass('text-danger')) {
            icon.removeClass('text-danger').addClass('text-muted');
        } else {
            icon.removeClass('text-muted').addClass('text-danger');
        }
    });

    // Simulate "Show Contacts" action
    $('.view-contact-btn').on('click', function(e) {
        e.stopPropagation();
        let btn = $(this);
        btn.removeClass('btn-outline-success').addClass('btn-success');
        btn.text('+254 7XX XXX XXX');
    });

    // Example search interaction
    $('.input-group .btn-success').on('click', function() {
        let query = $(this).siblings('input').val();
        if(query.trim() !== "") {
            alert("Searching Jiji for: " + query);
        } else {
            alert("Please enter a search keyword.");
        }
    });

});