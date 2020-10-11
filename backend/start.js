require("@babel/register")({
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "10"
        }
      }
    ],
    "@babel/preset-react"
  ]
});
  
  // Import the rest of our application.
  module.exports = require('./src/index')