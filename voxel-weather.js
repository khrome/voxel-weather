var vSnow = require('voxel-snow');
var vSky = require('voxel-sky');

module.exports = function(world, useSky, useParticles){
    var createSky = require('voxel-sky')(world);
    var createParticles = function(options){
        options.game = world;
        return vSnow(options);
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
        if(sky) sky();
        if(particles) particles.tick();
    });
    return function weather(opts){
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
        }
        if(useSky && !sky) sky = createSky();
        switch(options.conditions){
            case 'clear' :
                world.skyColor = colors.sky.clear;
                if(useParticles){
                    if(particles) particles.particles=[];
                    particles = undefined;
                }
                break;
            case 'cloudy' :
                world.skyColor = colors.sky.cloudy;
                if(useParticles){
                    if(particles) particles.particles=[];
                    particles = undefined;
                }
                break;
            case 'rain' :
                world.skyColor = colors.sky.cloudy;
                if(useParticles){
                    if(particles) particles.particles=[];
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
                world.skyColor = colors.sky.clear;
                if(useParticles){
                    if(particles) particles.particles=[];
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
                world.skyColor = colors.sky.cloudy;
                if(useParticles){
                    if(particles) particles.particles=[];
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
                world.skyColor = colors.sky.dark;
                if(useParticles){
                    if(particles) particles.particles=[];
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
    }
}
