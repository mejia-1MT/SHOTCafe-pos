CREATE TABLE "categories"(
    "category_id" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "categories" ADD PRIMARY KEY("category_id");
CREATE TABLE "products"(
    "product_id" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "price" BIGINT NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "image" bytea NOT NULL,
    "column_6" BIGINT NOT NULL
);
ALTER TABLE
    "products" ADD PRIMARY KEY("product_id");
CREATE TABLE "staff"(
    "staff_id" BIGINT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "staff" ADD PRIMARY KEY("staff_id");
CREATE TABLE "orders_summary"(
    "orders_id" BIGINT NOT NULL,
    "payment_method" VARCHAR(255) NOT NULL,
    "staff_member" VARCHAR(255) NOT NULL,
    "total_price" DECIMAL(8, 2) NOT NULL,
    "date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "orders_summary" ADD PRIMARY KEY("orders_id");
CREATE TABLE "order"(
    "order_id" BIGINT NOT NULL,
    "orders_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "size" VARCHAR(255) NOT NULL,
    "temperature" VARCHAR(255) NOT NULL,
    "price" DECIMAL(8, 2) NOT NULL,
    "amount" DECIMAL(8, 2) NOT NULL
);
ALTER TABLE
    "order" ADD PRIMARY KEY("order_id");
ALTER TABLE
    "order" ADD CONSTRAINT "order_orders_id_foreign" FOREIGN KEY("orders_id") REFERENCES "orders_summary"("orders_id");
ALTER TABLE
    "order" ADD CONSTRAINT "order_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "categories"("category_id");