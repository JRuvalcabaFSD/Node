import { envs } from '../../config';
import { CategoryModel, MongoDatabase, ProductModel } from '../mongo';
import { UserModel } from '../mongo/models/user.model';
import { seedData } from './data';

(async () => {
  if (envs.NODE_ENV === 'production') {
    console.error('❌ The database cannot be seeded in production mode');
    process.exit(0);
  }
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();
  await MongoDatabase.disconnect();
})();

const randomBetween0AnxX = (x: number) => {
  return Math.floor(Math.random() * x);
};

async function main() {
  // Delete all tables
  await Promise.all([UserModel.deleteMany(), CategoryModel.deleteMany(), ProductModel.deleteMany()]);

  const users = await UserModel.insertMany(seedData.users);

  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => {
      return {
        ...category,
        user: users[0]._id,
      };
    }),
  );

  const products = await ProductModel.insertMany(
    seedData.products.map((product) => {
      return {
        ...product,
        user: users[randomBetween0AnxX(seedData.users.length - 1)]._id,
        category: categories[randomBetween0AnxX(seedData.categories.length - 1)]._id,
      };
    }),
  );

  console.log('Database Seeded');
}
