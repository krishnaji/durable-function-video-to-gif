const df = require("durable-functions");

module.exports = async function (context, eventGridEvent) {
    const client = df.getClient(context);
    const subject = (eventGridEvent.subject).split("/");

    const options = {
        container: subject[4],
        blob:subject[6]

    };
    context.log(options);
    const instanceId = await client.startNew('Workflow',undefined,options);
    context.log(`@@@@@@@@@@@ Started orchestration with ID = '${instanceId}'.`);
};
