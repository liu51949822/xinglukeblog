import type { Prisma } from '@prisma/client';

import { getRandomInt } from '@/libs/random';
import { generateLowerString } from '@/libs/utils';
import { isNil } from 'lodash';
import { readFileSync } from 'node:fs';
// import path from 'node:path';

import { prisma } from '../client';

type Item = Pick<Prisma.PostCreateInput, 'title' | 'summary'> & {
    bodyPath: string;
    categoryName: string;
    tagNames?: string[];
    authorName: string;
};

const data: Item[] = [
];

export const createPostData = async () => {
    for (const post of data) {
        const { title, summary, bodyPath, categoryName, tagNames, authorName } = post;
        const author = await prisma.user.findFirst({
            where: { username: authorName },
        });
        if (!author) {
            throw new Error(`Author ${authorName} not found`);
        }
        const category = await prisma.category.findFirst({
            where: { name: categoryName },
        });
        if (!category) {
            throw new Error(`Category ${categoryName} not found`);
        }
        let tags: Prisma.TagCreateNestedManyWithoutPostsInput | undefined;
        if (!isNil(tagNames)) {
            tags = {
                connectOrCreate: tagNames.map((text) => ({ where: { text }, create: { text } })),
            };
        }
        await prisma.post.create({
            select: { id: true },
            data: {
                thumb: `/uploads/thumb/post-${getRandomInt(1, 8)}.png`,
                title,
                summary,
                body: readFileSync(bodyPath, 'utf8'),
                slug: generateLowerString(title),
                keywords: tagNames?.join(','),
                description: summary,
                author: { connect: { id: author.id } },
                category: {
                    connect: {
                        id: category.id,
                    },
                },
                tags,
            },
        });
    }
};
