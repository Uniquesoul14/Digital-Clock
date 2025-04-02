class FloralClock {
    constructor() {
        this.is24HourFormat = false;
       
        this.init();
    }

    init() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        $('#formatToggle').on('change', () => this.toggleFormat());
        this.fetchWeather();
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

        let options = { weekday: 'long', month: 'short', day: 'numeric' };
        $('#date').text(now.toLocaleDateString('en-US', options));
    }

    formatTime(time) {
        return time < 10 ? '0' + time : time;
    }

    toggleFormat() {
        this.is24HourFormat = $('#formatToggle').is(':checked');
    }

}

$(document).ready(() => {
    new FloralClock();
});
