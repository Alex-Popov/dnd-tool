const { sequelize, DataTypes } = require('db');
const { Deferrable, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
    static findByUsername(username) {
        return this.findOne({
            where: {
                username
            }
        });
    }
    static async findByUsernameAndPassword(username, password) {
        let user = await this.findByUsername(username);

        // invalid username
        if (!user) return null;

        // validate password
        if (!bcrypt.compareSync(password, user.password)) return null;

        return user;
    }
    static async setPassword(username, oldPassword, newPassword) {
        let user = await this.findByUsername(username);

        // invalid username
        if (!user) return null;

        // validate password
        if (user.password && !bcrypt.compareSync(oldPassword, user.password)) return null;

        // set fields and save
        user.password = bcrypt.hashSync(newPassword, 10);
        return user.save();
    }
}


User.init({
    username: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('username', value);
            this.setDataValue('changedDate', new Date());
            //this.setDataValue('changedBy', 1);
        }
    },
    password: {
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue('password', value);
            this.setDataValue('changedDate', new Date());
            this.setDataValue('changedPasswordDate', new Date());
            //this.setDataValue('changedBy', 1);
        }
    },
    salt: {
        type: DataTypes.STRING
    },
    changedDate: {
        type: DataTypes.DATE_NO_TZ,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    changedPasswordDate: {
        type: DataTypes.DATE_NO_TZ
    },
    changedBy: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id',
            deferrable: Deferrable.NOT
        }
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: false
});

module.exports = User;