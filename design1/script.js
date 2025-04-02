class DigitalClock {
    constructor() {
        this.is24HourFormat = false;
        this.isDarkMode = false;
        this.alarmTime = null;
        this.weatherAPIKey = 'YOUR_API_KEY'; // Get API key from OpenWeather

        this.init();
    }

    init() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        $('#formatToggle').on('change', () => this.toggleFormat());
        $('#themeToggle').on('change', () => this.toggleTheme());
        $('#setAlarm').on('click', () => this.setAlarm());
        this.getWeather();
    }

    updateClock() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let ampm = hours >= 12 ? 'PM' : 'AM';

        if (!this.is24HourFormat) {
            hours = hours % 12 || 12;
        }

        $('#hours').text(this.formatTime(hours));
        $('#minutes').text(this.formatTime(minutes));
        $('#seconds').text(this.formatTime(seconds));
        $('#ampm').text(this.is24HourFormat ? '' : ampm);
        
        this.checkAlarm();
    }

    formatTime(time) {
        return time < 10 ? '0' + time : time;
    }

    toggleFormat() {
        this.is24HourFormat = $('#formatToggle').is(':checked');
    }

    toggleTheme() {
        $('body').toggleClass('dark-mode');
    }

    setAlarm() {
        this.alarmTime = $('#alarmTime').val();
        $('#alarmStatus').text(`Alarm set for ${this.alarmTime}`);
    }

    checkAlarm() {
        let now = new Date();
        let currentTime = now.toTimeString().slice(0, 5);
        if (this.alarmTime === currentTime) {
            alert('Alarm Ringing!');
        }
    }

    getWeather() {
        $('#weather').text('Weather: 25°C, Sunny'); // Simulated
    }
}

$(document).ready(() => {
    new DigitalClock();
});
