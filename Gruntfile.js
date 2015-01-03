module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Compile all of our SASS.
    libsass: {
      options: {
        loadPath: ['assets/scss'],
        outputStyle: 'compressed'
      },
      files: {
        expand: true,
        cwd: 'assets/scss/',
        src: ['*.scss'],
        dest: 'assets/css',
        ext: '.css'
      }
    },

    //Concat files.
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['assets/bower/jquery/dist/jquery.js', 'assets/js/src/app.js'],
        dest: 'assets/js/concat/app.js'
      }
    },

    //Minify JS.
    uglify: {
      js: {
        files: {
          'assets/js/build/app.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    //Configure autoprefixer
    autoprefixer: {
      options: {
        browsers: ['last 50 versions', 'ie 6', 'ie 7', 'ie 8', 'ie 9']
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
        tasks: ['libsass', 'autoprefixer'],
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
  grunt.loadNpmTasks('grunt-libsass-e');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['concat', 'uglify', 'libsass', 'autoprefixer']);

};
