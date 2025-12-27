// ============================================
// PRIMEDGE DIGITALS - COMPLETE JAVASCRIPT
// ============================================

// LOADING SCREEN
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1000);
    }
});

// COOKIE CONSENT
document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 2000);
    }

    // Accept cookies
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }
});

// NAVBAR SCROLL EFFECT
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// MOBILE MENU TOGGLE
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
        if (!e.target.closest('.nav-container')) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});

// Close mobile menu when clicking a link
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// DROPDOWN MENU (Mobile)
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');

    if (toggle) {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }
});

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// BACK TO TOP BUTTON
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ANIMATED COUNTER FOR STATS
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(start);
        }
    }, 16);
};

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    counterObserver.observe(stat);
});

// PORTFOLIO FILTER
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (filterValue === 'all' || itemCategory === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// TESTIMONIAL SLIDER
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.testimonial-nav .prev');
const nextBtn = document.querySelector('.testimonial-nav .next');

const showTestimonial = (index) => {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });

    testimonialDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });

    currentTestimonial = index;
};

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto-rotate testimonials
if (testimonialCards.length > 0) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// FAQ ACCORDION
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    }
});

// MODAL FUNCTIONALITY
const modal = document.getElementById('project-modal');
const successModal = document.getElementById('success-modal');
const modalCloses = document.querySelectorAll('.modal-close');

// View Project buttons
const viewProjectBtns = document.querySelectorAll('.btn-view-project');

viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

// Open project modal with details
// Open project modal with details
const openProjectModal = (projectId) => {
    const modalBody = document.getElementById('modal-body');

    // PROJECT DATABASE - Add all your projects here
    const projects = {
        // WEB DEVELOPMENT PROJECTS
        "1": {
            title: "Modern E-commerce Platform",
            client: "RetailCo Inc.",
            category: "Web Development",
            description: "A fully responsive e-commerce platform built with modern technologies. The website features advanced product filtering, secure payment integration, and real-time inventory management.",
            challenge: "The client needed a scalable e-commerce solution that could handle 10,000+ products while maintaining fast loading speeds and providing an intuitive user experience across all devices.",
            solution: "We implemented a custom-built e-commerce platform using React for the frontend and Node.js for the backend. We optimized images, implemented lazy loading, and used CDN for faster content delivery. The result was a lightning-fast shopping experience.",
            results: [
                "300% increase in online sales within 3 months",
                "Page load time reduced from 8s to 1.2s",
                "Mobile conversion rate increased by 156%",
                "Customer satisfaction score: 4.8/5"
            ],
            image: "images/portfolio/web-dev-1.jpg",
            technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
            duration: "3 months",
            url: "https://example.com" // Optional
        },

        "2": {
            title: "Corporate Website Redesign",
            client: "Enterprise Corp",
            category: "Web Development",
            description: "Complete redesign and rebuild of a corporate website for a Fortune 500 company. Modern design, improved user experience, and enhanced brand presence.",
            challenge: "The existing website was outdated, slow, and not mobile-friendly. It failed to communicate the company's innovative brand identity and was difficult to navigate.",
            solution: "We created a modern, responsive website with a clean design language. Implemented a custom CMS for easy content updates, optimized for SEO, and integrated with their existing business systems.",
            results: [
                "Bounce rate decreased by 45%",
                "Average session duration increased by 2.5 minutes",
                "Lead generation increased by 78%",
                "First-page Google rankings for 25+ keywords"
            ],
            image: "images/portfolio/web-dev-2.jpg",
            technologies: ["WordPress", "PHP", "MySQL", "Custom Theme"],
            duration: "2 months"
        },

        "3": {
            title: "SaaS Web Application",
            client: "CloudSync Systems",
            category: "Web Development",
            description: "A sophisticated SaaS platform for project management and team collaboration. Features real-time updates, file sharing, and advanced analytics.",
            challenge: "Building a complex web application that could support thousands of concurrent users while providing real-time collaboration features without compromising performance.",
            solution: "Developed a scalable architecture using microservices, implemented WebSocket for real-time features, and optimized database queries. Used cloud infrastructure for automatic scaling based on demand.",
            results: [
                "Successfully onboarded 5,000+ users in first month",
                "99.9% uptime maintained",
                "Real-time sync with <100ms latency",
                "Reduced operational costs by 40% through efficient architecture"
            ],
            image: "images/portfolio/web-dev-3.jpg",
            technologies: ["Vue.js", "Python", "PostgreSQL", "AWS", "WebSocket"],
            duration: "6 months"
        },

        "4": {
            title: "Real Estate Listing Platform",
            client: "Prime Properties Ltd",
            category: "Web Development",
            description: "Modern real estate platform with advanced property search, virtual tours, and integrated mortgage calculator. Designed for both buyers and real estate agents.",
            challenge: "Creating an intuitive property search experience with thousands of listings while maintaining fast performance. Needed to integrate with multiple MLS systems.",
            solution: "Built a powerful search engine with filters for location, price, amenities, and more. Implemented map-based search, 360° virtual tours, and real-time availability updates.",
            results: [
                "10,000+ properties listed in first quarter",
                "Average search result time: 0.3 seconds",
                "Property inquiries increased by 245%",
                "Agent productivity improved by 60%"
            ],
            image: "images/portfolio/web-dev-4.jpg",
            technologies: ["React", "Node.js", "Elasticsearch", "Google Maps API"],
            duration: "4 months"
        },

        "5": {
            title: "E-Learning Platform",
            client: "EduTech Academy",
            category: "Web Development",
            description: "Comprehensive online learning platform with video courses, interactive quizzes, progress tracking, and certification system.",
            challenge: "Building a scalable platform that could handle video streaming for thousands of concurrent students while providing smooth learning experience across all devices.",
            solution: "Implemented adaptive video streaming, built progress tracking system, created interactive quiz engine, and integrated payment gateway for course purchases.",
            results: [
                "15,000+ students enrolled in 6 months",
                "Video buffering issues reduced by 95%",
                "Course completion rate: 78% (industry avg: 15%)",
                "Generated $500K in course sales"
            ],
            image: "images/portfolio/web-dev-5.jpg",
            technologies: ["Next.js", "MongoDB", "AWS S3", "Stripe", "Video.js"],
            duration: "5 months"
        },

        "6": {
            title: "Restaurant & Online Ordering",
            client: "Gourmet Bistro",
            category: "Web Development",
            description: "Beautiful restaurant website with integrated online ordering system, table reservations, and menu management.",
            challenge: "Restaurant needed a way to accept online orders without paying high commission fees to third-party delivery apps.",
            solution: "Built custom ordering system with real-time order tracking, integrated payment processing, and admin dashboard for order management and menu updates.",
            results: [
                "Online orders increased by 420%",
                "Saved $18K annually in third-party fees",
                "Average order value increased 35%",
                "Customer satisfaction: 4.9/5 stars"
            ],
            image: "images/portfolio/web-dev-6.jpg",
            technologies: ["WordPress", "WooCommerce", "PHP", "Square API"],
            duration: "2 months"
        },

        // DATA ANALYSIS PROJECTS


        "9": {
            title: "Marketing ROI Analysis",
            client: "GrowthBrand Inc.",
            category: "Data Analysis",
            description: "Comprehensive marketing attribution analysis to identify which channels and campaigns deliver the best ROI.",
            challenge: "Marketing budget was $2M annually but the company had no clear understanding of which channels were driving actual revenue.",
            solution: "Implemented multi-touch attribution modeling, integrated data from all marketing platforms, and created dashboard showing ROI by channel, campaign, and even individual ads.",
            results: [
                "Identified 3 underperforming channels wasting $400K annually",
                "Reallocated budget to high-ROI channels",
                "Overall marketing ROI increased from 2.1x to 5.3x",
                "Revenue per marketing dollar increased 152%"
            ],
            image: "images/portfolio/data-3.jpg",
            technologies: ["Python", "Google Analytics", "SQL", "Data Studio"],
            duration: "2 months"
        },

        "10": {
            title: "Supply Chain Optimization",
            client: "Logistics Pro Ltd",
            category: "Data Analysis",
            description: "Advanced analytics solution to optimize supply chain operations, reduce costs, and improve delivery times.",
            challenge: "Company was experiencing frequent stockouts, overstocking, and inefficient routing leading to high operational costs.",
            solution: "Built predictive demand forecasting models, optimized inventory levels across warehouses, and created route optimization algorithms for delivery vehicles.",
            results: [
                "Stockouts reduced by 76%",
                "Inventory carrying costs decreased 32%",
                "Delivery times improved by 28%",
                "Annual cost savings: $1.2M"
            ],
            image: "images/portfolio/data-4.jpg",
            technologies: ["Python", "R", "Tableau", "Operations Research"],
            duration: "4 months"
        },

        // UI/UX DESIGN PROJECTS

        "12": {
            title: "SaaS Product Dashboard",
            client: "CloudSync Systems",
            category: "UI/UX Design",
            description: "Enterprise dashboard design for complex project management SaaS platform. Focus on data visualization and workflow efficiency.",
            challenge: "Users were overwhelmed by the amount of data and features. The existing interface had poor information hierarchy and confusing navigation.",
            solution: "Redesigned the entire dashboard with clear visual hierarchy, customizable widgets, and contextual navigation. Implemented progressive disclosure to show complexity only when needed.",
            results: [
                "User task completion time reduced by 45%",
                "Support tickets decreased 60%",
                "User satisfaction score increased from 6.2 to 8.9",
                "Enterprise client renewals: 94%"
            ],
            image: "images/portfolio/uiux-2.jpg",
            technologies: ["Figma", "Sketch", "Principle", "Zeplin"],
            duration: "3 months"
        },

        "13": {
            title: "E-commerce Fashion Platform",
            client: "StyleHub",
            category: "UI/UX Design",
            description: "Modern e-commerce UI/UX design for fashion retail brand with focus on product discovery and seamless checkout experience.",
            challenge: "High cart abandonment rate (78%) and users complaining about difficulty finding products that match their style.",
            solution: "Created visual-first product browsing experience, implemented smart filters, designed streamlined one-page checkout, and added style quiz for personalized recommendations.",
            results: [
                "Cart abandonment reduced to 32%",
                "Conversion rate increased 156%",
                "Average order value increased 42%",
                "Mobile sales increased 280%"
            ],
            image: "images/portfolio/uiux-3.jpg",
            technologies: ["Figma", "Adobe XD", "Photoshop", "InVision"],
            duration: "2 months"
        },

        "14": {
            title: "Mobile Banking App",
            client: "FinanceFirst Bank",
            category: "UI/UX Design",
            description: "Secure and user-friendly mobile banking app design with focus on accessibility and ease of use for all age groups.",
            challenge: "Older customers found existing app too complicated while younger users wanted more advanced features. Security concerns were paramount.",
            solution: "Designed adaptive interface with simple mode for basic transactions and advanced mode for power users. Implemented biometric authentication and created clear visual feedback for all actions.",
            results: [
                "App adoption increased 340% among 55+ demographic",
                "Transaction completion rate: 98%",
                "App Store rating improved from 3.2 to 4.8",
                "Security incidents reduced to zero"
            ],
            image: "images/portfolio/uiux-4.jpg",
            technologies: ["Figma", "Sketch", "Principle", "Zeplin"],
            duration: "4 months"
        },

        // SEO PROJECTS
      

        "16": {
            title: "Technical SEO Overhaul",
            client: "E-Learning Platform",
            category: "SEO",
            description: "Complete technical SEO audit and implementation to fix critical issues preventing the site from ranking.",
            challenge: "Website had great content but wasn't ranking due to technical issues: slow speed, poor mobile experience, crawl errors, and duplicate content.",
            solution: "Fixed all technical issues, improved site speed from 8s to 1.2s, implemented proper URL structure, resolved duplicate content, and optimized for Core Web Vitals.",
            results: [
                "Organic traffic increased 420%",
                "Page speed score: 95/100",
                "Indexed pages increased from 120 to 2,400",
                "Rankings improved for 150+ keywords"
            ],
            image: "images/portfolio/seo-2.jpg",
            technologies: ["Screaming Frog", "GTmetrix", "Google Search Console", "Schema.org"],
            duration: "3 months"
        },

        "17": {
            title: "E-commerce SEO Growth",
            client: "Fashion Retailer",
            category: "SEO",
            description: "Comprehensive SEO strategy for e-commerce site with 5,000+ product pages to increase organic visibility and sales.",
            challenge: "Site had thousands of products but almost no organic traffic. Product pages weren't optimized and competed with each other for rankings.",
            solution: "Optimized product page templates, created category-specific content, built internal linking structure, and implemented rich snippets for products.",
            results: [
                "Organic traffic increased 580%",
                "Organic revenue: $2.3M in 12 months",
                "500+ product pages ranking on page 1",
                "Return on SEO investment: 1,240%"
            ],
            image: "images/portfolio/seo-3.jpg",
            technologies: ["Ahrefs", "SEMrush", "Google Analytics", "Schema.org"],
            duration: "6 months"
        },

        "18": {
            title: "Content Marketing SEO",
            client: "B2B SaaS Company",
            category: "SEO",
            description: "Content-driven SEO strategy to establish thought leadership and drive qualified leads for B2B SaaS platform.",
            challenge: "Highly competitive industry with established players dominating search results. Needed to build authority from scratch.",
            solution: "Created comprehensive content strategy targeting all stages of buyer journey. Published in-depth guides, case studies, and comparison content. Built high-quality backlinks through digital PR.",
            results: [
                "Organic traffic grew from 500 to 25,000 monthly visits",
                "Generated 1,200+ qualified leads from organic",
                "Ranking for 800+ keywords",
                "Established as industry thought leader"
            ],
            image: "images/portfolio/seo-4.jpg",
            technologies: ["Ahrefs", "Clearscope", "WordPress", "Google Analytics"],
            duration: "12 months"
        },

        // DIGITAL MARKETING PROJECTS
       

        "20": {
            title: "Email Marketing Mastery",
            client: "Newsletter Pro",
            category: "Digital Marketing",
            description: "Email marketing campaign optimization that increased open rates, click-through rates, and conversions significantly.",
            challenge: "Email campaigns had low open rates (12%) and even lower click-through rates (1.5%). Subscribers were disengaged.",
            solution: "Segmented email list based on behavior, created personalized email flows, A/B tested subject lines and content, and implemented re-engagement campaigns.",
            results: [
                "Open rate increased from 12% to 38%",
                "Click-through rate increased from 1.5% to 8.2%",
                "Revenue per email increased 420%",
                "Unsubscribe rate decreased by 65%"
            ],
            image: "images/portfolio/marketing-2.jpg",
            technologies: ["Mailchimp", "HubSpot", "Google Analytics", "Litmus"],
            duration: "2 months"
        },

        "21": {
            title: "Content Marketing Strategy",
            client: "B2B Tech Company",
            category: "Digital Marketing",
            description: "Comprehensive content marketing strategy that positioned company as industry thought leader and generated qualified leads.",
            challenge: "Long sales cycle (6-12 months) and difficulty reaching decision-makers. Needed to build trust and authority.",
            solution: "Created valuable content at each stage of buyer journey: blog posts, whitepapers, case studies, and webinars. Implemented lead nurturing sequences.",
            results: [
                "Generated 800+ marketing qualified leads",
                "Content engagement rate: 42%",
                "Sales cycle shortened by 30%",
                "Closed deal value increased 85%"
            ],
            image: "images/portfolio/marketing-3.jpg",
            technologies: ["HubSpot", "WordPress", "Google Analytics", "SEMrush"],
            duration: "6 months"
        },

        "22": {
            title: "Influencer Partnership Campaign",
            client: "Beauty Brand Co",
            category: "Digital Marketing",
            description: "Strategic influencer marketing campaign that amplified brand reach and drove significant product sales.",
            challenge: "Breaking into saturated beauty market with established brands dominating shelf space and mind share.",
            solution: "Partnered with 20 micro and mid-tier influencers whose audience matched target demographic. Created authentic content partnerships rather than one-off posts.",
            results: [
                "Reached 3.5M targeted users",
                "Generated $420K in attributed sales",
                "Brand awareness increased 340%",
                "Earned media value: $850K"
            ],
            image: "images/portfolio/marketing-4.jpg",
            technologies: ["Instagram", "YouTube", "AspireIQ", "Google Analytics"],
            duration: "3 months"
        },

        // PPC ADVERTISING PROJECTS
      

        "24": {
            title: "Facebook Ads Breakthrough",
            client: "Fashion Forward",
            category: "PPC Advertising",
            description: "Scaling Facebook advertising from $5K/month to $50K/month while maintaining profitability for fashion e-commerce brand.",
            challenge: "Brand wanted to scale but previous attempts at increasing budget resulted in decreased ROAS and unprofitable campaigns.",
            solution: "Implemented campaign budget optimization, created lookalike audiences, developed creative testing framework, and built automated rules for performance monitoring.",
            results: [
                "Scaled ad spend 10x while maintaining 5.2x ROAS",
                "Cost per purchase decreased 45%",
                "New customer acquisition increased 620%",
                "Monthly revenue from Facebook ads: $260K"
            ],
            image: "images/portfolio/ppc-2.jpg",
            technologies: ["Facebook Ads Manager", "Google Analytics", "Canva", "Hootsuite"],
            duration: "4 months"
        },

        "25": {
            title: "Google Shopping Success",
            client: "E-commerce Retailer",
            category: "PPC Advertising",
            description: "Optimized Google Shopping campaigns that dominated product search results and drove massive revenue growth.",
            challenge: "Google Shopping campaigns were underperforming with low impression share and high cost per click. Products weren't showing for relevant searches.",
            solution: "Optimized product feed with better titles and descriptions, implemented bidding strategies based on product margin, and created separate campaigns for best sellers.",
            results: [
                "Impression share increased from 15% to 78%",
                "Cost per click decreased 42%",
                "Shopping revenue increased 580%",
                "ROAS: 6.8x on $85K monthly ad spend"
            ],
            image: "images/portfolio/ppc-3.jpg",
            technologies: ["Google Merchant Center", "Google Ads", "DataFeedWatch", "Analytics"],
            duration: "3 months"
        },

        "26": {
            title: "LinkedIn B2B Lead Generation",
            client: "SaaS Company",
            category: "PPC Advertising",
            description: "LinkedIn advertising campaign targeting enterprise decision-makers that generated high-quality B2B leads.",
            challenge: "Previous lead generation efforts produced high volume but low quality leads. Sales team was wasting time on unqualified prospects.",
            solution: "Implemented precise targeting based on job title, company size, and industry. Created compelling ad creative and optimized for lead form submissions with qualifying questions.",
            results: [
                "Generated 340 marketing qualified leads",
                "Lead quality score increased from 4.2 to 8.6",
                "Cost per qualified lead: $85 (industry avg: $200)",
                "Closed deals: $680K in pipeline"
            ],
            image: "images/portfolio/ppc-4.jpg",
            technologies: ["LinkedIn Campaign Manager", "HubSpot", "Google Analytics"],
            duration: "5 months"
        },


        // DATA ANALYSIS PROJECTS
        "7": {
            title: "Sales Analytics Dashboard",
            client: "DataTech Solutions",
            category: "Data Analysis",
            description: "Comprehensive sales analytics dashboard providing real-time insights into sales performance, customer behavior, and revenue trends.",
            challenge: "The client had data scattered across multiple systems with no unified view of sales performance. Manual reporting took 3-4 days and was prone to errors.",
            solution: "Built an automated data pipeline that aggregates data from all sources, cleanses it, and presents it in an intuitive dashboard. Implemented predictive analytics for sales forecasting.",
            results: [
                "Reduced reporting time from 4 days to real-time",
                "Identified $2M in lost revenue opportunities",
                "Improved sales forecast accuracy by 85%",
                "Enabled data-driven decisions across 50+ sales reps"
            ],
            image: "images/portfolio/data-1.jpg",
            technologies: ["Python", "Tableau", "SQL", "Power BI"],
            duration: "2 months"
        },

        "8": {
            title: "Customer Churn Prediction",
            client: "FinTech Innovations",
            category: "Data Analysis",
            description: "Machine learning model to predict customer churn with 92% accuracy, enabling proactive retention strategies.",
            challenge: "The company was losing 15% of customers annually but couldn't identify at-risk customers until it was too late.",
            solution: "Developed a predictive model using historical customer data, transaction patterns, and engagement metrics. Created an early warning system that alerts the retention team 30 days before predicted churn.",
            results: [
                "Churn rate reduced from 15% to 8%",
                "Saved $4.5M in annual recurring revenue",
                "Model accuracy: 92%",
                "ROI: 680% in first year"
            ],
            image: "images/portfolio/data-2.jpg",
            technologies: ["Python", "Scikit-learn", "TensorFlow", "Jupyter"],
            duration: "3 months"
        },

        // UI/UX DESIGN PROJECTS
        "11": {
            title: "Fitness Tracking Mobile App",
            client: "FitLife Pro",
            category: "UI/UX Design",
            description: "Complete UI/UX design for a fitness tracking mobile application. Intuitive interface for logging workouts, tracking nutrition, and monitoring progress.",
            challenge: "Existing fitness apps were cluttered and overwhelming. Users wanted simplicity without sacrificing functionality.",
            solution: "Designed a clean, minimalist interface with a focus on the most important metrics. Created an intuitive navigation system and used data visualization to make progress tracking engaging.",
            results: [
                "User engagement increased by 215%",
                "App Store rating: 4.9/5 stars",
                "Daily active users increased by 340%",
                "Featured in App Store 'Apps We Love'"
            ],
            image: "images/portfolio/uiux-1.jpg",
            technologies: ["Figma", "Adobe XD", "Principle", "InVision"],
            duration: "2 months"
        },

        // SEO PROJECTS
        "15": {
            title: "Local SEO Domination",
            client: "Local Business Hub",
            category: "SEO",
            description: "Comprehensive local SEO campaign that took a local business from page 5 to #1 in Google Maps for their primary keywords.",
            challenge: "The business had no online presence and was losing customers to competitors who ranked higher in local search.",
            solution: "Optimized Google Business Profile, built local citations, implemented schema markup, and created location-specific content. Earned high-quality local backlinks.",
            results: [
                "Ranked #1 for 18 local keywords",
                "Google Maps views increased by 1,200%",
                "Phone calls from search increased 450%",
                "Monthly revenue increased by $50K"
            ],
            image: "images/portfolio/seo-1.jpg",
            technologies: ["Google My Business", "Moz", "Ahrefs", "Schema.org"],
            duration: "4 months"
        },

        // DIGITAL MARKETING PROJECTS
        "19": {
            title: "Viral Social Media Campaign",
            client: "TrendSetters Brand",
            category: "Digital Marketing",
            description: "Multi-platform social media campaign that generated 2.3M impressions and 45K new followers in 30 days.",
            challenge: "New product launch with limited budget and zero brand awareness in a competitive market.",
            solution: "Created a viral hashtag challenge, partnered with micro-influencers, and implemented a user-generated content strategy. Used data analytics to optimize posting times and content types.",
            results: [
                "2.3M total impressions",
                "45K new followers across platforms",
                "Engagement rate: 8.2% (industry avg: 1.5%)",
                "$285K in revenue generated"
            ],
            image: "images/portfolio/marketing-1.jpg",
            technologies: ["Instagram", "TikTok", "Facebook Ads Manager", "Hootsuite"],
            duration: "1 month"
        },

        // PPC ADVERTISING PROJECTS
        "23": {
            title: "Google Ads ROI Success",
            client: "GrowthMax Agency",
            category: "PPC Advertising",
            description: "Highly profitable Google Ads campaign achieving 847% ROAS (Return on Ad Spend) for an e-commerce client.",
            challenge: "Previous agency was delivering only 2.1x ROAS with high cost per acquisition. Budget was being wasted on non-converting keywords.",
            solution: "Complete account restructure, advanced audience targeting, negative keyword optimization, and landing page improvements. Implemented conversion tracking and A/B testing.",
            results: [
                "ROAS increased from 2.1x to 8.47x",
                "Cost per acquisition decreased by 68%",
                "Conversion rate increased by 423%",
                "$1.2M in revenue generated from $142K ad spend"
            ],
            image: "images/portfolio/ppc-1.jpg",
            technologies: ["Google Ads", "Google Analytics", "Unbounce", "Hotjar"],
            duration: "6 months"
        },


        // WEB DEVELOPMENT SERVICE PAGE PROJECTS (30-38)

        "30": {
            title: "Modern E-commerce Platform",
            client: "RetailCo Inc.",
            category: "Web Development",
            description: "A fully responsive e-commerce platform built with modern technologies. The website features advanced product filtering, secure payment integration, and real-time inventory management.",
            challenge: "The client needed a scalable e-commerce solution that could handle 10,000+ products while maintaining fast loading speeds and providing an intuitive user experience across all devices.",
            solution: "We implemented a custom-built e-commerce platform using React for the frontend and Node.js for the backend. We optimized images, implemented lazy loading, and used CDN for faster content delivery. The result was a lightning-fast shopping experience.",
            results: [
                "300% increase in online sales within 3 months",
                "Page load time reduced from 8s to 1.2s",
                "Mobile conversion rate increased by 156%",
                "Customer satisfaction score: 4.8/5"
            ],
            image: "images/portfolio/web-dev-1.jpg",
            technologies: ["React", "Node.js", "MongoDB", "Stripe API", "AWS"],
            duration: "3 months"
        },
        
        "31": {
            title: "Corporate Website Redesign",
            client: "Enterprise Corp",
            category: "Web Development",
            description: "Complete redesign and rebuild of a corporate website for a Fortune 500 company. Modern design, improved user experience, and enhanced brand presence.",
            challenge: "The existing website was outdated, slow, and not mobile-friendly. It failed to communicate the company's innovative brand identity and was difficult to navigate.",
            solution: "We created a modern, responsive website with a clean design language. Implemented a custom CMS for easy content updates, optimized for SEO, and integrated with their existing business systems.",
            results: [
                "Bounce rate decreased by 45%",
                "Average session duration increased by 2.5 minutes",
                "Lead generation increased by 78%",
                "First-page Google rankings for 25+ keywords"
            ],
            image: "images/portfolio/web-dev-2.jpg",
            technologies: ["WordPress", "PHP", "MySQL", "Custom Theme", "REST API"],
            duration: "2 months"
        },
        
        "32": {
            title: "SaaS Web Application",
            client: "CloudSync Systems",
            category: "Web Development",
            description: "A sophisticated SaaS platform for project management and team collaboration. Features real-time updates, file sharing, and advanced analytics dashboard.",
            challenge: "Building a complex web application that could support thousands of concurrent users while providing real-time collaboration features without compromising performance.",
            solution: "Developed a scalable architecture using microservices, implemented WebSocket for real-time features, and optimized database queries. Used cloud infrastructure for automatic scaling based on demand.",
            results: [
                "Successfully onboarded 5,000+ users in first month",
                "99.9% uptime maintained",
                "Real-time sync with <100ms latency",
                "Reduced operational costs by 40% through efficient architecture"
            ],
            image: "images/portfolio/web-dev-3.jpg",
            technologies: ["Vue.js", "Python", "PostgreSQL", "AWS", "WebSocket", "Redis"],
            duration: "6 months"
        },
        
        "33": {
            title: "Creative Portfolio Website",
            client: "Design Studio Pro",
            category: "Web Development",
            description: "Stunning portfolio website for a creative design agency showcasing their work with beautiful animations and smooth transitions.",
            challenge: "The agency needed a website that would showcase their creative work while loading quickly and working perfectly on all devices. They wanted something that would 'wow' potential clients.",
            solution: "Built a custom WordPress theme with smooth scroll animations, lazy loading for images, and optimized performance. Implemented custom post types for portfolio items and integrated Instagram feed.",
            results: [
                "Client inquiries increased by 240%",
                "Time on site increased from 45s to 4 minutes",
                "Featured in Awwwards Site of the Day",
                "Mobile experience score: 98/100"
            ],
            image: "images/portfolio/web-dev-4.jpg",
            technologies: ["WordPress", "GSAP", "JavaScript", "PHP", "ACF"],
            duration: "2 months"
        },
        
        "34": {
            title: "Online Booking System",
            client: "Wellness Spa & Resort",
            category: "Web Development",
            description: "Comprehensive booking system for spa and resort with real-time availability, automated reminders, and payment processing.",
            challenge: "Managing bookings through phone and email was time-consuming and error-prone. Double bookings were frequent and staff spent hours on administrative tasks.",
            solution: "Developed custom booking system integrated with their calendar, automated email/SMS reminders, online payment processing, and customer management dashboard.",
            results: [
                "Administrative time reduced by 70%",
                "Double bookings eliminated completely",
                "Online bookings increased revenue by $120K annually",
                "Customer no-show rate decreased from 15% to 3%"
            ],
            image: "images/portfolio/web-dev-5.jpg",
            technologies: ["Laravel", "MySQL", "Stripe", "Twilio SMS", "Vue.js"],
            duration: "3 months"
        },
        
        "35": {
            title: "Real Estate Listing Platform",
            client: "Prime Properties Ltd",
            category: "Web Development",
            description: "Modern real estate platform with advanced property search, virtual tours, map integration, and mortgage calculator.",
            challenge: "Creating an intuitive property search experience with thousands of listings while maintaining fast performance. Needed to integrate with multiple MLS systems.",
            solution: "Built a powerful search engine with filters for location, price, amenities, and more. Implemented map-based search, 360° virtual tours, and real-time availability updates.",
            results: [
                "10,000+ properties listed in first quarter",
                "Average search result time: 0.3 seconds",
                "Property inquiries increased by 245%",
                "Agent productivity improved by 60%"
            ],
            image: "images/portfolio/web-dev-6.jpg",
            technologies: ["React", "Node.js", "Elasticsearch", "Google Maps API", "MongoDB"],
            duration: "4 months"
        },
        
        "36": {
            title: "E-Learning Platform",
            client: "Oxbridge University",
            category: "Web Development",
            description: "Comprehensive online learning platform with video courses, interactive quizzes, progress tracking, certification system, and student dashboard.",
            challenge: "Building a scalable platform that could handle video streaming for thousands of concurrent students while providing smooth learning experience across all devices.",
            solution: "Implemented adaptive video streaming, built progress tracking system, created interactive quiz engine with instant feedback, and integrated payment gateway for course purchases.",
            results: [
                "15,000+ students enrolled in 6 months",
                "Video buffering issues reduced by 95%",
                "Course completion rate: 78% (industry avg: 15%)",
                "Generated $500K in course sales"
            ],
            image: "images/portfolio/web-dev-7.jpg",
            technologies: ["Next.js", "MongoDB", "AWS S3", "Stripe", "Video.js", "Socket.io"],
            duration: "5 months"
        },
        
        "37": {
            title: "Restaurant & Online Ordering",
            client: "Gourmet Bistro",
            category: "Web Development",
            description: "Beautiful restaurant website with integrated online ordering system, table reservations, menu management, and customer loyalty program.",
            challenge: "Restaurant needed a way to accept online orders without paying high commission fees to third-party delivery apps. Also wanted to manage menu updates easily.",
            solution: "Built custom ordering system with real-time order tracking, integrated payment processing, admin dashboard for order management and menu updates, and automated email confirmations.",
            results: [
                "Online orders increased by 420%",
                "Saved $18K annually in third-party fees",
                "Average order value increased 35%",
                "Customer satisfaction: 4.9/5 stars"
            ],
            image: "images/portfolio/web-dev-8.jpg",
            technologies: ["WordPress", "WooCommerce", "PHP", "Square API", "Google Maps"],
            duration: "2 months"
        },
        
        "38": {
            title: "Healthcare Portal",
            client: "MediCare Clinic Network",
            category: "Web Development",
            description: "Secure patient portal with appointment scheduling, medical records access, prescription refills, and telehealth integration.",
            challenge: "Patients were calling for appointments, prescription refills, and medical records - overwhelming staff. Needed HIPAA-compliant solution for sensitive health data.",
            solution: "Developed secure patient portal with two-factor authentication, encrypted data storage, integrated appointment scheduling with SMS reminders, and video consultation capability.",
            results: [
                "Phone call volume reduced by 60%",
                "Appointment no-shows decreased by 45%",
                "Patient satisfaction increased from 7.2 to 9.1",
                "Staff efficiency improved by 55%"
            ],
            image: "images/portfolio/web-dev-9.jpg",
            technologies: ["React", "Node.js", "PostgreSQL", "Twilio Video", "AWS", "Encryption"],
            duration: "4 months"
        },

         // DATA ANALYSIS SERVICE PAGE PROJECTS (41-48)
        "41": {
            title: "Sales Analytics Dashboard",
            client: "DataTech Solutions",
            category: "Data Analysis",
            description: "Comprehensive sales analytics dashboard providing real-time insights into sales performance, customer behavior, and revenue trends with predictive forecasting capabilities.",
            challenge: "The client had data scattered across multiple systems with no unified view of sales performance. Manual reporting took 3-4 days and was prone to errors, leading to missed opportunities.",
            solution: "Built an automated data pipeline that aggregates data from CRM, ERP, and marketing platforms, cleanses it, and presents it in an intuitive dashboard. Implemented predictive analytics for sales forecasting using machine learning.",
            results: [
                "Reduced reporting time from 4 days to real-time",
                "Identified $2M in lost revenue opportunities",
                "Improved sales forecast accuracy by 85%",
                "Enabled data-driven decisions across 50+ sales reps"
            ],
            image: "images/portfolio/data-1.jpg",
            technologies: ["Python", "Tableau", "SQL", "Power BI", "Apache Airflow"],
            duration: "2 months"
        },
        
        "42": {
            title: "Customer Churn Prediction",
            client: "FinTech Innovations",
            category: "Data Analysis",
            description: "Machine learning model to predict customer churn with 92% accuracy, enabling proactive retention strategies and reducing customer attrition significantly.",
            challenge: "The company was losing 15% of customers annually but couldn't identify at-risk customers until it was too late. No early warning system existed.",
            solution: "Developed a predictive model using historical customer data, transaction patterns, engagement metrics, and behavioral signals. Created an early warning system that alerts the retention team 30 days before predicted churn.",
            results: [
                "Churn rate reduced from 15% to 8%",
                "Saved $4.5M in annual recurring revenue",
                "Model accuracy: 92%",
                "ROI: 680% in first year"
            ],
            image: "images/portfolio/data-2.jpg",
            technologies: ["Python", "Scikit-learn", "TensorFlow", "Jupyter", "XGBoost"],
            duration: "3 months"
        },
        
        "43": {
            title: "Marketing ROI Analysis",
            client: "GrowthBrand Inc.",
            category: "Data Analysis",
            description: "Comprehensive marketing attribution analysis to identify which channels and campaigns deliver the best ROI across all digital touchpoints.",
            challenge: "Marketing budget was $2M annually but the company had no clear understanding of which channels were driving actual revenue. Attribution was broken.",
            solution: "Implemented multi-touch attribution modeling, integrated data from all marketing platforms, and created dashboard showing ROI by channel, campaign, and individual ads with customer journey mapping.",
            results: [
                "Identified 3 underperforming channels wasting $400K annually",
                "Reallocated budget to high-ROI channels",
                "Overall marketing ROI increased from 2.1x to 5.3x",
                "Revenue per marketing dollar increased 152%"
            ],
            image: "images/portfolio/data-3.jpg",
            technologies: ["Python", "Google Analytics", "SQL", "Data Studio", "R"],
            duration: "2 months"
        },
        
        "44": {
            title: "Customer Segmentation Study",
            client: "E-commerce Plus",
            category: "Data Analysis",
            description: "Advanced customer segmentation analysis using clustering algorithms to identify distinct customer groups and personalize marketing strategies.",
            challenge: "Company was treating all customers the same in marketing campaigns, resulting in low engagement and poor conversion rates. One-size-fits-all approach wasn't working.",
            solution: "Used RFM analysis and K-means clustering to segment customers into 8 distinct groups based on purchasing behavior, lifetime value, and engagement patterns. Created targeted strategies for each segment.",
            results: [
                "Email open rates increased from 18% to 42%",
                "Conversion rates improved by 156%",
                "Customer lifetime value increased 89%",
                "Marketing efficiency improved by 230%"
            ],
            image: "images/portfolio/data-4.jpg",
            technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "SQL"],
            duration: "2 months"
        },
        
        "45": {
            title: "Supply Chain Optimization",
            client: "Logistics Pro Ltd",
            category: "Data Analysis",
            description: "Advanced analytics solution to optimize supply chain operations, reduce costs, improve delivery times, and minimize stockouts and overstocking.",
            challenge: "Company was experiencing frequent stockouts, overstocking in some warehouses, and inefficient routing leading to high operational costs and customer dissatisfaction.",
            solution: "Built predictive demand forecasting models, optimized inventory levels across 15 warehouses, and created route optimization algorithms for 100+ delivery vehicles using operations research techniques.",
            results: [
                "Stockouts reduced by 76%",
                "Inventory carrying costs decreased 32%",
                "Delivery times improved by 28%",
                "Annual cost savings: $1.2M"
            ],
            image: "images/portfolio/data-5.jpg",
            technologies: ["Python", "R", "Tableau", "Operations Research", "Linear Programming"],
            duration: "4 months"
        },
        
        "46": {
            title: "Financial Performance Analysis",
            client: "Investment Group Co.",
            category: "Data Analysis",
            description: "Comprehensive financial analysis and reporting system providing real-time insights into portfolio performance, risk metrics, and investment opportunities.",
            challenge: "Investment firm had fragmented financial data across multiple systems. Creating monthly reports took 5 days and analysis was often outdated by the time decisions were made.",
            solution: "Built automated financial reporting system integrating data from all investment accounts, market data feeds, and risk systems. Created real-time dashboards for portfolio performance and risk monitoring.",
            results: [
                "Reporting time reduced from 5 days to real-time",
                "Identified $3.5M in optimization opportunities",
                "Risk assessment accuracy improved 94%",
                "Investment decision speed increased 400%"
            ],
            image: "images/portfolio/data-6.jpg",
            technologies: ["Python", "SQL", "Bloomberg API", "Power BI", "Pandas"],
            duration: "3 months"
        },
        
        "47": {
            title: "Website Behavior Analysis",
            client: "Digital Media Corp",
            category: "Data Analysis",
            description: "In-depth analysis of website user behavior, conversion funnels, and content performance to optimize user experience and increase conversions.",
            challenge: "Website had 500K monthly visitors but low conversion rate (1.2%). Company didn't understand where users were dropping off or why conversions were so low.",
            solution: "Implemented comprehensive tracking, analyzed user journeys, identified friction points in conversion funnel, created heat maps and session recordings, and A/B tested improvements.",
            results: [
                "Conversion rate increased from 1.2% to 4.8%",
                "Identified 7 critical UX issues causing 65% of dropoffs",
                "Revenue increased $2.3M annually",
                "Page load time insights led to 40% speed improvement"
            ],
            image: "images/portfolio/data-7.jpg",
            technologies: ["Google Analytics", "Hotjar", "SQL", "Python", "Mixpanel"],
            duration: "2 months"
        },
        
        "48": {
            title: "Demand Forecasting Model",
            client: "RetailCo Inc.",
            category: "Data Analysis",
            description: "Predictive demand forecasting system using time series analysis and machine learning to optimize inventory and prevent stockouts during peak seasons.",
            challenge: "Retailer struggled with inventory management - frequent stockouts during holidays and massive overstocking during slow periods, leading to markdowns and lost profit.",
            solution: "Developed advanced forecasting models using historical sales data, seasonality patterns, promotional calendars, weather data, and economic indicators. Created automated alerts for inventory managers.",
            results: [
                "Forecast accuracy improved from 65% to 94%",
                "Stockouts during peak season reduced by 82%",
                "Excess inventory reduced by 45%",
                "Profit margin improved by $1.8M annually"
            ],
            image: "images/portfolio/data-8.jpg",
            technologies: ["Python", "Prophet", "ARIMA", "XGBoost", "Tableau"],
            duration: "3 months"
        },

        "49": {
            title: "Supply Chain Optimization",
            client: "Logistics Pro Ltd",
            category: "Data Analysis",
            description: "Advanced analytics solution to optimize supply chain operations, reduce costs, improve delivery times, and minimize stockouts and overstocking across multiple distribution centers.",
            challenge: "Company was experiencing frequent stockouts costing $2M annually, overstocking in some warehouses while others ran empty, and inefficient routing leading to high fuel costs and late deliveries. No visibility into supply chain bottlenecks.",
            solution: "Built predictive demand forecasting models using historical sales and seasonal patterns, optimized inventory levels across 15 warehouses using safety stock calculations, and created route optimization algorithms for 100+ delivery vehicles using operations research techniques and real-time traffic data.",
            results: [
                "Stockouts reduced by 76% saving $1.5M annually",
                "Inventory carrying costs decreased 32%",
                "Delivery times improved by 28%",
                "Fuel costs reduced by $180K annually",
                "Total annual cost savings: $1.2M"
            ],
            image: "images/portfolio/data-supply-chain.jpg",
            technologies: ["Python", "R", "Tableau", "Operations Research", "Linear Programming", "Google OR-Tools"],
            duration: "4 months"
        }
    };

    // Get project data or show default
    const project = projects[projectId] || {
        title: "Project Not Found",
        client: "N/A",
        category: "N/A",
        description: "Project details are being updated. Please check back soon.",
        challenge: "N/A",
        solution: "N/A",
        results: ["Coming soon"],
        image: "images/portfolio/placeholder.jpg"
    };

    // Build modal HTML
    modalBody.innerHTML = `
        <h2 style="color: var(--primary-color); margin-bottom: 10px;">${project.title}</h2>
        <p style="color: var(--text-light); margin-bottom: 20px;">
            <strong>Client:</strong> ${project.client} | 
            <strong>Category:</strong> ${project.category}
            ${project.duration ? ` | <strong>Duration:</strong> ${project.duration}` : ''}
        </p>
        
        <h3 style="color: var(--primary-color); margin-bottom: 10px;">Overview</h3>
        <p style="color: var(--text-light); line-height: 1.7; margin-bottom: 20px;">${project.description}</p>
        
        <h3 style="color: var(--primary-color); margin-bottom: 10px;">The Challenge</h3>
        <p style="color: var(--text-light); line-height: 1.7; margin-bottom: 20px;">${project.challenge}</p>
        
        <h3 style="color: var(--primary-color); margin-bottom: 10px;">Our Solution</h3>
        <p style="color: var(--text-light); line-height: 1.7; margin-bottom: 20px;">${project.solution}</p>
        
        ${project.technologies ? `
            <h3 style="color: var(--primary-color); margin-bottom: 10px;">Technologies Used</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
                ${project.technologies.map(tech => `
                    <span style="background: var(--bg-light); color: var(--secondary-color); padding: 6px 14px; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">${tech}</span>
                `).join('')}
            </div>
        ` : ''}
        
        <h3 style="color: var(--primary-color); margin-bottom: 10px;">Results & Impact</h3>
        <ul style="list-style: none; padding: 0;">
            ${project.results.map(result => `
                <li style="padding: 8px 0; color: var(--text-light); display: flex; align-items: start; gap: 10px;">
                    <i class="fas fa-check-circle" style="color: var(--success-color); margin-top: 4px;"></i>
                    <span>${result}</span>
                </li>
            `).join('')}
        </ul>
    `;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
};

// Close modals
modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        if (modal) modal.classList.remove('show');
        if (successModal) successModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    if (e.target === successModal) {
        successModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// CONTACT FORM VALIDATION
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });

        let isValid = true;

        // Validate name
        const name = document.getElementById('name');
        if (name && name.value.trim() === '') {
            name.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email.value.trim())) {
            email.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Validate service selection
        const service = document.getElementById('service');
        if (service && service.value === '') {
            service.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Validate message
        const message = document.getElementById('message');
        if (message && message.value.trim() === '') {
            message.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Validate terms checkbox
        const terms = document.getElementById('terms');
        if (terms && !terms.checked) {
            alert('Please accept the Terms & Conditions to continue.');
            isValid = false;
        }

        if (isValid) {
            // Show loading state
            const btnText = contactForm.querySelector('.btn-text');
            const btnLoader = contactForm.querySelector('.btn-loader');
            const submitBtn = contactForm.querySelector('.btn-submit');

            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;

                // Reset form
                contactForm.reset();

                // Show success modal
                if (successModal) {
                    successModal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            }, 2000);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// FORM INPUT ANIMATION (Remove error on input)
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('error');
    });
});

// SCROLL ANIMATIONS
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.service-card, .portfolio-item, .benefit-card, .testimonial-card, .offer-card, .team-member, .value-card').forEach(el => {
    observer.observe(el);
});

// PAGINATION
const paginationBtns = document.querySelectorAll('.pagination-num');
const prevPageBtn = document.querySelector('.pagination .pagination-btn:first-child');
const nextPageBtn = document.querySelector('.pagination .pagination-btn:last-child');

paginationBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        paginationBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update prev/next button states
        if (prevPageBtn) {
            prevPageBtn.disabled = index === 0;
        }
        if (nextPageBtn) {
            nextPageBtn.disabled = index === paginationBtns.length - 1;
        }

        // Scroll to top of portfolio
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

if (prevPageBtn) {
    prevPageBtn.addEventListener('click', () => {
        const activeBtn = document.querySelector('.pagination-num.active');
        const prevBtn = activeBtn.previousElementSibling;
        if (prevBtn && prevBtn.classList.contains('pagination-num')) {
            prevBtn.click();
        }
    });
}

if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
        const activeBtn = document.querySelector('.pagination-num.active');
        const nextBtn = activeBtn.nextElementSibling;
        if (nextBtn && nextBtn.classList.contains('pagination-num')) {
            nextBtn.click();
        }
    });
}

// HANDLE WINDOW RESIZE
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }, 250);
});

// LAZY LOADING IMAGES (Optional enhancement)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// CONSOLE WELCOME MESSAGE
console.log('%c🚀 PrimEdge Digitals', 'color: #1fae9a; font-size: 24px; font-weight: bold;');
console.log('%cWebsite developed with ❤️ by PrimEdge Digitals', 'color: #6a6a6a; font-size: 14px;');
console.log('%cInterested in working with us? Visit: contact.html', 'color: #1fae9a; font-size: 12px;');

// PREVENT RIGHT CLICK ON IMAGES (Optional - for image protection)
// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// PERFORMANCE OPTIMIZATION - Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events for better performance
const debouncedScroll = debounce(() => {
    // Add any heavy scroll operations here if needed
}, 100);

window.addEventListener('scroll', debouncedScroll);

// SERVICE WORKER REGISTRATION (Optional - for PWA)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
}
*/

console.log('✅ PrimEdge Digitals - All scripts loaded successfully!');