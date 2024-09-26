import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  mode: 'hash',
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/fast_login'
    },
    {
      path: '/fast_login',
      component: () => import('../views/login/FastLogin.vue')
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/register',
      component: () => import('../views/login/Register.vue')
    },
    {
      path: '/short',
      component: () => import('../views/ShortVideo.vue')
    },
    {
      path: '/main',
      component: () => import('../views/MainPage.vue'),
      children: [
        {
          path: 'two',
          component: () => import('../views/zone/TwoZones.vue'),
          children: [
            {
              path: 'message_null',
              components: {
                first: () => import('../components/message/MessageBar.vue'),
                second: () => import('../views/block/NoneBlock.vue')
              }
            },
            {
              path: 'message',
              components: {
                first: () => import('../components/message/MessageBar.vue'),
                second: () => import('../views/block/ChatBlock.vue')
              }
            },
            {
              path: 'relationship_null',
              components: {
                first: () => import('../components/relationship/RelationshipBar.vue'),
                second: () => import('../views/block/NoneBlock.vue')
              }
            },
            {
              path: 'relationship',
              components: {
                first: () => import('../components/relationship/RelationshipBar.vue'),
                second: () => import('../views/block/InformationBlock.vue')
              }
            },
          ]
        },
        {
          path: 'one',
          component: () => import('../views/zone/OneZone.vue')
        }
      ]
    }
  ]
})
export default router
