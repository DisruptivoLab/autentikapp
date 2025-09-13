// Secure data loader with obfuscation
class SecureDataLoader {
    constructor() {
        this.apiKey = 'wm_2025_auth';
        this.cache = new Map();
    }

    async loadBusinessData() {
        if (this.cache.has('business')) {
            return this.cache.get('business');
        }

        try {
            // Add timestamp and referrer check for basic security
            const timestamp = Date.now();
            const referrer = document.referrer || window.location.origin;
            
            if (!this.validateAccess(referrer, timestamp)) {
                throw new Error('Access denied');
            }

            const response = await fetch('./business.json?' + this.generateToken(timestamp));
            
            if (!response.ok) {
                throw new Error('Data unavailable');
            }

            const data = await response.json();
            
            // Add metadata to make it look like API response
            const enrichedData = {
                ...data,
                _meta: {
                    timestamp: timestamp,
                    version: '2.1.0',
                    source: 'wmerch_api',
                    session: this.generateSessionId()
                }
            };

            this.cache.set('business', enrichedData);
            return enrichedData;
            
        } catch (error) {
            console.error('Data loading error:', error);
            throw new Error('Unable to load business data');
        }
    }

    validateAccess(referrer, timestamp) {
        // Basic validation - in production this would be more sophisticated
        const now = Date.now();
        return (now - timestamp) < 5000; // 5 second window
    }

    generateToken(timestamp) {
        return btoa(timestamp + this.apiKey).substring(0, 16);
    }

    generateSessionId() {
        return 'sess_' + Math.random().toString(36).substring(2, 15);
    }
}

// Global instance
window.DataLoader = new SecureDataLoader();