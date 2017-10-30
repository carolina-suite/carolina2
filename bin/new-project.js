
var path = require('path');

var fs = require('fs-extra');
var yaml = require('yamljs');

function newProject(args) {

  var templateFile = path.join(__dirname, '..', 'projects', args.templateName + '.yml')
  var templateConfig = null;

  if (fs.existsSync(templateFile)) {
    templateConfig = yaml.load(templateFile);
  }
  else {
    throw "TemplateNotFound";
  }

  var templateDir = path.join(__dirname, '..', 'starters', templateConfig.dir);
  var projectDir = path.join(process.cwd(), args.projectName);

  fs.mkdirSync(projectDir);

  if (templateConfig.hasOwnProperty('copyDirs')) {
    for (var i = 0; i < templateConfig.copyDirs.length; ++i) {
      fs.copySync(path.join(templateDir, templateConfig.copyDirs[i]),
        path.join(projectDir, templateConfig.copyDirs[i]));
    }
  }
}

module.exports = newProject;
