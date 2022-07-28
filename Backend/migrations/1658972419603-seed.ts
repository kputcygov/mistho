import { MigrationInterface, QueryRunner } from "typeorm";

export class seed1658972419603 implements MigrationInterface {
    name = 'seed1658972419603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO public.scraper (id, name, url, selectors, type, created_at, updated_at) VALUES (1, 'Google', 'google.com', '{.main,.price}', 'css', '2022-07-28 05:35:20.927865', '2022-07-28 06:34:25.362975');`);
        await queryRunner.query(`INSERT INTO public.scraper (id, name, url, selectors, type, created_at, updated_at) VALUES (2, 'Facebook', 'facebook.com', '{.friends,.chats}', 'css', '2022-07-28 05:35:36.585952', '2022-07-28 06:35:00.576364');`);
        await queryRunner.query(`INSERT INTO public.scraper (id, name, url, selectors, type, created_at, updated_at) VALUES (3, 'Yahoo', 'yahoo.com', '{.main,.header}', 'css', '2022-07-28 05:50:43.221699', '2022-07-28 06:35:34.669811');`);
        await queryRunner.query(`INSERT INTO public.scraper (id, name, url, selectors, type, created_at, updated_at) VALUES (4, 'Cnn', 'cnn.com', '{.cost}', 'css', '2022-07-28 06:29:58.359123', '2022-07-28 06:42:01.975588');`);
        await queryRunner.query(`ALTER SEQUENCE "scraper-cloud".public.scraper_id_seq RESTART WITH 10`);
        await queryRunner.query(`INSERT INTO public.scheduler (id, name, expression, status, "cronjobId", "scraperId", created_at, updated_at) VALUES (1, 'Daily', '0 14 * * *', 'created', 1, 1, '2022-07-28 06:29:58.359123', '2022-07-28 06:42:01.975588');
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //  pass up
    }

}
