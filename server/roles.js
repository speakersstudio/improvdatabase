const roles = [
    {
        id: 0,
        name: 'none',
        actions: [
            'game_view'
        ]
    },
    {
        id: 1,
        name: "Facilitator",
        inherits: [0],
        actions: [
            'game_filter',
            'dashboard_view',
            'library_view',
            'videos_view',
            'glossary_view',
            'note_public_view',
            'blog_view',
            'note_private_create',
            'name_vote',
            'account_edit',
            'messages'
        ]
    },
    {
        id: 19,
        name: "Super Admin",
        inherits: [0,1],
        actions: [
            'users_view',
            'users_lock',
            'users_edit',
            'users_delete',
            'note_public_create',
            'game_create',
            'game_edit',
            'game_delete',
            'game_tag_add',
            'game_tag_remove',
            'name_edit',
            'name_delete',
            'metadata_create',
            'name_create',
        ]
    }
];
exports.roles = roles;

const actionmap = {
    game: {
        get: 'game_view',
        post: 'game_create',
        put: 'game_edit',
        delete: 'game_delete'
    },
    name: {
        get: 'game_view',
        post: 'name_create',
        put: 'name_edit',
        delete: 'name_delete'
    },
    note: {
        get: 'note_public_view'
    },
    user: {
        all: function(url, method, user) {
            let admin;
            switch(method) {
                case "GET":
                    admin = 'users_view';
                    break;
            }
            if (doesUserHaveAction(admin)) {
                return true;
            } else {
                return url.indexOf('/user/' + user.UserID) > -1;
            }
        }
    }
}

exports.findActionForUrl = function(url, method) {
    let op = url.replace(/\/api\/([a-z]*)\/?.*/i, '$1'),
        group = actionmap[op],
        action;

    if (group && (group[method.toLowerCase()] || group.all)) {
        return group[method.toLowerCase()] || group.all;
    } else {
        return '';
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
    console.log(actions, action, actions.indexOf(action));
    return actions.indexOf(action) > -1;
}
exports.doesUserHaveAction = doesUserHaveAction;