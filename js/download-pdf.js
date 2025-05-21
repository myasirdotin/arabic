// PDF Download Functionality
document.getElementById('downloadPdf').addEventListener('click', function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4'); // A4 size: 210mm x 297mm
  const element = document.querySelector('.container');

  // Define margins (in mm)
  const margin = 10;
  const imgWidth = 210 - 2 * margin; // A4 width minus left and right margins
  const pageHeight = 297 - 2 * margin; // A4 height minus top and bottom margins

  html2canvas(element, {
    scale: 2, // Higher scale for better resolution
    useCORS: true,
    logging: true
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = margin; // Start with top margin

    // Add the first page with margins
    doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add extra pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin;
      doc.addPage();
      doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Note about non-clickable hyperlinks
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      'Note: Hyperlinks are not clickable in this PDF. Refer to the original webpage for interactive links.',
      margin,
      297 - margin - 5
    );

    doc.save('Arabic-Lesson.pdf');
  }).catch(error => {
    console.error('Error generating PDF:', error);
    alert('An error occurred while generating the PDF. Please try again.');
  });
});

// General Share Functionality
document.getElementById('sharePage').addEventListener('click', function () {
  // Generate shareable link with UTM parameters
  const pageUrl = window.location.href;
  const shareUrl = new URL(pageUrl);
  shareUrl.searchParams.set('utm_source', 'user_share');
  shareUrl.searchParams.set('utm_medium', 'social');
  shareUrl.searchParams.set('utm_campaign', 'arabic_lesson');

  // Track share action in Google Analytics
  if (typeof gtag === 'function') {
    gtag('event', 'share', {
      'event_category': 'Engagement',
      'event_label': 'Arabic-Lesson-General',
      'value': 1
    });
  }

  // Use Web Share API if available
  if (navigator.share) {
    navigator.share({
      title: 'Arabic Grammar – Noun Lesson',
      text: 'Learn about Arabic nouns and their properties!',
      url: shareUrl.toString()
    }).catch(error => {
      console.error('Error sharing:', error);
      copyToClipboard(shareUrl.toString());
    });
  } else {
    copyToClipboard(shareUrl.toString());
  }
});

// Facebook Share Functionality
document.getElementById('facebookShare').addEventListener('click', function () {
  // Generate shareable link with UTM parameters specific to Facebook
  const pageUrl = window.location.href;
  const shareUrl = new URL(pageUrl);
  shareUrl.searchParams.set('utm_source', 'facebook');
  shareUrl.searchParams.set('utm_medium', 'social');
  shareUrl.searchParams.set('utm_campaign', 'arabic_lesson_facebook');

  // Track Facebook share action in Google Analytics
  if (typeof gtag === 'function') {
    gtag('event', 'share', {
      'event_category': 'Engagement',
      'event_label': 'Arabic-Lesson-Facebook',
      'value': 1
    });
  }

  // Attempt to open Facebook share dialog
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.toString())}`;
  window.open(facebookShareUrl, '_blank', 'width=600,height=400');

  // Note: If user has opted out of Facebook platform, the share dialog may fail
  // The error cannot be programmatically detected in this context, so we rely on the browser's behavior
});

// Helper function to copy link to clipboard
function copyToClipboard(url) {
  navigator.clipboard.writeText(url).then(() => {
    alert('Shareable link copied to clipboard: ' + url);
  }).catch(error => {
    console.error('Error copying to clipboard:', error);
    alert('Failed to copy link. Please copy manually: ' + url);
  });
}