class Settings {
    constructor(size, applesLimit, rocksLimit) {
        this.size = size;
        this.applesLimit = applesLimit;
        this.rocksLimit = rocksLimit;
    }
}

function getSettingsByLevel(level) {
    switch (level) {
        case "very-easy": {
            size = 50;
            applesLimit = 15;
            rocksLimit = 1;
            break;
        }

        case "easy": {
            size = 50;
            applesLimit = 10;
            rocksLimit = 10;
            break;
        }

        case "medium": {
            size = 50;
            applesLimit = 7;
            rocksLimit = 20;
            break;
        }

        case "hard": {
            size = 25;
            applesLimit = 4;
            rocksLimit = 100;
            break;
        }

        case "very-hard": {
            size = 25;
            applesLimit = 2;
            rocksLimit = 250;
            break;
        }

        case "nightmare": {
            size = 20;
            applesLimit = 1;
            rocksLimit = 500;
            break;
        }

        case "hell": {
            size = 20;
            applesLimit = 1;
            rocksLimit = 750;
            break;
        }

        case "impossible": {
            size = 12.5;
            applesLimit = 1;
            rocksLimit = 1000;
            break;
        }
    }

    var settings = new Settings(size, applesLimit, rocksLimit);

    return settings;
}