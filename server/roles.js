const roles = [
    {
        id: 0,
        name: 'none',
        actions: [
            'games_view'
        ]
    },
    {
        id: 1,
        name: "Facilitator",
        inherits: [0],
        actions: [
            'games_filter',
            'dashboard_view',
            'library_view',
            'videos_view',
            'glossary_view',
            'notes_public_view',
            'blog_view',
            'notes_private_create',
            'names_vote',
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
            'notes_public_create',
            'games_create',
            'games_edit',
            'games_delete',
            'metadata_create'
        ]
    }
];

exports.roles = roles;

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

exports.doesUserHaveAction = function (user, action) {
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