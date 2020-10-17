const { sequelize, DataTypes } = require('db');
const { Model } = require('sequelize');
const Category = require('./category');


//
// Methods
//
class Post extends Model {
}


//
// Fields
//
Post.init({
    title: {
        type: DataTypes.STRING(512)
    },
    body: {
        type: DataTypes.TEXT
    },
    date: {
        type: DataTypes.DATE_NO_TZ,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Post',
    timestamps: false
});


//
// Relations
//
Category.belongsToMany(Post, {
    through: 'PostToCategory',
    as: 'Post'
});
/*
.getPost()
.countPost()
.hasPost()
.hasPost([])
.setPost()
.addPost()
.addPost([])
.removePost()
.removePost([])
.createPost()
*/

Post.belongsToMany(Category, {
    through: 'PostToCategory',
    as: 'Category'
});
/*
.getCategory()
.countCategory()
.hasCategory()
.hasCategory([])
.setCategory()
.addCategory()
.addCategory([])
.removeCategory()
.removeCategory([])
.createCategory()
*/




module.exports = Post;