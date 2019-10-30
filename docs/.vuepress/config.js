module.exports = {
    locales: {
        '/en/': {
            lang: 'en-US',
            title: "NetCloth Document",
            description: "A Blockchain Application Network Based On Privacy Protection and Data Security\n"
        },
        '/': {
            lang: 'zh-CN',
            title: 'NetCloth文档',
            description: 'NetCloth是一个基于隐私保护和数据安全的区块链应用网络'
        }
    },
    head: [
        ['link', {rel: 'icon', href: `/logo.png`}],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'theme-color', content: '#21a4e7'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['link', {rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png`}]
    ],
    serviceWorker: true,
    themeConfig: {
        repo: 'NetCloth/docs',
        sidebarDepth: 5,
        editLinks: true,
        docsDir: 'docs',
        locales: {
            '/en/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit on GitHub',
                lastUpdated: 'Last Updated',
                serviceWorker: {
                },
                nav: [
                    {
                        text: 'Introduction',
                        link: '/en/introduction/',
                    },
                    {
                        text: 'Getting Started',
                        link: '/en/get-started/',
                    },
                    {
                        text: 'Software',
                        link: '/software/how-to-install'
                    },
                    {
                        text: 'Advanced',
                        link: '/en/advanced/',
                    }
                ],
                sidebar: {
                    '/en/get-started/': genSidebarConfig ('get-started', 'Getting Started'),
                    '/en/software/': genSidebarConfig ('software', 'NetCloth daemon')
                }
            },
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '编辑此页',
                lastUpdated: '上次更新',
                serviceWorker: {
                },
                nav: [
                    {
                        text: '简介',
                        link: '/introduction/',
                    },
                    {
                        text: '开始',
                        link: '/get-started/',
                    },
                    {
                        text: '软件',
                        link: '/software/how-to-install'
                    },
                    {
                        text: '高级教程',
                        link: '/advanced/'
                    }
                ],
                sidebar: {
                    '/get-started/': genSidebarConfig ('get-started', '快速开始'),
                    '/software/': genSidebarConfig ('software', '软件')
                }
            }
        }
    }
};

function genSidebarConfig (module, title) {
    if (module == 'get-started') {
        return [
            {
                title,
                collapsable: false,
                children: [
                    '',
                    'how-to-join-alphanet',
                    'how-to-become-validator',
                    'how-to-delegate',
                    'how-to-create-proposal'
                ]
            }
        ]
    }

    if (module === 'software') {
        return [
            {
                title,
                collapsable: false,
                children: [
                    'go-install',
                    'how-to-install'
                ]
            }
        ];
    }
}
