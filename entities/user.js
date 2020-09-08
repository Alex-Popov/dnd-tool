const { sequelize, DataTypes } = require('db');
const { Deferrable, Model } = require('sequelize');
//const sha256 = require('crypto-js/sha256');
//const Base64 = require('crypto-js/enc-base64');
const bcrypt = require('bcrypt');

class User extends Model {
    static async login(username, password) {
        let user = await this.findByUsername(username);

        // invalid username
        if (!user) throw 'Invalid username or password';

        // validate password
//        if (user.password !== this.getPasswordHash(password, user.salt)) throw 'Invalid username or password';
        if (!bcrypt.compareSync(password, user.password)) throw new Error('Invalid username or password');

        return user;
    }

    static async setPassword(username, oldPassword, newPassword) {
        let user = await this.findByUsername(username);

        // invalid username
        if (!user) throw 'Invalid username or password';

        // salt
//        const salt = user.salt || Math.random();

        // validate password
//        if (user.password && user.password !== this.getPasswordHash(oldPassword, salt)) throw 'Invalid username or password';
        if (user.password && !bcrypt.compareSync(oldPassword, user.password)) throw new Error('Invalid username or password');

        // set fields and save
        user.password = bcrypt.hashSync(newPassword, 10);
//        user.password = this.getPasswordHash(newPassword, salt);
//        user.salt = salt;
        return user.save();
    }
/*
    static getPasswordHash(password, salt) {
        return Base64.stringify(sha256(password+salt));
    }
*/
    static findByUsername(username) {
        return this.findOne({
            where: {
                username
            }
        });
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