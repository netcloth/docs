# How to use nchcli command line to import / export private keys

## Create a new account

Create a new account with the ```nchcli```
```bash
nchcli keys add <key_name>
```

Enter the wallet password according to prompts, and get the following example output:
```bash
  name: lucy
  type: local
  address: nch1p3fuppcxud5rjsaywuyuguh6achmj5p0r6z6ve  
  pubkey: nchpub1addwnpepqg8mfc6t9eaw9lal0c4tzma5vgmqzkgszwcgljcz3sy8rd2rukgxz9dtmph  
  mnemonic: "" 
  threshold: 0
  pubkeys: []

**Important** write and store the mnemonic phrase in a safe place.
It is the only way to recover your account if you forget your password.

  ##The sample of mnemonic#
connect plug cigar purchase inflict enroll ten limb quantum never supply grid home case process claw truly grape federal liberty tree remove side quantum
```

The mnemonic can be used to restore the account. The command to restore the account is:

```bash
nchcli keys add <key_name> --recover
```

## Export private key file

```nchcli export``` can export the private key in encrypted format
```bash
nchcli keys export <name> [flags]
```

The above command line exports the encrypted private key, similar to the following format:

```javascript
-----BEGIN TENDERMINT PRIVATE KEY-----
salt: F49D9D8EB12849AD84405420E518870B
kdf: bcrypt

pMKOcIxmaPskH6T3/H1cDrrFT7jfJxRb7JsG2Vkc5wiAsJ3Nl2kb3OJtu1lCSYli
gJDlh038lb1X4LhKjqpnEXa7FvsJtLXGXpX1PIY=
=ONle
-----END TENDERMINT PRIVATE KEY-----
```

## Import private key file

```nchcli import``` can import encrypted private key files

```bash
nchcli keys import <name> <keyfile> [flags]
```

View the imported keys

```bash
nchcli keys list
```