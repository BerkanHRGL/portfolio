// Image popup functionality
const ImagePopup = {
  init: function() {
    // Image popup event listeners
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('clickable-image')) {
        e.preventDefault();
        ImagePopup.open(e.target.src);
      }
    });

    // Close popup when clicking the close button
    ELEMENTS.closePopup.addEventListener('click', ImagePopup.close);

    // Close popup when clicking outside the image
    ELEMENTS.imagePopup.addEventListener('click', function(e) {
      if (e.target === ELEMENTS.imagePopup) {
        ImagePopup.close();
      }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && ELEMENTS.imagePopup.style.display === 'flex') {
        ImagePopup.close();
      }
    });
  },

  open: function(imageSrc) {
    ELEMENTS.popupImage.src = imageSrc;
    ELEMENTS.imagePopup.style.display = 'flex';
  },

  close: function() {
    ELEMENTS.imagePopup.style.display = 'none';
    ELEMENTS.popupImage.src = '';
  }
};