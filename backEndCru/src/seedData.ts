import User from './models/user';
import bcrypt from 'bcryptjs';

// Função para criar usuários iniciais
export const seedUsers = async () => {
  try {
    const adminUser = await User.findOne({ where: { u_email: 'admin@example.com' } });
    const commonUser1 = await User.findOne({ where: { u_email: 'user1@example.com' } });
    const commonUser2 = await User.findOne({ where: { u_email: 'user2@example.com' } });

    if (!adminUser && !commonUser1 && !commonUser2) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      await User.create({
        u_nome: 'Admin',
        u_email: 'admin@example.com',
        u_password: hashedPassword,
        u_accessLevel: 10,
      });

      const hashedPasswordUser = await bcrypt.hash('user123', 10);

      await User.bulkCreate([
        {
          u_nome: 'User1',
          u_email: 'user1@example.com',
          u_password: hashedPasswordUser,
          u_accessLevel: 1,
        },
        {
          u_nome: 'User2',
          u_email: 'user2@example.com',
          u_password: hashedPasswordUser,
          u_accessLevel: 1,
        },
      ]);

      console.log('Usuários iniciais criados com sucesso!');
    } else {
      console.log('Usuários já existentes no banco de dados.');
    }
  } catch (error) {
    console.error('Erro ao criar usuários iniciais:', error);
  }
};
