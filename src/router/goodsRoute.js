
const goods = r => require.ensure([], () => r(require('@/components/goods/goods')), 'goods')
const goodsList = r => require.ensure([], () => r(require('@/components/goods/goodsList')), 'goods')
const goodsDetail = r => require.ensure([], () => r(require('@/components/goods/goodsDetail')), 'goods')
const search = r => require.ensure([], () => r(require('@/components/goods/search')), 'goods')

export const goodsRoute={
  path: '/goods',
  components: {
    default: goods
  },
  children: [
    {
      path: '/goods',
      name: 'goodsList',
      components:
      {
        default: goodsList,
      },
      meta: {keepAlive: true}
    },
    {
      path: '/goodsdetail',
      name: 'goodsDetail',
      components:
      {
        default: goodsDetail,
      }
    },
    {
      path: '/search',
      name: 'search',
      components:
      {
        default: search,
      }
    }
  ]
}
