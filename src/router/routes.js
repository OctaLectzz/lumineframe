const routes = [
  // Home
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/home/IndexPage.vue') },
      { path: 'lumine/:photo_number', name: 'showphoto', component: () => import('pages/home/ShowPhoto.vue') },
      { path: 'creation-tool', meta: { requiresAuth: true, roles: ['Admin', 'Member'] }, name: 'creationtool', component: () => import('pages/home/CreationToolPage.vue') },
      {
        path: ':username',
        component: () => import('layouts/ProfileLayout.vue'),
        children: [
          { path: '', name: 'indexprofile', component: () => import('pages/home/profile/IndexProfile.vue') },
          { path: 'collections', name: 'collectionsprofile', component: () => import('pages/home/profile/CollectionsProfile.vue') },
          { path: 'likes', name: 'likesprofile', component: () => import('pages/home/profile/LikesProfile.vue') }
        ]
      },
      {
        path: '/:catchAll(.*)*',
        name: 'notfound',
        component: () => import('pages/ErrorNotFound.vue')
      }
    ]
  }
]

export default routes
