module.exports = {
    locales: {
        '/': {
            lang: 'en-US',
            title: "NetCloth Document",
            description: "Welcome to the NetCloth Docs"
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'NetCloth文档',
            description: 'NetCloth技术文档'
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
            '/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                nav: [
                    {
                        text: 'Introduction',
                        link: '/introduction/',
                    },
                    {
                        text: 'Getting Started',
                        link: '/get-started/',
                    },
                    {
                        text: 'Software',
                        link: '/software/',
                    }
                ],
                sidebar: {
                    '/get-started/': genSidebarConfig ('get-started', 'Getting Started'),
                    '/software/': genSidebarConfig ('software', 'NetCloth daemon')
                }
            },
            '/zh/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                serviceWorker: {
                    updatePopup: {
                        message: "发现新内容可用",
                        buttonText: "刷新"
                    }
                },
                nav: [
                    {
                        text: '简介',
                        link: '/zh/introduction/',
                    },
                    {
                        text: '开始',
                        link: '/zh/get-started/',
                    },
                    {
                        text: '软件',
                        link: '/zh/software/'
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
                collapsable:false,
                children: [
                    '',
                    'validator-node'
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
                    '',
                    'go-install',
                    'how-to-delegate'
                ]
            }
        ];
    }
}
