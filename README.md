# [gaggle-demo](https://gitlab.com/bagrounds/gaggle-demo)

Demo using gaggle (an implementation of the Raft algorithm) and socket.io for a
fully distributed state machine

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

# now feel free to start more nodes and/or kill existing nodes

```
