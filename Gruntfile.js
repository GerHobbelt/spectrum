
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      libsync: {
        files: [
          {
            expand: true,       // `mkdir -p` equivalent
            cwd: 'lib/', 
            src: ['TinyColor/tinycolor.js'], 
            flatten: true,      // ensures the tinycolor.js file lands in lib/_/ *sans subdirectory* 
            dest: 'lib/_/', 
            filter: 'isFile'
          }
        ]
      }
    },

    qunit: {
      all: ['test/index.html', 'test/loaders.html']
    },

    jshint: {
      options: {
        sub: true,
        strict: true,
        newcap: false,
        globals: {
          jQuery: true
        }
      },

      with_overrides: {
        options: {
          strict: false
        },
        files: {
          src: ['i18n/*.js', 'test/tests.js']
        },
      },

      all: ['spectrum.js']
    },


    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'build/spectrum-min.js': ['spectrum.js']
        }
      }
    }

  });


  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  // Testing tasks
  grunt.registerTask('test', ['copy', 'jshint', 'qunit']);

  // Travis CI task.
  grunt.registerTask('travis', 'test');

  // Default task.
  grunt.registerTask('default', ['test']);

  //Build Task.
  grunt.registerTask('build', ['test', 'uglify']);

};
