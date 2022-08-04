import bcrypt from 'bcryptjs'//to hash a password


const users=[
    {
         name:'Admin User',
         email:'admin@example.com',
         password:bcrypt.hashSync('123456',10),
         isAdmin:true
    },
    {
        name:'Jhon Doe',
        email:'Jhon@example.com',
        password:bcrypt.hashSync('123456',10),

   },
   {
        name:'ayoub',
        email:'ayoub@example.com',
        password:bcrypt.hashSync('123456',10),

},
{
     name:'noma',
     email:'noma@example.com',
     password:bcrypt.hashSync('123456',10),

},
{
     name:'ahmed',
     email:'ahmed@example.com',
     password:bcrypt.hashSync('123456',10),

}
]

export default users