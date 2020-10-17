const logger = require('logger');

const { sequelize, DataTypes } = require('db');
const { User, ROLE_ADMIN, ROLE_USER } = require('../entities/user');
const Category = require('../entities/category');
const Post = require('../entities/post');

const initTables = async () => {

    try {
        await sequelize.sync({force: true});

        // users
        await User.create({
            username: 'admin',
            password: 'admin',
            role: ROLE_ADMIN
        });
        await User.create({
            username: 'user1',
            password: '111',
            role: ROLE_USER
        });
        // categories
        let Eat = await Category.create({name: 'Еда'});
        let Hobby = await Category.create({name: 'Хобби'});
        let Sex = await Category.create({name: 'Секс'});
        await Eat.createChildCategory({name: 'Рецепты'});
        await Eat.createChildCategory({name: 'Посуда'});
        await Eat.createPost({title: 'Фоточки'});
        await Eat.createPost({title: 'Приправы'});


        //console.log(await Eat.getPost());
        //console.log(await Post.build({id:1}).getCategory());

        //await Sex.addChildCategory([Eat]);

        logger.info('All models were synchronized successfully.');

    } catch (e) {
        logger.error(e);
    }

}

module.exports = initTables;