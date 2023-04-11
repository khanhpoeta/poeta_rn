#!/usr/bin/env node
const { rm } = require('fs').promises;
const { applyPlugins } = require('./plugins');

applyPlugins().then(async () => {
  await rm('./plugins', { recursive: true });
});
