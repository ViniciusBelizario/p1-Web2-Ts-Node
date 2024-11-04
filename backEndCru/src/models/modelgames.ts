import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user'; // Importa o modelo User

interface GameAttributes {
  g_id: string;
  g_title: string;
  g_description?: string;
  g_genre: string;
  g_price: number;
  g_releaseDate: Date;
  g_platform: string;
  userId: string; // Chave estrangeira para o usuário
}

interface GameCreationAttributes extends Optional<GameAttributes, 'g_id'> {}

class Game extends Model<GameAttributes, GameCreationAttributes> implements GameAttributes {
  public g_id!: string;
  public g_title!: string;
  public g_description!: string;
  public g_genre!: string;
  public g_price!: number;
  public g_releaseDate!: Date;
  public g_platform!: string;
  public userId!: string; // ID do usuário que cadastrou o jogo
}

Game.init(
  {
    g_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    g_title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    g_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    g_genre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    g_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    g_releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    g_platform: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'u_id',
      },
    },
  },
  {
    sequelize,
    tableName: 'games',
    timestamps: true,
  }
);

// Configura a associação com o modelo User
User.hasMany(Game, { foreignKey: 'userId' });
Game.belongsTo(User, { foreignKey: 'userId' });

export default Game;
