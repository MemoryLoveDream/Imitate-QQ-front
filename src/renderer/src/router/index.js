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
      path: '/test',
      component: () => import('../components/Test.vue')
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
      path: '/video_call/:c1/:c2',
      component: () => import('../views/VideoCall.vue')
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
                first: () => import('../views/bar/MessageBar.vue'),
                second: () => import('../views/block/NoneBlock.vue')
              }
            },
            {
              path: 'message_person/:index',
              components: {
                first: () => import('../views/bar/MessageBar.vue'),
                second: () => import('../views/block/PersonalChatBlock.vue')
              }
            },
            {
              path: 'message_group/:index',
              components: {
                first: () => import('../views/bar/MessageBar.vue'),
                second: () => import('../views/block/GroupChatBlock.vue')
              }
            },
            {
              path: 'relationship_null',
              components: {
                first: () => import('../views/bar/RelationshipBar.vue'),
                second: () => import('../views/block/NoneBlock.vue')
              }
            },
            {
              path: 'relationship_person',
              components: {
                first: () => import('../views/bar/RelationshipBar.vue'),
                second: () => import('../views/block/PersonalInformation.vue')
              }
            },
            {
              path: 'relationship_group',
              components: {
                first: () => import('../views/bar/RelationshipBar.vue'),
                second: () => import('../views/block/GroupInformation.vue')
              }
            }
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
