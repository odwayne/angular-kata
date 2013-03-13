basePath = '.';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  //libs  
  'src/lib/jquery/jquery.min.js',
  'src/lib/angular/angular.js',        
  'test/lib/*.js',      
  //modules
  'src/modules/**/*.js',

  //template for directives
  'template/**/*.html'  
];

preprocessors = {  
  '**/*.html': 'html2js',
  '**/modules/**/*.js': 'coverage'
};

logLevel = LOG_DEBUG;

autoWatch = true;

browsers = ['Chrome'];

reporters = ['coverage'];

coverageReporter = {
  type : 'html',
  dir : 'coverage/'
}