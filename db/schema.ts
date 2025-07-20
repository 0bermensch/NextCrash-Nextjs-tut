import { date, integer, numeric, pgTable, text } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
    type: text({
        enum: ["income", "expense"]
    }).notNull()
})

export const transactionsTable = pgTable("transactions", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id").notNull(),
    description: text().notNull(),
    amount: numeric().notNull(),
    transactionDate: date("transaction_date").notNull(),
    categoryId: integer("category_id").references(()=> categoriesTable.id).notNull()
})

// In Drizzle the property name in your TypeScript object and the actual column name that gets created in Postgres are two different things
// So when the column is just 1 word we can just not type the column name in the data type. But we used camel case we need to specify the column name in the data type ex. userId vs user_id