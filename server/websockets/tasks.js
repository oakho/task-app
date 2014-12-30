module.exports = function(socket, io) {
  socket.on('get', function(data, callback) {
    if(data.url === '/tasks') {
      callback([
        {
          id: 1,
          label: 'Feed Billy the Cat',
          locker: null, owner: null, private: false, done: false,
          createdAt: '2014-12-28T09:37:39.895Z',
          updatedAt: '2014-12-29T11:36:23.902Z'
        },
        {
          id: 2,
          label: 'Bake cookies for Mickey Mouse',
          locker: null, owner: null, private: false, done: false,
          createdAt: '2014-12-28T09:37:39.895Z',
          updatedAt: null
        },
        {
          id: 3, label: 'Play piano for Tiny Toons',
          locker: null, owner: null, private: false, done: false,
          createdAt: '2014-12-28T09:37:39.895Z',
          updatedAt: '2014-12-29T11:36:23.902Z'
        },
      ]);
    }
  });
};
