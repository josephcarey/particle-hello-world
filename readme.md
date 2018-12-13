# Particle Photon Hello World

This is a simple project to get a [Particle Photon](https:www.particle.io) to blink "Hello World" in morse code.

## Getting Started

### Prerequisites

Before you get started, make sure you have the following:

- Claimed Particle Photon, associated hardware
- [Node.js](https://nodejs.org/en/)

### Setup

- Fork and clone the repo.
- Push the code in the particle section to your particle photon.
- Navigate to the node folder
- run `npm install`
- create a .env file in the node folder and paste in the following:

```
  PARTICLE_USERNAME=my_particle_username
  PARTICLE_PASSWORD=my_particle_password
```

- replace `my_particle_username` and `my_particle_password` with your particle credentials.

### Running

- in the node folder, run `node hello.js`.
- The Photon should blink "Hello world" in morse code.

## Built With

- [Node.js](https://nodejs.org/)
- [Particle API](https://docs.particle.io/reference/SDKs/javascript/)
