const ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export',
    {
        branch: 'master',
        repo: 'git@github.com-pntbr:brutdethe/shop.git',
        user: {
            name: 'pntbr',
            email: 'stephane.langlois@scopyleft.fr'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)