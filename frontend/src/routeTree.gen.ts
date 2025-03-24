/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as LayoutRouteImport } from './routes/_layout/route'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutApplicationsIndexImport } from './routes/_layout/applications/index'
import { Route as LayoutApplicationsNewImport } from './routes/_layout/applications/new'
import { Route as LayoutApplicationsApplicationIdImport } from './routes/_layout/applications/$applicationId'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRouteRoute = LayoutRouteImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutRouteRoute,
} as any)

const LayoutApplicationsIndexRoute = LayoutApplicationsIndexImport.update({
  id: '/applications/',
  path: '/applications/',
  getParentRoute: () => LayoutRouteRoute,
} as any)

const LayoutApplicationsNewRoute = LayoutApplicationsNewImport.update({
  id: '/applications/new',
  path: '/applications/new',
  getParentRoute: () => LayoutRouteRoute,
} as any)

const LayoutApplicationsApplicationIdRoute =
  LayoutApplicationsApplicationIdImport.update({
    id: '/applications/$applicationId',
    path: '/applications/$applicationId',
    getParentRoute: () => LayoutRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutRouteImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutRouteImport
    }
    '/_layout/applications/$applicationId': {
      id: '/_layout/applications/$applicationId'
      path: '/applications/$applicationId'
      fullPath: '/applications/$applicationId'
      preLoaderRoute: typeof LayoutApplicationsApplicationIdImport
      parentRoute: typeof LayoutRouteImport
    }
    '/_layout/applications/new': {
      id: '/_layout/applications/new'
      path: '/applications/new'
      fullPath: '/applications/new'
      preLoaderRoute: typeof LayoutApplicationsNewImport
      parentRoute: typeof LayoutRouteImport
    }
    '/_layout/applications/': {
      id: '/_layout/applications/'
      path: '/applications'
      fullPath: '/applications'
      preLoaderRoute: typeof LayoutApplicationsIndexImport
      parentRoute: typeof LayoutRouteImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteRouteChildren {
  LayoutIndexRoute: typeof LayoutIndexRoute
  LayoutApplicationsApplicationIdRoute: typeof LayoutApplicationsApplicationIdRoute
  LayoutApplicationsNewRoute: typeof LayoutApplicationsNewRoute
  LayoutApplicationsIndexRoute: typeof LayoutApplicationsIndexRoute
}

const LayoutRouteRouteChildren: LayoutRouteRouteChildren = {
  LayoutIndexRoute: LayoutIndexRoute,
  LayoutApplicationsApplicationIdRoute: LayoutApplicationsApplicationIdRoute,
  LayoutApplicationsNewRoute: LayoutApplicationsNewRoute,
  LayoutApplicationsIndexRoute: LayoutApplicationsIndexRoute,
}

const LayoutRouteRouteWithChildren = LayoutRouteRoute._addFileChildren(
  LayoutRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof LayoutRouteRouteWithChildren
  '/login': typeof LoginRoute
  '/': typeof LayoutIndexRoute
  '/applications/$applicationId': typeof LayoutApplicationsApplicationIdRoute
  '/applications/new': typeof LayoutApplicationsNewRoute
  '/applications': typeof LayoutApplicationsIndexRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/': typeof LayoutIndexRoute
  '/applications/$applicationId': typeof LayoutApplicationsApplicationIdRoute
  '/applications/new': typeof LayoutApplicationsNewRoute
  '/applications': typeof LayoutApplicationsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteRouteWithChildren
  '/login': typeof LoginRoute
  '/_layout/': typeof LayoutIndexRoute
  '/_layout/applications/$applicationId': typeof LayoutApplicationsApplicationIdRoute
  '/_layout/applications/new': typeof LayoutApplicationsNewRoute
  '/_layout/applications/': typeof LayoutApplicationsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/'
    | '/applications/$applicationId'
    | '/applications/new'
    | '/applications'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/login'
    | '/'
    | '/applications/$applicationId'
    | '/applications/new'
    | '/applications'
  id:
    | '__root__'
    | '/_layout'
    | '/login'
    | '/_layout/'
    | '/_layout/applications/$applicationId'
    | '/_layout/applications/new'
    | '/_layout/applications/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRouteRoute: typeof LayoutRouteRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRouteRoute: LayoutRouteRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout",
        "/login"
      ]
    },
    "/_layout": {
      "filePath": "_layout/route.tsx",
      "children": [
        "/_layout/",
        "/_layout/applications/$applicationId",
        "/_layout/applications/new",
        "/_layout/applications/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/applications/$applicationId": {
      "filePath": "_layout/applications/$applicationId.tsx",
      "parent": "/_layout"
    },
    "/_layout/applications/new": {
      "filePath": "_layout/applications/new.tsx",
      "parent": "/_layout"
    },
    "/_layout/applications/": {
      "filePath": "_layout/applications/index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
