function ValidationError (message, fieldName, value) {
    const instance = new Error(message)
    instance.field = fieldName
    instance.invalidValue = value
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
  
    if (Error.captureStackTrace) {
      Error.captureStackTrace(instance, ValidationError)
    }
    return instance
  }
  
  ValidationError.prototype = Object.create(Error.prototype, {
    constructor: {
      value: Error,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  
  if (Object.setPrototypeOf){
    Object.setPrototypeOf(ValidationError, Error);
  } else {
    ValidationError.__proto__ = Error;
  }
  
  export default ValidationError