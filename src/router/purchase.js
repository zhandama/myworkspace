
const purchase = r => require.ensure([], () => r(require('@/components/user/purchase')), 'user')
const onPurchase = r => require.ensure([], () => r(require('@/components/user/purchaseComponents/onPurchase')), 'user')
const purchaseLog = r => require.ensure([], () => r(require('@/components/user/purchaseComponents/purchaseLog')), 'user')
const pubulishPurchase = r => require.ensure([], () => r(require('@/components/user/purchaseComponents/pubulishPurchase')), 'user')
export const purchaseRoute={
  path: '/purchase',
  components: {
    default: purchase
  },
  children: [
    {
      path: '/purchase/onPurchase',
      name: 'onPurchase',
      components:
      {
        default: onPurchase
      }
    },
    {
      path: '/purchase/purchaseLog',
      name: 'purchaseLog',
      components:
      {
        default: purchaseLog
      }
    },
    {
      path: '/purchase/pubulishPurchase',
      name: 'pubulishPurchase',
      components:
      {
        default: pubulishPurchase
      }
    },
  ],
  meta: {requireAuth: true}
}