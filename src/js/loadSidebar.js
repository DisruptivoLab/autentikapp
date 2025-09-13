// Global sidebar component
window.Sidebar = {
    async load() {
        const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
        if (!sidebarPlaceholder) return;
        
        const sidebarHtml = `
            <aside class="w-64 bg-gray-900 shadow-md h-screen sticky top-0 flex flex-col">
                <div class="flex items-center justify-center h-20 border-b border-gray-800">
                    <img src="/identidad/autentikapp.svg" alt="Autentikapp" class="h-12">
                </div>
                <nav class="flex-grow px-4 py-6">
                    <a href="/dashboard" data-route="/dashboard" class="nav-link flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-md">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M3 6h18"></path></svg>Tablero
                    </a>
                    <a href="/clientes" data-route="/clientes" class="nav-link flex items-center mt-2 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-md">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>Clientes
                    </a>
                    <a href="/productos" data-route="/productos" class="nav-link flex items-center mt-2 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-md">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>Productos
                    </a>
                    <a href="/ids" data-route="/ids" class="nav-link flex items-center mt-2 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-md">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>ID's
                    </a>
                    <a href="/negocio" data-route="/negocio" class="nav-link flex items-center mt-2 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-md">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>Negocio
                    </a>
                    <a href="/talleres" data-route="/talleres" class="nav-link flex items-center mt-2 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-md">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>Talleres
                    </a>
                </nav>
                <div class="px-4 py-4 border-t border-gray-800">
                    <button onclick="logout()" class="flex items-center w-full px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-md">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>Cerrar Sesión
                    </button>
                </div>
            </aside>
        `;
        
        sidebarPlaceholder.innerHTML = sidebarHtml;
        
        // Highlight active page
        const currentPage = window.location.pathname.split('/').pop();
        const links = sidebarPlaceholder.querySelectorAll('.nav-link');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('bg-gray-800', 'text-white');
                link.classList.remove('text-gray-400');
            }
        });
    }
};

// Global logout function
window.logout = function() {
    localStorage.removeItem('autentikapp_session');
    window.location.href = '/';
};

// Auto-load sidebar
document.addEventListener('DOMContentLoaded', () => {
    window.Sidebar.load();
});