import mongoose from 'mongoose';

export const dbConnection = async (): Promise<any> => {
    try {
        await mongoose.connect( process.env.MONGODB || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('connected to database');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error trying to connect to the database')
    }    
}