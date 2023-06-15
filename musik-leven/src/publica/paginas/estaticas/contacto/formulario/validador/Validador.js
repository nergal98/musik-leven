export default class Validador {

    constructor(value) {

        this.value = value;
        this.result = [];

    }

    isNotEmpty(msg) {

        if (!this.value) {

            this.result.push(msg);

        }

        return this;

    }

    isLength(maxLen, msg) {

        if (this.value.length > maxLen) {

            this.result.push(msg);

        }

        return this;

    }

    isEmail(msg) {

        if (!this.value.match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)) {

            this.result.push(msg);

        }

        return this;

    }

}