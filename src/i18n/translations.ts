export type Language = 'en' | 'zh';

export type TranslationTree = {
    [key: string]: string | TranslationTree;
};

export const translations: Record<Language, TranslationTree> = {
    en: {
        common: {
            languageName: 'English',
            switchLanguage: '中文',
        },
        toolbar: {
            start: 'Start',
            shutdown: 'Shut down...',
        },
        desktop: {
            apps: {
                showcase: 'My Showcase',
                trail: 'The Oregon Trail',
                doom: 'Doom',
                scrabble: 'Scrabble',
                vinordle: 'Vinordle',
            },
            poweredBy: 'Powered by JSDOS & DOSBox',
        },
        vinordle: {
            title: 'Vinordle',
            description: 'A word puzzle with a VINCE twist.',
            win: 'You win!',
            gameOver: 'Game Over',
            thanks: 'Thanks for playing! Remember: the word is always "VINCE"!',
            restart: 'Restart Game',
            enter: 'Enter',
            delete: 'Delete',
        },
        showcase: {
            windowTitle: 'Vincent Fang',
            copyright: '© Copyright 2026 Vincent Fang',
            nav: {
                showcase: "Showcase '26",
                home: 'HOME',
                about: 'ABOUT',
                experience: 'EXPERIENCE',
                projects: 'PROJECTS',
                software: 'SOFTWARE',
                music: 'MUSIC',
                contact: 'CONTACT',
            },
            home: {
                subtitle: 'Music AI Travel',
                about: 'ABOUT',
                experience: 'EXPERIENCE',
                projects: 'PROJECTS',
                contact: 'CONTACT',
            },
            resume: {
                prompt: 'Looking for my resume?',
                download: 'Click to download my resume',
            },
            about: {
                welcome: 'Welcome',
                greeting: "I'm Vincent Fang",
                hustler:
                    "Hello, I'm Vincent Fang. I love experimenting with AI agents, exploring business models, and connecting talented people.",
                role: "I'm an undergraduate majoring in Communication Engineering at the University of Science and Technology Beijing (USTB), where I enrolled in 2024. I'm currently interning at ZhenFund and running a brand called Talentry. If you have any questions or comments, feel free to reach out by email at",
                goldPotTitle: 'First Pot of Gold',
                goldPot1:
                    'Ever since I was a child, I have been curious about things outside the "rules". After the 2024 gaokao, when my family turned down my plan to travel to Tibet, I started looking for ways to earn money. Taking inspiration from New Oriental\'s education business model, I earned my first six-figure sum in half a month.',
                aiCodeTitle: 'About AI',
                aiCode1:
                    "In my second year of high school, when I was feeling disengaged from school, I often went online looking for new and interesting things. That was how I stumbled upon GPT and began exploring AI. At university, I explored on my own: building software, reading papers... I also did research alongside a group of outstanding peers. Over time, though, I realized that my comparative strength was not in connecting with machines, but in talking with people.",
                lookingForwardTitle: 'Future',
                lookingForward:
                    'I will never stop hustling and exploring. In the process of seeking PMF (product-market fit), I am also striving to find my personal pmf (people-mission fit). I am currently exploring this path, which is exactly the original intention behind building Talentry: to help everyone grow rapidly, and in doing so, to help myself.',
                lifePlansTitle: 'Life Plans',
                lifePlanTibet: 'A solo trip to Tibet',
                lifePlanIceland: 'A road trip through Iceland, "the end of the world", before turning 25',
                lifePlansContinued: 'To be continued...',
            },
            experience: {
                internshipTitle: 'ZhenFund Internship',
                internshipRole: 'Talent intern',
                internshipDate: 'Jul 2026 - Present',
                pageTitle: 'Talentry',
                talentryRole: 'founder',
                talentryDate: 'Mar 2026 - Present',
                talentryPoint1:
                    'I mainly organize private gatherings for friends, and have also tried new things together with Google and ByteDance.',
                talentryPoint2:
                    'I have a genuine passion for helping others and strive to become a super connector.',
                firstVentureTitle: 'First Pot of Gold',
                firstVentureRole: 'Founder & Operator',
                firstVentureDate: 'Summer 2024',
                firstVenturePoint:
                    'After the 2024 gaokao, I looked for ways to fund a trip to Tibet. Taking inspiration from the New Oriental tutoring model, I earned my first six figures in RMB in half a month.',

                technicalTitle: 'Technical Exploration',
                technicalSubtitle: 'LLM Research & Frontier Exploration',
                technicalDate: 'Jun 2025 - Aug 2025',
                technicalPoint:
                    'Worked with Jingyang from DeepSeek on LLM and Agent research.',
                hackathonTitle: 'Hackathon Track Record',
                hackathon1:
                    '1st Place: Origin Community Party Nights Hackathon.',
                hackathon2:
                    '2nd Place: Tsinghua University Attrax Hackathon.',
                hackathon3: '2nd Place: AdventureX25 Hackathon.',
                hackerTitle: 'Some Geek Things',
                hackerPoint1:
                    "While participating in Attrax, I reverse-engineered USTB's SSO gateway to enable student-verified login, and obtained authentication information for all students at the university.",
                hackerNetworkPoint:
                    "Built a one-click deployment tool that bypasses IPv4 and connects directly over IPv6 for unmetered campus internet access. A few close friends use it for now; I'm wary of disciplinary trouble if it spreads too widely 🫠",
                hackerPoint2:
                    'Created an official-looking Five Yuan Capital email address and successfully "hacked" my way into every MiraclePlus (YC China) demo day.',
            },
            projects: {
                pageTitle: 'Projects',
                pageSubtitle: '& Hobbies',
                pageIntro:
                    "Click on one of the areas below to check out some of my favorite projects I've done in that field.",
                softwareTitle: 'Software',
                softwareSubtitle: 'PROJECTS',
                musicTitle: 'Music',
                musicSubtitle: 'VENTURES',
                softwarePageTitle: 'Software',
                softwarePageSubtitle: 'Projects',
                softwarePageIntro: 'No signature work yet (does this website count?).',
                softwareThoughts:
                    'I like thinking about how to embed AI into workflows, with the goal of making them completely hands-free.',
            },
            music: {
                pageTitle: 'Music Odyssey',
                pageSubtitle: 'SYSTEM.AUDIO',
                listening: 'I love listening to folk music, in both Chinese and English.',
                piano:
                    "When I was little, I wasn't into classical piano and only wanted to play pop songs. Now that I'm older, I've grown to enjoy playing classical music.",
            },
            contact: {
                title: 'Contact',
                intro:
                    'If you want to connect, feel free to reach out. You can email me directly, or leave a message below.',
                directEmailLabel: 'Email:',
                nameLabel: 'Your name:',
                namePlaceholder: 'Name',
                emailLabel: 'Email:',
                emailPlaceholder: 'Email',
                companyLabel: 'Company (optional):',
                companyPlaceholder: 'Company',
                messageLabel: 'Message:',
                messagePlaceholder: 'Message',
                send: 'Send Message',
                sending: 'Sending…',
                required: '= required',
                success: 'Message sent. Thank you, {name}!',
                error: 'Unable to send your message. Please try again later.',
                resumePrompt: 'Need a copy of my Resume?',
            },
        },
    },
    zh: {
        common: {
            languageName: '中文',
            switchLanguage: 'English',
        },
        toolbar: {
            start: '开始',
            shutdown: '关机...',
        },
        desktop: {
            apps: {
                showcase: '我的作品集',
                trail: '俄勒冈之旅',
                doom: '毁灭战士',
                scrabble: '拼字游戏',
                vinordle: 'Vinordle',
            },
            poweredBy: '由 JSDOS 与 DOSBox 驱动',
        },
        vinordle: {
            title: 'Vinordle',
            description: '带有 VINCE 彩蛋的文字猜谜。',
            win: '你赢了！',
            gameOver: '游戏结束',
            thanks: '感谢体验！记住：答案永远是“VINCE”！',
            restart: '重新开始',
            enter: '回车',
            delete: '删除',
        },
        showcase: {
            windowTitle: '方正',
            copyright: '© 版权所有 2026 方正',
            nav: {
                showcase: '作品集 26',
                home: '首页',
                about: '关于',
                experience: '经历',
                projects: '项目',
                software: '软件',
                music: '音乐',
                contact: '联系',
            },
            home: {
                subtitle: '音乐 AI 旅行',
                about: '关于',
                experience: '经历',
                projects: '项目',
                contact: '联系',
            },
            resume: {
                prompt: '想看我的简历吗？',
                download: '点击下载简历',
            },
            about: {
                welcome: '欢迎',
                greeting: '我是 Vincent Fang',
                hustler:
                    '你好，我是 Vincent Fang。我热爱折腾 AI Agent、商业模式与人才链接。',
                role: '我是北京科技大学 2024 级通信工程专业的本科生，目前在真格基金实习，同时运营着品牌 Talentry。如有任何问题或建议，欢迎通过邮件联系我：',
                goldPotTitle: '第一桶金',
                goldPot1:
                    '从小开始，我就对“规则”之外的事物充满好奇。2024 年高考结束，当我被家里拒绝前往西藏的旅行计划后，我开始寻找赚钱门道。于是从“新东方”模式入手，在半个月时间内赚到了人生第一个六位数。',
                aiCodeTitle: '关于AI',
                aiCode1:
                    '高二厌学的时候，经常上网找各种新鲜玩意儿，偶然间接触到 GPT，于是结缘。进入大学后自己探索：做开发、读 paper……也跟随一群优秀的 peers 做过 research。但我逐渐意识到，与其他人相比，我的长板并不是与机器产生共鸣，而是体现在与人交谈中。',
                lookingForwardTitle: '未来',
                lookingForward:
                    '我不会停止折腾与探索，在寻找PMF(product-market fit)的过程中，我希望找到我的pmf(people-mission fit)，我正在探索，这也是我做Talentry的初衷——帮助大家快速成长，也帮助我。',
                lifePlansTitle: '人生计划',
                lifePlanTibet: '个人西藏旅行',
                lifePlanIceland: '25岁前在“世界的尽头”冰岛自驾',
                lifePlansContinued: '待续...',
            },
            experience: {
                internshipTitle: '真格基金实习',
                internshipRole: 'Talent intern',
                internshipDate: '2026.07 - 至今',
                pageTitle: 'Talentry',
                talentryRole: 'founder',
                talentryDate: '2026.03 - 至今',
                talentryPoint1:
                    '主要做一些朋友的闭门聚会，和 Google、字节也一起做过新鲜尝试。',
                talentryPoint2:
                    '对帮助他人有本真的热情，努力成为一个 super connector。',
                firstVentureTitle: '第一桶金',
                firstVentureRole: '操盘手',
                firstVentureDate: '2024高考后',
                firstVenturePoint:
                    '2024 年高考后，为了攒钱去西藏旅行，我从“新东方”模式入手，在半个月内赚到了人生第一个六位数。',

                technicalTitle: '技术探索',
                technicalSubtitle: '大模型科研与前沿探索',
                technicalDate: '2025.06 - 2025.08',
                technicalPoint:
                    '跟随 DeepSeek Jingyang 参与 LLM、Agent 的 research。',
                hackathonTitle: '黑客松战绩',
                hackathon1:
                    '获原点社区 Party Nights 黑客松冠军。',
                hackathon2: '获清华大学 Attrax 二等奖。',
                hackathon3: '获 AdventureX25 二等奖。',
                hackerTitle: '一些geek行为',
                hackerPoint1:
                    '在参与 Attrax 过程中，为实现学生认证登录，逆向了北科的 SSO 网关，同时拿到了全校同学的认证信息。',
                hackerNetworkPoint:
                    '做了个校园网绕过 IPv4 直连 IPv6 的一键部署工具，实现校园网免流，目前给好朋友用着，大范围传播怕挨处分🫠',
                hackerPoint2:
                    '制作五源资本官方邮箱，成功“Hack”进每一期奇绩的 demo day 内部现场。',
            },
            projects: {
                pageTitle: '项目',
                pageSubtitle: '& 爱好',
                pageIntro:
                    '点击下面的任一领域，查看我在该领域完成的一些喜欢的项目。',
                softwareTitle: '软件',
                softwareSubtitle: '项目',
                musicTitle: '音乐',
                musicSubtitle: '创业',
                softwarePageTitle: '软件',
                softwarePageSubtitle: '项目',
                softwarePageIntro: '还没代表作（这个网站算吗）',
                softwareThoughts:
                    '喜欢思考如何把 AI 嵌入工作流中，目标是完全解放双手。',
            },
            music: {
                pageTitle: '音乐旅程',
                pageSubtitle: 'SYSTEM.AUDIO',
                listening: '爱听民谣，中英都爱。',
                piano:
                    '对于钢琴，小时候不喜欢古典，只想弹流行；现在年纪大了，又喜欢弹古典。',
            },
            contact: {
                title: '联系我',
                intro:
                    '如果你想和我聊聊，欢迎直接发邮件，或在下方留言。',
                directEmailLabel: '邮箱：',
                nameLabel: '您的姓名：',
                namePlaceholder: '姓名',
                emailLabel: '邮箱：',
                emailPlaceholder: '邮箱',
                companyLabel: '公司（选填）：',
                companyPlaceholder: '公司',
                messageLabel: '留言：',
                messagePlaceholder: '留言',
                send: '发送留言',
                sending: '发送中…',
                required: '＝ 必填',
                success: '留言已发送，谢谢你，{name}！',
                error: '发送失败，请稍后重试。',
                resumePrompt: '需要一份我的简历吗？',
            },
        },
    },
};
