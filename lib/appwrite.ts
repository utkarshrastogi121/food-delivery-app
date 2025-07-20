import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig={
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.utk.fooddelivery",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId:process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    userCollectionId:process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!
}

export const client = new Client();
client.setEndpoint(appwriteConfig.endpoint!).setProject(appwriteConfig.projectId!)
.setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const database = new Databases(client);
const avatar = new Avatars(client)

interface CreateUserParams{
    name:string,
    password:string,
    email:string
}

export const createUser= async ({email, password,name}:CreateUserParams)=>{
    try{
        const newAccount = await account.create(ID.unique(), email, password, name)
        if (!newAccount) throw Error

        await signIn({email,password});
        const avatarUrl = avatar.getInitialsURL(name)
        const newUser= await database.createDocument(appwriteConfig.databaseId,appwriteConfig.userCollectionId,ID.unique(),
        {
            email,
            name,
            password,
            avatar:avatarUrl,
            accountID : newAccount.$id
        });
        return newUser;
        }catch(e){throw new Error(e as string)}
}

interface SignInParams{
    email:string,
    password:string
}

export const signIn = async ({email,password}:SignInParams) => {
    try{
        const session = await account.createEmailPasswordSession(email,password)
        return session;
    }catch(e){throw new Error(e as string)}
}
export const getUser = async () =>{
    try{
        const currentAccount = await account.get()
        if(!currentAccount) throw Error
        const currentUser = await database.listDocuments(appwriteConfig.databaseId,appwriteConfig.userCollectionId,
            [Query.equal('accountID',currentAccount.$id)]
        )
        if (!currentUser) throw Error
        return currentUser.documents[0];
    }catch(e){throw new Error(e as string)}
}