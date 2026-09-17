-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Direction" (
    "id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "recipe_step" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Direction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "ingredient" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCategory" (
    "id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "RecipeCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direction" ADD CONSTRAINT "Direction_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCategory" ADD CONSTRAINT "RecipeCategory_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeCategory" ADD CONSTRAINT "RecipeCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
