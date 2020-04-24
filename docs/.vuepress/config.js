module.exports = {
    locales: {
        '/en/': {
            lang: 'en-US',
            title: "NetCloth Document",
            description: "Make You and Your Personal Network Unique\n"
        },
        '/': {
            lang: 'zh-CN',
            title: 'NetCloth文档',
            description: '独特的你和你的个人网络\n'
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
                        link: '/en/software/how-to-install'
                    },
                    {
                        text: 'Applications',
                        link: '/en/applications/'
                    },
                    {
                        text: 'Advanced',
                        link: '/en/advanced/',
                    }
                ],
                sidebar: {
                    '/en/get-started/': genSidebarConfig ('get-started', 'Getting Started'),
                    '/en/software/': genSidebarConfig ('software', 'Software'),
                    '/en/applications/': genSidebarConfig ('applications', 'Applications'),
                    '/en/im/': genSidebarConfig ('im', 'IM Server Deploy'),
                    '/en/advanced/': genSidebarConfig('advanced', 'Advanced')
                }
            },
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '完善此文档',
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
                        text: '应用',
                        link: '/applications/'
                    },
                    {
                        text: '高级教程',
                        link: '/advanced/'
                    }
                ],
                sidebar: {
                    '/get-started/': genSidebarConfig ('get-started', '快速开始'),
                    '/software/': genSidebarConfig ('software', '软件'),
                    '/applications/': genSidebarConfig ('applications', '应用'),
                    '/im/': genSidebarConfig ('im', '即时通讯服务器部署'),
                    '/advanced/': genSidebarConfig('advanced', '高级教程')
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
                    'generate-genesis-file',
                    'how-to-join-testnet',
                    'how-to-become-validator',
                    'how-to-delegate'
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
                    'how-to-install',
                    'nchcli',
                    'monitor'
                ]
            }
        ];
    }

    if (module === 'advanced') {
        return [
            {
                title,
                collapsable: false,
                children: [
                    'api',
                    'node-rpc',
                    'ipal',
                    'ipal-sdk',
                    'multisig',
                    'keys',
                    'how-to-create-proposal',
                    'transaction',
                    'messages',
                    'fee-payment',
                    'contract',
                    'contract-repertory',
                    'Q&A'
                ]
            }
        ];
    }

    if (module === 'im') {
        return [
            {
                title,
                collapsable: false,
                children: [
                    "im-prerequisite",
                    "quick-start",
                    "deploy-from-source",
                    'Q&A'
                ]
            }
        ];
    }
}
