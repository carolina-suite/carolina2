
var path = require('path');

var fs = require('fs-extra');
var yaml = require('yamljs');

function newProject(args, root) {

  var templateFile = path.join(__dirname, '..', 'projects', args.templateName + '.yml')
  var templateConfig = null;

  if (fs.existsSync(templateFile)) {
    templateConfig = yaml.load(templateFile);
  }
  else {
    throw "TemplateNotFound";
  }

  var templateDir = null;

  if (root)
    templateDir = path.join(__dirname, '..', 'starters', templateConfig.dir);
  else
    templateDir = args.rootTemplateDir

  var projectDir = path.join(process.cwd(), args.projectName);

  if (root) {
    fs.mkdirSync(projectDir);
  }

  if (templateConfig.hasOwnProperty('copyDirs')) {
    for (var i = 0; i < templateConfig.copyDirs.length; ++i) {
      fs.copySync(path.join(templateDir, templateConfig.copyDirs[i]),
        path.join(projectDir, templateConfig.copyDirs[i]));
    }
  }
  if (templateConfig.hasOwnProperty('copyFiles')) {
    for (var i = 0; i < templateConfig.copyFiles.length; ++i) {
      fs.copySync(path.join(templateDir, templateConfig.copyFiles[i]),
        path.join(projectDir, templateConfig.copyFiles[i]));
    }
  }
  if (templateConfig.hasOwnProperty('emptyDirs')) {
    for (var i = 0; i < templateConfig.emptyDirs.length; ++i) {
      fs.mkdirSync(path.join(projectDir, templateConfig.emptyDirs[i]));
    }
  }
  if (templateConfig.hasOwnProperty('renameFiles')) {
    for (var i = 0; i < templateConfig.renameFiles.length; ++i) {
      fs.copySync(path.join(projectDir, templateConfig.renameFiles[i].from),
        path.join(projectDir, templateConfig.renameFiles[i].to));
      fs.removeSync(path.join(projectDir, templateConfig.renameFiles[i].from));
    }
  }

  for (var i = 0; i < args.addons.length; ++i) {
    if (templateConfig.hasOwnProperty('extensions')) {
      if (templateConfig.extensions.hasOwnProperty(args.addons[i])) {
        newProject({
          addons: [],
          projectName: args.projectName,
          rootTemplateDir: templateDir,
          templateName: templateConfig.extensions[args.addons[i]]
        });
      }
      else console.log(`No extension ${args.addons[i]} available.`);
    }
    else console.log(`No extension ${args.addons[i]} available.`);
  }
}

module.exports = newProject;
