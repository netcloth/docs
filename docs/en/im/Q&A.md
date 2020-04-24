# FAQ
## 1.Server port security configuration when deploying IM service nodes
* IM server must open the following ports on the public network
  * 80 HTTP service port
  * 1080 gRPC service port
  * 4455 Gateway long connection port
  * 8500 service monitoring port, you can temporarily open when analyzing problems

* The following ports cannot be accessed on the public network
  * 6379 redis service port
  * 27017 mongodb service port

## 2.NetCloth APP cannot find the deployed IM service node
The starfish node displayed in the communication address list of the NetCloth client must complete the IPAL claim. Please check whether the [IPAL declaration](../advanced/ipal.md) is completed.

## 3 NetCloth client can see my starfish node, but it shows that it cannot connect
Executing the **nchcli q ipal list** command on the server, find your starfish node, and check the endpoints array with type 1.

For example, to check the configuration of the nchtest02 node through the command is as follows:
```json
{
    "operator_address": "nch1mzj5jhaevmh0780jrztvkaw5m4ylm4c63psgpu",
    "moniker": "nchtest02",
    "website": "www.nchtest02.org",
    "details": "nchtest02 server endpoint",
    "endpoints": [
      {
        "type": "1",
        "endpoint": "http://47.104.199.106"
      },
      {
        "type": "3",
        "endpoint": "http://47.90.5.138"
      }
    ],
    "bond": {
      "denom": "pnch",
      "amount": "1000000000000000"
    }
  }
```

Find the endpoint as http://47.104.199.106, and then execute the following command to check if it can be accessed

```bash
curl http://47.104.199.106/v1/ping
```

If it can be accessed normally, a "ping" response should be displayed. If the curl command fails to execute, you can check it as follows
* When IPAL is registered, is the endpoint filled in with a valid http address?
* Whether the IP can be accessed normally on the public network
* Whether the access of port 80 of the IP has been opened, check through telnet ip 80
* Check whether the IM service servicehub service is started normally

## 4. The client can send CIPAL transactions, but cannot query the transaction status via TXID  
   
**Reason**: CIPAL transactions require a starfish node to pay Tx fees. Insufficient fees will cause the CIPAL transaction to fail to be broadcast.

**Solution**: Make sure the balance of the corresponding blockchain wallet account is sufficient to pay the handling fee

## 5 The starfish node can connect, but NetCloth App cannot connect.

Client login is to connect to the gateway service. If the client shows that it is not connected, please check as follows

* Check if the gateway service starts normally
* According to the returned endpoint, execute the following command to check whether the returned gateway login address can be connected

```
curl ${endpoint}/v1/service/gateway?pub_key=0453a31024548b41d8f4cd54806289948774ea7b303543035dc88efd70217efed243609e8883b4acd75fe68a22e6a322c71275a6a35173538a60896d10a1d0ae80

E.g
curl http://47.104.199.106/v1/service/gateway?pub_key=0453a31024548b41d8f4cd54806289948774ea7b303543035dc88efd70217efed243609e8883b4acd75fe68a22e6a322c71275a6a35173538a60896d10a1d0ae80
```

Execute telnet with the IP and port of the returned gateway endpoint to check whether the IM gateway can be connected
