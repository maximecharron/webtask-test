'use strict';
const apiai = require('apiai');

function sendMessageOnSlack(context, cb, message) {
    cb(null, { text: message, response_type: 'in_channel' });
}


module.exports = (context, cb) => {

    const apiAiApp = apiai(context.data.APIAI_TOKEN);
    let message = context.data.text;

    let request = apiAiApp.textRequest(message, {
        sessionId: context.data.user_name
    });

    request.on('response', function(response) {
        sendMessageOnSlack(context, cb, response.result.fulfillment.speech)
    });

    request.end();
};