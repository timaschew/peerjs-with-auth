const ed = require('@noble/ed25519')
const express = require('express')
const ExpressPeerServer = require('peer').ExpressPeerServer
const PORT = process.env.PORT || 9000

const app = express()
const server = app.listen(PORT)

peerServer = ExpressPeerServer(server, {
	debug: true
})

app.use('/', (req, res, next) => {
	return res.send('OK')
})


app.use('/api', peerServer)

peerServer.on('connection', async function(connection) {
	const { id, token } =  connection
	if (id.length == 64) {
		const [mode, signature, message] = token.split('|')
		if (mode === 'ed25519') {
			date = new Date(parseInt(message, 16))
			// check if message (timestamp) is not older than 60 seconds
			if (date.getTime() + 1000 * 60 < Date.now()) {
				return connection.socket.send(JSON.stringify({
					type: 'ERROR',
					payload: 'message timestamp has expired'
				}))
			}
			const valid = await ed.verify(
				Uint8Array.from(Buffer.from(signature, "hex")), 
				Uint8Array.from(Buffer.from(message, "hex")), 
				Uint8Array.from(Buffer.from(id, "hex"))
			)
			if (valid) {
				return
			}
		}
		connection.socket.send(JSON.stringify({
			type: 'ERROR',
			payload: '64 char-long (hex) IDs are only allowed with valid ed25519 signatures. Use token=ed25519|<SIG>|<MSG>'
		}))
		connection.socket.close()
	}
})