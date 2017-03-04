# [gaggle-demo](https://gitlab.com/bagrounds/gaggle-demo)

Demo using [gaggle][gaggle-url] (an implementation of the [Raft][raft-url]
algorithm) and socket.io for a fully distributed state machine

# usage
```sh
# clone this repo
git clone https://gitlab.com/bagrounds/gaggle-demo

# change directories
cd gaggle-demo

# install dependencies
npm install

# start the first node
PORT=8000 npm start

# start the second node
PORT=8000 npm start

# start the third node
PORT=8000 npm start

# now feel free to start more nodes and/or kill existing nodes (CTRL + C)
```

# explanation of demo

Every 5 seconds, each node will:
* attempt to append an entry to the log if that node is the leader
* attempt to start an http server for socket.io if that node is a candidate

Each node will announce its acknowledgement of commits to the shared log.

# explanation of log statements

The primary log statements consist of 4 sets of square brackets `[]` followed by
`:hi from <PROCESS_ID>`

* The first brackets contain:
  * an `L` if that node is the leader
  * an `H` if that node is hosting the socket.io server (only for node.js v5.7+)
  * nothing otherwise
* The second brackets indicate that node's process ID
* The third brackets contain
  * `A#<N>` if this node is attempting to *append* the Nth entry to the log
  * `C#<N>` if this node is acknowledging the Nth commit to the log
* The fourth brackets contain T<N>, where N is the current term number

When a new leader is elected, the leader will announce `New leader!`.

When a node successfully starts an http server (for socket.io), that node will
annouce: `<PROCESS_ID> listening on port <PORT_NUMBER>`.

If a node attempts to start an http server, but can't, it will print the error
message.

[gaggle-url]: https://github.com/ben-ng/gaggle
[raft-url]: https://raft.github.io/

