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
                nav: [{
                    text: 'NetCloth Website',
                    link: 'https://www.netcloth.org'
                }],
                sidebar: [
                    {
                        title: 'Getting Started',
                        collapsable: false, // 可选的, 默认值是 true,
                        sidebarDepth: 3,    // 可选的, 默认值是 1
                        children: [
                            '/software/how-to-install',
                            '/get-started/how-to-join-testnet',
                            '/get-started/testcoin',
                            '/get-started/how-to-become-validator',
                            '/get-started/how-to-delegate'
                        ]
                    },
                    {
                        title: 'Software',
                        children: [
                            '/software/go-install',
                            '/software/nchcli',
                            '/software/monitor'
                        ]
                    },
                    {
                        title: 'API',
                        children: [
                            '/advanced/api',
                            '/advanced/node-rpc',
                        ]
                    },
                    {
                        title: 'IM',
                        children: [
                            "/im/im-prerequisite",
                            "/im/quick-start",
                            "/im/deploy-from-source",
                            '/im/Q&A'
                        ]
                    },
                    {
                        title: 'IPAL',
                        children: [
                            "/advanced/ipal",
                            "/advanced/ipal-sdk",
                            "/advanced/ipal-service-type"
                        ]
                    },
                    {
                        title: 'Smart Contract',
                        children: [
                            '/contracts/contract',
                            '/contracts/contract-repertory'
                        ]
                    },
                    {
                        title: 'Advanced',
                        children: [
                            '/advanced/ipal',
                            '/advanced/ipal-sdk',
                            '/advanced/multisig',
                            '/advanced/keys',
                            '/advanced/how-to-create-proposal',
                            '/advanced/transaction',
                            '/advanced/messages',
                            '/advanced/fee-payment',
                        ]
                    },
                    {
                        title: 'Q&A',
                        sidebarDepth: 1,
                        children: [
                            '/advanced/Q&A',
                            '/im/Q&A',
                        ]
                    }
                ]
            },
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '完善此文档',
                lastUpdated: '上次更新',
                serviceWorker: {
                },
                nav: [{
                    text: 'NetCloth 官网',
                    link: 'https://www.netcloth.org'
                }],
                sidebar: [
                    {
                        title: '开始',
                        collapsable: false, // 可选的, 默认值是 true,
                        sidebarDepth: 3,    // 可选的, 默认值是 1
                        children: [
                            '/software/how-to-install',
                            '/get-started/how-to-join-testnet',
                            '/get-started/testcoin',
                            '/get-started/how-to-become-validator',
                            '/get-started/how-to-delegate'
                        ]
                    },
                    {
                        title: '软件',
                        children: [
                            '/software/go-install',
                            '/software/nchcli',
                            '/software/monitor'
                        ]
                    },
                    {
                        title: 'API',
                        children: [
                            '/advanced/api',
                            '/advanced/node-rpc',
                        ]
                    },
                    {
                        title: 'IM',
                        children: [
                            "/im/im-prerequisite",
                            "/im/quick-start",
                            "/im/deploy-from-source",
                            '/im/Q&A'
                        ]
                    },
                    {
                        title: 'IPAL',
                        children: [
                            "/advanced/ipal",
                            "/advanced/ipal-sdk",
                            "/advanced/ipal-service-type"
                        ]
                    },
                    {
                        title: '智能合约',
                        children: [
                            '/contracts/contract',
                            '/contracts/contract-repertory'
                        ]
                    },
                    {
                        title: '高级教程',
                        children: [
                            '/advanced/ipal',
                            '/advanced/ipal-sdk',
                            '/advanced/multisig',
                            '/advanced/keys',
                            '/advanced/how-to-create-proposal',
                            '/advanced/transaction',
                            '/advanced/messages',
                            '/advanced/fee-payment',
                        ]
                    },
                    {
                        title: '常见问题',
                        sidebarDepth: 1,
                        children: [
                            '/advanced/Q&A',
                            '/im/Q&A',
                        ]
                    }
                ]
            }
        }
    }
};