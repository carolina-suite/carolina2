
# Carolina Template: `node-server` #

This is a starter template for a Node.js fastify server with MongoDb.

## Getting Started #

Once this starter project has been generated, run `npm install` to get all the
dependencies.

In order to use this project, you must have a mongodb server running.

Before creating any users, you should edit `site/config/site.secret.config`
and set your site's secret key to something long and random.

The `auth` application comes with a fixture for some built in users, including
an admin account `admin` with the password `admin123`. To install the fixtures,
run the command:

`node admin load-data auth test-users`

To take a look at the users that should have been created:

`node admin list-data auth User`

For more information on these admin commands, see the README for the
[admin app](./admin/README.md).

To run the site on the default port 8001:

`node site run`

To run the site on a more specific port:

`node site run -p 8080`

## Project Structure #

Take a look at the files and folders in your project. You should not alter
any of the contents of the folders that start with an underscore.

* `_lib`: Utility functions and classes.
* `_static`: A directory where your project's static files are ultimately collected.
* `_templates`: A directory where your project's `pug` templates are ultimately collected.
* `_workspace`: A temporary staging area where your frontend partial files are collected and built.

Other than those directories and `node_modules`, the other directories are apps.
It is generally best to leave `admin` and `auth` alone. The `site` app is a special
app that contains configuration files and site commands.
The `home` app is a basic app with a starter page.

You are free to create new apps on top.

## App Structure #

Each app can have the following structure (most pieces are optional).
For examples of most of this, view the auth app in detail.

* `index.js`: Should be a file that can be run, so that you can type `node appname` to run it.
* `bin/`: Any scripts referenced by `index.js`.
* `fixtures/`: Any fixtures exposed by your app, which can be added via admin.
* `lib/`: The best place for any utility functions and classes specific to the app.
* `middleware/`: The best place for fastify middleware.
* `models/`: The best place for mongoose models.
* `routes/`: The best place to define a fastify router.
* `static/`: Any static files exposed by your app. They will be gathered into `_static/appName` and served user `/static/appName/` if your app is installed.
* `templates/`: Any pug templates exposed by your app. They will gathered into `_templates/appName/` and the `_templates` folder will be the root directory for the pug engine.
* `workspace/`: A custom workspace where you put frontend files according to a currently undocumented system that can be inspected in the auth app.
* `app.js`: A file that exposes any models and routes.
* `config.yml`: Default configuration values that will be overridden by values in `site/config/appName.yml` if they exist.

## Existing Apps #

* [admin](./admin/README.md): The admin app provides a CLI for viewing and altering data in the database.
* [auth](./auth/README.md): The auth app provides a login and account management system.
* starter: The starter app exposes a simple landing page.

## Library #

## Writing New Apps #
