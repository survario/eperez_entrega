import bCrypt from 'bcrypt';
import NUID from 'nuid';
import config from '../../../config/config.js'

export default class UsuarioDto {

    _id;
    id;
    email;
    password;    
    roles;
    username;
    name;
    lastname;
    address;
    dateBirth;
    phone;
    avatar;

    constructor({ _id, id, email, password, roles, username, name, lastname, address, dateBirth, phone, avatar }) {
        if (_id === undefined) {
            this._id = undefined;
            this.id = NUID.next();
            if (email === config.EMAIL_ADMINISTRADOR){
                this.roles = ["admin"];
            }else{
                this.roles = ["usuario"];
            }            
            this.password = createHash(password)
        }
        else {
            this._id = _id;
            this.id = id;
            this.roles = roles;
            this.password = password;
        }

        this.email = email;
        this.username = username;
        this.name = name;
        this.lastname = lastname;
        this.address = address;
        this.dateBirth = dateBirth;
        this.phone = phone;
        this.avatar = avatar;

    }

    get() {       
        return this
    }

    isValidPassword(password) {
        return bCrypt.compareSync(password, this.password);
    }
    
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
