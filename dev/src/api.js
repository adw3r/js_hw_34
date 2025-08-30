import API_KEY from "./config.js";

class Api {
    __base_url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}`;
    __cache_key = 'weather_cache_v1';
    __cache_ttl_ms = 2 * 60 * 60 * 1000; // 2 hours

    async __readMock() {
        try {
            const response = await fetch('/src/mocks/fetch.json');
            return await response.json();
        } catch (e) {
            console.error('Failed to read mock data' ,e);
            return null;
        }
    }

    __getCache(query) {
        try {
            const raw = localStorage.getItem(this.__cache_key);
            if (!raw) return null;
            const cache = JSON.parse(raw);
            const entry = cache?.[query];
            if (!entry) return null;
            const isFresh = Date.now() - entry.timestamp < this.__cache_ttl_ms;
            return isFresh ? entry.data : null;
        } catch (_) {
            return null;
        }
    }

    __setCache(query, data) {
        try {
            const raw = localStorage.getItem(this.__cache_key);
            const cache = raw ? JSON.parse(raw) : {};
            cache[query] = { data, timestamp: Date.now() };
            localStorage.setItem(this.__cache_key, JSON.stringify(cache));
        } catch (err) {
            console.error(err);
        }
    }

    async getWeather(query = 'Kyiv') {
        const cached = this.__getCache(query);
        if (cached) return cached;

        try {
            const response = await fetch(this.__base_url + `&q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            this.__setCache(query, data);
            return data;
        } catch (err) {
            const mock = await this.__readMock();
            if (mock) {
                this.__setCache(query, mock);
                return mock;
            }
            throw err;
        }
    }
}

const api = new Api();
export default api;