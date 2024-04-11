const routes = [
  // Home
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/home/IndexPage.vue') },
      { path: 'creation-tool', name: 'creationTool', component: () => import('pages/home/CreationToolPage.vue') },
      {
        path: ':username',
        component: () => import('layouts/ProfileLayout.vue'),
        children: [
          { path: '', name: 'indexprofile', component: () => import('pages/home/profile/IndexProfile.vue') },
          { path: 'collections', name: 'collectionsprofile', component: () => import('pages/home/profile/CollectionsProfile.vue') },
          { path: 'likes', name: 'likesprofile', component: () => import('pages/home/profile/LikesProfile.vue') }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
