import type { CategoryApiType } from '@/server/category/routes';
import type { categoryListRequestParams } from '@/server/category/type';

import { buildClient, fetchApi } from '@/libs/hono';
import { categoryPath } from '@/server/category/routes';

/** Typed Hono RPC client for category API */
export const categoryClient = buildClient<CategoryApiType>(categoryPath);

/** Category API operations with 401 redirect handling */
export const categoryApi = {
    /** Query category ancestors as breadcrumb trail */
    breadcrumb: async (latest: string) =>
        fetchApi(categoryClient, async (c) =>
            c.breadcrumb[':latest'].$get({
                param: { latest },
            }),
        ),

    /** Query flattened category list (optionally scoped to parent) */
    list: async (params: categoryListRequestParams = {}) =>
        fetchApi(categoryClient, async (c) =>
            c[':parent?'].$get({
                param: params,
            }),
        ),

    /** Query nested category tree (optionally scoped to parent) */
    tree: async (params: categoryListRequestParams = {}) =>
        fetchApi(categoryClient, async (c) =>
            c.tree[':parent?'].$get({
                param: params,
            }),
        ),
};
