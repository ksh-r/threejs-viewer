# web-ar
A repo to get started with displaying any model (gltf format) in AR on the web using AR.js and Three.js.

`This is a work in progress, so files are updated/removed frequently.`

### Installation
1. Clone the repo.
2. Run `npm install` to install all the dependencies
3. Use `npm run dev` to compile the project in development mode
4. Use `npm run build` to compile the project in production mode
5. Open `index.html` using Live Server

## Contents
To run a particular index.html, change the entry path in webpack.config.js to its linked app.js file and then build.
- _index.html_ - Display the GLTF model in AR.
  - Linked files:
    - app.js
    - app.scss
  - `IMP` To enable camera, the page must be running on a HTTPS server. Add an SSL certificate to your localhost or run on GitHub Pages.
- _index2.html_ - Display the GLTF model on the full page.
  - Linked files:
    - app2.js
    - app2.scss
  - All animations are played by default if provided in the GLTF.
  - The model is displayed in MeshNormalMaterial, so in case normals are not provided, the model will be solid black.
