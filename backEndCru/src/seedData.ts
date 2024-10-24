import User from './models/user';
import bcrypt from 'bcryptjs';

// Função para criar usuários iniciais
export const seedUsers = async () => {
  try {
    // Verifica se os usuários já existem
    const adminUser = await User.findOne({ where: { u_email: 'admin@example.com' } });
    const commonUser1 = await User.findOne({ where: { u_email: 'user1@example.com' } });
    const commonUser2 = await User.findOne({ where: { u_email: 'user2@example.com' } });

    // Se os usuários não existirem, cria os três usuários iniciais
    if (!adminUser && !commonUser1 && !commonUser2) {
      const hashedPassword = await bcrypt.hash('admin123', 10); // Senha para o admin

      // Cria o admin
      await User.create({
        u_nome: 'Admin',
        u_email: 'admin@example.com',
        u_password: hashedPassword,
        u_accessLevel: 10, // Define 10 como nível de administrador
      });

      // Cria dois usuários comuns
      const hashedPasswordUser = await bcrypt.hash('user123', 10); // Senha para os usuários comuns

      await User.bulkCreate([
        {
          u_nome: 'User1',
          u_email: 'user1@example.com',
          u_password: hashedPasswordUser,
          u_accessLevel: 1, // Defina 1 como nível de usuário comum
        },
        {
          u_nome: 'User2',
          u_email: 'user2@example.com',
          u_password: hashedPasswordUser,
          u_accessLevel: 1, // Defina 1 como nível de usuário comum
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
