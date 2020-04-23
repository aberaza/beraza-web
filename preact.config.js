import envVars from 'preact-cli-plugin-env-vars';
import { lstatSync, readdirSync, existsSync } from 'fs';

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map( n => path.join(source, n)).filter(isDirectory);

export default {
  plugins: [],

  /**
	 * Function that mutates the original webpack config.
	 * Supports asynchronous changes when a promise is returned (or it's an async function).
	 *
	 * @param {object} config - original webpack config.
	 * @param {object} env - options passed to the CLI.
	 * @param {WebpackConfigHelpers} helpers - object with useful helpers for working with the webpack config.
	 * @param {object} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
	 **/
	webpack(config, env, helpers, options) {
		// Load .env file keys if available
		envVars(config, env, helpers);

  },
}
