// Simple data manager
window.DataManager = {
    data: null,
    
    async load() {
        if (this.data) return this.data;
        
        try {
            const response = await fetch('./business.json');
            this.data = await response.json();
            return this.data;
        } catch (error) {
            console.error('Error loading data:', error);
            throw error;
        }
    }
};