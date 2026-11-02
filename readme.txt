================================================================================
ROSEBANK COLLEGE - WEB DEVELOPMENT PROGRAMMING PROJECT (PARTS 1 TO 3)
================================================================================

STUDENT NAME:      Siviwe Ngubane
INSTITUTION:       Rosebank College
MODULE:            Programming / Web Development
PROJECT TITLE:     Nike E-Commerce Storefront Application
DATE:              November 2026

--------------------------------------------------------------------------------
1. EXECUTIVE SUMMARY & PROJECT SCOPE
--------------------------------------------------------------------------------
This project represents a fully responsive, feature-complete athletic e-commerce 
storefront modeled after Nike. Developed across three progressive phases (Part 1, 
Part 2, and Part 3), the application transitions from a static semantic layout into 
a dynamic, client-side interactive web application. 

The application implements modern web standards including semantic HTML5 markup, 
modular CSS3 styling with design tokens and keyframe animations, and robust ES6+ 
JavaScript logic handling real-time search suggestions, multi-criteria product filtering, 
shopping cart persistence via localStorage, interactive product review management, 
client-side order processing, and an embedded automated support chatbot.

--------------------------------------------------------------------------------
2. DETAILED BREAKDOWN OF FEATURES & ARCHITECTURE (PART 1 TO PART 3)
--------------------------------------------------------------------------------

A. FOUNDATIONAL STRUCTURE & SEMANTIC LAYOUT (PART 1)
- Semantic HTML5 Architecture: Utilizes modern semantic elements (<header>, <nav>, 
  <main>, <article>, <section>, <footer>) ensuring optimal accessibility and SEO.
- CSS3 Design Tokens & Variables: Centralized design system managing color palettes 
  (--primary-color, --accent-color, --light-bg, --card-bg), shadows, borders, and 
  border radii.
- Responsive Grid Layouts: Mobile-first CSS Grid and Flexbox architecture ensuring 
  seamless adaptation across mobile phones, tablets, and desktop displays.
- Navigation System: Sticky navigation header featuring smooth anchor scrolling across 
  Home, About, Products, Enquiry, and Contact sections.

B. DYNAMIC CATALOG & FORM INTERACTIONS (PART 2)
- Interactive Product Catalog: Multi-category sports gear with dedicated size selection 
  dropdowns (Small/Medium/Large for apparel, US sizing for footwear, and One Size for accessories).
- Order Checkout Workflow: Seamless UI state transition from product grid view to a dedicated 
  shipping details collection form.
- Automated Order ID Generation: Generates unique randomized tracking IDs (e.g., NK-849201) 
  upon successful order confirmation.
- Form Validation & Notifications: Client-side validation for Customer Enquiry and Contact 
  forms, displaying responsive toast notification popups.

C. ADVANCED E-COMMERCE ENHANCEMENTS & INTERACTIVITY (PART 3)
- Animated Neon Black Friday Promotional Banner: A glowing, pulsing neon promotional sign 
  highlighting "GET 50% OFF THIS BLACK FRIDAY 2026 - 25 NOVEMBER 2026".
- Visual 3-Box Department Cards: Interactive homepage department grid (Apparel, Footwear, 
  Accessories) featuring thumbnail previews. Clicking any box instantly filters the product catalog.
- Instant Search with Image Thumbnails: Real-time search query filtering with a floating 
  suggestions dropdown displaying product thumbnail images, names, and prices. The search input 
  automatically clears upon selection to allow easy navigation back to the home or shop categories.
- Strict Multi-Criteria Filtering Engine: Advanced filtering system allowing users to filter 
  store items simultaneously by Category, Gender (Men, Women, Unisex), and Price Sorting 
  (Low-to-High / High-to-Low).
- Interactive Customer Reviews & Rating Submissions: Modal popup displaying customer feedback 
  star ratings and an interactive form enabling users to submit new reviews (persisted via browser localStorage).
- Side-Drawer Shopping Cart: Slide-out cart drawer managing item quantities, sizes, subtotal calculations, 
  item removals, and direct checkout initiation.
- AI Support Chatbot Widget: Floating interactive support assistant widget capable of answering 
  frequently asked questions regarding shipping timelines, sizing guides, and return policies.

--------------------------------------------------------------------------------
3. FILE & DIRECTORY STRUCTURE
--------------------------------------------------------------------------------
nike-pt3/
├── css/
│   └── style.css            # Complete styling (Design tokens, grid, modal, chatbot, neon glow)
├── js/
│   └── main.js              # Application script (Filtering, cart state, reviews, search, chatbot)
├── images/                  # Media assets repository
│   ├── logo.png
│   ├── hero.png
│   ├── tshirt.png
│   ├── hoodie.png
│   ├── running.png
│   ├── bag.png
│   ├── cap.png
│   ├── shorts.png
│   └── jacket.png
├── index.html               # Single-page complete web application & storefront catalog
├── products.html            # Standalone products catalog view
├── about.html               # Corporate background & mission statement
├── contact.html             # Customer support info & embedded Google Map
└── enquiry.html             # Product availability enquiry form

--------------------------------------------------------------------------------
4. INSTALLATION & LOCAL EXECUTION GUIDE
--------------------------------------------------------------------------------
1. Ensure all project files are placed inside your local workspace directory matching 
   the exact folder structure above.
2. Confirm that all required product and brand images are present within the images/ folder.
3. Open `index.html` in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
4. For optimal development experience, open the folder in Visual Studio Code and launch 
   using the **Live Server** extension.

--------------------------------------------------------------------------------
5. REFERENCES & BIBLIOGRAPHY
--------------------------------------------------------------------------------
1. MDN Web Docs. (2026). *HTML: HyperText Markup Language*. Mozilla Developer Network. 
   Retrieved from https://developer.mozilla.org/en-US/docs/Web/HTML
2. MDN Web Docs. (2026). *CSS: Cascading Style Sheets*. Mozilla Developer Network. 
   Retrieved from https://developer.mozilla.org/en-US/docs/Web/CSS
3. MDN Web Docs. (2026). *JavaScript Guide: Client-side web APIs*. Mozilla Developer Network. 
   Retrieved from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
4. W3C. (2025). *HTML5 & CSS3 Specification Standards*. World Wide Web Consortium. 
   Retrieved from https://www.w3.org/
5. Rosebank College. (2026). *Programming / Web Development Course Modules and Practical Guidelines (Parts 1-3)*. 

--------------------------------------------------------------------------------
6. STUDENT DECLARATION
--------------------------------------------------------------------------------
I, Siviwe Ngubane, hereby declare that this web development project submission is my 
original work, completed for Rosebank College in accordance with all project specifications 
and academic integrity guidelines.
================================================================================