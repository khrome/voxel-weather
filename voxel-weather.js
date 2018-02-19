var vSnow = require('voxel-snow');
var vSky = require('voxel-sky');

module.exports = function(world, useSky, useParticles){
    var createSky = useSky?vSky({
        game: world,
        time: 2400,
        size: world.worldWidth() * 1.5,
        intensity : 0.01,
        color: new world.THREE.Color(0x333388),
        speed: 0.1
    }):function(){
        return {};
    };
    var sky;
    var particles;
    var colors = {
        rain : 0x8888ff,
        snow : 0xffffff,
        sky : {
            clear : 0xAAAAEE,
            cloudy : 0xBBBBDD,
            dark : 0xBBBBDD
        }
    }
    var interval;
    var setColor = function(color){
        theSkyColor = new world.THREE.Color(color);
        if(sky) sky.color = theSkyColor;
        world.skyColor = color;
    }
    var createParticles = function(options){
        options.game = world;
        return vSnow(options);
    };

    //var createSky = vSky(world);
    /*var createParticles = function(options){
        options.game = world;
        //return vSnow(options);
    };
    var sky;
    var particles;
    var colors = {
        rain : 0x8888ff,
        snow : 0xffffff,
        sky : {
            clear : 0xAAAAEE,
            cloudy : 0xBBBBDD,
            dark : 0xBBBBDD
        }
    }
    var interval;
    world.on('tick', function(){
        //if(sky) sky();
        if(particles) particles.tick();
    });
    var theSkyColor ;
    var setColor = function(color){
        theSkyColor = new world.THREE.Color(color);
        if(sky) sky.color = theSkyColor;
        world.skyColor = color;
    }*/
    return function weather(opts){
        if(useSky && !sky){
            var sky = createSky();
            world.on('tick',sky);
        }
        var states = ['clear', 'cloudy', 'sprinkle', 'rain', 'snow'];
        if(Array.isArray(opts) || opts === true){
            if(Array.isArray(opts)) states = opts;
            var count = 0;
            interval = world.setInterval(function(){
                weather(states[(count)%states.length]);
                count = count + 1;
            }, 1000 * 60 * 10);
        }
        if(opts === false){
            if(interval) world.clearInterval(interval);
        }
        var options = opts;
        if(typeof opts == 'string'){
            options = {
                conditions : opts
            }
        }/*
        if(useSky && !sky) sky = createSky(//*
            function(time){
            this.spin(Math.PI * 2 * (time / 2400));
            //this.ambient.color.setHSL(0.9, 0.1, 0.1);
            //this.color(new this.game.THREE.Color(0,0,0));
            if (time === 700){
              this.color(new this.game.THREE.Color(0x3333DD), 1000);
            }
            if (time === 0) {
                // paint a green square on the bottom (above your head at 1200)
                this.paint('bottom', function() {
                  // The HTML canvas and context for each side are accessible
                    this.context.rect(
                        (this.canvas.width/2)-25,
                        (this.canvas.height/2)-25,
                        50, 50
                    );
                    this.context.fillStyle = this.rgba(0, 1, 0, 1);
                    this.context.fill();
                });
                this.paint(['top', 'bottom'], this.stars, 500);
                this.paint(
                    'all', this.moon, 0, 100,
                    new this.game.THREE.Color(0xFF0000)
                );
                this.paint(
                    'sides', this.sun, 10,
                    new this.game.THREE.Color(0x00FF00)
                );
            }


          if(time === 400){
              this.paint('all', this.clear);
          }

          if (time === 1800) {
              this.sunlight.intensity = 0.2;
              this.ambient.color.setHSL(0.9, 1, 1);
          }
      }
  );*/
        switch(options.conditions){
            case 'clear' :
                //world.skyColor = colors.sky.clear;
                setColor(colors.sky.clear);
                if(useParticles){
                    if(particles) particles.remove();
                    particles = undefined;
                }
                break;
            case 'cloudy' :
                //world.skyColor = colors.sky.cloudy;
                setColor(colors.sky.cloudy);
                if(useParticles){
                    if(particles) particles.remove();
                    particles = undefined;
                }
                break;
            case 'rain' :
                //world.skyColor = colors.sky.cloudy;
                setColor(colors.sky.cloudy);
                if(useParticles){
                    if(particles) particles.remove();
                    particles = createParticles({
                        // how many particles of snow
                        count: 1000,
                        // size of snowfall
                        size: 0,
                        // speed it falls
                        speed: 0.2,
                        // speed it drifts
                        drift: 0.1,
                        // material of the particle
                        material: new world.THREE.ParticleBasicMaterial({color: 0x8888ff, size: 2})

                    });
                }
                break;
            case 'sprinkle' :
                //world.skyColor = colors.sky.clear;
                setColor(colors.sky.clear);
                if(useParticles){
                    if(particles) particles.remove();
                    particles = createParticles({
                        // how many particles of snow
                        count: 200,
                        // size of snowfall
                        size: 0,
                        // speed it falls
                        speed: 0.2,
                        // speed it drifts
                        drift: 0.1,
                        // material of the particle
                        material: new world.THREE.ParticleBasicMaterial({color: 0x8888ff, size: 2})
                    });
                }
                break;
            case 'snow' :
                //world.skyColor = colors.sky.cloudy;
                setColor(colors.sky.cloudy);
                if(useParticles){
                    if(particles) particles.remove();
                    particles = createParticles({
                        // how many particles of snow
                        count: 1000,
                        // size of snowfall
                        size: 20,
                        // speed it falls
                        speed: 0.05,
                        // speed it drifts
                        drift: 2,
                        // material of the particle
                        material: new world.THREE.ParticleBasicMaterial({color: 0xffffff, size: 1})
                    });
                }
                break;
            case 'stormy' :
                //world.skyColor = colors.sky.dark;
                setColor(colors.sky.dark);
                if(useParticles){
                    if(particles) particles.remove();
                    particles = createParticles({
                        // how many particles of snow
                        count: 2000,
                        // size of snowfall
                        size: 0,
                        // speed it falls
                        speed: 0.3,
                        // speed it drifts
                        drift: 0.1,
                        // material of the particle
                        material: new world.THREE.ParticleBasicMaterial({color: 0x8888ff, size: 2})

                    });
                }
                break;

        }
        return
    }
}
