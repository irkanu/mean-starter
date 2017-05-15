angular.module('MyApp').run(['$templateCache', function($templateCache) {$templateCache.put('views/contact/contact.html','<div class="container">\n  <div class="panel">\n    <div class="panel-heading">\n      <h3 class="panel-title">Contact Form</h3>\n    </div>\n    <div class="panel-body">\n      <div ng-if="messages.error" role="alert" class="alert alert-danger">\n        <div ng-repeat="error in messages.error">{{error.msg}}</div>\n      </div>\n      <div ng-if="messages.success" role="alert" class="alert alert-success">\n        <div ng-repeat="success in messages.success">{{success.msg}}</div>\n      </div>\n      <form ng-submit="sendContactForm()" class="form-horizontal">\n        <div class="form-group">\n          <label for="name" class="col-sm-2">Name</label>\n          <div class="col-sm-8">\n            <input type="text" name="name" id="name" class="form-control" ng-model="contact.name" autofocus>\n          </div>\n        </div>\n        <div class="form-group">\n          <label for="email" class="col-sm-2">Email</label>\n          <div class="col-sm-8">\n            <input type="email" name="email" id="email" class="form-control" ng-model="contact.email">\n          </div>\n        </div>\n        <div class="form-group">\n          <label for="message" class="col-sm-2">Body</label>\n          <div class="col-sm-8">\n            <textarea name="message" id="message" rows="7" class="form-control" ng-model="contact.message"></textarea>\n          </div>\n        </div>\n        <div class="form-group">\n          <div class="col-sm-offset-2 col-sm-8">\n            <button type="submit" class="btn btn-success">Send</button>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>');
$templateCache.put('views/forgot/forgot.html','<div class="container login-container">\n    <div class="panel">\n        <div class="panel-body">\n            <div ng-if="messages.error" role="alert" class="alert alert-danger">\n                <div ng-repeat="error in messages.error">{{error.msg}}</div>\n            </div>\n            <div ng-if="messages.success" role="alert" class="alert alert-success">\n                <div ng-repeat="success in messages.success">{{success.msg}}</div>\n            </div>\n            <form ng-submit="forgotPassword()">\n                <legend>Forgot Password</legend>\n                <div class="form-group">\n                    <p>Enter your email address below and we\'ll send you password reset instructions.</p>\n                    <label for="email">Email</label>\n                    <input type="email" name="email" id="email" placeholder="Email" class="form-control" ng-model="user.email" autofocus>\n                </div>\n                <button type="submit" class="btn btn-success">Reset Password</button>\n            </form>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('views/home/home.html','<div class="container-fluid">\n  <div class="row">\n    <div class="col-sm-4">\n      <div class="panel">\n        <div class="panel-body">\n          <h3>Heading</h3>\n          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris\n            condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.\n            Donec sed odio dui.</p>\n          <a href="#" role="button" class="btn btn-default">View details</a>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-4">\n      <div class="panel">\n        <div class="panel-body">\n          <h3>Heading</h3>\n          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris\n            condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.\n            Donec sed odio dui.</p>\n          <a href="#" role="button" class="btn btn-default">View details</a>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-4">\n      <div class="panel">\n        <div class="panel-body">\n          <h3>Heading</h3>\n          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris\n            condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod.\n            Donec sed odio dui.</p>\n          <a href="#" role="button" class="btn btn-default">View details</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n');
$templateCache.put('views/org/org.html','<div class="container">\n\n\t<pre>\n\t\t{{currentOrg.projects | json}}\n\t</pre>\n\n\t<h1>{{currentOrg.name}}</h1>\n\n\t<uib-tabset active="active">\n\t\t<uib-tab index="0" heading="Projects">\n\t\t\t<div ng-include="\'views/org/projects/projects.html\'"></div>\n\t\t</uib-tab>\n\t\t<uib-tab index="1" heading="Settings">\n\t\t\t<div ng-include="\'views/org/settings/settings.html\'"></div>\n\t\t</uib-tab>\n\t</uib-tabset>\n\n</div>\n');
$templateCache.put('views/partials/404.html','<div class="container text-center">\n  <h1>404</h1>\n  <p>Page Not Found</p>\n</div>');
$templateCache.put('views/partials/footer.html','<footer>\n  <p>\xA9 2017 Company, Inc. All Rights Reserved.</p>\n</footer>');
$templateCache.put('views/partials/header.html','<nav ng-controller="HeaderCtrl" class="navbar navbar-default navbar-static-top">\n    <div class="container">\n        <div class="navbar-header">\n            <button type="button" data-toggle="collapse" data-target="#navbar" class="navbar-toggle collapsed">\n                <span class="sr-only">Toggle navigation</span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n            </button>\n            <a href="/" class="navbar-brand">sitemetrics.io</a>\n        </div>\n        <div id="navbar" class="navbar-collapse collapse">\n            <ul class="nav navbar-nav">\n                <li ng-class="{ active: isActive(\'/\')}"><a href="/">Home</a></li>\n                <li ng-class="{ active: isActive(\'/contact\')}"><a href="/contact">Contact</a></li>\n\n            </ul>\n            <ul ng-if="isAuthenticated()" class="nav navbar-nav navbar-right">\n                <li ng-if="currentUser.orgs.length > 0" class="dropdown">\n                    <a href="#" data-toggle="dropdown" class="dropdown-toggle">\n                        Organizations <i class="caret"></i>\n                    </a>\n                    <ul class="dropdown-menu">\n                        <li ng-repeat="o in currentUser.orgs">\n                            <a href="/org/{{o.org._id}}">{{o.org.name}}</a>\n                        </li>\n                    </ul>\n                </li>\n                <li class="dropdown">\n                    <a href="#" data-toggle="dropdown" class="navbar-avatar dropdown-toggle">\n                        <img ng-src="{{currentUser.picture || currentUser.gravatar}}"> {{currentUser.name || currentUser.email || currentUser.id}} <i class="caret"></i>\n                    </a>\n                    <ul class="dropdown-menu">\n                        <li><a href="/account">My Account</a></li>\n                        <li class="divider"></li>\n                        <li><a href="#" ng-click="logout()" }>Logout</a></li>\n                    </ul>\n                </li>\n            </ul>\n            <ul ng-if="!isAuthenticated()" class="nav navbar-nav navbar-right">\n                <li ng-class="{ active: isActive(\'/login\')}"><a href="/login">Log in</a></li>\n                <li ng-class="{ active: isActive(\'/signup\')}"><a href="/signup">Sign up</a></li>\n            </ul>\n        </div>\n    </div>\n</nav>\n');
$templateCache.put('views/login/login.html','<div class="container login-container">\n    <div class="panel">\n        <div class="panel-body">\n            <div ng-if="messages.error" role="alert" class="alert alert-danger">\n                <div ng-repeat="error in messages.error">{{error.msg}}</div>\n            </div>\n            <form ng-submit="login()">\n                <legend>Log In</legend>\n                <div class="form-group">\n                    <label for="email">Email</label>\n                    <input type="email" name="email" id="email" placeholder="Email" class="form-control" ng-model="user.email" autofocus>\n                </div>\n                <div class="form-group">\n                    <label for="password">Password</label>\n                    <input type="password" name="password" id="password" placeholder="Password" class="form-control" ng-model="user.password">\n                </div>\n                <div class="form-group"><a href="/forgot"><strong>Forgot your password?</strong></a></div>\n                <button type="submit" class="btn btn-success">Log in</button>\n            </form>\n        </div>\n    </div>\n    <p class="text-center">\n        Don\'t have an account? <a href="/signup"><strong>Sign up</strong></a>\n    </p>\n</div>\n');
$templateCache.put('views/profile/profile.html','<div class="container">\n\n    <div class="panel">\n        <div class="panel-body">\n            <form ng-submit="createOrg()" class="form-horizontal">\n                <legend>Create Organization</legend>\n                <div class="form-group">\n                    <label for="org_name" class="col-sm-3">Name</label>\n                    <div class="col-sm-7">\n                        <input type="text" name="org_name" id="org_name" class="form-control" ng-model="org.name">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="col-sm-offset-3 col-sm-4">\n                        <button type="submit" class="btn btn-success">Create Organization</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n\n    <div class="panel">\n        <div class="panel-body">\n            <div ng-if="messages.error" role="alert" class="alert alert-danger">\n                <div ng-repeat="error in messages.error">{{error.msg}}</div>\n            </div>\n            <div ng-if="messages.success" role="alert" class="alert alert-success">\n                <div ng-repeat="success in messages.success">{{success.msg}}</div>\n            </div>\n\n            <form ng-submit="updateProfile()" class="form-horizontal">\n                <legend>Profile Information</legend>\n                <div class="form-group">\n                    <label for="email" class="col-sm-3">Email</label>\n                    <div class="col-sm-7">\n                        <input type="email" name="email" id="email" class="form-control" ng-model="profile.email">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="name" class="col-sm-3">Name</label>\n                    <div class="col-sm-7">\n                        <input type="text" name="name" id="name" class="form-control" ng-model="profile.name">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label class="col-sm-3">Gender</label>\n                    <div class="col-sm-4">\n                        <label class="radio-inline radio col-sm-4">\n                            <input type="radio" name="gender" value="male" ng-checked="profile.gender === \'male\'" ng-model="profile.gender"><span>Male</span>\n                        </label>\n                        <label class="radio-inline col-sm-4">\n                            <input type="radio" name="gender" value="female" ng-checked="profile.gender === \'female\'" ng-model="profile.gender"><span>Female</span>\n                        </label>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="location" class="col-sm-3">Location</label>\n                    <div class="col-sm-7">\n                        <input type="text" name="location" id="location" class="form-control" ng-model="profile.location">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="website" class="col-sm-3">Website</label>\n                    <div class="col-sm-7">\n                        <input type="text" name="website" id="website" class="form-control" ng-model="profile.website">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label class="col-sm-3">Gravatar</label>\n                    <div class="col-sm-4">\n                        <img ng-src="{{profile.gravatar}}" class="profile" width="100" height="100">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="col-sm-offset-3 col-sm-4">\n                        <button type="submit" class="btn btn-success">Update Profile</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n    <div class="panel">\n        <div class="panel-body">\n            <form ng-submit="changePassword()" class="form-horizontal">\n                <legend>Change Password</legend>\n                <div class="form-group">\n                    <label for="password" class="col-sm-3">New Password</label>\n                    <div class="col-sm-7">\n                        <input type="password" name="password" id="password" class="form-control" ng-model="profile.password">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <label for="confirm" class="col-sm-3">Confirm Password</label>\n                    <div class="col-sm-7">\n                        <input type="password" name="confirm" id="confirm" class="form-control" ng-model="profile.confirm">\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="col-sm-4 col-sm-offset-3">\n                        <button type="submit" class="btn btn-success">Change Password</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n    <div class="panel">\n        <div class="panel-body">\n            <div class="form-horizontal">\n                <legend>Linked Accounts</legend>\n                <div class="form-group">\n                    <div class="col-sm-offset-3 col-sm-4">\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="panel">\n        <div class="panel-body">\n            <form ng-submit="deleteAccount()" class="form-horizontal">\n                <legend>Delete Account</legend>\n                <div class="form-group">\n                    <p class="col-sm-offset-3 col-sm-9">You can delete your account, but keep in mind this action is irreversible.</p>\n                    <div class="col-sm-offset-3 col-sm-9">\n                        <button type="submit" class="btn btn-danger">Delete my account</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n');
$templateCache.put('views/reset/reset.html','<div class="container">\n  <div class="panel">\n    <div class="panel-body">\n      <div ng-if="messages.error" role="alert" class="alert alert-danger">\n        <div ng-repeat="error in messages.error">{{error.msg}}</div>\n      </div>\n      <div ng-if="messages.success" role="alert" class="alert alert-success">\n        <div ng-repeat="success in messages.success">{{success.msg}}</div>\n      </div>\n        <form ng-submit="resetPassword()">\n          <legend>Reset Password</legend>\n          <div class="form-group">\n            <label for="password">New Password</label>\n            <input type="password" name="password" id="password" placeholder="New password" class="form-control" ng-model="user.password" autofocus>\n          </div>\n          <div class="form-group">\n            <label for="confirm">Confirm Password</label>\n            <input type="password" name="confirm" id="confirm" placeholder="Confirm password" class="form-control" ng-model="user.confirm">\n          </div>\n          <div class="form-group">\n            <button type="submit" class="btn btn-success">Change Password</button>\n          </div>\n        </form>\n    </div>\n  </div>\n</div>\n');
$templateCache.put('views/signup/signup.html','<div class="container login-container">\n    <div class="panel">\n        <div class="panel-body">\n            <div ng-if="messages.error" role="alert" class="alert alert-danger">\n                <div ng-repeat="error in messages.error">{{error.msg}}</div>\n            </div>\n            <form ng-submit="signup()">\n                <legend>Create an account</legend>\n                <div class="form-group">\n                    <label for="name">Name</label>\n                    <input type="text" name="name" id="name" placeholder="Name" class="form-control" ng-model="user.name" autofocus>\n                </div>\n                <div class="form-group">\n                    <label for="email">Email</label>\n                    <input type="email" name="email" id="email" placeholder="Email" class="form-control" ng-model="user.email">\n                </div>\n                <div class="form-group">\n                    <label for="password">Password</label>\n                    <input type="password" name="password" id="password" placeholder="Password" class="form-control" ng-model="user.password">\n                </div>\n                <div class="form-group">\n                    <small class="text-muted">By signing up, you agree to the <a href="/">Terms of Service</a>.</small>\n                </div>\n                <button type="submit" class="btn btn-success">Create an account</button>\n            </form>\n        </div>\n    </div>\n    <p class="text-center">\n        Already have an account? <a href="/login"><strong>Log in</strong></a>\n    </p>\n</div>\n');
$templateCache.put('views/org/projects/projects.html','<section ng-controller="OrgProjectsCtrl">\n    <h2>Projects</h2>\n\n    <div class="panel">\n        <div class="panel-body">\n\n            <div ng-if="messages.error" role="alert" class="alert alert-danger">\n                <div ng-repeat="error in messages.error">{{error.msg}}</div>\n            </div>\n            <div ng-if="messages.success" role="alert" class="alert alert-success">\n                <div ng-repeat="success in messages.success">{{success.msg}}</div>\n            </div>\n\n            <div ng-if="currentOrg.projects.length > 0">\n                <ul ng-repeat="project in currentOrg.projects">\n                    <li><a ng-href="/org/{{currentOrg.id}}/project/{{project.id}}">{{project.name}}</a></li>\n                </ul>\n            </div>\n\n            <form ng-submit="createProject()" class="form-horizontal">\n                <legend>Create Project</legend>\n                <div class="form-group">\n                    <label for="project_name" class="col-sm-3">Name</label>\n                    <div class="col-sm-7">\n                        <input type="text" name="project_name" id="project_name" class="form-control" ng-model="project.name">\n                        <br>\n                        <p class="help-block">Each project you create will contain experiments and objectives for a single website, app, or product that you\'d like to report.</p>\n                    </div>\n                </div>\n                <div class="form-group">\n                    <div class="col-sm-offset-3 col-sm-4">\n                        <button type="submit" class="btn btn-success">Create Project</button>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n\n\n</section>\n');
$templateCache.put('views/org/settings/settings.billing.html','<div class="panel">\n    <div class="panel-body">\n        <legend>Billing</legend>\n        <p>Coming soon(tm)!</p>\n    </div>\n</div>');
$templateCache.put('views/org/settings/settings.general.html','<div class="panel">\n    <div class="panel-body">\n\n        <div ng-if="messages.error" role="alert" class="alert alert-danger">\n            <div ng-repeat="error in messages.error">{{error.msg}}</div>\n        </div>\n        <div ng-if="messages.success" role="alert" class="alert alert-success">\n            <div ng-repeat="success in messages.success">{{success.msg}}</div>\n        </div>\n\n        <form ng-submit="updateGeneralOrgSettings()" class="form-horizontal">\n            <legend>General</legend>\n            <div class="form-group">\n                <label for="name" class="col-sm-3">Name</label>\n                <div class="col-sm-7">\n                    <input type="text" name="name" id="name" class="form-control" ng-model="currentOrg.name">\n                </div>\n            </div>\n            <div class="form-group">\n                <div class="col-sm-offset-3 col-sm-4">\n                    <button type="submit" class="btn btn-success">Update Organization</button>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n');
$templateCache.put('views/org/settings/settings.html','<section ng-controller="OrgSettingsCtrl">\n    <h2>Settings</h2>\n\n    <div class="row">\n        <div class="col-sm-3">\n            <ul class="nav nav-tabs nav-stacked nav-pills">\n                <li ng-class="{\'active\': view_tab == \'general\'}">\n                    <a ng-click="changeTab(\'general\')">General</a>\n                </li>\n                <li ng-class="{\'active\': view_tab == \'users\'}">\n                    <a ng-click="changeTab(\'users\')">Users</a>\n                </li>\n                <li ng-class="{\'active\': view_tab == \'billing\'}">\n                    <a ng-click="changeTab(\'billing\')">Billing</a>\n                </li>\n            </ul>\n        </div>\n        <div class="col-sm-9">\n            <div class="tab-content">\n                <div class="tab-pane" ng-show="view_tab == \'general\'">\n                    <div ng-include="\'views/org/settings/settings.general.html\'"></div>\n                </div>\n                <div class="tab-pane" ng-show="view_tab == \'users\'">\n                    <div ng-include="\'views/org/settings/settings.users.html\'"></div>\n                </div>\n                <div class="tab-pane" ng-show="view_tab == \'billing\'">\n                    <div ng-include="\'views/org/settings/settings.billing.html\'"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</section>\n');
$templateCache.put('views/org/settings/settings.users.html','<div class="panel">\n    <div class="panel-body">\n        <legend>Users</legend>\n        <div class="table-responsive">\n            <table class="table table-hover">\n                <thead>\n                <tr>\n                    <th>Name</th>\n                    <th>Email</th>\n                    <th>Role</th>\n                    <th>Status</th>\n                    <th></th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr ng-repeat="member in currentOrg.members">\n                    <td>{{member.name}}</td>\n                    <td>{{member.email}}</td>\n                    <!-- TODO: FIGURE OUT HOW TO GET ROLE FROM USER. -->\n                    <td>Owner</td>\n                    <!-- TODO: IMPLEMENT STATUS ON USER. -->\n                    <td>Joined</td>\n                    <!-- TODO: IMPLEMENT REMOVING USER FROM ORGANIZATION -->\n                    <td><a href="">Remove</a></td>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n\n    </div>\n</div>\n');}]);