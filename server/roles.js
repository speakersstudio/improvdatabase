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
            'materials_view',
            'videos_view',
            'glossary_view',
            'notes_view',
            'blog_view',
            'notes_private',
            'names_vote',
            'discussion_view',
            'discussion_public',
            'account_self',
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
            'account_all',
            'account_permissions',
            'notes_public',
            'users_delete',
            'games_create',
            'games_edit',
            'games_delete',
            'metadata_create'
        ]
    }
];

exports.roles = roles;

let getActionsForRole = function(roleId) {
    let actions = [];
    roles.forEach(role => {
        if (role.id === roleId) {
            actions.concat(role.actions);
            actions.inherits.forEach(id => {
                actions.concat(getActionsForRole(id));
            });
        }
    });
    return actions;
}

exports.getActionsForRole = getActionsForRole;