'use strict';

/**
get badges from pub/sub server
*/

exports.get= function(callback){
  request('http://localhost:8000/badges', function(err,response,body){
    callback(err,JSON.parse(body));
  });
};
