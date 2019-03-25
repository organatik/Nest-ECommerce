import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true } );
        },
    },
];
