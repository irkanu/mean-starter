angular.module('MyApp').run(['$templateCache', function($templateCache) {$templateCache.put('views/contact/contact.html','<div class="container">\n  <div class="panel">\n    <div class="panel-heading">\n      <h3 class="panel-title">Contact Form</h3>\n    </div>\n    <div class="panel-body">\n      <div ng-if="messages.error" role="alert" class="alert alert-danger">\n        <div ng-repeat="error in messages.error">{{error.msg}}</div>\n      </div>\n      <div ng-if="messages.success" role="alert" class="alert alert-success">\n        <div ng-repeat="success in messages.success">{{success.msg}}</div>\n      </div>\n      <form ng-submit="sendContactForm()" class="form-horizontal">\n        <div class="form-group">\n          <label for="name" class="col-sm-2">Name</label>\n          <div class="col-sm-8">\n            <input type="text" name="name" id="name" class="form-control" ng-model="contact.name" autofocus>\n          </div>\n        </div>\n        <div class="form-group">\n          <label for="email" class="col-sm-2">Email</label>\n          <div class="col-sm-8">\n            <input type="email" name="email" id="email" class="form-control" ng-model="contact.email">\n          </div>\n        </div>\n        <div class="form-group">\n          <label for="message" class="col-sm-2">Body</label>\n          <div class="col-sm-8">\n            <textarea name="message" id="message" rows="7" class="form-control" ng-model="contact.message"></textarea>\n          </div>\n        </div>\n        <div class="form-group">\n          <div class="col-sm-offset-2 col-sm-8">\n            <button type="submit" class="btn btn-success">Send</button>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>');
$templateCache.put('views/login/login.html','<div class="container login-container">\n    <div class="panel">\n        <div class="panel-body">\n            <div ng-if="messages.error" role="alert" class="alert alert-danger">\n                <div ng-repeat="error in messages.error">{{error.msg}}</div>\n            </div>\n            <form ng-submit="login()">\n                <legend>Log In</legend>\n                <div class="form-group">\n                    <label for="email">Email</label>\n                    <input type="email" name="email" id="email" placeholder="Email" class="form-control" ng-model="user.email" autofocus>\n                </div>\n                <div class="form-group">\n                    <label for="password">Password</label>\n                    <input type="password" name="password" id="password" placeholder="Password" class="form-control" ng-model="user.password">\n                </div>\n                <div class="form-group"><a href="/forgot"><strong>Forgot your password?</strong></a></div>\n                <button type="submit" class="btn btn-success">Log in</button>\n            </form>\n        </div>\n    </div>\n    <p class="text-center">\n        Don\'t have an account? <a href="/signup"><strong>Sign up</strong></a>\n    </p>\n</div>\n');
$templateCache.put('views/forgot/forgot.html','<div class="container login-container">\n    <div class="panel">\n        <div class="panel-body">\n            <div ng-if="messages.error" role="alert" class="alert alert-danger">\n                <div ng-repeat="error in messages.error">{{error.msg}}</div>\n            </div>\n            <div ng-if="messages.success" role="alert" class="alert alert-success">\n                <div ng-repeat="success in messages.success">{{success.msg}}</div>\n            </div>\n            <form ng-submit="forgotPassword()">\n                <legend>Forgot Password</legend>\n                <div class="form-group">\n                    <p>Enter your email address below and we\'ll send you password reset instructions.</p>\n                    <label for="email">Email</label>\n                    <input type="email" name="email" id="email" placeholder="Email" class="form-control" ng-model="user.email" autofocus>\n                </div>\n                <button type="submit" class="btn btn-success">Reset Password</button>\n            </form>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('views/org/org.html','<div class="container org" ng-controller="OrgCtrl">\r\n\r\n    <p class="text-center back_link"><strong>&larr; <a href="/organizations">Back to all organizations?</a></strong></p>\r\n\r\n    <section id="messages" class="row text-center">\r\n        <div class="col-md-6 col-md-offset-3">\r\n            <div ng-if="messages.error" role="alert" class="alert alert-danger">\r\n                <div ng-repeat="error in messages.error">{{error.msg}}</div>\r\n            </div>\r\n            <div ng-if="messages.success" role="alert" class="alert alert-success">\r\n                <div ng-repeat="success in messages.success">{{success.msg}}</div>\r\n            </div>\r\n        </div>\r\n    </section>\r\n\r\n    <h5 class="text-center">Organization</h5>\r\n\r\n    <div class="row">\r\n        <div class="col-md-6 col-md-offset-3">\r\n\r\n            <h1 ng-hide="editingOrgName" ng-click="editingOrgName = true" class="text-center org__name">{{currentOrg.name}}</h1>\r\n\r\n            <form class="org__rename" ng-show="editingOrgName" ng-submit="renameCurrentOrg();">\r\n                <input class="form-control org__rename--input" type="text" ng-model="currentOrg.name" ng-required/>\r\n                <div class="btn-group btn-group-justified">\r\n                    <div class="btn-group" role="group">\r\n                        <button type="submit" class="btn btn-success org__rename--submit">Save</button>\r\n                    </div>\r\n                    <div class="btn-group" role="group">\r\n                        <a href="" ng-click="revertRename();" class="btn btn-default">Cancel</a>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <hr>\r\n\r\n    <h5 class="text-center">Projects</h5>\r\n\r\n    <div class="row">\r\n        <div class="col-md-6 col-md-offset-3" ng-repeat="project in currentOrg.projects">\r\n            <h4 class="text-center">\r\n                <a ng-href="/org/{{currentOrg.id}}/project/{{project.id}}">{{project.name}}</a>\r\n            </h4>\r\n        </div>\r\n    </div>\r\n\r\n    <p class="text-center"><strong><a ng-click="createProject();" href="">Create a new project?</a> &rarr;</strong></p>\r\n\r\n    <hr>\r\n\r\n    <h5 class="text-center">Settings</h5>\r\n\r\n    <div class="row text-center">\r\n        <div class="col-md-6 col-md-offset-3">\r\n            <h4><a href="#">General</a></h4>\r\n            <h4><a href="#">Users</a></h4>\r\n            <h4><a href="#">Billing</a></h4>\r\n        </div>\r\n    </div>\r\n\r\n    <!--<uib-tabset active="active">-->\r\n    <!--<uib-tab index="0" heading="Projects">-->\r\n    <!--<div ng-include="\'views/org/projects/projects.html\'"></div>-->\r\n    <!--</uib-tab>-->\r\n    <!--<uib-tab index="1" heading="Settings">-->\r\n    <!--<div ng-include="\'views/org/settings/settings.html\'"></div>-->\r\n    <!--</uib-tab>-->\r\n    <!--</uib-tabset>-->\r\n\r\n</div>\r\n');
$templateCache.put('views/org/org.list.html','<section id="messages" class="row text-center">\r\n    <div class="col-md-6 col-md-offset-3">\r\n        <div ng-if="messages.error" role="alert" class="alert alert-danger">\r\n            <div ng-repeat="error in messages.error">{{error.msg}}</div>\r\n        </div>\r\n        <div ng-if="messages.success" role="alert" class="alert alert-success">\r\n            <div ng-repeat="success in messages.success">{{success.msg}}</div>\r\n        </div>\r\n    </div>\r\n</section>\r\n\r\n<h5 class="text-center">All Organizations</h5>\r\n\r\n<section class="row text-center">\r\n    <div class="col-md-6 col-md-offset-3" ng-repeat="o in currentUser.orgs">\r\n        <h2><a href="org/{{o.org.id}}">{{o.org.name}}</a></h2>\r\n    </div>\r\n</section>');
$templateCache.put('views/profile/profile.html','<div class="container">\r\n\r\n    <div class="panel">\r\n        <div class="panel-body">\r\n            <form ng-submit="createOrg()" class="form-horizontal">\r\n                <legend>Create Organization</legend>\r\n                <div class="form-group">\r\n                    <label for="org_name" class="col-sm-3">Name</label>\r\n                    <div class="col-sm-7">\r\n                        <input type="text" name="org_name" id="org_name" class="form-control" ng-model="org.name">\r\n                    </div>\r\n                </div>\r\n                <div class="form-group">\r\n                    <div class="col-sm-offset-3 col-sm-4">\r\n                        <button type="submit" class="btn btn-success">Create Organization</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n\r\n    <div class="panel">\r\n        <div class="panel-body">\r\n            <div ng-if="messages.error" role="alert" class="alert alert-danger">\r\n                <div ng-repeat="error in messages.error">{{error.msg}}</div>\r\n            </div>\r\n            <div ng-if="messages.success" role="alert" class="alert alert-success">\r\n                <div ng-repeat="success in messages.success">{{success.msg}}</div>\r\n            </div>\r\n\r\n            <form ng-submit="updateProfile()" class="form-horizontal">\r\n                <legend>Profile Information</legend>\r\n                <div class="form-group">\r\n                    <label for="email" class="col-sm-3">Email</label>\r\n                    <div class="col-sm-7">\r\n                        <input type="email" name="email" id="email" class="form-control" ng-model="profile.email">\r\n                    </div>\r\n                </div>\r\n                <div class="form-group">\r\n                    <label for="name" class="col-sm-3">Name</label>\r\n                    <div class="col-sm-7">\r\n                        <input type="text" name="name" id="name" class="form-control" ng-model="profile.name">\r\n                    </div>\r\n                </div>\r\n                <div class="form-group">\r\n                    <label class="col-sm-3">Gender</label>\r\n                    <div class="col-sm-4">\r\n                        <label class="radio-inline radio col-sm-4">\r\n                            <input type="radio" name="gender" value="male" ng-checked="profile.gender === \'male\'" ng-model="profile.gender"><span>Male</span>\r\n                        </label>\r\n                        <label class="radio-inline col-sm-4">\r\n                            <input type="radio" name="gender" value="female" ng-checked="profile.gender === \'female\'" ng-model="profile.gender"><span>Female</span>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n                <div class="form-group">\r\n                    <label for="location" class="col-sm-3">Location</label>\r\n                    <div class="col-sm-7">\r\n                        <input type="text" name="location" id="location" class="form-control" ng-model="profile.location">\r\n                    </div>\r\n                </div>\r\n                <div class="form-group">\r\n                    <label for="website" class="col-sm-3">Website</label>\r\n                    <div class="col-sm-7">\r\n                        <input type="text" name="website" id="website" class="form-control" ng-model="profile.website">\r\n                    </div>\r\n                </div>\r\n                <div class="form-group">\r\n                    <label class="col-sm-3">Gravatar</label>\r\n                    <div class="col-sm-4">\r\n                        <img ng-src="{{profile.gravatar}}" class="profile" width="100" height="100">\r\n                    </div>\r\n                </div>\r\n                <div class="form-group">\r\n                    <div class="col-sm-offset-3 col-sm-4">\r\n                        <button type="submit" class="btn btn-success">Update Profile</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n    <div class="panel">\r\n        <div class="panel-body">\r\n            <form ng-submit="changePassword()" class="form-horizontal">\r\n                <legend>Change Password</legend>\r\n                <div class="form-group">\r\n                    <label for="password" class="col-sm-3">New Password</label>\r\n                    <div class="col-sm-7">\r\n                        <input type="password" name="password" id="password" class="form-control" ng-model="profile.password">\r\n                    </div>\r\n                </div>\r\n                <div class="form-group">\r\n                    <label for="confirm" class="col-sm-3">Confirm Password</label>\r\n                    <div class="col-sm-7">\r\n                        <input type="password" name="confirm" id="confirm" class="form-control" ng-model="profile.confirm">\r\n                    </div>\r\n                </div>\r\n                <div class="form-group">\r\n                    <div class="col-sm-4 col-sm-offset-3">\r\n                        <button type="submit" class="btn btn-success">Change Password</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n    <div class="panel">\r\n        <div class="panel-body">\r\n            <div class="form-horizontal">\r\n                <legend>Linked Accounts</legend>\r\n                <div class="form-group">\r\n                    <div class="col-sm-offset-3 col-sm-4">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="panel">\r\n        <div class="panel-body">\r\n            <form ng-submit="deleteAccount()" class="form-horizontal">\r\n                <legend>Delete Account</legend>\r\n                <div class="form-group">\r\n                    <p class="col-sm-offset-3 col-sm-9">You can delete your account, but keep in mind this action is irreversible.</p>\r\n                    <div class="col-sm-offset-3 col-sm-9">\r\n                        <button type="submit" class="btn btn-danger">Delete my account</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>\r\n');
$templateCache.put('views/project/project.html','<div class="container">\r\n\r\n<pre>\r\n{{currentProject | json}}\r\n</pre>\r\n\r\n\t<h5>{{currentOrg.name}} | {{currentProject.name}}</h5>\r\n\r\n\t<uib-tabset active="active">\r\n\t\t<uib-tab index="0" heading="Overview">\r\n\t\t\t<p>Project details go here</p>\r\n\t\t</uib-tab>\r\n\t\t<uib-tab index="1" heading="Experiments">\r\n\t\t\t<p>Project details go here</p>\r\n\t\t</uib-tab>\r\n\t\t<uib-tab index="2" heading="Ideas">\r\n\t\t\t<p>Project details go here</p>\r\n\t\t</uib-tab>\r\n\t\t<uib-tab index="3" heading="Settings">\r\n\t\t\t<p>Project settings go here</p>\r\n\t\t</uib-tab>\r\n\t</uib-tabset>\r\n\r\n</div>');
$templateCache.put('views/reset/reset.html','<div class="container">\n  <div class="panel">\n    <div class="panel-body">\n      <div ng-if="messages.error" role="alert" class="alert alert-danger">\n        <div ng-repeat="error in messages.error">{{error.msg}}</div>\n      </div>\n      <div ng-if="messages.success" role="alert" class="alert alert-success">\n        <div ng-repeat="success in messages.success">{{success.msg}}</div>\n      </div>\n        <form ng-submit="resetPassword()">\n          <legend>Reset Password</legend>\n          <div class="form-group">\n            <label for="password">New Password</label>\n            <input type="password" name="password" id="password" placeholder="New password" class="form-control" ng-model="user.password" autofocus>\n          </div>\n          <div class="form-group">\n            <label for="confirm">Confirm Password</label>\n            <input type="password" name="confirm" id="confirm" placeholder="Confirm password" class="form-control" ng-model="user.confirm">\n          </div>\n          <div class="form-group">\n            <button type="submit" class="btn btn-success">Change Password</button>\n          </div>\n        </form>\n    </div>\n  </div>\n</div>\n');
$templateCache.put('views/partials/404.html','<div class="container text-center">\n  <h1>404</h1>\n  <p>Page Not Found</p>\n</div>');
$templateCache.put('views/partials/createProjectModal.html','<div class="modal-demo">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title" id="modal-title">Create A Project</h3>\r\n    </div>\r\n    <div class="modal-body" id="modal-body">\r\n\r\n        <div ng-if="messages.error" role="alert" class="alert alert-danger">\r\n            <div ng-repeat="error in messages.error">{{error.msg}}</div>\r\n        </div>\r\n        <div ng-if="messages.success" role="alert" class="alert alert-success">\r\n            <div ng-repeat="success in messages.success">{{success.msg}}</div>\r\n        </div>\r\n\r\n        <form class="form-horizontal">\r\n            <div class="form-group">\r\n                <label for="project_name" class="col-sm-3">Name</label>\r\n                <div class="col-sm-7">\r\n                    <input type="text" name="project_name" id="project_name" class="form-control" ng-model="project.name">\r\n                    <br>\r\n                    <p class="help-block">Each project you create will contain experiments and objectives for a single website, app, or product that you\'d like to report.</p>\r\n                </div>\r\n            </div>\r\n        </form>\r\n\r\n    </div>\r\n    <div class="modal-footer">\r\n        <button class="btn btn-success" type="button" ng-class="{ disabled: submitting }" ng-click="createProject()">Create Project</button>\r\n        <button class="btn btn-default" type="button" ng-click="cancel()">Nevermind</button>\r\n    </div>\r\n</div>');
$templateCache.put('views/partials/footer.html','<p>\xA9 2017 SUPER AWESOME NAME. All Rights Reserved.</p>');
$templateCache.put('views/partials/header.html','<nav ng-controller="HeaderCtrl" class="navbar navbar-default navbar-static-top">\r\n    <div class="container">\r\n        <div class="navbar-header">\r\n            <button type="button" data-toggle="collapse" data-target="#navbar" class="navbar-toggle collapsed">\r\n                <span class="sr-only">Toggle navigation</span>\r\n                <span class="icon-bar"></span>\r\n                <span class="icon-bar"></span>\r\n                <span class="icon-bar"></span>\r\n            </button>\r\n            <a href="/" class="navbar-brand">SUPER AWESOME NAME</a>\r\n        </div>\r\n        <div id="navbar" class="navbar-collapse collapse">\r\n            <ul class="nav navbar-nav">\r\n                <li ng-class="{ active: isActive(\'/\')}"><a href="/">Home</a></li>\r\n                <li ng-class="{ active: isActive(\'/contact\')}"><a href="/contact">Contact</a></li>\r\n\r\n            </ul>\r\n            <ul ng-if="isAuthenticated()" class="nav navbar-nav navbar-right">\r\n                <li ng-if="currentUser.orgs.length > 0"><a href="/organizations">Organizations</a></li>\r\n                <li class="dropdown">\r\n                    <a href="#" data-toggle="dropdown" class="navbar-avatar dropdown-toggle">\r\n                        <img ng-src="{{currentUser.picture || currentUser.gravatar}}"> {{currentUser.name || currentUser.email || currentUser.id}} <i class="caret"></i>\r\n                    </a>\r\n                    <ul class="dropdown-menu">\r\n                        <li><a href="/account">My Account</a></li>\r\n                        <li class="divider"></li>\r\n                        <li><a href="#" ng-click="logout()" }>Logout</a></li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n            <ul ng-if="!isAuthenticated()" class="nav navbar-nav navbar-right">\r\n                <li ng-class="{ active: isActive(\'/login\')}"><a href="/login">Log in</a></li>\r\n                <li ng-class="{ active: isActive(\'/signup\')}"><a href="/signup">Sign up</a></li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>\r\n');
$templateCache.put('views/signup/signup.html','<div class="container login-container">\n    <div class="panel">\n        <div class="panel-body">\n            <div ng-if="messages.error" role="alert" class="alert alert-danger">\n                <div ng-repeat="error in messages.error">{{error.msg}}</div>\n            </div>\n            <form ng-submit="signup()">\n                <legend>Create an account</legend>\n                <div class="form-group">\n                    <label for="name">Name</label>\n                    <input type="text" name="name" id="name" placeholder="Name" class="form-control" ng-model="user.name" autofocus>\n                </div>\n                <div class="form-group">\n                    <label for="email">Email</label>\n                    <input type="email" name="email" id="email" placeholder="Email" class="form-control" ng-model="user.email">\n                </div>\n                <div class="form-group">\n                    <label for="password">Password</label>\n                    <input type="password" name="password" id="password" placeholder="Password" class="form-control" ng-model="user.password">\n                </div>\n                <div class="form-group">\n                    <small class="text-muted">By signing up, you agree to the <a href="/">Terms of Service</a>.</small>\n                </div>\n                <button type="submit" class="btn btn-success">Create an account</button>\n            </form>\n        </div>\n    </div>\n    <p class="text-center">\n        Already have an account? <a href="/login"><strong>Log in</strong></a>\n    </p>\n</div>\n');
$templateCache.put('views/home/home.html','<div class="container-fluid">\n  <div class="row">\n    <div class="col-sm-4">\n      <div class="panel">\n        <div class="panel-body">\n          <h3>Heading</h3>\n          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris\n            condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.\n            Donec sed odio dui.</p>\n          <a href="#" role="button" class="btn btn-default">View details</a>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-4">\n      <div class="panel">\n        <div class="panel-body">\n          <h3>Heading</h3>\n          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris\n            condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.\n            Donec sed odio dui.</p>\n          <a href="#" role="button" class="btn btn-default">View details</a>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-4">\n      <div class="panel">\n        <div class="panel-body">\n          <h3>Heading</h3>\n          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris\n            condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.\n            Donec sed odio dui.</p>\n          <a href="#" role="button" class="btn btn-default">View details</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n');
$templateCache.put('views/org/projects/projects.html','<section ng-controller="OrgProjectsCtrl">\r\n    <h2>Projects</h2>\r\n\r\n    <div class="panel">\r\n        <div class="panel-body">\r\n\r\n            <div ng-if="messages.error" role="alert" class="alert alert-danger">\r\n                <div ng-repeat="error in messages.error">{{error.msg}}</div>\r\n            </div>\r\n            <div ng-if="messages.success" role="alert" class="alert alert-success">\r\n                <div ng-repeat="success in messages.success">{{success.msg}}</div>\r\n            </div>\r\n\r\n            <div ng-if="currentOrg.projects.length > 0">\r\n                <ul ng-repeat="project in currentOrg.projects">\r\n                    <li><a ng-href="/org/{{currentOrg.id}}/project/{{project.id}}">{{project.name}}</a></li>\r\n                </ul>\r\n            </div>\r\n\r\n            <form ng-submit="createProject()" class="form-horizontal">\r\n                <legend>Create Project</legend>\r\n                <div class="form-group">\r\n                    <label for="project_name" class="col-sm-3">Name</label>\r\n                    <div class="col-sm-7">\r\n                        <input type="text" name="project_name" id="project_name" class="form-control" ng-model="project.name">\r\n                        <br>\r\n                        <p class="help-block">Each project you create will contain experiments and objectives for a single website, app, or product that you\'d like to report.</p>\r\n                    </div>\r\n                </div>\r\n                <div class="form-group">\r\n                    <div class="col-sm-offset-3 col-sm-4">\r\n                        <button type="submit" class="btn btn-success">Create Project</button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</section>\r\n');
$templateCache.put('views/org/settings/settings.billing.html','<div class="panel">\r\n    <div class="panel-body">\r\n        <legend>Billing</legend>\r\n        <p>Coming soon(tm)!</p>\r\n    </div>\r\n</div>');
$templateCache.put('views/org/settings/settings.general.html','<div class="panel">\r\n    <div class="panel-body">\r\n\r\n        <div ng-if="messages.error" role="alert" class="alert alert-danger">\r\n            <div ng-repeat="error in messages.error">{{error.msg}}</div>\r\n        </div>\r\n        <div ng-if="messages.success" role="alert" class="alert alert-success">\r\n            <div ng-repeat="success in messages.success">{{success.msg}}</div>\r\n        </div>\r\n\r\n        <form ng-submit="updateGeneralOrgSettings()" class="form-horizontal">\r\n            <legend>General</legend>\r\n            <div class="form-group">\r\n                <label for="name" class="col-sm-3">Name</label>\r\n                <div class="col-sm-7">\r\n                    <input type="text" name="name" id="name" class="form-control" ng-model="currentOrg.name">\r\n                </div>\r\n            </div>\r\n            <div class="form-group">\r\n                <div class="col-sm-offset-3 col-sm-4">\r\n                    <button type="submit" class="btn btn-success">Update Organization</button>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>\r\n');
$templateCache.put('views/org/settings/settings.html','<section ng-controller="OrgSettingsCtrl">\r\n    <h2>Settings</h2>\r\n\r\n    <div class="row">\r\n        <div class="col-sm-3">\r\n            <ul class="nav nav-pills">\r\n                <li ng-class="{\'active\': view_tab == \'general\'}">\r\n                    <a ng-click="changeTab(\'general\')">General</a>\r\n                </li>\r\n                <li ng-class="{\'active\': view_tab == \'users\'}">\r\n                    <a ng-click="changeTab(\'users\')">Users</a>\r\n                </li>\r\n                <li ng-class="{\'active\': view_tab == \'billing\'}">\r\n                    <a ng-click="changeTab(\'billing\')">Billing</a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class="col-sm-9">\r\n            <div class="tab-content">\r\n                <div class="tab-pane" ng-show="view_tab == \'general\'">\r\n                    <div ng-include="\'views/org/settings/settings.general.html\'"></div>\r\n                </div>\r\n                <div class="tab-pane" ng-show="view_tab == \'users\'">\r\n                    <div ng-include="\'views/org/settings/settings.users.html\'"></div>\r\n                </div>\r\n                <div class="tab-pane" ng-show="view_tab == \'billing\'">\r\n                    <div ng-include="\'views/org/settings/settings.billing.html\'"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</section>\r\n');
$templateCache.put('views/org/settings/settings.users.html','<div class="panel">\r\n    <div class="panel-body">\r\n        <legend>Users</legend>\r\n        <div class="table-responsive">\r\n            <table class="table table-hover">\r\n                <thead>\r\n                <tr>\r\n                    <th>Name</th>\r\n                    <th>Email</th>\r\n                    <th>Role</th>\r\n                    <th>Status</th>\r\n                    <th></th>\r\n                </tr>\r\n                </thead>\r\n                <tbody>\r\n                <tr ng-repeat="member in currentOrg.members">\r\n                    <td>{{member.name}}</td>\r\n                    <td>{{member.email}}</td>\r\n                    <!-- TODO: FIGURE OUT HOW TO GET ROLE FROM USER. -->\r\n                    <td>Owner</td>\r\n                    <!-- TODO: IMPLEMENT STATUS ON USER. -->\r\n                    <td>Joined</td>\r\n                    <!-- TODO: IMPLEMENT REMOVING USER FROM ORGANIZATION -->\r\n                    <td><a href="">Remove</a></td>\r\n                </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n');}]);