class Validator {
  constructor(value) {
    this.value = value;
    this.results = [];
  }

  isNotEmpty(msg) {
    if (!this.value) {
      this.results.push(msg);
    }
    return this;
  }

  isLength(minLen, maxLen, msg) {
    if (this.value.length < minLen || this.value.length > maxLen) {
      this.results.push(msg);
    }
    return this;
  }

  isDate(msg) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(this.value)) {
      this.results.push(msg);
    }
    return this;
  }

  isNumber(msg) {
    if (isNaN(this.value)) {
      this.results.push(msg);
    }
    return this;
  }

  isRequired(msg) {
    if (!this.value) {
      this.results.push(msg);
    }
    return this;
  }

  isImageFile(msg) {
    const regex = /\.(jpe?g|png|gif|bmp)$/i;
    if (!regex.test(this.value)) {
      this.results.push(msg);
    }
    return this;
  }

  hasMaxTwoDecimals(msg) {
    if (!/^(\d+\.?\d{0,2}|\.\d{1,2})$/.test(this.value)) {
      this.results.push(msg);
    }
    return this;
  }

  getErrors() {
    return this.results.length > 0 ? this.results[0] : null;
  }

  hasErrors() {
    return this.results.length > 0;
  }
}

export default Validator;
