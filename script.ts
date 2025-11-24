/**
 * Expert Web Developer: Simple, framework-less JavaScript for interactivity.
 * Safety Checker: No external tracking, analytics, or proprietary code.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dynamic Table of Contents (TOC) Generation ---
    const content = document.getElementById('paper-content');
    const tocNav = document.getElementById('toc-nav');
    
    // Find all H3 elements within the paper content (our main sections)
    const sections = content.querySelectorAll('section > h3');
    
    // Create the list for the TOC
    const tocList = document.createElement('ul');
    
    sections.forEach(header => {
        // Ensure the header text is safe for an ID
        const sectionId = header.closest('section').id;

        // Check for valid ID to link
        if (sectionId) {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            
            // Get the text from the <a> tag inside the H3
            const linkText = header.querySelector('a') ? header.querySelector('a').textContent : header.textContent;
            
            anchor.href = `#${sectionId}`;
            anchor.textContent = linkText;
            
            // Add smooth scrolling (Interaction)
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById(sectionId).scrollIntoView({
                    behavior: 'smooth'
                });
            });

            listItem.appendChild(anchor);
            tocList.appendChild(listItem);
            
            // --- 2. Implement Collapsible Doctrine Modules ---
            const sectionContent = header.nextElementSibling; // Get the element immediately following the h3
            
            // Wrap all content under the H3 in a collapsible wrapper if it exists
            if (sectionContent) {
                const wrapper = document.createElement('div');
                wrapper.classList.add('collapsible-content');
                
                // Move all siblings of the H3 into the wrapper until the next H3 or end of section
                let currentElement = header.nextElementSibling;
                while (currentElement && currentElement.tagName !== 'H3') {
                    const nextElement = currentElement.nextElementSibling;
                    wrapper.appendChild(currentElement);
                    currentElement = nextElement;
                }
                
                // Insert the wrapper back into the section
                header.parentNode.insertBefore(wrapper, header.nextElementSibling);

                // Set initial state (Content Architect: Start collapsed)
                wrapper.style.display = 'none';

                // Add click listener to the header itself
                header.addEventListener('click', () => {
                    // Smooth transition effect (simple fade/toggle)
                    if (wrapper.style.display === 'none') {
                        wrapper.style.display = 'block';
                        // Could add a CSS class for a fancier transition if desired
                    } else {
                        wrapper.style.display = 'none';
                    }
                });
            }
        }
    });
    
    // Append the final TOC list to the navigation area
    tocNav.appendChild(tocList);
});