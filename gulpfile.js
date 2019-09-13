// Gulp Variables
const { src, dest, watch, series, parallel } = require("gulp");

// Gulp Plugins
const autoprefixer = require("autoprefixer");
const babel = require("rollup-plugin-babel");
const browserSync = require("browser-sync").create();
const commonjs = require("rollup-plugin-commonjs");
const concat = require("gulp-concat");
const cssnano = require("cssnano");
const del = require("del");
const globbing = require("gulp-css-globbing");
const flatten = require("gulp-flatten");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const resolve = require("rollup-plugin-node-resolve");
const rollup = require("gulp-better-rollup");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");
const uglify = require("gulp-uglify");

// Files and Functions
const writeDec = "./dist";
const cssDec = {
	fileName: "main",
	read: "./assets/sass/main.scss",
	watch: "./assets/sass/**/*",
};
const fontawesomeCssDec = {
	fileName: "fontawesome-all",
	read: "./assets/sass/fontawesome-all.scss",
	watch: "./assets/sass/fontawesome-all.scss",
};
const noScriptCssDec = {
	fileName: "noscript",
	read: "./assets/sass/noscript.scss",
	watch: "./assets/sass/noscript.scss",
};
const jsDec = {
	fileName: "scripts",
	read: "./assets/js",
	watch: "./assets/js/**/*",
};

const url = "https://random.app/";

const clean = () => del(["dist"]);

//  Functions

//  <editor-fold desc="Functions">
/**
 * Our Error Handle
 * @param {string} err Returns the error of the function
 */
function handleError(err) {
	console.log(err.toString());
	this.emit("end");
}

/**
 * Description: Our checker to see if the file is fixed or not
 * @param {string} file The file that we're to pass into the checker
 * @returns {boolean|*} Checks if the file is correct
 */
function isFixed(file) {
	return file.eslint !== null && file.eslint.fixed;
}

/**
 * Our SASS Compiler
 * @param {string} $read The file we're looking at
 * @param {string} $write The location of the output
 * @returns {Function} The function that executes our compiler
 */
function sassCompile($read, $write) {
	const pluginOpts = [autoprefixer(), cssnano()];
	return function sassCompiler(done) {
		src([`${$read}`])
			.pipe(
				plumber({
					errorHandler: handleError,
				})
			)
			.pipe(flatten())
			.pipe(sourcemaps.init())
			.pipe(
				globbing({
					extensions: ".scss",
				})
			)
			.pipe(sass().on("error", sass.logError))
			.pipe(postcss(pluginOpts))
			.pipe(
				rename({
					suffix: ".min",
				})
			)
			.pipe(sourcemaps.write("."))
			.pipe(plumber.stop())
			.pipe(dest($write))
			.pipe(browserSync.stream());
		done();
	};
}

/**
 * Our JS Compiler
 * @param {string} $filename The filename we're watching
 * @param {string} $read The location of our watcher
 * @param {string} $write The output of our compiled file
 * @returns {Function} The function that executes our compiler
 */
function jsCompile($filename, $read, $write) {
	return function jsCompiler(done) {
		src([`${$read}/**/*.js*`])
			.pipe(
				plumber({
					errorHandler: handleError,
				})
			)
			.pipe(
				rollup(
					{
						plugins: [
							babel({
								presets: ["@babel/preset-env", "@babel/react"],
								exclude: "node_modules/**",
							}),
							resolve(),
							commonjs(),
						],
					},
					"umd"
				)
			)
			.pipe(sourcemaps.init())
			.pipe(terser())
			.pipe(terser())
			.pipe(
				rename({
					suffix: ".min",
				})
			)
			.pipe(concat(`${$filename}.min.js`))
			.pipe(uglify())
			.pipe(sourcemaps.write("./"))
			.pipe(plumber.stop())
			// .pipe( gulpIf( isFixed, dest( $write ) ) );
			.on("error", handleError)
			.pipe(dest($write))
			.pipe(browserSync.stream());
		done();
	};
}

// Function Variables
const Css = sassCompile(cssDec.read, writeDec + "/css");
const FACss = sassCompile(fontawesomeCssDec.read, writeDec + "/css");
const NoScriptCSS = sassCompile(noScriptCssDec.read, writeDec + "/css");
const JS = jsCompile(jsDec.fileName, jsDec.read, writeDec + "/js");

/**
 * Our File Watcher
 */
function fileWatcher(done) {
	browserSync.init({
		proxy: {
			target: url,
			ws: true,
		},
		https: true,
		reloadOnRestart: true,
		open: false,
	});

	watch(cssDec.watch, Css);
	watch(jsDec.watch, JS);
	watch("./*.html").on("change", browserSync.reload);
	done();
}

function reload(done) {
	server.reload();
	done();
}

//  </editor-fold>

//  Executions
exports.js = series(parallel(JS));
exports.css = series(parallel(FACss, Css, NoScriptCSS));
exports.watcher = series(fileWatcher, reload);
exports.default = series(clean, parallel(FACss, Css, NoScriptCSS), JS, fileWatcher);
