import { createRouter, createWebHashHistory, type RouteLocationNormalized } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewAuth from '@/views/ViewAuth.vue'

const routes = [
  {
    path: '/',
    name: 'notes',
    component: ViewNotes
  },
  {
    path: '/editNote/:id',
    name: 'edit-note',
    component: ViewEditNote
  },
  {
    path: '/stats',
    name: 'stats',
    component: ViewStats
  },
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach(async (to: RouteLocationNormalized) => {
  const storeAuth = useStoreAuth()
  // if the user is not logged in as is trying to go anywhere other than auth route
  if (!storeAuth.user?.id && to.name !== 'auth') {
    console.log('redirect auth');

    return { name: 'auth' }
  }

  // if logged in and trying to access auth page
  console.log('my user', storeAuth.user);

  if (storeAuth.user?.id && to.name === 'auth') {
    console.log('redirect false');
    return false //keep the user in the same page, without redirecting anywhere
  }
})
