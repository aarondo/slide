module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: ['src/js/**/*.js'],
        dest: 'dist/js/app.js'
      }
    },
    uglify: {
      js: {
        files: {
          'dist/js/app.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
  target: {
    files: [{
      expand: true,
      cwd: 'dist/css',
      src: ['*.css', '!*.min.css'],
      dest: 'dist/css',
      ext: '.min.css'
    }]
  }
},
 htmlclean: {
    options: {
      protect: /<\!--%fooTemplate\b.*?%-->/g,
      edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
    },
    deploy: {
      expand: true,
      cwd: 'src/',
      src: '*.html',
      dest: 'dist/'
    }
  },
  sass: {
    dist: {
      files: {
        'dist/css/style.css': 'src/css/sass/main.scss'
      }
    }
  },
imagemin: {
    dynamic: {
      files: [{
        expand: true,
        cwd: 'src/images/',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'dist/images/'
      }]
    }
  },
  'ftp-deploy': {
  build: {
    auth: {
      host: 'ftp.aaronlumsden.com',
      port: 21,
      authKey  : 'key1'
    },
    src: 'dist',
    dest: '/whack',
    exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db', 'path/to/dist/tmp']
  }
},
    watch: {
      files: ['src/js/**/*.js','dist/css/style.css','src/*.html','src/css/sass/*.scss','src/css/sass/*/*.scss'],
      tasks: ['sass','concat','uglify','cssmin','htmlclean']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-htmlclean');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-contrib-sass');



  grunt.registerTask('default', ['sass','concat', 'uglify','cssmin','imagemin','htmlclean']);
   grunt.registerTask('deploy', ['ftp-deploy']);

}