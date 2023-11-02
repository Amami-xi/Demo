import Oidc from 'oidc-client';

var mgr = new Oidc.UserManager({
    authority: `${import.meta.env.VITE_IAM_WEB_URL}/iam.web/oidc/`,
    client_id: import.meta.env.VITE_APP_CLIENT_ID,
    redirect_uri: `${window.location.origin}/callback.html?redirect_uri=${encodeURIComponent(window.location.href)}`,
    response_type: 'token',
    scope: 'openid profile',
    post_logout_redirect_uri: window.location.origin + '/',
    silent_redirect_uri: window.location.origin + '/silent-renew.html',
    accessTokenExpiringNotificationTime: 10,
    automaticSilentRenew: true,
    filterProtocolClaims: true
})

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

//logout 通知
window.addEventListener("storage", function(e) {
    if (e.url.indexOf("logout.html") && e.key == "signOut") {
        window.location.href = e.url;
        this.localStorage.removeItem("signOut")
    }
});

export default class SecurityService {

    // Renew the token manually
    renewToken() {
        let self = this
        return new Promise((resolve, reject) => {
            mgr.signinSilent().then(function(user) {
                if (user == null) {
                    self.signIn(null)
                } else {
                    return resolve(user)
                }
            }).catch(function(err) {
                console.log(err)
                return reject(err)
            });
        })
    }

    // Get the user who is logged in
    getUser() {
        let self = this
        return new Promise((resolve, reject) => {
            mgr.getUser().then(function(user) {
                if (user == null) {
                    self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user)
                }
            }).catch(function(err) {
                return reject(err)
            });
        })
    }
    removeUser() {
        return new Promise((resolve, reject) => {
            mgr.removeUser().then(function() {
                return resolve()
            }).catch(function(err) {
                return reject(err)
            });
        })

    }

    // Check if there is any user logged in
    getSignedIn() {
        let self = this
        return new Promise((resolve, reject) => {
            mgr.getUser().then(function(user) {
                if (user == null) { //未登录，跳转到登录界面
                    self.signIn()
                    return resolve({
                        signIn: false,
                        user: null
                    })
                } else {
                    return resolve({
                        signIn: true,
                        user: user
                    })
                }
            }).catch(function(err) {
                console.log(err)
                return reject(err)
            });
        })
    }

    // Redirect of the current window to the authorization endpoint.
    signIn() {
        mgr.signinRedirect().catch(function(err) {
            console.log(err)
        })
    }

    getAccessTokenFromHeader() {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', document.location, true);

            xhr.onload = () => {
                switch (xhr.status) {
                    case 200:
                        {
                            let auth = xhr.getResponseHeader("Authorization");
                            let accesstoken = auth.split(" ")[1];
                            resolve(accesstoken);
                            break;
                        }
                    default:
                        reject({
                            status: xhr.status,
                            res: xhr.response
                        });
                }
            }
            xhr.send(null);
        });
    }

    // Redirect of the current window to the end session endpoint
    signOut() {
        //通知localStorage
        localStorage.setItem('signOut', new Date() * 1);
        mgr.signoutRedirect({
            extraQueryParams: {
                service: window.location.origin
            }
        }).then(function(resp) {
            console.log('signed out', resp);
        }).catch(function(err) {
            console.log(err)
        })
    }

    // save the profile of the user logged in
    saveProfile() {
        mgr._validator.validateSigninResponse = function validateSigninResponse(state, response) {
            var _this = mgr._validator;
            return this._processSigninParams(state, response).then(function(response) {
                return _this._validateTokens(state, response).then(function(signinResponse) {
                    return _this._userInfoService.getClaims(signinResponse.access_token).then(function(profile) {
                        signinResponse.profile = profile;
                        return signinResponse;
                    })
                });
            });
        };
        return new Promise((resolve, reject) => {
            mgr.signinRedirectCallback().then(function(user) {
                    resolve(user)
                })
                .catch(function(err) {
                    return reject(err)
                })
        });

    }

    getProfile() {
        debugger
        let self = this
        return new Promise((resolve, reject) => {
            mgr.getUser().then(function(user) {
                if (user == null) {
                    self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user.profile)
                }
            }).catch(function(err) {
                console.log(err)
                return reject(err)
            });
        })
    }

    // Get the token id
    getIdToken() {
        let self = this
        return new Promise((resolve, reject) => {
            mgr.getUser().then(function(user) {
                if (user == null) {
                    self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user.id_token)
                }
            }).catch(function(err) {
                console.log(err)
                return reject(err)
            });
        })
    }

    // Get the session state
    getSessionState() {
        let self = this
        return new Promise((resolve, reject) => {
            mgr.getUser().then(function(user) {
                if (user == null) {
                    self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user.session_state)
                }
            }).catch(function(err) {
                console.log(err)
                return reject(err)
            });
        })
    }

    // Get the access token of the logged in user
    getAccessToken() {
        debugger
        let self = this
        return new Promise((resolve, reject) => {
            mgr.getUser().then(function(user) {
                if (user == null) {
                    self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user.access_token)
                }
            }).catch(function(err) {
                console.log(err)
                return reject(err)
            });
        });
    }

    // Takes the scopes of the logged in user
    getScopes() {
        let self = this
        return new Promise((resolve, reject) => {
            mgr.getUser().then(function(user) {
                if (user == null) {
                    self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user.scopes)
                }
            }).catch(function(err) {
                console.log(err)
                return reject(err)
            });
        })
    }


    // Get the user roles logged in
    getRole() {
        let self = this
        return new Promise((resolve, reject) => {
            mgr.getUser().then(function(user) {
                if (user == null) {
                    self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user.profile.role)
                }
            }).catch(function(err) {
                console.log(err)
                return reject(err)
            });
        })
    }
}