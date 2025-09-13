// Simple router for clean URLs
window.Router = {
    routes: {
        '/': 'landing.html',
        '/login': 'login.html',
        '/dashboard': 'dashboard.html',
        '/clientes': 'customer.html',
        '/productos': 'productos.html',
        '/ids': 'ids.html',
        '/negocio': 'business.html',
        '/talleres': 'talleres.html'
    },

    init() {
        // Handle initial load
        this.handleRoute();
        
        // Handle back/forward buttons
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Intercept navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-route]');
            if (link) {
                e.preventDefault();
                this.navigate(link.getAttribute('data-route'));
            }
        });
    },

    navigate(path) {
        history.pushState(null, '', path);
        this.handleRoute();
    },

    handleRoute() {
        const path = window.location.pathname;
        const file = this.routes[path];
        
        if (file && path !== '/') {
            // Load the HTML file content
            fetch(file)
                .then(response => response.text())
                .then(html => {
                    document.documentElement.innerHTML = html;
                    this.executeScripts();
                })
                .catch(() => {
                    // Fallback to direct file access
                    window.location.href = file;
                });
        }
    },

    executeScripts() {
        // Re-execute scripts after content load
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.src) {
                const newScript = document.createElement('script');
                newScript.src = script.src;
                document.head.appendChild(newScript);
            } else if (script.textContent) {
                eval(script.textContent);
            }
        });
    }
};

// Auto-init router
document.addEventListener('DOMContentLoaded', () => {
    window.Router.init();
});