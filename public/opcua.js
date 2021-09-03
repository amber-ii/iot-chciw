// const express = require('express');
// const app = express();
var schedule = require('node-schedule');
const opcua = require("node-opcua");

async function readPV() {
    const client = opcua.OPCUAClient.create();
    client.on("backoff", () => console.log("backoff"));
    try {
        //await client.connect("opc.tcp://192.168.170.229:49320");
        await client.connect("opc.tcp://192.168.1.198:49300");
        const session = await client.createSession({}); 
		var tag = ["ns=2;s=ABPLC-A9PLC.A9PLC.A9_36P_ACI_CON.PV","ns=2;s=ABPLC-A9PLC.A9PLC.PT100_3","ns=2;s=ABPLC-A9PLC.A9PLC.PT100_2","ns=2;s=ABPLC-A9PLC.A9PLC.PT100_1"];
		console.log(tag);
			session.readVariableValue(tag, function(err,dataValue) {
				if (!err){
                    schedule.scheduleJob('* * * * * *', async function(){
					console.log(dataValue[0].value.value);
					console.log(dataValue[1].value.value);
					console.log(dataValue[2].value.value);
					console.log(dataValue[3].value.value);
                    })
					/*寫點位
					var nodesToWrite = [{
							nodeId: "ns=2;s=OPCUA-A25DCS.Device1.LocalDA.Device1.TIC2502-1(PV)",
							attributeId: opcua.AttributeIds.Value,
							indexRange: null,
							value: { 
								value: { 
									dataType: dataValue.value.dataType,
									value: 97.4
								}
							}
					}];
					session.write(nodesToWrite, function(err,statusCode,diagnosticInfo) {
						if (!err) {
							console.log(" write ok" );
							console.log(diagnosticInfo);
							console.log(statusCode);
						}
						console.log(err);
					}); */
				}
				else			console.log("None");	
				
			});
			//await session.close();
			//await client.disconnect();
    }
    catch (err) {
        console.log("Err =", err);
    }
}
readPV();


// app.get('/', function (req, res) {
//     res.send(readPV());
// })

// app.listen(5501)

