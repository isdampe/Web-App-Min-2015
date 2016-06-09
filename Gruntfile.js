module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    //Compile our SASS
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'assets/css/global-noprefix.css': 'assets/scss/global.scss'
        }
      }
    },

    //Concat files.
    concat: {
      options: {
        separator: ';',
        sourceMap: true
      },
      dist: {
        src: ['assets/js/vendor/jquery-1.12.4.min.js', 'assets/js/src/app.js'],
        dest: 'assets/js/concat/app.js'
      }
    },

    //Minify JS.
    uglify: {
      js: {
        options: {
          sourceMap: true,
          sourceMapIn: 'assets/js/concat/app.js.map'
        },
        files: {
          'assets/js/build/app.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    //Configure autoprefixer
    autoprefixer: {
      options: {
        browsers: ['last 50 versions', 'ie 6', 'ie 7', 'ie 8', 'ie 9'],
        map: true
      },
      dist: {
        files: {
          'assets/css/global.min.css': 'assets/css/global-noprefix.css'
        }
      }
    },

    //Configure watch
    watch: {
      scss: {
        files: 'assets/scss/*.scss',
        tasks: ['sass', 'autoprefixer'],
        options: {
          debounceDelay: 100,
        },
      },
      scripts: {
        files: 'assets/js/src/*.js',
        tasks: ['concat'],
        options: {
          debounceDelay: 100,
        },
      },
      uglifyscripts: {
        files: 'assets/js/concat/*.js',
        tasks: ['uglify'],
        options: {
          debounceDelay: 100,
        },
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer']);

};
