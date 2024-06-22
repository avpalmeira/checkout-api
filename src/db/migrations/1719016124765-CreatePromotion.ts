import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePromotion1719016124765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'promotions',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'int4',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'promotion_activation_rules',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'int4',
          },
          {
            name: 'product_id',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'int4',
          },
          {
            name: 'promotion_id',
            type: 'int4',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_product_for_activation_rule',
            columnNames: ['product_id'],
            referencedTableName: 'products',
            referencedColumnNames: ['sku'],
          },
          {
            name: 'fk_promotion_for_activation_rule',
            columnNames: ['promotion_id'],
            referencedTableName: 'promotions',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'promotion_discount_rules',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'int4',
          },
          {
            name: 'product_id',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'int4',
          },
          {
            name: 'discount',
            type: 'float',
          },
          {
            name: 'promotion_id',
            type: 'int4',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_product_for_discount_rule',
            columnNames: ['product_id'],
            referencedTableName: 'products',
            referencedColumnNames: ['sku'],
          },
          {
            name: 'fk_promotion_for_discount_rule',
            columnNames: ['promotion_id'],
            referencedTableName: 'promotions',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('promotion_discount_rules');
    await queryRunner.dropTable('promotion_activation_rules');
    await queryRunner.dropTable('promotions');
  }
}
