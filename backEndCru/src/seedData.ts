import User from './models/user';
import Game from './models/modelgames';
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


export const seedGames = async () => {
  try {
    const existingGames = await Game.findAll({
      where: {
        g_title: [
          'The Last Adventure',
          'Cyber City 2077',
          'Ancient Quest',
          'Galaxy Warriors',
          'Fantasy World Online',
          'Speed Rush',
          'Battlefield: Frontline',
          'Zombie Survival',
          'Mystery Manor',
          'Island Builder',
        ],
      },
    });

    if (existingGames.length === 0) {
      await Game.bulkCreate([
        {
          g_title: 'The Last Adventure',
          g_description: 'Um jogo emocionante de ação e aventura com uma narrativa envolvente.',
          g_genre: 'Ação/Aventura',
          g_price: 69.99,
          g_releaseDate: new Date('2020-06-19'),
          g_platform: 'PlayStation',
        },
        {
          g_title: 'Cyber City 2077',
          g_description: 'Explore uma cidade futurista em um jogo de RPG de mundo aberto.',
          g_genre: 'RPG',
          g_price: 59.99,
          g_releaseDate: new Date('2020-12-10'),
          g_platform: 'PC',
        },
        {
          g_title: 'Ancient Quest',
          g_description: 'Embarque em uma jornada épica por ruínas antigas e mistérios ocultos.',
          g_genre: 'Aventura',
          g_price: 49.99,
          g_releaseDate: new Date('2018-11-14'),
          g_platform: 'Xbox',
        },
        {
          g_title: 'Galaxy Warriors',
          g_description: 'Lute contra forças alienígenas em uma guerra intergaláctica.',
          g_genre: 'Ação/Espaço',
          g_price: 59.99,
          g_releaseDate: new Date('2017-10-27'),
          g_platform: 'PC',
        },
        {
          g_title: 'Fantasy World Online',
          g_description: 'Um MMORPG ambientado em um vasto mundo de fantasia.',
          g_genre: 'MMORPG',
          g_price: 0.00, // Free-to-play
          g_releaseDate: new Date('2019-09-30'),
          g_platform: 'PC',
        },
        {
          g_title: 'Speed Rush',
          g_description: 'Um jogo de corrida veloz com gráficos realistas e física precisa.',
          g_genre: 'Corrida',
          g_price: 39.99,
          g_releaseDate: new Date('2021-04-02'),
          g_platform: 'PlayStation',
        },
        {
          g_title: 'Battlefield: Frontline',
          g_description: 'Um jogo de tiro em primeira pessoa focado em combates militares.',
          g_genre: 'FPS',
          g_price: 59.99,
          g_releaseDate: new Date('2019-10-25'),
          g_platform: 'PC',
        },
        {
          g_title: 'Zombie Survival',
          g_description: 'Sobreviva em um mundo pós-apocalíptico dominado por zumbis.',
          g_genre: 'Horror/Sobrevivência',
          g_price: 49.99,
          g_releaseDate: new Date('2020-03-20'),
          g_platform: 'Xbox',
        },
        {
          g_title: 'Mystery Manor',
          g_description: 'Resolva mistérios e enigmas em uma mansão assombrada.',
          g_genre: 'Mistério',
          g_price: 29.99,
          g_releaseDate: new Date('2016-05-12'),
          g_platform: 'PC',
        },
        {
          g_title: 'Island Builder',
          g_description: 'Crie e gerencie sua própria ilha em um simulador de construção.',
          g_genre: 'Simulação',
          g_price: 19.99,
          g_releaseDate: new Date('2015-08-05'),
          g_platform: 'PC',
        },
      ]);

      console.log('Jogos iniciais criados com sucesso!');
    } else {
      console.log('Jogos já existentes no banco de dados.');
    }
  } catch (error) {
    console.error('Erro ao criar jogos iniciais:', error);
  }
};