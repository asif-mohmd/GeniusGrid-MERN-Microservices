import mongoose, { Schema, Document } from 'mongoose';

// Define interface for Category document
interface ICategory extends Document {
    categoryName: string;

}

// Define schema for Category
const CategorySchema: Schema = new Schema({
    categoryName: { type: String, required: true },
});

// Define and export the Category model
const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
