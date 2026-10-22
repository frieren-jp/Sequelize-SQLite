const sequelize = require('./config/database');
const User = require('./models/User');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Подключение к SQLite установлено.');

    await sequelize.sync();

    const examples = [
      { firstName: 'name', lastName: 'sn', email: '999@example.com', age: 20 },
      { firstName: 'name2', lastName: 'sn2', email: '000@example.com', age: 22 },
      { firstName: '--', lastName: '--', email: '888@example.com', age: 20 }
    ];

    for (const data of examples) {
      // При повторном запуске ищем запись по уникальному email.
      const existingUser = await User.findOne({ where: { email: data.email } });
      if (!existingUser) {
        await User.create(data);
      }
    }
    
    const users = await User.findAll({ order: [['id', 'ASC']] });
    console.log('Пользователи:');
    console.table(users.map((user) => user.toJSON()));
  } catch (error) {
    console.error('Ошибка выполнения:', error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
    console.log('Соединение с базой данных закрыто.');
  }
}

main().catch((error) => {
  console.error('Ошибка завершения:', error.message);
  process.exitCode = 1;
});
