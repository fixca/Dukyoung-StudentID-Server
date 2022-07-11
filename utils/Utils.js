class Utils {
    static getCurrentTimestamp() {
        return Math.round(Date.now() / 1000);
    }

    static sleep(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        });
    }
}

module.exports = Utils;