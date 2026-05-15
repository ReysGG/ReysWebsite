import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL });
const db = new PrismaClient({ adapter: new PrismaPg(pool) });
const c = await db.post.count({ where: { published: true } });
console.log('published posts:', c);
await db.$disconnect();
await pool.end();
