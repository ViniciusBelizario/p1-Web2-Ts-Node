import bcrypt from 'bcryptjs';

const password = 'admin123';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log(hash); // O hash gerado pode ser usado no arquivo `users_package.json`
});
