// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');



// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});



// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE"
})

//----------------------------------------------------------

// Below relationships will resemble
//----------------------------------------------------------
// select p.product_id, p_name, p.stock, p.price,t.tag_name from product p,tag t ,producttags pt where 
// p.id = pt.product_id and pt.tag_id = t.id



// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  // Table names are not surrounded by  ''
  through: ProductTag,
  foreignKey: 'product_id'
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
