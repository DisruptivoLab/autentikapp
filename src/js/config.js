// API Configuration
const API_CONFIG = {
    baseUrl: './api/',
    key: 'wm_auth_2025',
    endpoints: {
        business: 'data.php'
    }
};

// Secure data fetcher
async function fetchBusinessData() {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.business}?key=${API_CONFIG.key}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching business data:', error);
        // Fallback to direct JSON if API fails (development only)
        try {
            const fallbackResponse = await fetch('./business.json');
            return await fallbackResponse.json();
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            throw new Error('Unable to load business data');
        }
    }
}

// Export for use in other scripts
window.BusinessAPI = {
    fetchData: fetchBusinessData
};