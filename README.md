# MVP Game Engine
### What is it?
A minimal implementation of a game engine and example of the [ECS - Entity-component-system](https://en.wikipedia.org/wiki/Entity_component_system) pattern, written in JS and used for browser games.
### How do I use it?
1. Clone the repo and run `npm install` to install the dependencies. 
2. Install `gulp` globally in your computer, you can do that by running `npm install -g gulp`.
3. Run the `npm run dev` command to build a dev version of the engine, it will be deposited in `public/js/engine.js`.
4. Run the `npm start` command to start the webserver, your game will then be available on `http://localhost:8080`
### What is ECS?
ECS stands for Entity-component-system, a design pattern used mostly in game development. In ECS, all game objects are *entities* which are made up of multiple *components* attached to them that define their data and functionality. The behavior of these components is managed by various *systems* that interact in various ways to implement the rules of the video game.

In ECS the codebase is loosely coupled, allowing us to mix and match components as needed to create potentially limitless unique types of game objects. Using traditional OOP we would need to create very deep class hierarchies and tightly coupled systems, making code reuse and modification very difficult. For example, if I wanted to run the MVP Engine with node.js (for example as a multiplayer server), all I would have to do is remove the graphics system and it would work exactly the same as in the browser.
### Tell me more about the engine...
The engine entry point is the `src/engine.js` file, it's here that we create the [game loop](https://gameprogrammingpatterns.com/game-loop.html), instantiate the systems, and define our only game object, a green square that can be controlled by the user. Our game object contains three components attached to it, which define the ability to exist in the game world, to be rendered on the screen, and to be controlled by the user. These components are created and managed by their respective systems, located in the `src/system` directory. Each [timestep](https://gameprogrammingpatterns.com/game-loop.html), the systems update the state of the components under their control.
### It's just a green square in a black background!
I removed as much as I could from a larger game engine to arrive at the minimal implementation that can be called a video game. It consists of these elements and nothing else:
- Accepts input from the player
- Uses this input to change the behavior of the game in the game loop
- Outputs a visible result on the screen every frame
Anything less than this would not work for a real-time video game, and adding more would not add essential functionality to the MVP.
### What about sound, event bus, sequencing, timers, collision detection, physics, and all the others?
They are beyond the scope of an MVP, and would not serve the educational purpose of this project. However, I do plan to add that functionality on top of what I have made here, so feel free to follow this repository for news and updates.
### What libraries are you using?
I use [PixiJS](https://www.pixijs.com/) for the graphics and [mainloop.js](https://github.com/IceCreamYou/MainLoop.js) as the main loop.
### License?
MIT