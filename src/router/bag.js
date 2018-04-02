const bag = r => require.ensure([], () => r(require('@/components/bag/bag')), 'bag')
const mybag = r => require.ensure([], () => r(require('@/components/bag/mybag')), 'bag')
const steambag = r => require.ensure([], () => r(require('@/components/bag/steambag')), 'bag')
const recordbag = r => require.ensure([], () => r(require('@/components/bag/recordbag')), 'bag')
export const bagRoute={
  path: '/bag',
  components: {
    default: bag
  },
  children: [
    {
      path: '/bag',
      name: 'bag',
      components:
      {
        default: mybag,
      }
    },
    {
      path: '/bag/steambag',
      name: 'steambag',
      components:
      {
        default: steambag,
      }
    },
    {
      path: '/bag/recordbag',
      name: 'recordbag',
      components:
      {
        default: recordbag,
      }
    }
  ],
  meta: {requireAuth: true}
}
