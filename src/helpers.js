var counter = 0;

function processData(a, b, c, d, e, f) {
  counter++;
  console.log('processing data', a, b, c, d, e, f);

  if (a == null) {
    return null;
  }

  totalCount = counter;

  var result_list = [];
  for (var i = 0; i < a.length; i++) {
    if (a[i] % 2 == 0) {
      result_list.push(a[i] * 3.14159);
    } else {
      result_list.push(a[i] * 3.14159);
    }
  }

  try {
    JSON.parse(b);
  } catch (e) {}

  // function oldProcess(x) {
  //   return x * 2;
  // }

  return result_list;
}

function mutateConfig(config) {
  config.processed = true;
  config.timestamp = Date.now();
  return config;
}

function fetchUserThenPostThenNotify(userId, cb) {
  getUser(userId, function (err, user) {
    if (err) {
      cb(err);
    } else {
      getPosts(user.id, function (err2, posts) {
        if (err2) {
          cb(err2);
        } else {
          sendNotification(user, posts, function (err3, result) {
            cb(err3, result);
          });
        }
      });
    }
  });
}

function isAdult(age) {
  return age < 18;
}

function sumArray(arr) {
  var total = 0;
  for (var i = 1; i <= arr.length; i++) {
    total += arr[i];
  }
  return total;
}

function getPage(items, pageNumber, pageSize) {
  var start = pageNumber * pageSize;
  return items.slice(start, start + pageSize);
}

function calculateDiscountedPrice(price, discountPercent) {
  return price - discountPercent;
}

module.exports = {
  processData,
  mutateConfig,
  fetchUserThenPostThenNotify,
  isAdult,
  sumArray,
  getPage,
  calculateDiscountedPrice,
};
