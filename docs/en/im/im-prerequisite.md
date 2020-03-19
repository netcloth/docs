# IM service pre-check

## 1 Blockchain service node deployment check

* Start the rest server, refer to [start node, sync block](../get-started/how-to-join-testnet.md)
* Check whether the blockchain node synchronization is complete, refer to [View node synchronization status](../get-started/how-to-join-testnet.md)

* Blockchain service process check, execute the ``` ps -ef|grep nch``` command to check that the two processes nchd and nchcli are running normally.

## 2 Account creation and private key file export
* Please refer to [How to use nchcli command line to import /export private keys](../advanced/keys.md) to complete account creation and private key export
* Put the exported private key in a keystore.txt file. You will need this private key file and the password to read the private key file when deploying IM services later.

## 3 IM server IPAL Claim
* Declare the server to provide IM service Refer to [Claim IPAL](../advanced/ipal.md). After the statement is completed, open the NetCloth APP, and you can see your node in "My Settings"-->"Client Service Settings (C-IPAL)" -->"Communication Address". Since the IM service is not deployed, it will show that it cannot connect.
* If you do not see your service statement here, please check if the IPAL statement was successful.

After completing the above steps, you can start the deployment of IM services. If the preceding steps are not completed, please fix them first.