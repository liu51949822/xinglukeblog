import { faker } from '@/libs/db/utils';
import { hashPassword } from '@/libs/passwd';

import { prisma } from '../client';

export const createUserData = async () => {
    await prisma.user.create({
        select: { id: true },
        data: {
            username: 'xingluke',
            password: hashPassword('12345678'),
            email: '1240332437@qq.com',
        },
    });
    for (let index = 0; index < 12; index++) {
        await prisma.user.create({
            select: { id: true },
            data: {
                username: faker.internet.username(),
                password: hashPassword(faker.internet.password()),
                email: faker.internet.email(),
            },
        });
    }
};
