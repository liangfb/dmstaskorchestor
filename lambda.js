const AWS = require('aws-sdk');

exports.handler = async (event, context) => {

    AWS.config.update({region: event.region});
    var dms = new AWS.DMS();
    let eventType = event.Action.toString();
    if (eventType == "Stop")
    {
        var params = {
           ReplicationTaskArn: event.taskArn
        };
        dms.stopReplicationTask(params, function(err, data){
            if (err) 
                console.log(err); 
            else
                console.log('Stop: ' + data);
        });
    }
    if(eventType == "Start")
    {
        var params = {
            ReplicationTaskArn: event.taskArn,
            StartReplicationTaskType: "resume-processing"
        };
        dms.startReplicationTask(params, function(err, data) {
            if (err) 
                console.log(err); 
            else
                console.log('Start: ' + data);
        });
    }
    
}