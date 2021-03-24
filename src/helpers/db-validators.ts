import Role from '../models/role';
import User from '../models/user';

const roleExists = async (role = ''): Promise<void> => {
    const verifyRole = await Role.findOne({ role });
    if (!verifyRole ){
        throw new Error(`Role ${role} is invalid`)
    }
};

const emailExists = async (email = ''): Promise<void> => {
    const verifyEmail = await User.findOne({email});
    if( verifyEmail ){
        throw new Error(`Email ${email} exists`);
    }
};

const userExists = async(id = ''): Promise<void> => {
    const verifyUser = await User.findById(id);
    if( !verifyUser ){
        throw new Error(`Id ${id} doesn't exists`);
    }
}

export {
    roleExists,
    emailExists,
    userExists
}