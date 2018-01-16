import { LocationManager } from './Source/LocationManager';

document.addEventListener('DOMContentLoaded', () => {
    for (let container of document.querySelectorAll('[data-location-manager]')) {
        const config = JSON.parse(container.getAttribute('data-location-manager'));
        new LocationManager(config);
    }
});