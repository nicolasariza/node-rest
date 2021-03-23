import Role from '../models/role';
import User from '../models/user';

const roleValid = async (role = ''): Promise<void> => {
    const existRole = await Role.findOne({ role });
    if (!existRole ){
        throw new Error(`Role ${role} is invalid`)
    }
};

const emailExists = async (email = ''): Promise<void> => {
    const verifyEmail = await User.findOne({email});
    if( verifyEmail ){
        throw new Error(`Email ${email} exists`)
    }
};

export {
    roleValid,
    emailExists
}