/*
Kaleidoscope-Chocmixin.
A mixin for Chocolat to diff open files in Kaleidoscope.
https://github.com/franzheidl/kaleidoscope.chocmixin
Franz Heidl 2014
MIT License
*/


var sys = require('sys');
var exec = require('child_process').exec;
var cmd = 'osascript -e \'tell application "System Events" to return POSIX path of (path to application "Kaleidoscope") as text\'';


function execute(command, callback) {
    exec(command, function(error, stdout, stderr){ callback(stdout); });
}


function diffInKaleidoscope(files) {
  execute('open -a Kaleidoscope ' + files, false);
}


function run() {
  
  // Collect open files from current tab:
  var docs = Tab.current().visibleDocuments();
  var files = [];
  for (var i = 0; i < docs.length; i++) {
    files.push(docs[i].path());
  }
  
  var filestring = files.join(' ');
  
  execute(cmd, function(result) {
    if (!result.length > 0) {
      Alert.show('Diff in Kaleidoscope Error:', 'Couldn’t find Kaleidoscope.');
    } else {
      diffInKaleidoscope(filestring);
    }
  });
}


Hooks.addMenuItem('Go/Diff in Kaleidoscope', 'cmd-shift-k', function() {
  run();
});
