# Instructions

## Version 0.1

### Objective
You are the blue circle in the center of the screen. The objective of the game is to prevent the enemies from touching you. You can hold down the mouse button or press space bar to fire and aim by moving the mouse. Each hit will damage the enemy and make it smaller until it is destroyed. Enemies spawn at the edges of the screen and move towards the center. When you earn enough points, upgrade options will show up at the bottom of the screen. You can purchase upgrades by clicking on them or pressing a or d on the keyboard for upgrading projectile size or rate of fire respectively.

### Scoring
You gain points per hit and another bonus points per enemy destroyed, but loss points if your shot gets to the edge of the map without hitting an enemy (miss).

Good luck!

Game URL: https://space-defense.s3.us-east-2.amazonaws.com/index.html

## Last Test
---
- Delayed explosions
- enemies get big, but aren't "boss-like" enough... they just are normal
- not enough enemies spawning at wave 25... let the enemies "rank up" at wave 10, 20, etc.
- reset basic ammo upgrades on type upgrade? (remove velocity upgrades? auto with type?)
- difficultly modes? 
    - Beginner (no accuracy penalty, game pauses on upgrade availability? -- starts at wave 1 stats???)
    - Novice (current mode, no pause on upgrade available -- starts wave 5???)
    - Expert (miss equals death! -- starts at rank 2???)
- graphics upgrade required... ? (simple sprites)
---
- add more enemies that spawn and don't lock on you... (opportunity for points / distractions -> more skill differentiation...)
- attempt to correlate
    - CD with Enemy spawn rate... [not directly]
    - Damage with Enemy size
    - velocity... not sure (possibly it is a "risk"/investment to get more from the distractions...)
- FUTURE: maybe add enemy resistances and ability to swap between weapon types or stronger weapons with limited ammo... etc.
- FUTURE: multiplayer
    - Score contest...
    - Team defense
    - Head to head?
    - ...
- Cap projectile size at turret size?
- increase turret size on upgrade?
- Particle system update... more smaller particles and some large...
- Social Media presence? Weekly updates w/ Patreon or similar?
---
## Known Issues

- Delayed explosion on enemy death
- upgrades sometimes don't show even when they are affordable...

## Improvements under consideration

- Make game easier for testers
- add scaling difficultly
- add menu options
- add upgrades
- add firing types...
- refactor...

- accuracy, etc...
- ammo count, recharge rate, etc.

- enemy types
- auto-turrets
- AI
- Switch sides...
- Multi-player...

- add achievements
- add levels

---------------------------

# New Project

> ✨ Bootstrapped with Create Snowpack App (CSA).

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.json` config file.

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.
