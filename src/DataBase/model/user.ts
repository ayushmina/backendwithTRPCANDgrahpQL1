
export default  (sequelize:any, DataTypes:any) => {
    const user = sequelize.define(
      'user',
      {
        UserID: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        UserName: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        UserPWD: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        UserData: {
          type: DataTypes.STRING

        },

      },{
        modelName: 'user',
            timestamps: false,
            freezeTableName: true,
          
      }
    );
 
    return user;
  }; 