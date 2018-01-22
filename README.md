voxel-weather
=============

Weather in voxeljs (essentially just a dynamic handler for particles and sky).

Right now this works globally for the world, but eventually it will have
- have a fluid weather system, so different areas of the world are experiencing different weather, generatively
- integrate with the biome system, so that they can have sensible weather
- Seasons? (Texture Alteration)

The short version
-----------------


    var WeatherControl = require('voxel-weather');
    var weather = WeatherControl(game);

 Then if you want to change the weather:

    weather('clear');
    weather('cloudy');
    weather('sprinkle');
    weather('rain');
    weather('snow');
    weather('stormy');

Or maybe you just want a semi-realistic weather pattern:

    weather(true);

Or rotate through a list:

    weather([
        'clear', 'cloudy', 'sprinkle', 'rain', 'stormy',
        'rain', 'sprinkle', 'cloudy', 'clear']);

Then, to stop:

    weather(false);

More Options
------------

Docs to come...

Testing
-------
Eventually it'll be:

    mocha

Enjoy,

 -Abbey Hawk Sparrow
