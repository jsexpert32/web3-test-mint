import React, { useEffect, useRef, useState } from "react";
import { mintNft } from '../../ethereum/contracts';
import { Box, Button, TextField, Typography } from "@material-ui/core";

function MintView() {
  const [txAddress, setTxAddress] = useState(null)
  const [form, setForm] = useState({
    tokenId: '',
    address: ''
  });
  const onSubmit = (e) => {
    e.preventDefault();
    setTxAddress(null);
    mintNft(form.address,form.tokenId).then((res)=> {
      if(res.txHash) setTxAddress(res.txHash)
    }).catch((err)=>{
      alert(err.error)
    })
  }

  return (
    <Box mt={8} p={8}>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <TextField
          label="Token Id"
          style={{ marginBottom: 20 }}
          placeholder="Token Id"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={form.tokenId}
          onChange={(e)=>{setForm({...form, tokenId: e.target.value})}}
          required
        />
        <TextField
          label="Address"
          placeholder="Address"
          style={{ marginBottom: 20 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={form.address}
          onChange={(e)=>{setForm({...form, address: e.target.value})}}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      {txAddress && <Typography style={{ marginTop: 20 }}>TxHash: <a href={`https://rinkeby.etherscan.io/tx/${txAddress}`}>{txAddress}</a></Typography>}
    </Box>
  );
}

export default MintView;
