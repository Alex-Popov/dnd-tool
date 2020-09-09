'use strict';

class OperationResults {
    isSuccessful = false;
    messages = [];
    data;

    constructor(isSuccessful, messages, data) {
        this.isSuccessful = !!isSuccessful;
        this.messages = this.messages.concat(messages);
        this.data = data;
    }
}



const promiseHandler = (isSuccessful, messages, data) => {
    if (messages === undefined && data === undefined) {
        if (isSuccessful instanceof Error) {
            return new OperationResults(false, isSuccessful.message);

        } else {
            return new OperationResults(true, '', isSuccessful);
        }

    } else {
        return new OperationResults(isSuccessful, messages, data);
    }
}


module.exports = {
    OperationResults,
    promiseHandler
}