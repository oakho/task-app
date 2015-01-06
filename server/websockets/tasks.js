var tasks =[
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
  }
];

function findTask(id) {
  return tasks.filter(function(task) { return task.id === id })[0];
}

function createTask(obj) {
  obj.id = tasks.length + 1;
  obj.createdAt = new Date();

  return obj;
}

function updateTask(id, obj) {
  obj.id = id;
  obj.updatedAt = new Date();

  return obj;
}

function destroyTask(obj) {
  return obj;
}

module.exports = function(socket, io) {
  socket.on('get', function(data, callback) {
    if(data.url === '/tasks') {
      callback(tasks);
    }
  });

  socket.on('get', function(data, callback) {
    var matches = data.url.match(/\/tasks\/+([\w]{1,})/)

    if(/\/tasks\/+([\w]{1,})/.test(data.url)) {
      callback(findTask(matches[1]));
    }
  });

  socket.on('post', function(data, callback) {
    if(data.url === '/tasks') {
      var task = createTask(data.data);
      callback(task);
    }
  });

  socket.on('put', function(data, callback) {
    var matches = data.url.match(/\/tasks\/+([\w]{1,})/)

    if(matches[0]) {
      var task = updateTask(matches[1], data.data);
      callback(task);
    }
  });

  socket.on('delete', function(data, callback) {
    var matches = data.url.match(/\/tasks\/+([\w]{1,})/)

    if(matches[0]) {
      var task = destroyTask(data.data);
      callback({});
    }
  });
};
