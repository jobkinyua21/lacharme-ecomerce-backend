const Category =require('../../models/category');
const Product=require('../../models/product');

function createCategories(categories,parentId=null){
    const categoryList =[];
    let category;
    if(parentId ==null){
        category= categories.filter(cat =>cat.parentId ==undefined);

    }else{
        category =categories.filter(cat =>cat.parentId ==parentId);
    }
    for(let cate of category){
        categoryList.push({
            _id:cate._id,
            name:cate.name,
            slug:cate.slug,
            parentId:cate.parentId,
            children:createCategories(categories,cate._id)
        });
    }
    return categoryList;
};

exports.initialData=async(req,res)=>{
    // fetch category &products , {}empty object return all values ,,.exec()returns a promise after entte line executes
    const categories=await Category.find({}).exec();
    const products=await Product.find({})
        .select('_id name price quantity slug description productPictures category')
        // pass object and specify path of data we want from mongodb
        .populate({path:'category',select: '_id name'})
        . exec();
    res.status(200).json({
        categories:createCategories(categories),
        products
    })

}