import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Game extends Model {
  public g_id!: string; // UUID é uma string
  public g_title!: string;
  public g_description!: string;
  public g_genre!: string;
  public g_price!: number;
  public g_releaseDate!: Date;
  public g_platform!: string;
  public g_createdAt!: Date;
}

Game.init(
  {
    g_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Gera automaticamente UUID versão 4
      primaryKey: true, // Define como chave primária
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
      allowNull: false, // Exemplo: "PC", "PlayStation", "Xbox", etc.
    },
    g_createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Define a data atual como valor padrão
    },
  },
  {
    sequelize,
    tableName: 'games',
    timestamps: true, // Adiciona automaticamente createdAt e updatedAt
  }
);

export default Game;
