module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: [
					'assets/js/vendor/underscore/underscore.js',
					'assets/js/vendor/jquery/jquery.js',
					'assets/js/vendor/jquery-simple-touch/jquery-simple-touch.js',
					'assets/js/bootstrap.js',
					'assets/js/includes/util.js',
					'assets/js/includes/*.js'
				],
				dest: 'assets/js/app.concat.js',
			}
		},
		uglify: {
			options: {
				banner: '/*\n*\thttps://github.com/matthewspencer/bryant-park\n*/\n',
				footer: 'app.bootstrap.init();'
			},
			build: {
				src: 'assets/js/app.concat.js',
				dest: 'assets/app.js'
			}
		},
		less: {
			development: {
				options: {
					yuicompress: false
				},
				files: {
					'assets/less/bootstrap.css':'assets/less/bootstrap.less'
				}
			}
		},
		cssmin: {
			compress: {
				files: {
					'assets/app.css': ['assets/less/bootstrap.css']
				}
			}
		},
		watch: {
			scripts: {
				files: [
					'assets/js/*.js',
					'assets/js/includes/*',
					'assets/js/vendor/*'
				],
				tasks: ['default'],
			},
			less: {
				files: [
					'assets/less/*',
					'assets/less/includes/*'
				],
				tasks: ['default']
			}
		}
	});

	// Load tasks that we'll be using
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task(s).
	grunt.registerTask('default', ['concat','uglify','less','cssmin']);
};