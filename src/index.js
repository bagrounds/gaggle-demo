#!/usr/bin/env node
;(function () {
  'use strict'

  /* imports */
  var http = require('http')
  var gaggle = require('gaggle')

  var APPEND_INTERVAL = 5000
  var MY_ID = String(process.pid)
  var PORT = process.env.PORT

  main()

  function main () {
    var server = http.createServer()

    server.on('error', function (error) {
      console.log(error.message)
    })

    var closeServer = gaggle.enhanceServerForSocketIOChannel(server)

    var options = {
      channel: {
        name: 'socket.io',
        channel: 'main',
        host: 'http://localhost:' + process.env.PORT
      },
      clusterSize: 3,
      id: MY_ID
    }

    var node = gaggle(options)

    node.on('appended', function (entry, index) {
      log(node, entryToString('A', entry, index))
    })

    node.on('leaderElected', function () {
      if (node.isLeader()) {
        log(node, 'New leader!')
      }
    })

    node.on('committed', function (entry, index) {
      log(node, entryToString('C', entry, index))
    })

    setInterval(function () {
      if (node._state === 'CANDIDATE' && !server.listening) {
        server.listen(PORT, function (error) {
          if (error) {
            console.error(error.message)
          } else {
            console.log(MY_ID + ' listening on port ' + PORT)
          }
        })
      }

      if (node.isLeader()) {
        node.append('hi from ' + MY_ID)
      }
    }, APPEND_INTERVAL)

    function log (node, message) {
      var prefix = '['
      prefix += node.isLeader() ? 'L' : ''
      prefix += server.listening ? 'H' : ''
      prefix += ']'

      console.log(prefix + '[' + MY_ID + ']' + message)
    }

    function entryToString (event, entry, index) {
      return '[' + event + '#' + index + '][T' + entry.term + ']:' + entry.data
    }
  }
})()

