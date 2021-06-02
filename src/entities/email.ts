import mongoose from 'mongoose'

export interface IEmail extends mongoose.Document {
    email:  string;
    createdAt: Date;
    updatedAt: Date;
}

export const EmailSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    createdAt: new Date,
    updatedAt: new Date
})

const Email = mongoose.model<IEmail>("Email", EmailSchema);

export default Email;