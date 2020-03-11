# Multisig key

## Create a multisig key

The following example creates a multisig key with 3 sub-keys, and specify the minimum number of signatures ad 2.
The tx could be broadcast only when the number of signatures is greater than or equal to 2.

```bash
# usage
nchcli keys add <multisig-key-name>  --multisig-threshold=2 \
--multisig=<sub-key-name-1>,<sub-key-name-2>,<sub-key-name-3>

# example
nchcli keys add mm --multisig-threshold=2 --multisig=alice,bob,dan
```

:::warning tips

If you don't have all the permission of sub-keys, you can use 
```nchcli keys add <key-name> --pubkey```
to import pubkeys。

:::

List multisig keys:

```bash
# usage
nchcli keys show <multisig-key-name>

# example, list keys of mm:
nchcli keys show mm
```

## Construct an offline tx by multisig key

The newly created multi-signature account mm is an offline account. Before constructing offline transactions, you need to transfer some tokens to the mm account.

```bash
# usage
# generate a transfer tx
nchcli send --to=$(nchcli keys show alice -a) \
--amount=10pnch --gas-prices=1000.0pnch  \
--from=$(nchcli keys show <multisig-key-name> -a) \
--generate-only

# example
nchcli send --to=$(nchcli keys show alice -a) \
--amount=10pnch --gas-prices=1000.0pnch  \
--from=$(nchcli keys show mm -a) \
--generate-only > unsigned.json
```

## Sign tx offline 

Assume the multisig-threshold is 2, here we sign the unsigned.json by 2 of the signers.

Sign tx from sub-key alice

```bash
nchcli tx sign unsigned.json --from $(nchcli keys show alice -a) \
--multisig=$(nchcli keys show mm -a) --signature-only > signed-1.json
```

Sign tx from sub-key bob

```bash
nchcli tx sign unsigned.json --from $(nchcli keys show bob -a) \
--multisig=$(nchcli keys show mm -a) --signature-only > signed-2.json
```

## Merge the signatures

Merge all the signatures into signed.json

```bash
nchcli tx multisign unsigned.json mm signed-1.json signed-2.json > signed.json
```

## Broadcast offline signed tx

```bash
nchcli tx broadcast signed.json
```