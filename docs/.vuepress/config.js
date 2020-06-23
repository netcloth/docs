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
                            '/en/software/how-to-install',
                            '/en/get-started/how-to-join-testnet',
                            '/en/get-started/testcoin'
                           
                        ]
                    },
                    {
                        title: 'Client Instructions',
                        children: [
                            '/en/software/go-install',
                            '/en/software/nchcli',
                            '/en/software/monitor'
                        ]
                    },
                    {
                        title: 'Validator',
                        children: [
                            '/en/get-started/how-to-become-validator',
                            '/en/get-started/how-to-delegate'
                        ]
                    },
                    {
                        title: 'API',
                        children: [
                            '/en/advanced/api',
                            '/en/advanced/node-rpc'
                        ]
                    },
                    {
                        title: 'Personal Network IM service deployment',
                        children: [
                            "/en/im/im-prerequisite",
                            "/en/im/quick-start",
                            "/en/im/deploy-from-source",
                            '/en/im/Q&A'
                        ]
                    },
                    {
                        title: 'Personal Network Mini APPs Portal',
                        children: [
                            '/en/advanced/how-to-config-app-portal'
                        ]
                    },
                    {
                        title: 'IPAL Modules',
                        children: [
                            "/en/ipal/ipal",
                            "/en/ipal/ipal-sdk",
                            "/en/ipal/ipal-service-type"
                        ]
                    },
                    {
                        title: 'Smart Contract',
                        children: [
                            '/en/contracts/contract',
                            '/en/contracts/contract-repertory'
                        ]
                    },
                    {
                        title: 'Advanced',
                        children: [
                            '/en/advanced/multisig',
                            '/en/advanced/nips',
                            '/en/advanced/keys',
                            '/en/advanced/how-to-create-proposal',
                            '/en/advanced/transaction',
                            '/en/advanced/messages',
                            '/en/advanced/fee-payment'
                        ]
                    },
                    {
                        title: 'Q&A',
                        sidebarDepth: 1,
                        children: [
                            '/en/Q&A',
                            '/en/im/Q&A'
                        ]
                    },
                    {
                        title: 'Links',
                        path: '/link',
                        sidebarDepth: 1,
                        // children: [
                        // ]
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
                        title: '安装&加入网络',
                        collapsable: false, // 可选的, 默认值是 true,
                        sidebarDepth: 3,    // 可选的, 默认值是 1
                        children: [
                            '/software/how-to-install',
                            '/get-started/how-to-join-testnet',
                            '/get-started/testcoin'
                        ]
                    },
                    {
                        title: '客户端说明',
                        children: [
                            '/software/go-install',
                            '/software/nchcli',
                            '/software/monitor'
                        ]
                    },
                    {
                        title: '功能模块',
                        children: [
                            '/modules/upgrade',
                        ]
                    },
                    {
                        title: '验证人',
                        children: [
                            '/get-started/how-to-become-validator',
                            '/get-started/how-to-delegate'
                        ]
                    },
                    {
                        title: 'API',
                        children: [
                            '/advanced/api',
                            '/advanced/node-rpc'
                        ]
                    },
                    {
                        title: '个人网络海星节点-IM服务端配置',
                        children: [
                            "/im/im-prerequisite",
                            "/im/quick-start",
                            "/im/deploy-from-source",
                            '/im/Q&A'
                        ]
                    },
                    {
                        title: '个人网络海星节点-小应用区配置',
                        children: [
                            "/advanced/how-to-config-app-portal"
                        ]
                    },
                    {
                        title: 'IPAL模块',
                        children: [
                            "/ipal/ipal",
                            "/ipal/ipal-sdk",
                            "/ipal/ipal-service-type"
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
                            '/advanced/vesting',
                            '/advanced/multisig',
                            '/advanced/nips',
                            '/advanced/keys',
                            '/advanced/how-to-create-proposal',
                            '/advanced/transaction',
                            '/advanced/messages',
                            '/advanced/fee-payment'
                        ]
                    },
                    {
                        title: '常见问题',
                        sidebarDepth: 1,
                        children: [
                            '/Q&A',
                            '/im/Q&A'
                        ]
                    },
                    {
                        title: '相关链接',
                        path: '/link',
                        sidebarDepth: 1,
                        // children: [
                        // ]
                    }
                ]
            }
        }
    }
};
