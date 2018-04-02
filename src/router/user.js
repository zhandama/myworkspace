const user = r => require.ensure([], () => r(require('@/components/user/user')), 'user')
const usercenter = r => require.ensure([], () => r(require('@/components/user/usercenter')), 'user')
const setting = r => require.ensure([], () => r(require('@/components/user/setting')), 'user')
const mywallet = r => require.ensure([], () => r(require('@/components/user/mywallet')), 'user')
const sellingManage = r => require.ensure([], () => r(require('@/components/user/sellingManage')), 'user')
const sellingManageList = r => require.ensure([], () => r(require('@/components/user/sellingManageList')), 'user')
const steamurl = r => require.ensure([], () => r(require('@/components/user/steamurl')), 'user')
const help = r => require.ensure([], () => r(require('@/components/user/help')), 'user')
const message = r => require.ensure([], () => r(require('@/components/user/message')), 'user')
const messagedetail = r => require.ensure([], () => r(require('@/components/user/messageDetail')), 'user')
const sellinglog = r => require.ensure([], () => r(require('@/components/user/sellinglog')), 'user')
const buylog = r => require.ensure([], () => r(require('@/components/user/buylog')), 'user')

export const userRoute={
  path: '/user',
  components: {
    default: user
  },
  children: [
    {
      path: '/user',
      name: 'user',
      components:
      {
        default: usercenter
      }
    },
    {
      path: '/setting',
      name: 'setting',
      components:
      {
        default: setting
      }
    },
    {
      path: '/mywallet',
      name: 'mywallet',
      components:
      {
        default: mywallet
      }
    },
    {
      path: '/sellingManage',
      name: 'sellingManage',
      components:
      {
        default: sellingManage
      }
    },
    {
      path: '/sellingManageList',
      name: 'sellingManageList',
      components:
      {
        default: sellingManageList,
      }
    },
    {
      path: '/steamurl',
      name: 'steamurl',
      components:
      {
        default: steamurl
      }
    },
    {
      path: '/help',
      name: 'help',
      components:
      {
        default: help
      }
    },
    {
      path: '/message',
      name: 'message',
      components:
      {
        default: message
      }
    },
    {
      path: '/message/:id',
      name: 'messagedetail',
      components:
      {
        default: messagedetail
      }
    },
    {
      path: '/sellinglog',
      name: 'sellinglog',
      components:
      {
        default: sellinglog
      }
    },
    {
      path: '/buylog',
      name: 'buylog',
      components:
      {
        default: buylog
      }
    }
  ],
  meta: {requireAuth: true}
}
