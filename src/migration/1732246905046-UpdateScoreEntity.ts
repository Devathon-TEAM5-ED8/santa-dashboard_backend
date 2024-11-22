import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateScoreEntity1732246905046 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("scores", [
            new TableColumn({
                name: "generosity",
                type: "enum",
                enum: ["bueno", "regular", "malo"],
                default: "'regular'",
            }),
            new TableColumn({
                name: "kindness",
                type: "enum",
                enum: ["bueno", "regular", "malo"],
                default: "'regular'",
            }),
            new TableColumn({
                name: "respect",
                type: "enum",
                enum: ["bueno", "regular", "malo"],
                default: "'regular'",
            }),
            new TableColumn({
                name: "obedience",
                type: "enum",
                enum: ["bueno", "regular", "malo"],
                default: "'regular'",
            }),
            new TableColumn({
                name: "responsibility",
                type: "enum",
                enum: ["bueno", "regular", "malo"],
                default: "'regular'",
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("scores", "generosity");
        await queryRunner.dropColumn("scores", "kindness");
        await queryRunner.dropColumn("scores", "respect");
        await queryRunner.dropColumn("scores", "obedience");
        await queryRunner.dropColumn("scores", "responsibility");
    }

}
