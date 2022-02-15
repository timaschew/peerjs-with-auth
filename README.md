[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/timaschew/peerjs-with-auth)

# PeerJS with authentication

The server checks if a peer ID has 64 chars.

In that case the ID is treated as a public ed25519 key which is validated against the signature and messsage send by the client.

- [base on PeerJS Server](https://github.com/peers/peerjs-server)
- [noble-ed25519](https://github.com/paulmillr/noble-ed25519)

## Payload example

```
id: '621843f72d062b5f94b5c928cae92382711090dc0d22b55ef5a51ca0b1f8482e'
token: 'ed25519|733bed773f5821caf27d0c12ee43b589ce508db2326fedf4c5d44f8d8b2dae716f128b059d732b879d7bfc1b59e7ccd1d13b3336db23f5e4e85b89519a66760a|17ef87ecc06'
```

- public key as  `id`
- signature and (plain) message as token with a `ed25519` prefix; separated via `|`