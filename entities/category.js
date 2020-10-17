const { sequelize, DataTypes } = require('db');
const { Model } = require('sequelize');


//
// Methods
//
class Category extends Model {
}


//
// Fields
//
Category.init({
    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true
    },
    color: {
        type: DataTypes.STRING(7),
/*        allowNull: false,
        unique: true*/
    }
}, {
    sequelize,
    modelName: 'Category',
    timestamps: false
});


//
// Relations
//
Category.hasMany(Category, {
    as: 'ChildCategory',
    foreignKey: 'parentId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    useJunctionTable: false
});
/*
.getChildCategory()
.countChildCategory()
.hasChildCategory()
.hasChildCategory([])
.setChildCategory()
.addChildCategory()
.addChildCategory([])
.removeChildCategory()
.removeChildCategory([])
.createChildCategory()
*/

Category.belongsTo(Category, {
    as: 'ParentCategory',
    foreignKey: 'parentId'
});
/*
.getParentCategory()
.setParentCategory()
.createParentCategory()
*/


module.exports = Category;