const 
    ROLE_NOBODY = 0,
    ROLE_EXPIRED = 13,
    ROLE_SUBSCRIBER = 1,
    ROLE_ULTIMATE = 2,
    ROLE_SUPER_ADMIN = 19; // DUDE DON'T CHANGE THESE NUMBERS DUDE

module.exports = {
    ROLE_EXPIRED: ROLE_EXPIRED,
    ROLE_NOBODY: ROLE_NOBODY,
    ROLE_SUBSCRIBER: ROLE_SUBSCRIBER,
    ROLE_ULTIMATE: ROLE_ULTIMATE,
    ROLE_SUPER_ADMIN: ROLE_SUPER_ADMIN,

    _actionCache: {},

    roles: [
        {
            id: ROLE_NOBODY,
            name: 'none',
            actions: [
                'package_view',
                'subscription_create',
                'users_validate'
            ]
        },
        {
            id: ROLE_EXPIRED,
            name: 'expired',
            inherits: [ROLE_NOBODY],
            actions: [
                'subscription_renew'
            ]
        },
        {
            id: ROLE_SUBSCRIBER,
            name: "Subscriber",
            inherits: [ROLE_NOBODY],
            actions: [
                'game_view',
                'name_view',
                'tag_view',

                'metadata_view',

                'game_filter',

                // these are for viewing these specific pages in the app
                'game_page_view',
                'dashboard_page_view',
                'materials_page_view',
                'videos_page_view',
                'glossary_page_view',
                'blog_page_view',
                //

                'subscription_view',

                'note_public_view',
                'note_private_create',

                'name_vote',

                'account_edit',
                'messages',

                'material_view' // downloading material items (that they own)
            ]
        },
        {
            id: ROLE_ULTIMATE,
            name: "Ultimate",
            inherits: [ROLE_NOBODY, ROLE_SUBSCRIBER],
            actions: [

            ]
        },
        {
            id: ROLE_SUPER_ADMIN,
            name: "Super Admin",
            inherits: [ROLE_ULTIMATE],
            actions: [
                'users_view',
                'users_lock',
                'users_edit',
                'users_delete',

                'note_public_create',
                'note_public_edit',

                'game_create',
                'game_edit',
                'game_delete',

                'game_tag_add',
                'game_tag_remove',

                'name_create',
                'name_edit',
                'name_delete',

                'metadata_create',
                'metadata_edit',
                'metadata_delete',

                'tag_create',
                'tag_edit',
                'tag_delete'
            ]
        }
    ],

    canUserHave: (url, method, user) => {
        method = method.toLowerCase();
        let action = findActionForUrl(url, method),
            val;

        if (typeof(action) === 'function') {
            val = action(url, method, user);

            if (typeof val !== 'string') {
                console.log('Action for ' + method + ':' + url + ' is a function');
                return val;
            }
        }
        if (val) {
            action = val;
        }
        
        if (action) {
            console.log('Action for ' + method + ':' + url + ' is ' + action);
            return module.exports.doesUserHaveAction(user, action);
        }
    },

    getActionsForRole: (roleId) => {
        if (!module.exports._actionCache['role_' + roleId]) {
            let actions = [];
            module.exports.roles.forEach(role => {
                if (role.id === parseInt(roleId, 10)) {
                    actions = union_arrays(actions, role.actions);
                    if (role.inherits && role.inherits.length) {
                        role.inherits.forEach(id => {
                            actions = union_arrays(actions, module.exports.getActionsForRole(id));
                        });
                    }
                }
            });
            module.exports._actionCache['role_' + roleId] = actions;
        }

        return module.exports._actionCache['role_' + roleId];
    },

    doesUserHaveAction: (user, action) => {
        if (!user) {
            return false;
        }
        let actions = user.actions;
        if (!actions) {
            actions = module.exports.getActionsForRole(user.RoleID);
        }
        if (!actions) {
            return false;
        }
        return actions.indexOf(action) > -1;
    }

}

const actionmap = {
    /**
     * if actions are mapped like this:
     *  get: 'op_view',
     *  post: 'op_create',
     *  put: 'op_edit',
     *  delete: 'op_delete'
     * 
     *  - where 'op' is the url fragment after api (i.e. for GET: /api/game, the op is 'game') -
     * 
     * You don't need to specify the mapping here, it will automatically map to those actions
     * 
     * So the /api/game route is automatically mapped to the following actions:
     * get: 'game_view',
     * post: 'game_create',
     * put: 'game_edit',
     * delete: 'game_delete'
     * 
     * Anything that doesn't fit this format (or that requires additional checking, can be mapped manually here)
     * 
     * Op can also be specified by using the 'base' property (/api/playerCount maps actions to "metadata_view" etc.)
     * 
     * The default property is used when the specific method is not specified. 
     * 
     * Any method (or default) can be mapped to a function (getting the URL, the method, and the user data)
     * which can manually check for access - it should return true if user has access to the requested route
     */

    // TODO: add name voting route here
    // tagGame: {
    //     get: 'tag_view',
    //     post: 'game_tag_add',
    //     put: 'game_tag_add',
    //     delete: 'game_tag_remove'
    // },
    game: {
        default: function(url, method, user) {
            switch(method) {
                case 'get':
                    return 'game_view';
                    break;
                case 'put':
                    return 'game_edit';
                    break;
                case 'delete':
                    if (url.indexOf('removeTag')) {
                        return 'game_tag_remove';
                    } else {
                        return 'game_delete';
                    }
                    break;
                case 'post':
                    if (url.indexOf('addTag')) {
                        return 'game_tag_add';
                    } else if (url.indexOf('removeTag')) {
                        return 'game_tag_remove';
                    } else if (url.indexOf('createTag')) {
                        return 'tag_create';
                    }
                    break;
            }
        }
    },
    duration: {
        base: 'metadata'
    },
    playerCount: {
        base: 'metadata'
    },
    note: {
        get: 'note_public_view',
        default: function(url, method, user) {
            switch(method) {
                case 'post':
                    // TODO: allow POST for private notes, when those are a thing
                    return 'note_public_create';
                    break;
                case 'put':
                    // TODO: allow PUT on a user's own notes
                    return 'note_public_edit';
                    break;
            }
        }
    },
    user: {
        default: function(url, method, user) {
            let admin;
            switch(method) {
                case "get":
                    admin = 'users_view';
                    break;
                case "put":
                    admin = 'users_edit';
                    break;
                case "delete":
                    admin = 'users_delete';
                    break;
                case "post":
                    if (url.indexOf('user/validate') > -1) {
                        admin = 'users_validate';
                    } else {
                        admin = 'users_create';
                    }
                    break;
                default:
                    admin = "nothing";
                    break;
            }

            // admins can view and edit anybody
            if (module.exports.doesUserHaveAction(user, admin)) {
                return true;
            } else if (url.indexOf('materials') > -1) {
                return url.indexOf('/user/' + user._id) > -1 &&
                        module.exports.doesUserHaveAction(user, 'material_view');
            } else {
                // users can view and edit themselves
                return url.indexOf('/user/' + user._id) > -1 &&
                        module.exports.doesUserHaveAction(user, 'account_edit');
            }
        }
    },
    // TODO: add lock user route here
    // TODO: add video route here
    // TODO: add glossary route here
    // TODO: add blog route here
    // TODO: add messaging routes here
    default: {
        get: '',
        default: function(url, method, user) {
            // by default only allow non GET requests for super admins
            return user.superAdmin;
        }
    }
}

/**
 * Returns the action mapped to the specified URL and method
 */
findActionForUrl = function(url, method) {
    let op = url.replace(/\/api\/([a-z]*)\/?.*/i, '$1'),
        group = actionmap[op],
        action,
        fallback = actionmap.default[method] || actionmap.default.default;

    // /backup requests are restricted to super admins
    if (url.indexOf('/backup') > -1) {
        return function(url, method, user) {
            return user.superAdmin;
        }
    } else 
    // see if an action is specified for the given group and method
    if (group && (group[method] || group.default)) {
        return group[method] || group.default;
    } else {
        // we can try to assume the action from the operation and the method
        actionBase = (group && group.base) ? group.base : op;
        switch(method) {
            case 'get':
                action = 'view';
                break;
            case 'post':
                action = 'create';
                break;
            case 'put':
                action = 'edit';
                break;
            case 'delete':
                action = 'delete';
                break;
        }

        if (action) {
            return actionBase + '_' + action;
        }
    }

    return fallback;
}

function union_arrays (x, y) {
    var obj = {};
    for (var i = x.length-1; i >= 0; -- i) {
        obj[x[i]] = x[i];
    }
    for (var i = y.length-1; i >= 0; -- i) {
        obj[y[i]] = y[i];
    }
    var res = []
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            res.push(obj[k]);
        }
    }
    return res;
}