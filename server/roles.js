const   ROLE_FACILITATOR = 1,
        ROLE_SUPER_ADMIN = 19;

const roles = [
    {
        id: 0,
        name: 'none',
        actions: [
            'game_view',
            'name_view',
            'package_view',
            'subscription_create'
        ]
    },
    {
        id: ROLE_FACILITATOR,
        name: "Facilitator",
        inherits: [0],
        actions: [
            'tag_view',

            'metadata_view',

            'game_filter',

            'dashboard_view',
            'materials_view',
            'videos_view',
            'glossary_view',
            'blog_view',

            'subscription_view',

            'note_public_view',
            'note_private_create',

            'name_vote',

            'account_edit',
            'messages',

            'material_view' // downloading material items
        ]
    },
    {
        id: ROLE_SUPER_ADMIN,
        name: "Super Admin",
        inherits: [0,1],
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
];
exports.roles = roles;

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
    tagGame: {
        get: 'tag_view',
        post: 'game_tag_add',
        put: 'game_tag_add',
        delete: 'game_tag_remove'
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
                    return doesUserHaveAction('note_public_create');
                    break;
                case 'put':
                    // TODO: allow PUT on a user's own notes
                    return doesUserHaveAction('note_public_edit');
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
                default:
                    admin = "nothing";
                    break;
            }

            // admins can view and edit anybody
            if (doesUserHaveAction(user, admin)) {
                return true;
            } else {
                // users can view and edit themselves
                return url.indexOf('/user/' + user.UserID) > -1 &&
                        doesUserHaveAction(user, 'account_edit');
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
            return user.RoleID === ROLE_SUPER_ADMIN;
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

exports.canUserHave = function(url, method, user) {
    method = method.toLowerCase();
    let action = findActionForUrl(url, method);

    if (typeof(action) === 'function') {
        console.log('Action for ' + method + ':' + url + ' is a function');
        return action(url, method, user);
    } else if (action) {
        console.log('Action for ' + method + ':' + url + ' is ' + action);
        return doesUserHaveAction(user, action);
    }
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

let getActionsForRole = function(roleId) {
    let actions = [];
    roles.forEach(role => {
        if (role.id === parseInt(roleId, 10)) {
            actions = union_arrays(actions, role.actions);
            if (role.inherits && role.inherits.length) {
                role.inherits.forEach(id => {
                    actions = union_arrays(actions, getActionsForRole(id));
                });
            }
        }
    });
    return actions;
}

exports.getActionsForRole = getActionsForRole;

doesUserHaveAction = function (user, action) {
    if (!user) {
        return false;
    }
    let actions = user.actions;
    if (!actions) {
        actions = getActionsForRole(user.RoleID);
    }
    if (!actions) {
        return false;
    }
    return actions.indexOf(action) > -1;
}
exports.doesUserHaveAction = doesUserHaveAction;