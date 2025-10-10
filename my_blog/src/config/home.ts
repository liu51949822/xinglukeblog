import type { HomePageConfig } from '@/app/_components/home/type';

export const homeConfig: HomePageConfig = {
    welcome: {
        title: '欢迎学习',
        colorTitle: '3R课程！',
        content: `本站为3R教室《新版TS全栈开发课 - web篇》项目源码的线上示例 \n采用Next.js+Hono+Prisma开发,并运行在vercel与supabase之上! \n \n 本示例的迭代将与课程更新进度保持同步...`,
    },
    video: {
        image: 'url(https://cn-nb1.rains3.com/3rcd/media/1739813698418.png)',
        video: 'https://cn-nb1.rains3.com/3rcd/media/1739846041317.mp4',
    },
    list: {
        first: {
            title: '3R教室',
            data: [
                {
                    href: '#',
                    text: 'TS全栈开发(React/Nextjs+Node.js+CICD/运维)教学',
                },
                { href: '#', text: '远程工作求职指导及职业规划' },
                { href: '#', text: '海外项目谈判技巧与渠道拓展' },
                { href: '#', text: '独立开发者与被动收入实现方案' },
            ],
            button: { href: 'https://3rcd.com/classroom/', text: '购买会员' },
        },
        second: {
            title: '3R工作室',
            data: [
                { href: '#', text: '最专业的远程外包项目开发团队' },
                { href: '#', text: '可做移动/桌面/前端/后端/3D/设计等' },
                { href: '#', text: '丰富的的海外项目开发经验' },
                {
                    href: '#',
                    text: '提供长期维护、升级服务，为您的梦想保驾护航',
                },
            ],
            button: {
                href: 'https://3rcd.com/workroom/',
                text: '立即咨询',
                outline: true,
            },
        },
    },
    typed: [
        'fix' ,
    ],
    timeline: [
        {
            title: '未来',
            content: `当创业或兼职的收入足以覆盖主业时，会放弃主业，全力投入，路虽远，行必至~~~~~`,
        },
    
        {
            title: '至今',
            content: `尝试个人创业（内容保密，成果时零食钱和车辆的油费足够了），同时接一些远程工作兼职，主业也做着`,
        },
        {
            title: '2024.01',
            content: `加入Titan，负责无人驾驶数据接入数据处理工作，同时接触到远程工作的信息，开始尝试兼职远程工作`,
        },
        {
            title: '2023.12',
            content: `部门解散`,
        },
        {
            title: '2022.10',
            content: `加入中科大脑，负责智慧城市研发工作，UAV集群城市监控的项目整体负责，手下有3位外包来的兄弟`,
        },
        {
            title: '2022.09',
            content: `企业业务出现问题，且被其他公司收购拿大礼包`,
        },
        {
            title: '2022.04',
            content: `加入SanBao，负责后端研发`,
        },
        {
            title: '2022.03.22',
            content: `项目交付，奖金拖欠，沟通数次无果，没法向手下兄弟交待（打鸡血疯狂加班），也没法向自己交待`,
        },
        {
            title: '2021.02',
            content: `入职江北某研究所，谨言慎行，3个月后，升职加薪，收入上了20。成了部门老二，老大常年出差，我就大权在握了，手下管着9位牛马兄弟`,
        },
        {
            title: '2021.01',
            content: `开大会时技术层面提问让主持会议的Lead下不来，后续么，穿了不少鞋子。总结下教训，辞职了`,
        },
        {
            title: '2020.11.10',
            content: `入职中通服，钱多事少离家近，工作稳定，美滋滋`,
        },
        { title: '2020.08.01', 
          content: 'feel翅膀硬了，感觉良好，同时收到阿里P6岗位的offer邮件，验证了我的想法，索性当月提交了辞呈回南京发展' },
        {
            title: '2018.07.25',
            content: '入行第一个大项目开始，MES类项目，人机交互生产，目标千人以上的工厂信息化、数字化，后面的项目都是在这个基础上重构或者抽象一些专属工具',
        },
        { title: '2018.04.23', 
          content: '集团组件物联网研发团队，恰巧打小对计算机兴趣浓烈，申请了内部转岗，转职成功' },
        {
            title: '2017.06.20',
            content: '学生生涯结束，因为自动化专业，NX做的一手好图，不出意外的成为了一名机械助理工程师，加入Jack负责画图和首件的生产监测',
        },
    ],
};
