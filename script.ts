/**
 * Expert Web Developer: Simple, framework-less JavaScript for interactivity.
 * Safety Checker: No external tracking, analytics, or proprietary code.
 * * NOTE: This script automatically handles TOC generation and collapse logic for 
 * all new H2 and H3 elements inside the document-container.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dynamic Table of Contents (TOC) Generation ---
    const content = document.getElementById('main-content');
    const tocNav = document.getElementById('toc-nav');
    
    // Find all H2 and H3 elements within the main content for the TOC
    const sections = content.querySelectorAll('h2, h3');
    
    // Create the list for the TOC
    const tocList = document.createElement('ul');
    
    sections.forEach(header => {
        // Skip headers inside the TOC section itself
        if (header.closest('#table-of-contents')) return; 

        // Find the nearest ancestor section with an ID
        let sectionContainer = header.closest('section[id]');
        
        // If a section container is not found, use the header's own ID
        let sectionId = sectionContainer ? sectionContainer.id : header.id;
        
        // If the header has an inner link (like in the Annihilation Analysis), use its text
        const linkText = header.querySelector('a') ? header.querySelector('a').textContent : header.textContent;
        
        if (sectionId && linkText) {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            
            anchor.href = `#${sectionId}`;
            anchor.textContent = linkText;
            
            // Add indentation for sub-sections (H3)
            if (header.tagName === 'H3') {
                 listItem.style.marginLeft = '1.5em';
                 listItem.style.fontSize = '0.9em';
            }

            // Add smooth scrolling
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById(sectionId).scrollIntoView({
                    behavior: 'smooth'
                });
            });

            listItem.appendChild(anchor);
            tocList.appendChild(listItem);
        }
    });
    
    // Append the final TOC list
    tocNav.appendChild(tocList);

    // --- 2. Implement Collapsible Doctrine Modules ---
    const doctrineModules = document.querySelectorAll('.collapsible-module');

    doctrineModules.forEach(module => {
        // Find the wrapper containing all collapsible content
        const collapsibleContent = module.querySelector('.collapsible-content');
        
        // Find the main trigger (usually the H2 of the module)
        const trigger = module.querySelector('h2'); 

        if (trigger && collapsibleContent) {
            // Set initial state (start collapsed)
            collapsibleContent.style.display = 'none';

            // Add click listener to the header
            trigger.addEventListener('click', () => {
                // Toggle visibility
                if (collapsibleContent.style.display === 'none') {
                    collapsibleContent.style.display = 'block';
                } else {
                    collapsibleContent.style.display = 'none';
                }
            });
        }
    });
});});
