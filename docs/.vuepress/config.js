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
                sidebar: [
                    {
                        title: 'Getting Started',
                        path: '/en/get-started/',   
                        collapsable: false, // 可选的, 默认值是 true,
                        // sidebarDepth: 1,    // 可选的, 默认值是 1
                        children: [
                            '/en/get-started/how-to-join-testnet',
                            '/en/get-started/generate-genesis-file',
                            '/en/get-started/how-to-become-validator',
                            '/en/get-started/how-to-delegate'
                        ]
                    },
                    {
                        title: 'Software',
                        path: '/en/software/',   
                        collapsable: false, // 可选的, 默认值是 true,
                        // sidebarDepth: 1,    // 可选的, 默认值是 1
                        children: [
                            '/en/software/go-install',
                            '/en/software/how-to-install',
                            '/en/software/nchcli',
                            '/en/software/monitor'
                        ]
                    },
                    {
                        title: 'im',
                        path: '/en/im/',   
                        // collapsable: false, // 可选的, 默认值是 true,
                        // sidebarDepth: 1,    // 可选的, 默认值是 1
                        children: [
                            "/en/im/im-prerequisite",
                            "/en/im/quick-start",
                            "/en/im/deploy-from-source",
                            '/en/im/Q&A'
                        ]
                    },
                    {
                        title: 'Smart Contracts',
                        path: '/en/contracts/',   
                        // collapsable: false, // 可选的, 默认值是 true,
                        // sidebarDepth: 1,    // 可选的, 默认值是 1
                        children: [
                            '/en/contracts/contract',
                            '/en/contracts/contract-repertory'
                        ]
                    },
                    {
                        title: 'Advanced',
                        path: '/en/advanced/',   
                        // collapsable: false, // 可选的, 默认值是 true,
                        // sidebarDepth: 1,    // 可选的, 默认值是 1
                        children: [
                            '/en/advanced/api',
                            '/en/advanced/node-rpc',
                            '/en/advanced/ipal',
                            '/en/advanced/ipal-sdk',
                            '/en/advanced/multisig',
                            '/en/advanced/keys',
                            '/en/advanced/how-to-create-proposal',
                            '/en/advanced/transaction',
                            '/en/advanced/messages',
                            '/en/advanced/fee-payment',
                            '/en/advanced/Q&A'
                        ]
                    },
                ]
            },
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '完善此文档',
                lastUpdated: '上次更新',
                serviceWorker: {
                },
                sidebar: [
                    {
                        title: '开始',
                        path: '/get-started/',   
                        collapsable: false, // 可选的, 默认值是 true,
                        // sidebarDepth: 1,    // 可选的, 默认值是 1
                        children: [
                            '/get-started/how-to-join-testnet',
                            '/get-started/generate-genesis-file',
                            '/get-started/how-to-become-validator',
                            '/get-started/how-to-delegate'
                        ]
                    },
                    {
                        title: '软件',
                        path: '/software/',   
                        collapsable: false, // 可选的, 默认值是 true,
                        // sidebarDepth: 1,    // 可选的, 默认值是 1
                        children: [
                            '/software/go-install',
                            '/software/how-to-install',
                            '/software/nchcli',
                            '/software/monitor'
                        ]
                    },
                    {
                        title: 'IM',
                        path: '/im/',   
                        // collapsable: false, // 可选的, 默认值是 true,
                        // sidebarDepth: 1,    // 可选的, 默认值是 1
                        children: [
                            "/im/im-prerequisite",
                            "/im/quick-start",
                            "/im/deploy-from-source",
                            '/im/Q&A'
                        ]
                    },
                    {
                        title: '智能合约',
                        path: '/contracts/',   
                        // collapsable: false, // 可选的, 默认值是 true,
                        // sidebarDepth: 1,    // 可选的, 默认值是 1
                        children: [
                            '/contracts/contract',
                            '/contracts/contract-repertory'
                        ]
                    },
                    {
                        title: '高级教程',
                        path: '/advanced/',   
                        // collapsable: false, // 可选的, 默认值是 true,
                        // sidebarDepth: 1,    // 可选的, 默认值是 1
                        children: [
                            '/advanced/api',
                            '/advanced/node-rpc',
                            '/advanced/ipal',
                            '/advanced/ipal-sdk',
                            '/advanced/multisig',
                            '/advanced/keys',
                            '/advanced/how-to-create-proposal',
                            '/advanced/transaction',
                            '/advanced/messages',
                            '/advanced/fee-payment',
                            '/advanced/Q&A'
                        ]
                    },
                ]
            }
        }
    }
};