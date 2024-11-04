import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public u_id!: string; // UUID é uma string
  public u_nome!: string;
  public u_email!: string;
  public u_password!: string;
  public u_accessLevel!: number;
  public u_createdAt!: Date;
}

User.init(
  {
    u_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    u_nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    u_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    u_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    u_accessLevel: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    u_createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Define a data atual como valor padrão
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true, // Adiciona automaticamente createdAt e updatedAt
  }
);

export default User;
