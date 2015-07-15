'use strict';

var express = require('express');
var logger = require('bunyan').createLogger({ name: 'playfield:api' });

var Platforms = require('../../src/scripts/constants/Platforms');

var games = [{
  id: 0,
  title: 'Bloodborne',
  platform: Platforms.PS4,
  description: 'Bloodborne is an action RPG in which you hunt for answers in the ancient city of Yharnam, now cursed with a strange endemic illness spreading through the streets like a disease. Peril, death and madness infest this dark world, and you\'re tasked with uncovering its darkest secrets which will be necessary for you to survive. Armed with a singular arsenal of weaponry, including guns and saw cleavers, you\'ll require wits, strategy and reflexes to dispatch the agile and intelligent enemies that guard the city\'s underbelly. You will utility holy chalices to access an array of vast underground ruins, chock full of traps, beasts, and rewards, to explore and conquer on your own or with other people.'
}, {
  id: 1,
  title: 'Mortal Kombat',
  platform: Platforms.XBOX,
  description: 'Mortal Kombat X combines cinematic presentation with all new gameplay to deliver the most brutal Kombat experience ever, offering a new fully-connected experience that launches players into a persistent online contest where every fight matters in a global battle for supremacy. For the first time, Mortal Kombat X gives players the ability to choose from multiple variations of each character impacting both strategy and fighting style. Players step into an original story showcasing some of the game’s most prolific characters including Scorpion and Sub-Zero, while introducing new challengers that represent the forces of good and evil and tie the tale together.'
}];

module.exports = function () {
  var api = express.Router();

  api.get('/games', function(req, res) {
    var id = req.query.id;

    logger.info(req.url);

    if (id) {
      id = parseInt(id, 10);
      for (var i = 0; i < games.length; i++) {
        if (id === games[i].id) {
          res.send(games[i]);
          return;
        }
      }

      res.sendStatus(404);
    } else {
      res.send(games);
    }
  });

  api.post('/game', function(req, res) {
    var data = req.body;

    data.id = games.length;
    games.push(data);

    res.sendStatus(200);
  });

  api.put('/game', function(req, res) {
    var data = req.body;

    for (var i = 0; i < games.length; i++) {
      if (data.id === games[i].id) {
        games[i] = data;
        res.sendStatus(200);
        return;
      }
    }
  });

  return api;
};