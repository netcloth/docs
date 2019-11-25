# 使用sdk发起IPAL记账

## IPAL交易结构

user_request

```go
type ADParam struct {
    UserAddress string    `json:"user_address" yaml:"user_address"`
    ServerIP    string    `json:"server_ip" yaml:"server_ip"`
    Expiration  time.Time `json:"expiration"`
}

type IPALUserRequest struct {
    Params ADParam           `json:"params" yaml:"params"`
    Sig    auth.StdSignature `json:"signature" yaml:"signature`
}

// MsgIPALClaim defines an ipal claim message
type MsgIPALClaim struct {
    From        sdk.AccAddress  `json:"from" yaml:"from`
    UserRequest IPALUserRequest `json:"user_request" yaml:"user_request"`
}
```

* 填充交易结构
  
```go
msg := types.NewMsgIPALClaim(cliCtxProxy.GetFromAddress(), userAddress, serverIP, expiration, stdSig)

func NewMsgIPALClaim(from sdk.AccAddress, userAddress string, serverIP string, expiration time.Time, sig auth.StdSignature) MsgIPALClaim {
    return MsgIPALClaim{
        from,
        NewIPALUserRequest(userAddress, serverIP, expiration, sig),
    }
}

func NewIPALUserRequest(userAddress string, serverIP string, expiration time.Time, sig auth.StdSignature) IPALUserRequest {
    return IPALUserRequest{
        Params: NewADParam(userAddress, serverIP, expiration),
        Sig:    sig,
    }
}

func NewADParam(userAddress string, serverIP string, expiration time.Time) ADParam {
	return ADParam{
		UserAddress: userAddress,
		ServerIP:    serverIP,
		Expiration:  expiration,
	}
}
```


* 签名
  
```go

stdSignMsg := tx.StdSignMsg{
		ChainID:       c.chainId,
		AccountNumber: uint64(an),
		Sequence:      uint64(s),
		Fee:           auth.NewStdFee(constant.TxDefaultGas, fee),
		Msgs:          []sdk.Msg{msg},
		Memo:          memo,
}


sigBytes, err := k.privKey.Sign(stdSignMsg.Bytes())
sig := auth.StdSignature{
		PubKey:    privKey.PubKey(),
		Signature: sigBytes,
}

newTx := auth.NewStdTx(msg.Msgs, msg.Fee, []auth.StdSignature{sig}, msg.Memo)

```

* 广播交易
  
```go
curl -X POST "http://rpc.netcloth.org/txs" -H "accept: application/json" -H "Content-Type: application/json" -d "{transaction msg}"
```

**SDK示例，参考[这里](https://github.com/NetCloth/go-sdk)**